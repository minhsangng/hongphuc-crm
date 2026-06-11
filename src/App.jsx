import React, { useState } from 'react'
import { ThemeProvider, SidebarProvider } from './context/AppContext'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Parents from './pages/Parents'
import Childrens from './pages/Childrens'
import Classes from './pages/Classes'
import Reports from './pages/Reports'
import Settings from './pages/Settings'

const pages = { dashboard: Dashboard, parents: Parents, childrens: Childrens, classes: Classes, reports: Reports, settings: Settings }

function AppShell() {
  const [currentPage, setCurrentPage] = useState('dashboard')
  const PageComponent = pages[currentPage] || Dashboard

  return (
    <div className="flex h-screen overflow-hidden bg-dark-50 dark:bg-dark-950">
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header currentPage={currentPage} />
        <main className="flex-1 overflow-y-auto">
          <PageComponent />
        </main>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <AppShell />
      </SidebarProvider>
    </ThemeProvider>
  )
}
