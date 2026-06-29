import React, { useEffect, useState } from 'react';
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
import LandingPage from './pages/LandingPage';
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
  const [currentPage, setCurrentPage] = useState("dashboard");
  const navigate = useNavigate();
  const PageComponent = pages[currentPage] || Dashboard;
  
  useEffect(()=> {
    document.title = "Mầm non Hồng Phúc - " + (currentPage.charAt(0).toUpperCase() + currentPage.slice(1));
  }, [currentPage]);

  return (
    <div className="flex h-screen overflow-hidden bg-dark-50 dark:bg-dark-950">
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header
          currentPage={currentPage}
          onExitAdmin={() => navigate('/')}
        />
        <main className="flex-1 overflow-y-auto">
          <PageComponent />
        </main>
      </div>
    </div>
  )
};

export default function App() {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/"       element={<LandingPage />} />
            <Route path="/login"  element={<LoginPage />} />
            <Route path="/admin"  element={<AdminShell />} />
            <Route path="*"       element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </SidebarProvider>
    </ThemeProvider>
  )
};