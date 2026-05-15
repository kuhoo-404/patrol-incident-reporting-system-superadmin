import React, { useState } from 'react'
import { Palette, Upload, Eye, Check } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, Button, Badge, Input } from '@/components/ui'
import { mockCompanies } from '@/services/mock/data'

const DEFAULT_THEME = { primaryColor: '#2563eb', secondaryColor: '#1e40af', accentColor: '#60a5fa', logo: '', appName: 'PatrolIQ' }

export default function WhiteLabelPage() {
  const [selectedCompany, setSelectedCompany] = useState(mockCompanies[0])
  const [theme, setTheme] = useState(DEFAULT_THEME)
  const [saved, setSaved] = useState(false)

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000) }

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">White Labeling</h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage company branding and theme customization</p>
        </div>
        <Button onClick={handleSave}>{saved ? <><Check className="h-4 w-4" /> Saved!</> : <><Palette className="h-4 w-4" /> Save Theme</>}</Button>
      </div>

      <div className="grid grid-cols-12 gap-4">
        {/* Company Selector */}
        <div className="col-span-12 lg:col-span-3 space-y-2">
          <p className="text-xs font-semibold text-gray-500 px-1">SELECT COMPANY</p>
          {mockCompanies.map(c => (
            <Card key={c.id} onClick={() => { setSelectedCompany(c); setTheme({ ...DEFAULT_THEME, primaryColor: c.primaryColor }) }}
              className={`p-3 cursor-pointer card-hover ${selectedCompany.id === c.id ? 'ring-2 ring-blue-500' : ''}`}>
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-lg flex items-center justify-center text-white text-xs font-bold" style={{ background: c.primaryColor }}>
                  {c.name.slice(0, 2).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-gray-900 truncate">{c.name}</p>
                  <p className="text-[10px] text-gray-500">{c.plan}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Theme Editor */}
        <div className="col-span-12 lg:col-span-5 space-y-4">
          <Card>
            <CardHeader><CardTitle>Brand Settings — {selectedCompany.name}</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-700">App / Portal Name</label>
                <Input value={theme.appName} onChange={e => setTheme(t => ({ ...t, appName: e.target.value }))} />
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: 'Primary Color', key: 'primaryColor' as const },
                  { label: 'Secondary Color', key: 'secondaryColor' as const },
                  { label: 'Accent Color', key: 'accentColor' as const },
                ].map(c => (
                  <div key={c.key} className="space-y-1.5">
                    <label className="text-xs font-medium text-gray-700">{c.label}</label>
                    <div className="flex items-center gap-2">
                      <input type="color" value={theme[c.key]} onChange={e => setTheme(t => ({ ...t, [c.key]: e.target.value }))} className="h-9 w-12 cursor-pointer rounded-lg border border-gray-200" />
                      <Input value={theme[c.key]} onChange={e => setTheme(t => ({ ...t, [c.key]: e.target.value }))} className="font-mono text-xs" />
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-700">Logo Upload</label>
                <div className="flex items-center gap-2 p-3 border-2 border-dashed border-gray-200 rounded-xl hover:border-blue-300 transition-colors cursor-pointer">
                  <Upload className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-700">Upload company logo</p>
                    <p className="text-xs text-gray-400">PNG, SVG · Max 2MB · 200×60px recommended</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Live Preview */}
        <div className="col-span-12 lg:col-span-4">
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><Eye className="h-4 w-4" /> Live Preview</CardTitle></CardHeader>
            <CardContent>
              {/* Mini app preview */}
              <div className="rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                {/* Preview navbar */}
                <div className="flex items-center gap-2 px-3 py-2" style={{ background: theme.primaryColor }}>
                  <div className="h-5 w-5 rounded bg-white/20 flex items-center justify-center">
                    <span className="text-[8px] font-bold text-white">{theme.appName.slice(0, 2).toUpperCase()}</span>
                  </div>
                  <span className="text-xs font-bold text-white">{theme.appName}</span>
                  <div className="ml-auto flex gap-1.5">
                    {[1, 2, 3].map(i => <div key={i} className="h-2 w-2 rounded-full bg-white/40" />)}
                  </div>
                </div>
                {/* Preview sidebar */}
                <div className="flex h-48">
                  <div className="w-16 flex flex-col gap-1 p-2" style={{ background: theme.primaryColor + '15' }}>
                    {[1, 2, 3, 4].map(i => <div key={i} className="h-4 rounded" style={{ background: theme.primaryColor + '30' }} />)}
                  </div>
                  <div className="flex-1 p-3 bg-gray-50">
                    <div className="grid grid-cols-2 gap-1.5 mb-2">
                      {[1, 2, 3, 4].map(i => (
                        <div key={i} className="rounded-lg bg-white border border-gray-100 p-2">
                          <div className="h-1.5 w-8 rounded mb-1" style={{ background: theme.primaryColor + '60' }} />
                          <div className="h-3 w-6 rounded font-bold" style={{ background: theme.primaryColor }} />
                        </div>
                      ))}
                    </div>
                    <div className="h-16 rounded-lg bg-white border border-gray-100" />
                  </div>
                </div>
              </div>
              <div className="mt-3 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">Primary:</span>
                  <div className="h-4 w-4 rounded" style={{ background: theme.primaryColor }} />
                  <span className="text-xs font-mono text-gray-700">{theme.primaryColor}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">Company:</span>
                  <span className="text-xs font-medium text-gray-900">{selectedCompany.name}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
