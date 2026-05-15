import React, { useState } from 'react'
import { Calendar, Clock, Plus, AlertTriangle, Users, MapPin } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, Button, Badge, Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui'
import { cn } from '@/utils'

const SHIFTS = [
  { id: 'sh1', name: 'Morning Alpha', type: 'morning', start: '06:00', end: '14:00', site: 'Manyata Tech Park', company: 'Securitas India', officers: 8, status: 'active' },
  { id: 'sh2', name: 'Afternoon Bravo', type: 'afternoon', start: '14:00', end: '22:00', site: 'Manyata Tech Park', company: 'Securitas India', officers: 6, status: 'active' },
  { id: 'sh3', name: 'Night Charlie', type: 'night', start: '22:00', end: '06:00', site: 'Manyata Tech Park', company: 'Securitas India', officers: 4, status: 'active' },
  { id: 'sh4', name: 'General Shift', type: 'general', start: '09:00', end: '18:00', site: 'BKC Corporate Tower', company: 'G4S Security', officers: 5, status: 'active' },
  { id: 'sh5', name: 'Night Watch', type: 'night', start: '20:00', end: '08:00', site: 'Hitec City Campus', company: 'TopSecurity Corp', officers: 7, status: 'inactive' },
]
const SHIFT_COLORS: Record<string, string> = { morning: 'bg-amber-50 text-amber-700 border-amber-200', afternoon: 'bg-blue-50 text-blue-700 border-blue-200', night: 'bg-indigo-50 text-indigo-700 border-indigo-200', general: 'bg-gray-50 text-gray-700 border-gray-200' }
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export default function ShiftsPage() {
  const [view, setView] = useState<'table' | 'calendar'>('table')
  const [showAdd, setShowAdd] = useState(false)

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Shift & Site Management</h1>
          <p className="text-sm text-gray-500 mt-0.5">{SHIFTS.length} shifts configured across {3} sites</p>
        </div>
        <div className="flex gap-2">
          <div className="flex rounded-lg border border-gray-200 overflow-hidden">
            {(['table', 'calendar'] as const).map(v => (
              <button key={v} onClick={() => setView(v)} className={cn('px-3 py-1.5 text-xs font-medium capitalize transition-colors', view === v ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50')}>
                {v}
              </button>
            ))}
          </div>
          <Button onClick={() => setShowAdd(true)}><Plus className="h-4 w-4" /> Add Shift</Button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {[
          { label: 'Total Shifts', value: SHIFTS.length },
          { label: 'Active Shifts', value: SHIFTS.filter(s => s.status === 'active').length },
          { label: 'Total Officers On Duty', value: SHIFTS.filter(s => s.status === 'active').reduce((a, s) => a + s.officers, 0) },
          { label: 'Sites Covered', value: 3 },
        ].map(s => (
          <Card key={s.label} className="p-4">
            <p className="text-xs text-gray-500">{s.label}</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{s.value}</p>
          </Card>
        ))}
      </div>

      {view === 'table' ? (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Shift Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Timing</TableHead>
                <TableHead>Site</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Officers</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {SHIFTS.map(s => (
                <TableRow key={s.id}>
                  <TableCell><span className="font-medium text-gray-900">{s.name}</span></TableCell>
                  <TableCell><span className={cn('inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium capitalize', SHIFT_COLORS[s.type])}>{s.type}</span></TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-xs">
                      <Clock className="h-3.5 w-3.5 text-gray-400" />{s.start} – {s.end}
                    </div>
                  </TableCell>
                  <TableCell><div className="flex items-center gap-1 text-xs"><MapPin className="h-3.5 w-3.5 text-gray-400" />{s.site}</div></TableCell>
                  <TableCell><span className="text-xs">{s.company}</span></TableCell>
                  <TableCell><div className="flex items-center gap-1 text-xs"><Users className="h-3.5 w-3.5 text-gray-400" />{s.officers}</div></TableCell>
                  <TableCell><Badge variant={s.status === 'active' ? 'success' : 'default'}>{s.status}</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      ) : (
        <Card>
          <CardContent className="pt-5">
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left text-gray-500 font-semibold w-40">Shift</th>
                    {DAYS.map(d => <th key={d} className="px-4 py-2 text-center text-gray-500 font-semibold">{d}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {SHIFTS.map(s => (
                    <tr key={s.id} className="border-t border-gray-50">
                      <td className="px-4 py-3">
                        <p className="font-medium text-gray-800">{s.name}</p>
                        <p className="text-gray-400">{s.start}–{s.end}</p>
                      </td>
                      {DAYS.map(d => (
                        <td key={d} className="px-4 py-3 text-center">
                          {s.status === 'active' && (d !== 'Sun' || s.type === 'night') ? (
                            <div className={cn('rounded-md px-2 py-1 text-[10px] font-semibold cursor-pointer hover:opacity-80', SHIFT_COLORS[s.type])}>
                              {s.officers} Off.
                            </div>
                          ) : (
                            <span className="text-gray-200">—</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
