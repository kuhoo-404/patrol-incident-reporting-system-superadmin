import React, { useState, useRef, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Search, Bell, Sun, Moon, ChevronDown, LogOut, User, Settings, Shield } from 'lucide-react'
import { cn, timeAgo } from '@/utils'
import { useAppStore } from '@/store/appStore'
import { NAV_ITEMS } from '@/constants'
import { Avatar } from '@/components/ui'

const BREADCRUMB_MAP: Record<string, string> = Object.fromEntries(NAV_ITEMS.map(i => [i.path, i.label]))

export const Navbar: React.FC = () => {
  const { darkMode, toggleDarkMode, notifications, markAllRead, markNotificationRead } = useAppStore()
  const location = useLocation()
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const notifRef = useRef<HTMLDivElement>(null)
  const profileRef = useRef<HTMLDivElement>(null)

  const unreadCount = notifications.filter(n => !n.read).length

  const segments = location.pathname.split('/').filter(Boolean)
  const breadcrumbs = [
    { label: 'Home', path: '/' },
    ...segments.map((seg, i) => ({
      label: BREADCRUMB_MAP[`/${seg}`] ?? seg.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
      path: '/' + segments.slice(0, i + 1).join('/'),
    })),
  ]

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setShowNotifications(false)
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setShowProfile(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const notifTypeColor: Record<string, string> = {
    sos: 'text-red-500', incident: 'text-orange-500', escalation: 'text-amber-500',
    system: 'text-blue-500', info: 'text-gray-400',
  }

  return (
    <header className="flex h-16 items-center justify-between px-6 bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800 shrink-0 z-30">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm">
        {breadcrumbs.map((crumb, i) => (
          <React.Fragment key={crumb.path}>
            {i > 0 && <span className="text-gray-300 text-base leading-none">/</span>}
            <span className={cn(
              'font-medium',
              i === breadcrumbs.length - 1
                ? 'text-gray-900 dark:text-gray-100'
                : 'text-gray-400 hover:text-gray-600 cursor-pointer transition-colors'
            )}>
              {crumb.label}
            </span>
          </React.Fragment>
        ))}
      </nav>

      {/* Right Controls */}
      <div className="flex items-center gap-1.5">
        {/* Search */}
        <div className="relative hidden md:block mr-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            placeholder="Search anything…"
            className="h-9 w-60 rounded-lg border border-gray-200 bg-gray-50 pl-9 pr-4 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
          />
        </div>

        {/* Dark mode */}
        <button
          onClick={toggleDarkMode}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
        >
          {darkMode ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
        </button>

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
          >
            <Bell className="h-[18px] w-[18px]" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white leading-none">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-12 z-50 w-84 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 shadow-2xl overflow-hidden" style={{ width: 340 }}>
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                <div>
                  <span className="text-sm font-semibold text-gray-900">Notifications</span>
                  {unreadCount > 0 && <span className="ml-2 text-xs text-gray-400">{unreadCount} unread</span>}
                </div>
                <button onClick={markAllRead} className="text-xs text-blue-600 hover:text-blue-700 font-medium">Mark all read</button>
              </div>
              <div className="max-h-80 overflow-y-auto divide-y divide-gray-50">
                {notifications.map(n => (
                  <button
                    key={n.id}
                    onClick={() => markNotificationRead(n.id)}
                    className={cn('w-full text-left px-5 py-3.5 hover:bg-gray-50 transition-colors', !n.read && 'bg-blue-50/40')}
                  >
                    <div className="flex items-start gap-3">
                      <span className={cn('mt-1 text-xs', notifTypeColor[n.type] ?? 'text-gray-400')}>●</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-800">{n.title}</p>
                        <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{n.message}</p>
                        <p className="text-[11px] text-gray-400 mt-1">{timeAgo(n.createdAt)}</p>
                      </div>
                      {!n.read && <span className="mt-2 h-2 w-2 rounded-full bg-blue-500 shrink-0" />}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="mx-2 h-6 w-px bg-gray-200" />

        {/* Profile */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 hover:bg-gray-50 transition-colors"
          >
            <Avatar name="Super Admin" size="sm" />
            <div className="hidden md:block text-left">
              <p className="text-[13px] font-semibold text-gray-900 dark:text-gray-100 leading-tight">Super Admin</p>
              <p className="text-[11px] text-gray-400">Platform Owner</p>
            </div>
            <ChevronDown className="h-3.5 w-3.5 text-gray-400" />
          </button>

          {showProfile && (
            <div className="absolute right-0 top-12 z-50 w-56 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 shadow-2xl overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600">
                    <Shield className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Super Admin</p>
                    <p className="text-xs text-gray-400">admin@patroliq.com</p>
                  </div>
                </div>
              </div>
              <div className="py-1">
                {[{ icon: User, label: 'My Profile' }, { icon: Settings, label: 'Preferences' }].map(({ icon: Icon, label }) => (
                  <button key={label} className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                    <Icon className="h-4 w-4 text-gray-400" />{label}
                  </button>
                ))}
              </div>
              <div className="border-t border-gray-100 py-1">
                <button className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors">
                  <LogOut className="h-4 w-4" />Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
