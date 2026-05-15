import React from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { Navbar } from './Navbar'

export const AppShell: React.FC = () => (
  <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-950">
    <Sidebar />
    <div className="flex flex-1 flex-col overflow-hidden min-w-0">
      <Navbar />
      <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-950">
        <Outlet />
      </main>
    </div>
  </div>
)
