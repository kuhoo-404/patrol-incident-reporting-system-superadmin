import React, { useState } from 'react'
import { Check, X, Save, RotateCcw, Copy } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent, Button, Badge } from '@/components/ui'
import { cn } from '@/utils'
import { MODULES } from '@/constants'

const ROLES = ['Company Admin', 'Regional Manager', 'Site Manager', 'Supervisor', 'Patrol Officer', 'Guard']
const PERMISSIONS = ['Read', 'Write', 'Edit', 'Delete'] as const

type PermMatrix = Record<string, Record<string, Record<string, boolean>>>

const initMatrix = (): PermMatrix => {
  const m: PermMatrix = {}
  ROLES.forEach(role => {
    m[role] = {}
    MODULES.forEach(mod => {
      const isAdmin = role === 'Company Admin'
      const isManager = role === 'Regional Manager' || role === 'Site Manager'
      m[role][mod] = {
        Read: true,
        Write: isAdmin || isManager,
        Edit: isAdmin || isManager,
        Delete: isAdmin,
      }
    })
  })
  return m
}

export default function AccessMatrixPage() {
  const [matrix, setMatrix] = useState<PermMatrix>(initMatrix)
  const [saved, setSaved] = useState(false)

  const toggle = (role: string, mod: string, perm: string) => {
    setMatrix(prev => ({
      ...prev,
      [role]: { ...prev[role], [mod]: { ...prev[role][mod], [perm]: !prev[role][mod][perm] } },
    }))
  }

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000) }

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Access Matrix</h1>
          <p className="text-sm text-gray-500 mt-0.5">Role-based permission management across all modules</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setMatrix(initMatrix())}><RotateCcw className="h-4 w-4" /> Reset</Button>
          <Button onClick={handleSave}>{saved ? <><Check className="h-4 w-4" /> Saved!</> : <><Save className="h-4 w-4" /> Save Changes</>}</Button>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        {PERMISSIONS.map(p => (
          <div key={p} className="flex items-center gap-1.5">
            <span className={cn('h-3 w-3 rounded-sm', p === 'Read' ? 'bg-blue-400' : p === 'Write' ? 'bg-green-400' : p === 'Edit' ? 'bg-amber-400' : 'bg-red-400')} />
            <span className="text-xs text-gray-600">{p}</span>
          </div>
        ))}
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="sticky left-0 bg-gray-50 px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide min-w-[180px]">Module</th>
                {ROLES.map(role => (
                  <th key={role} className="px-3 py-3 text-center min-w-[160px]">
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-xs font-semibold text-gray-700">{role}</span>
                      <div className="flex gap-1">
                        {PERMISSIONS.map(p => (
                          <span key={p} className="text-[9px] font-bold text-gray-400">{p.slice(0, 1)}</span>
                        ))}
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MODULES.map((mod, mi) => (
                <tr key={mod} className={cn('border-b border-gray-50 hover:bg-gray-50/50 transition-colors', mi % 2 === 0 ? '' : 'bg-gray-50/20')}>
                  <td className="sticky left-0 bg-white px-4 py-2.5 text-xs font-medium text-gray-700 hover:bg-gray-50/80">{mod}</td>
                  {ROLES.map(role => (
                    <td key={role} className="px-3 py-2.5">
                      <div className="flex justify-center gap-1.5">
                        {PERMISSIONS.map(perm => {
                          const active = matrix[role]?.[mod]?.[perm]
                          return (
                            <button
                              key={perm}
                              onClick={() => toggle(role, mod, perm)}
                              title={`${role} - ${mod} - ${perm}`}
                              className={cn(
                                'h-6 w-6 rounded flex items-center justify-center transition-all border',
                                active
                                  ? perm === 'Read' ? 'bg-blue-500 border-blue-600 text-white'
                                    : perm === 'Write' ? 'bg-green-500 border-green-600 text-white'
                                    : perm === 'Edit' ? 'bg-amber-500 border-amber-600 text-white'
                                    : 'bg-red-500 border-red-600 text-white'
                                  : 'bg-white border-gray-200 text-gray-200 hover:border-gray-400'
                              )}
                            >
                              {active ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                            </button>
                          )
                        })}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
