// ============================================================
// GLOBAL TYPES — Super Admin Patrol & Incident Reporting System
// ============================================================

export type Status = 'active' | 'inactive' | 'pending' | 'suspended'
export type Severity = 'critical' | 'high' | 'medium' | 'low'
export type IncidentStatus = 'open' | 'under_investigation' | 'resolved' | 'closed'
export type SosStatus = 'active' | 'acknowledged' | 'resolved' | 'false_alarm'
export type ShiftType = 'morning' | 'afternoon' | 'night' | 'general'

export interface Company {
  id: string
  name: string
  industry: string
  logo?: string
  primaryColor: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  status: Status
  regionsCount: number
  sitesCount: number
  usersCount: number
  createdAt: string
  updatedAt: string
  contractExpiry: string
  plan: 'starter' | 'professional' | 'enterprise'
}

export interface Region {
  id: string
  name: string
  companyId: string
  citiesCount: number
  status: Status
}

export interface City {
  id: string
  name: string
  regionId: string
  campusesCount: number
  status: Status
}

export interface Site {
  id: string
  name: string
  cityId: string
  companyId: string
  type: 'campus' | 'building' | 'zone' | 'facility'
  lat: number
  lng: number
  address: string
  status: Status
  officersCount: number
  shiftCount: number
}

export interface User {
  id: string
  employeeId: string
  name: string
  email: string
  phone: string
  role: UserRole
  companyId: string
  companyName: string
  siteIds: string[]
  managerId?: string
  status: Status
  deviceStatus: 'bound' | 'unbound' | 'inactive'
  lastSeen: string
  createdAt: string
  avatar?: string
}

export type UserRole =
  | 'super_admin'
  | 'company_admin'
  | 'regional_manager'
  | 'site_manager'
  | 'supervisor'
  | 'patrol_officer'
  | 'guard'

export interface Incident {
  id: string
  ticketNo: string
  title: string
  description: string
  severity: Severity
  status: IncidentStatus
  companyId: string
  companyName: string
  siteId: string
  siteName: string
  reportedBy: string
  assignedTo?: string
  lat: number
  lng: number
  createdAt: string
  updatedAt: string
  resolvedAt?: string
  slaDeadline: string
  slaBreached: boolean
  category: string
  evidenceCount: number
}

export interface SosEvent {
  id: string
  officerId: string
  officerName: string
  companyId: string
  companyName: string
  siteId: string
  siteName: string
  status: SosStatus
  lat: number
  lng: number
  triggeredAt: string
  acknowledgedAt?: string
  resolvedAt?: string
  acknowledgedBy?: string
  escalationLevel: number
}

export interface AuditLog {
  id: string
  userId: string
  userName: string
  userRole: string
  action: string
  module: string
  description: string
  before?: Record<string, unknown>
  after?: Record<string, unknown>
  ipAddress: string
  createdAt: string
  severity: 'info' | 'warning' | 'critical'
}

export interface KpiCard {
  label: string
  value: number
  change: number
  changeType: 'increase' | 'decrease' | 'neutral'
  unit?: string
  icon: string
  color: 'blue' | 'green' | 'red' | 'amber' | 'purple' | 'indigo'
}

export interface NavItem {
  id: string
  label: string
  icon: string
  path: string
  badge?: number
  children?: NavItem[]
}

export interface Permission {
  module: string
  read: boolean
  write: boolean
  edit: boolean
  delete: boolean
}

export interface Role {
  id: string
  name: string
  displayName: string
  permissions: Permission[]
  userCount: number
  createdAt: string
}

export interface Checklist {
  id: string
  title: string
  type: 'patrol' | 'occurrence'
  version: number
  status: 'draft' | 'published' | 'archived'
  questions: ChecklistQuestion[]
  companyId: string
  createdAt: string
  updatedAt: string
}

export interface ChecklistQuestion {
  id: string
  order: number
  text: string
  type: 'yes_no_na' | 'numeric' | 'multiple_choice' | 'text'
  options?: string[]
  mandatory: boolean
  requireUpload: boolean
  requireRemark: boolean
  riskScore: number
}

export interface Shift {
  id: string
  name: string
  type: ShiftType
  startTime: string
  endTime: string
  siteId: string
  siteName: string
  companyId: string
  officerCount: number
  status: Status
}

export interface Notification {
  id: string
  title: string
  message: string
  type: 'sos' | 'incident' | 'system' | 'escalation' | 'info'
  read: boolean
  createdAt: string
  actionUrl?: string
}
