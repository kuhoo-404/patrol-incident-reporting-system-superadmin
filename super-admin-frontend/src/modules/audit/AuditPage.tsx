import React, { useState } from 'react'
import { Search, Filter, Eye, ChevronRight } from 'lucide-react'
import { Card, Button, Badge, Input, Drawer, Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui'
import { mockAuditLogs } from '@/services/mock/data'
import { AuditLog } from '@/types'
import { cn, formatDateTime } from '@/utils'

const ACTION_COLORS: Record<string, string> = {
  CREATE: 'bg-green-100 text-green-700 border-green-200',
  UPDATE: 'bg-blue-100 text-blue-700 border-blue-200',
  DELETE: 'bg-red-100 text-red-700 border-red-200',
  LOGIN: 'bg-gray-100 text-gray-700 border-gray-200',
  EXPORT: 'bg-purple-100 text-purple-700 border-purple-200',
  SOS_TRIGGER: 'bg-red-100 text-red-700 border-red-200',
}

export default function AuditPage() {
  const [search, setSearch] = useState('')
  const [moduleFilter, setModuleFilter] = useState('all')
  const [selected, setSelected] = useState<AuditLog | null>(null)

  const modules = Array.from(new Set(mockAuditLogs.map(l => l.module)))
  const filtered = mockAuditLogs.filter(l => {
    const matchSearch = l.description.toLowerCase().includes(search.toLowerCase()) || l.userName.toLowerCase().includes(search.toLowerCase())
    const matchModule = moduleFilter === 'all' || l.module === moduleFilter
    return matchSearch && matchModule
  })

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Audit Logs</h1>
          <p className="text-sm text-gray-500 mt-0.5">Immutable platform-wide activity trail</p>
        </div>
        <Button variant="outline"><Filter className="h-4 w-4" /> Export Logs</Button>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input placeholder="Search logs…" value={search} onChange={e => setSearch(e.target.value)} className="pl-8 w-64" />
        </div>
        <select value={moduleFilter} onChange={e => setModuleFilter(e.target.value)} className="h-9 rounded-lg border border-gray-200 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="all">All Modules</option>
          {modules.map(m => <option key={m} value={m}>{m}</option>)}
        </select>
        <Badge variant="outline">{filtered.length} entries</Badge>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Timestamp</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Module</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Severity</TableHead>
              <TableHead>IP</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map(log => (
              <TableRow key={log.id} className="cursor-pointer" onClick={() => setSelected(log)}>
                <TableCell><span className="text-xs text-gray-500 whitespace-nowrap">{formatDateTime(log.createdAt)}</span></TableCell>
                <TableCell>
                  <div>
                    <p className="text-xs font-semibold text-gray-900">{log.userName}</p>
                    <p className="text-[10px] text-gray-400">{log.userRole}</p>
                  </div>
                </TableCell>
                <TableCell><span className={cn('inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] font-bold', ACTION_COLORS[log.action] ?? 'bg-gray-100 text-gray-700 border-gray-200')}>{log.action}</span></TableCell>
                <TableCell><span className="text-xs">{log.module}</span></TableCell>
                <TableCell><span className="text-xs text-gray-600 max-w-xs truncate block">{log.description}</span></TableCell>
                <TableCell>
                  <Badge variant={log.severity === 'critical' ? 'danger' : log.severity === 'warning' ? 'warning' : 'default'} className="text-[10px]">{log.severity}</Badge>
                </TableCell>
                <TableCell><span className="font-mono text-[10px] text-gray-500">{log.ipAddress}</span></TableCell>
                <TableCell><button className="p-1 text-gray-400 hover:text-blue-600"><Eye className="h-3.5 w-3.5" /></button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Diff Drawer */}
      <Drawer open={!!selected} onClose={() => setSelected(null)} title="Audit Log Detail">
        {selected && (
          <div className="space-y-5">
            <div className="space-y-2">
              {[
                { label: 'User', value: `${selected.userName} (${selected.userRole})` },
                { label: 'Action', value: selected.action },
                { label: 'Module', value: selected.module },
                { label: 'Description', value: selected.description },
                { label: 'IP Address', value: selected.ipAddress },
                { label: 'Timestamp', value: formatDateTime(selected.createdAt) },
              ].map(d => (
                <div key={d.label} className="flex flex-col gap-0.5 py-2 border-b border-gray-50">
                  <span className="text-[10px] font-semibold text-gray-500 uppercase">{d.label}</span>
                  <span className="text-sm text-gray-900">{d.value}</span>
                </div>
              ))}
            </div>
            {(selected.before || selected.after) && (
              <div>
                <p className="text-xs font-semibold text-gray-500 mb-2 uppercase">Before / After Changes</p>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-3 bg-red-50 rounded-lg border border-red-100">
                    <p className="text-[10px] font-bold text-red-600 mb-1">BEFORE</p>
                    <pre className="text-[10px] text-gray-700 whitespace-pre-wrap">{JSON.stringify(selected.before ?? {}, null, 2)}</pre>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg border border-green-100">
                    <p className="text-[10px] font-bold text-green-600 mb-1">AFTER</p>
                    <pre className="text-[10px] text-gray-700 whitespace-pre-wrap">{JSON.stringify(selected.after ?? {}, null, 2)}</pre>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </Drawer>
    </div>
  )
}
