import React, { useState } from 'react'
import { Globe, Check, Plus } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, Button, Badge, Switch } from '@/components/ui'
import { LANGUAGES } from '@/constants'
import { cn } from '@/utils'

export default function LocalizationPage() {
  const [langs, setLangs] = useState(LANGUAGES)

  const toggleLang = (code: string) => {
    setLangs(prev => prev.map(l => l.code === code ? { ...l, active: !l.active } : l))
  }

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Localization</h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage language packs and regional formatting</p>
        </div>
        <Button><Plus className="h-4 w-4" /> Add Language</Button>
      </div>

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 lg:col-span-7">
          <Card>
            <CardHeader><CardTitle>Language Pack Management</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {langs.map(lang => (
                <div key={lang.code} className={cn('flex items-center justify-between p-3 rounded-xl border transition-all', lang.active ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-100')}>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white border border-gray-200 text-xl">
                      {lang.code === 'en' ? '🇬🇧' : lang.code === 'hi' ? '🇮🇳' : lang.code === 'mr' ? '🟠' : lang.code === 'ta' ? '🟡' : lang.code === 'te' ? '🟢' : lang.code === 'kn' ? '🔵' : lang.code === 'bn' ? '🟣' : '🔴'}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{lang.name}</p>
                      <p className="text-xs text-gray-500">{lang.nativeName} · {lang.code.toUpperCase()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {lang.active ? (
                      <Badge variant="success"><Check className="h-3 w-3 mr-1" /> Active</Badge>
                    ) : (
                      <Badge variant="default">Inactive</Badge>
                    )}
                    {lang.code !== 'en' && <Switch checked={lang.active} onChange={() => toggleLang(lang.code)} />}
                    {lang.code === 'en' && <span className="text-xs text-gray-400 font-medium">Default</span>}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="col-span-12 lg:col-span-5 space-y-4">
          <Card>
            <CardHeader><CardTitle>Regional Formatting</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {[
                { label: 'Date Format', value: 'DD/MM/YYYY (Indian)' },
                { label: 'Time Format', value: '12-hour (AM/PM)' },
                { label: 'Number Format', value: '1,00,000 (Indian)' },
                { label: 'Currency', value: '₹ INR' },
                { label: 'Timezone', value: 'IST (UTC+5:30)' },
              ].map(f => (
                <div key={f.label} className="flex justify-between py-2 border-b border-gray-50 text-sm">
                  <span className="text-gray-500">{f.label}</span>
                  <span className="font-medium text-gray-900">{f.value}</span>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Active Languages Summary</CardTitle></CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-blue-600">{langs.filter(l => l.active).length}</p>
                  <p className="text-xs text-gray-500">Active</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-gray-300">{langs.filter(l => !l.active).length}</p>
                  <p className="text-xs text-gray-500">Inactive</p>
                </div>
                <div className="flex-1 flex flex-wrap gap-1">
                  {langs.filter(l => l.active).map(l => (
                    <Badge key={l.code} variant="info" className="text-[10px]">{l.code.toUpperCase()}</Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
