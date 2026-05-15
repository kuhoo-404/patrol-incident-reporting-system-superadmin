import React, { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, Building2, GitBranch, Users, ShieldCheck, Clock,
  ClipboardList, ClipboardCheck, AlertTriangle, Siren, MapPin,
  TrendingUp, BarChart3, ScrollText, Palette, Globe, Settings,
  ChevronLeft, ChevronRight, Shield,
} from 'lucide-react'
import { cn } from '@/utils'
import { useAppStore } from '@/store/appStore'
import { NAV_ITEMS } from '@/constants'

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard, Building2, GitBranch, Users, ShieldCheck, Clock,
  ClipboardList, ClipboardCheck, AlertTriangle, Siren, MapPin,
  TrendingUp, BarChart3, ScrollText, Palette, Globe, Settings,
}

const NAV_GROUPS = [
  { label: 'Overview', ids: ['dashboard'] },
  { label: 'Tenant Management', ids: ['companies', 'hierarchy'] },
  { label: 'People & Access', ids: ['users', 'access-matrix'] },
  { label: 'Operations', ids: ['shifts', 'checklists', 'checklist-allocation'] },
  { label: 'Monitoring', ids: ['incidents', 'sos', 'live-tracking', 'escalation'] },
  { label: 'Intelligence', ids: ['analytics', 'audit'] },
  { label: 'Configuration', ids: ['white-label', 'localization', 'settings'] },
]

export const Sidebar: React.FC = () => {
  const { sidebarCollapsed, toggleSidebar } = useAppStore()
  const location = useLocation()
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  return (
    <motion.aside
      animate={{ width: sidebarCollapsed ? 72 : 260 }}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
      className="relative flex flex-col h-full bg-white dark:bg-gray-950 border-r border-gray-100 dark:border-gray-800 shrink-0 overflow-hidden"
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 h-16 border-b border-gray-100 dark:border-gray-800 shrink-0">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-600 shadow-sm">
          <Shield className="h-5 w-5 text-white" />
        </div>
        <AnimatePresence>
          {!sidebarCollapsed && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }} className="overflow-hidden">
              <p className="text-sm font-bold text-gray-900 dark:text-white whitespace-nowrap leading-tight">PatrolIQ</p>
              <p className="text-[11px] text-gray-400 whitespace-nowrap">Super Admin Console</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-3">
        {NAV_GROUPS.map((group) => {
          const items = NAV_ITEMS.filter(i => (group.ids as readonly string[]).includes(i.id))
          return (
            <div key={group.label}>
              {!sidebarCollapsed && (
                <p className="px-3 mb-1 text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-600">
                  {group.label}
                </p>
              )}
              {sidebarCollapsed && <div className="mb-1 h-px bg-gray-100 dark:bg-gray-800" />}
              <div className="space-y-0.5">
                {items.map((item) => {
                  const Icon = ICON_MAP[item.icon]
                  const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path))
                  return (
                    <div key={item.id} className="relative" onMouseEnter={() => setHoveredItem(item.id)} onMouseLeave={() => setHoveredItem(null)}>
                      <NavLink
                        to={item.path}
                        className={cn(
                          'flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all duration-150 group',
                          isActive
                            ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800'
                        )}
                      >
                        {Icon && (
                          <Icon className={cn('h-[18px] w-[18px] shrink-0 transition-colors',
                            isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'
                          )} />
                        )}
                        <AnimatePresence>
                          {!sidebarCollapsed && (
                            <motion.span
                              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                              transition={{ duration: 0.1 }}
                              className="whitespace-nowrap overflow-hidden text-ellipsis flex-1"
                            >
                              {item.label}
                            </motion.span>
                          )}
                        </AnimatePresence>
                        {isActive && !sidebarCollapsed && (
                          <span className="ml-auto h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0" />
                        )}
                      </NavLink>
                      {/* Tooltip when collapsed */}
                      {sidebarCollapsed && hoveredItem === item.id && (
                        <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 z-50 pointer-events-none">
                          <div className="bg-gray-900 text-white text-xs rounded-lg px-3 py-1.5 whitespace-nowrap shadow-xl">
                            {item.label}
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </nav>

      {/* Collapse Toggle */}
      <div className="p-3 border-t border-gray-100 dark:border-gray-800">
        <button
          onClick={toggleSidebar}
          className={cn(
            'flex h-9 w-full items-center rounded-lg text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors',
            sidebarCollapsed ? 'justify-center' : 'justify-start gap-2 px-3'
          )}
        >
          {sidebarCollapsed
            ? <ChevronRight className="h-4 w-4" />
            : <><ChevronLeft className="h-4 w-4" /><span className="text-xs">Collapse sidebar</span></>
          }
        </button>
      </div>
    </motion.aside>
  )
}
