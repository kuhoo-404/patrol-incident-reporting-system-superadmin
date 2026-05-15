import React, { useState } from 'react'
import { Plus, Check } from 'lucide-react'
import { Card, CardContent, Button, Badge, Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui'
import { cn } from '@/utils'

const CHECKLISTS = ['Morning Gate Patrol', 'Fire Safety Occurrence', 'Night Round Checklist', 'Visitor Log Checklist']
const SITES = ['Manyata Tech Park', 'Whitefield IT Hub', 'BKC Corporate Tower', 'Hitec City Campus', 'Salt Lake Sector V']
const SHIFTS = ['Morning Shift', 'Afternoon Shift', 'Night Shift', 'General Shift']
const ROLES = ['Patrol Officer', 'Supervisor', 'Site Manager', 'Guard']

type AllocationMatrix = Record<string, Record<string, boolean>>

const initAlloc = (): AllocationMatrix => {
  const m: AllocationMatrix = {}
  CHECKLISTS.forEach(cl => {
    m[cl] = {}
    SITES.forEach(s => { m[cl][s] = Math.random() > 0.4 })
  })
  return m
}

export default function ChecklistAllocationPage() {
  const [matrix, setMatrix] = useState<AllocationMatrix>(initAlloc)
  const [tab, setTab] = useState<'site' | 'shift' | 'role'>('site')
  const columns = tab === 'site' ? SITES : tab === 'shift' ? SHIFTS : ROLES

  const toggle = (cl: string, col: string) => {
    setMatrix(prev => ({ ...prev, [cl]: { ...prev[cl], [col]: !prev[cl][col] } }))
  }

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Checklist Allocation</h1>
          <p className="text-sm text-gray-500 mt-0.5">Allocate checklists by site, shift, or role</p>
        </div>
        <Button><Plus className="h-4 w-4" /> Bulk Allocate</Button>
      </div>

      {/* Tab */}
      <div className="flex rounded-lg border border-gray-200 overflow-hidden w-fit">
        {(['site', 'shift', 'role'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} className={cn('px-4 py-1.5 text-xs font-semibold capitalize transition-colors', tab === t ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50')}>
            By {t}
          </button>
        ))}
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="sticky left-0 bg-gray-50 px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase min-w-[200px]">Checklist</th>
                {columns.map(col => (
                  <th key={col} className="px-4 py-3 text-center text-xs font-semibold text-gray-500 min-w-[140px]">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {CHECKLISTS.map(cl => (
                <tr key={cl} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="sticky left-0 bg-white px-4 py-3 text-xs font-medium text-gray-800">{cl}</td>
                  {columns.map(col => {
                    const active = matrix[cl]?.[col] ?? false
                    return (
                      <td key={col} className="px-4 py-3 text-center">
                        <button
                          onClick={() => toggle(cl, col)}
                          className={cn('h-7 w-7 rounded-lg flex items-center justify-center mx-auto transition-all border', active ? 'bg-blue-600 border-blue-700 text-white' : 'bg-white border-gray-200 text-gray-200 hover:border-blue-400')}
                        >
                          {active && <Check className="h-3.5 w-3.5" />}
                        </button>
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5"><span className="h-4 w-4 rounded bg-blue-600 flex items-center justify-center"><Check className="h-3 w-3 text-white" /></span><span className="text-xs text-gray-600">Allocated</span></div>
        <div className="flex items-center gap-1.5"><span className="h-4 w-4 rounded border border-gray-200 bg-white" /><span className="text-xs text-gray-600">Not Allocated</span></div>
        <Button variant="outline" size="sm" className="ml-auto">Save Allocation</Button>
      </div>
    </div>
  )
}
