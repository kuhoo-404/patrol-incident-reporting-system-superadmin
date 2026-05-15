import React, { useState } from 'react'
import { Search, Filter, AlertTriangle, Clock, Eye, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { Card, CardContent, Button, Badge, Drawer, Input, Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui'
import { mockIncidents } from '@/services/mock/data'
import { Incident } from '@/types'
import { SEVERITY_COLORS, INCIDENT_STATUS_COLORS } from '@/constants'
import { cn, timeAgo, formatDateTime } from '@/utils'

const STATUS_LABELS: Record<string, string> = {
  open: 'Open', under_investigation: 'Investigating', resolved: 'Resolved', closed: 'Closed',
}
const KANBAN_COLS = ['open', 'under_investigation', 'resolved', 'closed'] as const

export default function IncidentsPage() {
  const [view, setView] = useState<'table' | 'kanban'>('table')
  const [search, setSearch] = useState('')
  const [severity, setSeverity] = useState('all')
  const [selected, setSelected] = useState<Incident | null>(null)

  const filtered = mockIncidents.filter(i => {
    const matchSearch = i.title.toLowerCase().includes(search.toLowerCase()) || i.ticketNo.toLowerCase().includes(search.toLowerCase())
    const matchSeverity = severity === 'all' || i.severity === severity
    return matchSearch && matchSeverity
  })

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Incident Hub</h1>
          <p className="text-sm text-gray-500 mt-0.5">{mockIncidents.length} total incidents</p>
        </div>
        <div className="flex gap-2">
          <div className="flex rounded-lg border border-gray-200 overflow-hidden">
            {(['table', 'kanban'] as const).map(v => (
              <button key={v} onClick={() => setView(v)} className={cn('px-3 py-1.5 text-xs font-semibold capitalize transition-colors', view === v ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50')}>
                {v}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: 'Open', value: mockIncidents.filter(i => i.status === 'open').length, color: 'text-red-600' },
          { label: 'Investigating', value: mockIncidents.filter(i => i.status === 'under_investigation').length, color: 'text-blue-600' },
          { label: 'Resolved', value: mockIncidents.filter(i => i.status === 'resolved').length, color: 'text-green-600' },
          { label: 'SLA Breached', value: mockIncidents.filter(i => i.slaBreached).length, color: 'text-red-600' },
        ].map(s => (
          <Card key={s.label} className="p-4">
            <p className="text-xs text-gray-500">{s.label}</p>
            <p className={`text-2xl font-bold mt-1 ${s.color}`}>{s.value}</p>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input placeholder="Search incidents…" value={search} onChange={e => setSearch(e.target.value)} className="pl-8 w-64" />
        </div>
        <select value={severity} onChange={e => setSeverity(e.target.value)} className="h-9 rounded-lg border border-gray-200 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="all">All Severities</option>
          {['critical', 'high', 'medium', 'low'].map(s => <option key={s} value={s} className="capitalize">{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
        </select>
      </div>

      {view === 'table' ? (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ticket</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Site</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>SLA</TableHead>
                <TableHead>Reported</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(inc => (
                <TableRow key={inc.id} className="cursor-pointer" onClick={() => setSelected(inc)}>
                  <TableCell><span className="font-mono text-xs text-blue-600 font-semibold">{inc.ticketNo}</span></TableCell>
                  <TableCell>
                    <div className="max-w-xs">
                      <p className="text-xs font-semibold text-gray-900 truncate">{inc.title}</p>
                      <p className="text-[10px] text-gray-400 truncate">{inc.category}</p>
                    </div>
                  </TableCell>
                  <TableCell><span className={cn('inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium capitalize', SEVERITY_COLORS[inc.severity])}>{inc.severity}</span></TableCell>
                  <TableCell><span className={cn('inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium', INCIDENT_STATUS_COLORS[inc.status])}>{STATUS_LABELS[inc.status]}</span></TableCell>
                  <TableCell><span className="text-xs">{inc.siteName}</span></TableCell>
                  <TableCell><span className="text-xs">{inc.companyName}</span></TableCell>
                  <TableCell>
                    {inc.slaBreached
                      ? <Badge variant="danger" className="text-[10px]">Breached</Badge>
                      : <Badge variant="success" className="text-[10px]">On Track</Badge>}
                  </TableCell>
                  <TableCell><span className="text-xs text-gray-500">{timeAgo(inc.createdAt)}</span></TableCell>
                  <TableCell><button className="p-1 text-gray-400 hover:text-blue-600"><Eye className="h-4 w-4" /></button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      ) : (
        <div className="grid grid-cols-4 gap-4">
          {KANBAN_COLS.map(col => (
            <div key={col} className="space-y-2">
              <div className="flex items-center justify-between px-1">
                <span className={cn('inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-semibold', INCIDENT_STATUS_COLORS[col])}>{STATUS_LABELS[col]}</span>
                <span className="text-xs text-gray-500">{filtered.filter(i => i.status === col).length}</span>
              </div>
              <div className="space-y-2 min-h-32">
                {filtered.filter(i => i.status === col).map(inc => (
                  <motion.div key={inc.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={() => setSelected(inc)}>
                    <Card className="p-3 cursor-pointer card-hover">
                      <div className="flex items-start justify-between mb-1.5">
                        <span className="font-mono text-[10px] text-blue-600 font-semibold">{inc.ticketNo}</span>
                        <span className={cn('inline-flex rounded border px-1.5 py-0.5 text-[9px] font-bold capitalize', SEVERITY_COLORS[inc.severity])}>{inc.severity}</span>
                      </div>
                      <p className="text-xs font-medium text-gray-900 line-clamp-2">{inc.title}</p>
                      <p className="text-[10px] text-gray-500 mt-1">{inc.siteName}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-[10px] text-gray-400">{timeAgo(inc.createdAt)}</span>
                        {inc.slaBreached && <AlertTriangle className="h-3 w-3 text-red-500" />}
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Incident Detail Drawer */}
      <Drawer open={!!selected} onClose={() => setSelected(null)} title="Incident Details">
        {selected && (
          <div className="space-y-5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono text-sm text-blue-600 font-bold">{selected.ticketNo}</span>
              <span className={cn('inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium capitalize', SEVERITY_COLORS[selected.severity])}>{selected.severity}</span>
              <span className={cn('inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium', INCIDENT_STATUS_COLORS[selected.status])}>{STATUS_LABELS[selected.status]}</span>
              {selected.slaBreached && <Badge variant="danger">SLA Breached</Badge>}
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900">{selected.title}</h2>
              <p className="text-sm text-gray-600 mt-1">{selected.description}</p>
            </div>
            <div className="space-y-2">
              {[
                { label: 'Category', value: selected.category },
                { label: 'Site', value: selected.siteName },
                { label: 'Company', value: selected.companyName },
                { label: 'Reported By', value: selected.reportedBy },
                { label: 'Assigned To', value: selected.assignedTo ?? 'Unassigned' },
                { label: 'Reported', value: formatDateTime(selected.createdAt) },
                { label: 'Evidence Files', value: `${selected.evidenceCount} files attached` },
              ].map(d => (
                <div key={d.label} className="flex justify-between text-sm py-2 border-b border-gray-50">
                  <span className="text-gray-500">{d.label}</span>
                  <span className="font-medium text-gray-900">{d.value}</span>
                </div>
              ))}
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 mb-3">TIMELINE</p>
              <div className="space-y-3">
                {[
                  { label: 'Incident Reported', time: selected.createdAt, by: selected.reportedBy },
                  { label: 'Status Updated', time: selected.updatedAt, by: 'System' },
                  ...(selected.resolvedAt ? [{ label: 'Incident Resolved', time: selected.resolvedAt, by: selected.assignedTo ?? 'Unknown' }] : []),
                ].map((ev, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="mt-1 h-2 w-2 rounded-full bg-blue-500 shrink-0" />
                    <div>
                      <p className="text-xs font-semibold text-gray-800">{ev.label}</p>
                      <p className="text-[10px] text-gray-500">{formatDateTime(ev.time)} · by {ev.by}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  )
}
