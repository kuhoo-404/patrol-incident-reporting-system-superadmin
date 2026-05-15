import React, { useEffect, useRef, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AppShell } from '@/layouts/AppShell'

// Lazy-load all pages
const Dashboard = React.lazy(() => import('@/modules/dashboard/DashboardPage'))
const Companies = React.lazy(() => import('@/modules/companies/CompaniesPage'))
const Hierarchy = React.lazy(() => import('@/modules/hierarchy/HierarchyPage'))
const Users = React.lazy(() => import('@/modules/users/UsersPage'))
const AccessMatrix = React.lazy(() => import('@/modules/access-matrix/AccessMatrixPage'))
const Shifts = React.lazy(() => import('@/modules/shifts/ShiftsPage'))
const Checklists = React.lazy(() => import('@/modules/checklists/ChecklistsPage'))
const ChecklistAllocation = React.lazy(() => import('@/modules/checklist-allocation/ChecklistAllocationPage'))
const Incidents = React.lazy(() => import('@/modules/incidents/IncidentsPage'))
const Sos = React.lazy(() => import('@/modules/sos/SosPage'))
const LiveTracking = React.lazy(() => import('@/modules/live-tracking/LiveTrackingPage'))
const Escalation = React.lazy(() => import('@/modules/escalation/EscalationPage'))
const Analytics = React.lazy(() => import('@/modules/analytics/AnalyticsPage'))
const Audit = React.lazy(() => import('@/modules/audit/AuditPage'))
const WhiteLabel = React.lazy(() => import('@/modules/white-label/WhiteLabelPage'))
const Localization = React.lazy(() => import('@/modules/localization/LocalizationPage'))
const SettingsPage = React.lazy(() => import('@/modules/settings/SettingsPage'))

const PageLoader = () => (
  <div className="flex h-full items-center justify-center py-32">
    <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-blue-600" />
  </div>
)

function App() {
  return (
    <React.Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/hierarchy" element={<Hierarchy />} />
          <Route path="/users" element={<Users />} />
          <Route path="/access-matrix" element={<AccessMatrix />} />
          <Route path="/shifts" element={<Shifts />} />
          <Route path="/checklists" element={<Checklists />} />
          <Route path="/checklist-allocation" element={<ChecklistAllocation />} />
          <Route path="/incidents" element={<Incidents />} />
          <Route path="/sos" element={<Sos />} />
          <Route path="/live-tracking" element={<LiveTracking />} />
          <Route path="/escalation" element={<Escalation />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/audit" element={<Audit />} />
          <Route path="/white-label" element={<WhiteLabel />} />
          <Route path="/localization" element={<Localization />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </React.Suspense>
  )
}

export default App
