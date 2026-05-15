import React, { useState } from 'react'
import { TrendingUp, Plus, Edit2, ChevronRight } from 'lucide-react'
import { Card, CardContent, Button, Badge, Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui'
import { cn } from '@/utils'

const ESCALATION_RULES = [
  { id: 'e1', name: 'SOS No-Response Rule', trigger: 'SOS not acknowledged in 5 min', action: 'Notify Regional Manager', level: 1, status: 'active' },
  { id: 'e2', name: 'Critical Incident Escalation', trigger: 'Critical incident open > 2h', action: 'Notify Company Admin + Super Admin', level: 2, status: 'active' },
  { id: 'e3', name: 'SLA Breach Alert', trigger: 'Incident SLA breached', action: 'Email + SMS to Site Manager', level: 1, status: 'active' },
  { id: 'e4', name: 'Patrol Missed Escalation', trigger: 'Patrol checkpoint missed × 3', action: 'Notify Supervisor', level: 1, status: 'inactive' },
  { id: 'e5', name: 'Multi-SOS Response', trigger: '>2 SOS in same site within 30 min', action: 'Emergency response protocol', level: 3, status: 'active' },
]

const LEVEL_COLORS = ['', 'bg-blue-50 text-blue-700 border-blue-200', 'bg-amber-50 text-amber-700 border-amber-200', 'bg-red-50 text-red-700 border-red-200']

export default function EscalationPage() {
  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Escalation Matrix</h1>
          <p className="text-sm text-gray-500 mt-0.5">Configure automated escalation rules and response protocols</p>
        </div>
        <Button><Plus className="h-4 w-4" /> Add Rule</Button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Active Rules', value: ESCALATION_RULES.filter(r => r.status === 'active').length },
          { label: 'Triggered Today', value: 7 },
          { label: 'Avg Response Time', value: '6m 14s' },
        ].map(s => (
          <Card key={s.label} className="p-4">
            <p className="text-xs text-gray-500">{s.label}</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{s.value}</p>
          </Card>
        ))}
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Rule Name</TableHead>
              <TableHead>Trigger Condition</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Level</TableHead>
              <TableHead>Status</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ESCALATION_RULES.map(rule => (
              <TableRow key={rule.id}>
                <TableCell><span className="text-sm font-semibold text-gray-900">{rule.name}</span></TableCell>
                <TableCell><span className="text-xs text-gray-600">{rule.trigger}</span></TableCell>
                <TableCell><span className="text-xs text-gray-600">{rule.action}</span></TableCell>
                <TableCell>
                  <span className={cn('inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-semibold', LEVEL_COLORS[rule.level])}>
                    Level {rule.level}
                  </span>
                </TableCell>
                <TableCell><Badge variant={rule.status === 'active' ? 'success' : 'default'}>{rule.status}</Badge></TableCell>
                <TableCell><button className="p-1 text-gray-400 hover:text-blue-600"><Edit2 className="h-4 w-4" /></button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}
