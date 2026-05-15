export const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard', path: '/' },
  { id: 'companies', label: 'Company Management', icon: 'Building2', path: '/companies' },
  { id: 'hierarchy', label: 'Entity Hierarchy', icon: 'GitBranch', path: '/hierarchy' },
  { id: 'users', label: 'User & Role Management', icon: 'Users', path: '/users' },
  { id: 'access-matrix', label: 'Access Matrix', icon: 'ShieldCheck', path: '/access-matrix' },
  { id: 'shifts', label: 'Shift & Site Management', icon: 'Clock', path: '/shifts' },
  { id: 'checklists', label: 'Checklist Builder', icon: 'ClipboardList', path: '/checklists' },
  { id: 'checklist-allocation', label: 'Checklist Allocation', icon: 'ClipboardCheck', path: '/checklist-allocation' },
  { id: 'incidents', label: 'Incident Hub', icon: 'AlertTriangle', path: '/incidents' },
  { id: 'sos', label: 'SOS Monitoring', icon: 'Siren', path: '/sos' },
  { id: 'live-tracking', label: 'Live Tracking', icon: 'MapPin', path: '/live-tracking' },
  { id: 'escalation', label: 'Escalation Matrix', icon: 'TrendingUp', path: '/escalation' },
  { id: 'analytics', label: 'Reports & Analytics', icon: 'BarChart3', path: '/analytics' },
  { id: 'audit', label: 'Audit Logs', icon: 'ScrollText', path: '/audit' },
  { id: 'white-label', label: 'White Labeling', icon: 'Palette', path: '/white-label' },
  { id: 'localization', label: 'Localization', icon: 'Globe', path: '/localization' },
  { id: 'settings', label: 'System Settings', icon: 'Settings', path: '/settings' },
] as const

export const MODULES = [
  'Dashboard', 'Company Management', 'Entity Hierarchy', 'User Management',
  'Access Matrix', 'Shift Management', 'Checklist Builder', 'Incident Hub',
  'SOS Monitoring', 'Live Tracking', 'Reports & Analytics', 'Audit Logs',
  'White Labeling', 'Localization', 'System Settings',
]

export const SEVERITY_COLORS = {
  critical: 'bg-red-100 text-red-700 border-red-200',
  high: 'bg-orange-100 text-orange-700 border-orange-200',
  medium: 'bg-amber-100 text-amber-700 border-amber-200',
  low: 'bg-blue-100 text-blue-700 border-blue-200',
} as const

export const STATUS_COLORS = {
  active: 'bg-green-100 text-green-700 border-green-200',
  inactive: 'bg-gray-100 text-gray-600 border-gray-200',
  pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  suspended: 'bg-red-100 text-red-700 border-red-200',
} as const

export const INCIDENT_STATUS_COLORS = {
  open: 'bg-red-100 text-red-700 border-red-200',
  under_investigation: 'bg-blue-100 text-blue-700 border-blue-200',
  resolved: 'bg-green-100 text-green-700 border-green-200',
  closed: 'bg-gray-100 text-gray-600 border-gray-200',
} as const

export const LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English', active: true },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी', active: true },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', active: false },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', active: false },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', active: false },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', active: false },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', active: false },
  { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ', active: false },
]
