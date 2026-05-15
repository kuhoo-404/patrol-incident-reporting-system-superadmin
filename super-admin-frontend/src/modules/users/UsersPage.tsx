import React, { useState } from 'react'
import { Plus, Search, Filter, Edit2, Trash2, Smartphone, Circle } from 'lucide-react'
import { motion } from 'framer-motion'
import { Card, CardContent, Badge, Button, Input, Drawer, Avatar, Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui'
import { mockUsers } from '@/services/mock/data'
import { User } from '@/types'
import { STATUS_COLORS } from '@/constants'
import { cn, timeAgo, formatDate } from '@/utils'

const ROLE_COLORS: Record<string, string> = {
  super_admin: 'bg-purple-100 text-purple-700 border-purple-200',
  company_admin: 'bg-blue-100 text-blue-700 border-blue-200',
  regional_manager: 'bg-indigo-100 text-indigo-700 border-indigo-200',
  site_manager: 'bg-teal-100 text-teal-700 border-teal-200',
  supervisor: 'bg-green-100 text-green-700 border-green-200',
  patrol_officer: 'bg-amber-100 text-amber-700 border-amber-200',
  guard: 'bg-gray-100 text-gray-700 border-gray-200',
}

const DEVICE_COLORS: Record<string, string> = { bound: 'text-green-500', unbound: 'text-amber-500', inactive: 'text-gray-300' }

export default function UsersPage() {
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [showAdd, setShowAdd] = useState(false)

  const filtered = mockUsers.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.employeeId.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
    const matchRole = roleFilter === 'all' || u.role === roleFilter
    return matchSearch && matchRole
  })

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">User & Role Management</h1>
          <p className="text-sm text-gray-500 mt-0.5">{mockUsers.length} total users across all companies</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><Filter className="h-4 w-4" /> Bulk Upload</Button>
          <Button onClick={() => setShowAdd(true)}><Plus className="h-4 w-4" /> Add User</Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: 'Total Users', value: mockUsers.length },
          { label: 'Active', value: mockUsers.filter(u => u.status === 'active').length },
          { label: 'Devices Bound', value: mockUsers.filter(u => u.deviceStatus === 'bound').length },
          { label: 'Inactive', value: mockUsers.filter(u => u.status === 'inactive').length },
        ].map(s => (
          <Card key={s.label} className="p-4">
            <p className="text-xs text-gray-500">{s.label}</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{s.value}</p>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input placeholder="Search users…" value={search} onChange={e => setSearch(e.target.value)} className="pl-8 w-64" />
        </div>
        <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)} className="h-9 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="all">All Roles</option>
          {Object.keys(ROLE_COLORS).map(r => <option key={r} value={r}>{r.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}</option>)}
        </select>
        <Badge variant="outline">{filtered.length} results</Badge>
      </div>

      {/* Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Employee ID</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Device</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Seen</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((user, i) => (
              <TableRow key={user.id} className="cursor-pointer" onClick={() => setSelectedUser(user)}>
                <TableCell>
                  <div className="flex items-center gap-2.5">
                    <Avatar name={user.name} size="sm" />
                    <div>
                      <p className="text-xs font-semibold text-gray-900">{user.name}</p>
                      <p className="text-[10px] text-gray-400">{user.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell><span className="font-mono text-xs">{user.employeeId}</span></TableCell>
                <TableCell>
                  <span className={cn('inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] font-semibold', ROLE_COLORS[user.role])}>
                    {user.role.replace(/_/g, ' ')}
                  </span>
                </TableCell>
                <TableCell><span className="text-xs">{user.companyName}</span></TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5">
                    <Smartphone className={cn('h-3.5 w-3.5', DEVICE_COLORS[user.deviceStatus])} />
                    <span className="text-xs text-gray-500 capitalize">{user.deviceStatus}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className={cn('inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium', STATUS_COLORS[user.status])}>
                    {user.status}
                  </span>
                </TableCell>
                <TableCell><span className="text-xs text-gray-500">{timeAgo(user.lastSeen)}</span></TableCell>
                <TableCell>
                  <div className="flex gap-1" onClick={e => e.stopPropagation()}>
                    <button className="p-1 text-gray-400 hover:text-blue-600 rounded"><Edit2 className="h-3.5 w-3.5" /></button>
                    <button className="p-1 text-gray-400 hover:text-red-600 rounded"><Trash2 className="h-3.5 w-3.5" /></button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* User Detail Drawer */}
      <Drawer open={!!selectedUser} onClose={() => setSelectedUser(null)} title="User Profile">
        {selectedUser && (
          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <Avatar name={selectedUser.name} size="lg" />
              <div>
                <h2 className="text-base font-bold text-gray-900">{selectedUser.name}</h2>
                <span className={cn('inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-semibold mt-1', ROLE_COLORS[selectedUser.role])}>
                  {selectedUser.role.replace(/_/g, ' ')}
                </span>
              </div>
            </div>
            <div className="space-y-2">
              {[
                { label: 'Employee ID', value: selectedUser.employeeId },
                { label: 'Email', value: selectedUser.email },
                { label: 'Phone', value: selectedUser.phone },
                { label: 'Company', value: selectedUser.companyName },
                { label: 'Status', value: selectedUser.status },
                { label: 'Device', value: selectedUser.deviceStatus },
                { label: 'Joined', value: formatDate(selectedUser.createdAt) },
                { label: 'Last Seen', value: timeAgo(selectedUser.lastSeen) },
              ].map(d => (
                <div key={d.label} className="flex justify-between py-2 border-b border-gray-50 text-sm">
                  <span className="text-gray-500">{d.label}</span>
                  <span className="font-medium text-gray-900">{d.value}</span>
                </div>
              ))}
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 mb-2">ACTIVITY TIMELINE</p>
              <div className="space-y-2">
                {[
                  { action: 'Login from mobile device', time: '2h ago' },
                  { action: 'Completed patrol checklist', time: '3h ago' },
                  { action: 'Incident reported: Gate B breach', time: '5h ago' },
                ].map((a, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <div className="mt-1 h-2 w-2 rounded-full bg-blue-400 shrink-0" />
                    <div>
                      <p className="text-xs text-gray-700">{a.action}</p>
                      <p className="text-[10px] text-gray-400">{a.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1"><Edit2 className="h-4 w-4" /> Edit User</Button>
              <Button variant="destructive" className="flex-1"><Trash2 className="h-4 w-4" /> Remove</Button>
            </div>
          </div>
        )}
      </Drawer>

      {/* Add User Drawer */}
      <Drawer open={showAdd} onClose={() => setShowAdd(false)} title="Add New User">
        <div className="space-y-4">
          {[
            { label: 'Full Name', placeholder: 'John Doe' },
            { label: 'Employee ID', placeholder: 'EMP0001' },
            { label: 'Email', placeholder: 'john@company.com' },
            { label: 'Phone', placeholder: '+91-XXXXXXXXXX' },
          ].map(f => (
            <div key={f.label} className="space-y-1.5">
              <label className="text-xs font-medium text-gray-700">{f.label}</label>
              <Input placeholder={f.placeholder} />
            </div>
          ))}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-700">Role</label>
            <select className="flex h-9 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              {Object.keys(ROLE_COLORS).map(r => <option key={r} value={r}>{r.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}</option>)}
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-700">Assign Company</label>
            <select className="flex h-9 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Securitas India Pvt Ltd</option>
              <option>G4S Security Solutions</option>
              <option>SIS Limited</option>
            </select>
          </div>
          <div className="flex gap-2 pt-2">
            <Button variant="outline" className="flex-1" onClick={() => setShowAdd(false)}>Cancel</Button>
            <Button className="flex-1" onClick={() => setShowAdd(false)}>Create User</Button>
          </div>
        </div>
      </Drawer>
    </div>
  )
}
