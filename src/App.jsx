import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { ThemeProvider, SidebarProvider } from './context/AppContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Teachers from './pages/Teachers';
import Childrens from './pages/Childrens';
import Classes from './pages/Classes';
import Kitchens from './pages/Kitchens';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Index from './pages/Index';
import LoginPage from './pages/LoginPage';

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
  const [user, setUser] = useState({ userId: 1, userName: "Hồng Phúc", role: "Giáo viên", classId: 1, className: "Mầm 1" });
  const [currentPage, setCurrentPage] = useState("dashboard");
  const navigate = useNavigate();
  const PageComponent = pages[currentPage] || Dashboard;

  return (
    <div className="flex h-screen overflow-hidden bg-dark-50 dark:bg-dark-950">
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header user={user} currentPage={currentPage} onExitAdmin={() => navigate('/')} />
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
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/admin"
          element={
            <ThemeProvider>
              <SidebarProvider>
                <AdminShell />
              </SidebarProvider>
            </ThemeProvider>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}