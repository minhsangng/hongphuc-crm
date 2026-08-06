import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { ThemeProvider, SidebarProvider } from "./context/AppContext";
import { getDataFromAPI } from "./utils/helpers";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Teachers from "./pages/Teachers";
import Childrens from "./pages/Childrens";
import Classes from "./pages/Classes";
import Kitchens from "./pages/Kitchens";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Index from "./pages/Index";
import Login from "./pages/Login";

const pages = {
  dashboard: Dashboard,
  teachers: Teachers,
  childrens: Childrens,
  classes: Classes,
  kitchens: Kitchens,
  reports: Reports,
  settings: Settings,
};


function AdminShell() {
  const [user, setUser] = useState();
  const [currentPage, setCurrentPage] = useState("dashboard");
  const navigate = useNavigate();
  const PageComponent = pages[currentPage] || Dashboard;
  
  async function handleLogout() {
    const response = await getDataFromAPI("auth-logout", "post");
    if (response.status === 200) navigate("/login");
    else navigate("/");
  }
  
  async function loadUser() {
    const response = await getDataFromAPI("auth-checker");
    if (response.status === 200 && response.authenticated) setUser(response.user);
    else navigate("/login", { replace: true });
  }
  
  useEffect(() => {
    loadUser();
  }, []);
  
  if (!user) return (<div className="bg-white w-screen h-screen"></div>);

  return (
    <div id="admin" className="flex h-screen overflow-hidden bg-dark-50 dark:bg-dark-950">
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header user={user} currentPage={currentPage} onExitAdmin={handleLogout} />
        <main className="flex-1 overflow-y-auto">
          <PageComponent user={user} />
        </main>
      </div>
    </div>
  )
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={
            <ThemeProvider>
              <SidebarProvider>
                <AdminShell />
              </SidebarProvider>
            </ThemeProvider>
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}