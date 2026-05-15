import { create } from 'zustand'
import { Notification } from '@/types'
import { mockNotifications } from '@/services/mock/data'

interface AppState {
  sidebarCollapsed: boolean
  darkMode: boolean
  notifications: Notification[]
  toggleSidebar: () => void
  toggleDarkMode: () => void
  markNotificationRead: (id: string) => void
  markAllRead: () => void
}

export const useAppStore = create<AppState>((set) => ({
  sidebarCollapsed: false,
  darkMode: false,
  notifications: mockNotifications,
  toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
  toggleDarkMode: () => {
    set((s) => {
      const next = !s.darkMode
      if (next) document.documentElement.classList.add('dark')
      else document.documentElement.classList.remove('dark')
      return { darkMode: next }
    })
  },
  markNotificationRead: (id) =>
    set((s) => ({ notifications: s.notifications.map((n) => n.id === id ? { ...n, read: true } : n) })),
  markAllRead: () =>
    set((s) => ({ notifications: s.notifications.map((n) => ({ ...n, read: true })) })),
}))
