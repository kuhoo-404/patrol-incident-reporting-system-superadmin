import { Company, Incident, SosEvent, User, Site, AuditLog, Notification } from '@/types'

export const mockCompanies: Company[] = [
  { id: 'c1', name: 'Securitas India Pvt Ltd', industry: 'Security Services', primaryColor: '#2563eb', email: 'admin@securitas.in', phone: '+91-9800001111', address: '14 MG Road', city: 'Bengaluru', state: 'Karnataka', status: 'active', regionsCount: 4, sitesCount: 28, usersCount: 342, createdAt: '2023-01-10', updatedAt: '2024-04-01', contractExpiry: '2026-12-31', plan: 'enterprise' },
  { id: 'c2', name: 'G4S Security Solutions', industry: 'Security Services', primaryColor: '#dc2626', email: 'admin@g4s.in', phone: '+91-9800002222', address: '7 Brigade Road', city: 'Mumbai', state: 'Maharashtra', status: 'active', regionsCount: 3, sitesCount: 19, usersCount: 210, createdAt: '2023-03-15', updatedAt: '2024-03-20', contractExpiry: '2025-11-30', plan: 'professional' },
  { id: 'c3', name: 'SIS Limited', industry: 'Facility Management', primaryColor: '#16a34a', email: 'admin@sisindia.com', phone: '+91-9800003333', address: '22 Park Street', city: 'Kolkata', state: 'West Bengal', status: 'active', regionsCount: 2, sitesCount: 14, usersCount: 178, createdAt: '2023-05-20', updatedAt: '2024-02-18', contractExpiry: '2026-06-30', plan: 'enterprise' },
  { id: 'c4', name: 'TopSecurity Corp', industry: 'Corporate Security', primaryColor: '#7c3aed', email: 'admin@topsec.in', phone: '+91-9800004444', address: '5 IT Park', city: 'Hyderabad', state: 'Telangana', status: 'active', regionsCount: 2, sitesCount: 10, usersCount: 95, createdAt: '2023-07-01', updatedAt: '2024-01-10', contractExpiry: '2025-09-30', plan: 'professional' },
  { id: 'c5', name: 'Allied Security Services', industry: 'Industrial Security', primaryColor: '#ea580c', email: 'admin@allied.in', phone: '+91-9800005555', address: '9 GIDC', city: 'Ahmedabad', state: 'Gujarat', status: 'inactive', regionsCount: 1, sitesCount: 6, usersCount: 48, createdAt: '2023-09-12', updatedAt: '2024-04-05', contractExpiry: '2025-03-31', plan: 'starter' },
  { id: 'c6', name: 'Warden Security Pvt Ltd', industry: 'Residential Security', primaryColor: '#0891b2', email: 'admin@warden.in', phone: '+91-9800006666', address: '18 Civil Lines', city: 'Delhi', state: 'Delhi', status: 'active', regionsCount: 3, sitesCount: 22, usersCount: 189, createdAt: '2022-11-05', updatedAt: '2024-04-10', contractExpiry: '2026-11-30', plan: 'enterprise' },
]

export const mockSites: Site[] = [
  { id: 's1', name: 'Manyata Tech Park', cityId: 'city1', companyId: 'c1', type: 'campus', lat: 13.0475, lng: 77.6209, address: 'Outer Ring Road, Bangalore', status: 'active', officersCount: 24, shiftCount: 3 },
  { id: 's2', name: 'Whitefield IT Hub', cityId: 'city1', companyId: 'c1', type: 'campus', lat: 12.9698, lng: 77.7499, address: 'Whitefield, Bangalore', status: 'active', officersCount: 18, shiftCount: 3 },
  { id: 's3', name: 'BKC Corporate Tower', cityId: 'city2', companyId: 'c2', type: 'building', lat: 19.0665, lng: 72.8688, address: 'Bandra Kurla Complex, Mumbai', status: 'active', officersCount: 12, shiftCount: 2 },
  { id: 's4', name: 'Nariman Point Office', cityId: 'city2', companyId: 'c2', type: 'building', lat: 18.9252, lng: 72.8215, address: 'Nariman Point, Mumbai', status: 'active', officersCount: 8, shiftCount: 2 },
  { id: 's5', name: 'Hitec City Campus', cityId: 'city3', companyId: 'c4', type: 'campus', lat: 17.4435, lng: 78.3772, address: 'Hitec City, Hyderabad', status: 'active', officersCount: 20, shiftCount: 3 },
  { id: 's6', name: 'Salt Lake Sector V', cityId: 'city4', companyId: 'c3', type: 'zone', lat: 22.5804, lng: 88.4317, address: 'Salt Lake, Kolkata', status: 'active', officersCount: 15, shiftCount: 3 },
]

export const mockUsers: User[] = [
  { id: 'u1', employeeId: 'EMP001', name: 'Rajesh Kumar', email: 'rajesh.kumar@securitas.in', phone: '+91-9811001001', role: 'company_admin', companyId: 'c1', companyName: 'Securitas India', siteIds: ['s1','s2'], status: 'active', deviceStatus: 'bound', lastSeen: new Date(Date.now()-3600000).toISOString(), createdAt: '2023-01-15' },
  { id: 'u2', employeeId: 'EMP002', name: 'Priya Sharma', email: 'priya.sharma@securitas.in', phone: '+91-9811002002', role: 'regional_manager', companyId: 'c1', companyName: 'Securitas India', siteIds: ['s1'], status: 'active', deviceStatus: 'bound', lastSeen: new Date(Date.now()-7200000).toISOString(), createdAt: '2023-02-10' },
  { id: 'u3', employeeId: 'EMP003', name: 'Amit Singh', email: 'amit.singh@securitas.in', phone: '+91-9811003003', role: 'supervisor', companyId: 'c1', companyName: 'Securitas India', siteIds: ['s1'], status: 'active', deviceStatus: 'bound', lastSeen: new Date(Date.now()-1800000).toISOString(), createdAt: '2023-03-05' },
  { id: 'u4', employeeId: 'EMP004', name: 'Suresh Patel', email: 'suresh.patel@g4s.in', phone: '+91-9811004004', role: 'company_admin', companyId: 'c2', companyName: 'G4S Security', siteIds: ['s3','s4'], status: 'active', deviceStatus: 'bound', lastSeen: new Date(Date.now()-900000).toISOString(), createdAt: '2023-03-20' },
  { id: 'u5', employeeId: 'EMP005', name: 'Meera Nair', email: 'meera.nair@g4s.in', phone: '+91-9811005005', role: 'site_manager', companyId: 'c2', companyName: 'G4S Security', siteIds: ['s3'], status: 'active', deviceStatus: 'unbound', lastSeen: new Date(Date.now()-86400000).toISOString(), createdAt: '2023-04-01' },
  { id: 'u6', employeeId: 'EMP006', name: 'Ravi Verma', email: 'ravi.verma@sis.in', phone: '+91-9811006006', role: 'patrol_officer', companyId: 'c3', companyName: 'SIS Limited', siteIds: ['s6'], status: 'active', deviceStatus: 'bound', lastSeen: new Date(Date.now()-600000).toISOString(), createdAt: '2023-05-25' },
  { id: 'u7', employeeId: 'EMP007', name: 'Deepa Krishnan', email: 'deepa.k@topsec.in', phone: '+91-9811007007', role: 'supervisor', companyId: 'c4', companyName: 'TopSecurity Corp', siteIds: ['s5'], status: 'inactive', deviceStatus: 'inactive', lastSeen: new Date(Date.now()-604800000).toISOString(), createdAt: '2023-07-10' },
  { id: 'u8', employeeId: 'EMP008', name: 'Vikram Reddy', email: 'vikram.r@topsec.in', phone: '+91-9811008008', role: 'patrol_officer', companyId: 'c4', companyName: 'TopSecurity Corp', siteIds: ['s5'], status: 'active', deviceStatus: 'bound', lastSeen: new Date(Date.now()-300000).toISOString(), createdAt: '2023-08-01' },
]

export const mockIncidents: Incident[] = [
  { id: 'i1', ticketNo: 'INC-2024-001', title: 'Unauthorized Access at Gate B', description: 'Unknown individual attempted to breach Gate B security perimeter at Manyata Tech Park.', severity: 'high', status: 'under_investigation', companyId: 'c1', companyName: 'Securitas India', siteId: 's1', siteName: 'Manyata Tech Park', reportedBy: 'Amit Singh', assignedTo: 'Rajesh Kumar', lat: 13.0475, lng: 77.6209, createdAt: new Date(Date.now()-3600000).toISOString(), updatedAt: new Date(Date.now()-1800000).toISOString(), slaDeadline: new Date(Date.now()+3600000).toISOString(), slaBreached: false, category: 'Security Breach', evidenceCount: 3 },
  { id: 'i2', ticketNo: 'INC-2024-002', title: 'Fire Alarm Triggered — Floor 7', description: 'Fire alarm triggered at BKC Corporate Tower Floor 7. Evacuation in progress.', severity: 'critical', status: 'open', companyId: 'c2', companyName: 'G4S Security', siteId: 's3', siteName: 'BKC Corporate Tower', reportedBy: 'Suresh Patel', lat: 19.0665, lng: 72.8688, createdAt: new Date(Date.now()-900000).toISOString(), updatedAt: new Date(Date.now()-600000).toISOString(), slaDeadline: new Date(Date.now()+1800000).toISOString(), slaBreached: false, category: 'Fire Emergency', evidenceCount: 1 },
  { id: 'i3', ticketNo: 'INC-2024-003', title: 'Patrol Officer No-Show — Night Shift', description: 'Patrol officer Ravi Verma did not report for night shift at Salt Lake Sector V.', severity: 'medium', status: 'open', companyId: 'c3', companyName: 'SIS Limited', siteId: 's6', siteName: 'Salt Lake Sector V', reportedBy: 'System Auto', lat: 22.5804, lng: 88.4317, createdAt: new Date(Date.now()-7200000).toISOString(), updatedAt: new Date(Date.now()-7200000).toISOString(), slaDeadline: new Date(Date.now()-3600000).toISOString(), slaBreached: true, category: 'Attendance', evidenceCount: 0 },
  { id: 'i4', ticketNo: 'INC-2024-004', title: 'Vandalism in Parking Zone C', description: 'Multiple vehicles scratched in Parking Zone C during morning hours.', severity: 'medium', status: 'resolved', companyId: 'c4', companyName: 'TopSecurity Corp', siteId: 's5', siteName: 'Hitec City Campus', reportedBy: 'Vikram Reddy', lat: 17.4435, lng: 78.3772, createdAt: new Date(Date.now()-86400000).toISOString(), updatedAt: new Date(Date.now()-43200000).toISOString(), resolvedAt: new Date(Date.now()-43200000).toISOString(), slaDeadline: new Date(Date.now()-72000000).toISOString(), slaBreached: false, category: 'Vandalism', evidenceCount: 5 },
  { id: 'i5', ticketNo: 'INC-2024-005', title: 'CCTV Outage — Block D', description: 'CCTV cameras in Block D offline for more than 2 hours. Maintenance requested.', severity: 'low', status: 'closed', companyId: 'c1', companyName: 'Securitas India', siteId: 's2', siteName: 'Whitefield IT Hub', reportedBy: 'Priya Sharma', lat: 12.9698, lng: 77.7499, createdAt: new Date(Date.now()-172800000).toISOString(), updatedAt: new Date(Date.now()-86400000).toISOString(), resolvedAt: new Date(Date.now()-86400000).toISOString(), slaDeadline: new Date(Date.now()-144000000).toISOString(), slaBreached: false, category: 'Equipment Failure', evidenceCount: 2 },
  { id: 'i6', ticketNo: 'INC-2024-006', title: 'Suspicious Package at Reception', description: 'Unattended bag found at main reception. Bomb disposal team notified.', severity: 'critical', status: 'under_investigation', companyId: 'c6', companyName: 'Warden Security', siteId: 's3', siteName: 'BKC Corporate Tower', reportedBy: 'Security Guard', lat: 19.0665, lng: 72.8688, createdAt: new Date(Date.now()-1800000).toISOString(), updatedAt: new Date(Date.now()-900000).toISOString(), slaDeadline: new Date(Date.now()+900000).toISOString(), slaBreached: false, category: 'Threat', evidenceCount: 4 },
]

export const mockSosEvents: SosEvent[] = [
  { id: 'sos1', officerId: 'u3', officerName: 'Amit Singh', companyId: 'c1', companyName: 'Securitas India', siteId: 's1', siteName: 'Manyata Tech Park', status: 'active', lat: 13.0465, lng: 77.6195, triggeredAt: new Date(Date.now()-1200000).toISOString(), escalationLevel: 2 },
  { id: 'sos2', officerId: 'u6', officerName: 'Ravi Verma', companyId: 'c3', companyName: 'SIS Limited', siteId: 's6', siteName: 'Salt Lake Sector V', status: 'acknowledged', lat: 22.5814, lng: 88.4327, triggeredAt: new Date(Date.now()-3600000).toISOString(), acknowledgedAt: new Date(Date.now()-3000000).toISOString(), acknowledgedBy: 'Rajesh Kumar', escalationLevel: 1 },
  { id: 'sos3', officerId: 'u8', officerName: 'Vikram Reddy', companyId: 'c4', companyName: 'TopSecurity Corp', siteId: 's5', siteName: 'Hitec City Campus', status: 'resolved', lat: 17.4440, lng: 78.3780, triggeredAt: new Date(Date.now()-7200000).toISOString(), acknowledgedAt: new Date(Date.now()-7000000).toISOString(), resolvedAt: new Date(Date.now()-6000000).toISOString(), acknowledgedBy: 'Deepa Krishnan', escalationLevel: 1 },
]

export const mockAuditLogs: AuditLog[] = [
  { id: 'a1', userId: 'u1', userName: 'Rajesh Kumar', userRole: 'company_admin', action: 'UPDATE', module: 'User Management', description: 'Updated user role for EMP005 from patrol_officer to supervisor', before: { role: 'patrol_officer' }, after: { role: 'supervisor' }, ipAddress: '192.168.1.42', createdAt: new Date(Date.now()-3600000).toISOString(), severity: 'warning' },
  { id: 'a2', userId: 'u4', userName: 'Suresh Patel', userRole: 'company_admin', action: 'CREATE', module: 'Incident Hub', description: 'Created new incident INC-2024-002 with severity CRITICAL', ipAddress: '10.0.0.15', createdAt: new Date(Date.now()-900000).toISOString(), severity: 'critical' },
  { id: 'a3', userId: 'u2', userName: 'Priya Sharma', userRole: 'regional_manager', action: 'DELETE', module: 'Checklist Builder', description: 'Deleted checklist "Morning Patrol Round v3" (archived)', before: { status: 'archived' }, ipAddress: '172.16.0.8', createdAt: new Date(Date.now()-7200000).toISOString(), severity: 'warning' },
  { id: 'a4', userId: 'u1', userName: 'Rajesh Kumar', userRole: 'company_admin', action: 'LOGIN', module: 'Authentication', description: 'Super admin login from new device/location', ipAddress: '203.101.44.22', createdAt: new Date(Date.now()-86400000).toISOString(), severity: 'info' },
  { id: 'a5', userId: 'u6', userName: 'Ravi Verma', userRole: 'patrol_officer', action: 'SOS_TRIGGER', module: 'SOS Monitoring', description: 'SOS alert triggered at Salt Lake Sector V', ipAddress: 'mobile', createdAt: new Date(Date.now()-3600000).toISOString(), severity: 'critical' },
  { id: 'a6', userId: 'u4', userName: 'Suresh Patel', userRole: 'company_admin', action: 'EXPORT', module: 'Reports', description: 'Exported monthly compliance report for April 2024', ipAddress: '10.0.0.15', createdAt: new Date(Date.now()-172800000).toISOString(), severity: 'info' },
]

export const mockNotifications: Notification[] = [
  { id: 'n1', title: 'Active SOS Alert', message: 'Amit Singh triggered SOS at Manyata Tech Park', type: 'sos', read: false, createdAt: new Date(Date.now()-1200000).toISOString(), actionUrl: '/sos' },
  { id: 'n2', title: 'Critical Incident Opened', message: 'Fire alarm at BKC Corporate Tower — requires attention', type: 'incident', read: false, createdAt: new Date(Date.now()-900000).toISOString(), actionUrl: '/incidents' },
  { id: 'n3', title: 'SLA Breach Warning', message: 'Incident INC-2024-003 is approaching SLA deadline', type: 'escalation', read: false, createdAt: new Date(Date.now()-3600000).toISOString(), actionUrl: '/incidents' },
  { id: 'n4', title: 'New Company Onboarded', message: 'Warden Security Pvt Ltd successfully activated', type: 'system', read: true, createdAt: new Date(Date.now()-86400000).toISOString() },
  { id: 'n5', title: 'System Update', message: 'Platform updated to v2.4.1 — see release notes', type: 'info', read: true, createdAt: new Date(Date.now()-172800000).toISOString() },
]

export const dashboardKpis = {
  activeCompanies: 5,
  activeOfficers: 347,
  openIncidents: 3,
  activeSos: 1,
  escalatedTickets: 4,
  checklistCompletion: 87,
  slaBreaches: 2,
  activeSites: 89,
}

export const patrolTrendData = [
  { month: 'Nov', completion: 78, incidents: 12 },
  { month: 'Dec', completion: 82, incidents: 9 },
  { month: 'Jan', completion: 80, incidents: 14 },
  { month: 'Feb', completion: 85, incidents: 8 },
  { month: 'Mar', completion: 88, incidents: 6 },
  { month: 'Apr', completion: 87, incidents: 7 },
]

export const companyPerformanceData = [
  { name: 'Securitas', compliance: 92, incidents: 8, sos: 1 },
  { name: 'G4S', compliance: 85, incidents: 12, sos: 2 },
  { name: 'SIS Ltd', compliance: 88, incidents: 6, sos: 0 },
  { name: 'TopSec', compliance: 79, incidents: 15, sos: 3 },
  { name: 'Allied', compliance: 71, incidents: 20, sos: 1 },
  { name: 'Warden', compliance: 90, incidents: 5, sos: 0 },
]

export const incidentCategoryData = [
  { name: 'Security Breach', value: 28 },
  { name: 'Attendance', value: 22 },
  { name: 'Equipment', value: 18 },
  { name: 'Vandalism', value: 15 },
  { name: 'Fire/Emergency', value: 10 },
  { name: 'Other', value: 7 },
]
