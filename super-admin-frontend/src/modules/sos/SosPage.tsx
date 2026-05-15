import React, { useState, useEffect } from 'react'
import { Siren, MapPin, Clock, CheckCircle, AlertTriangle, Phone, User } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle, Button, Badge } from '@/components/ui'
import { mockSosEvents } from '@/services/mock/data'
import { SosEvent } from '@/types'
import { cn, timeAgo, formatDateTime } from '@/utils'

const SOS_COLORS: Record<string, { bg: string; border: string; badge: string }> = {
  active: { bg: 'bg-red-50', border: 'border-red-200', badge: 'bg-red-500 text-white' },
  acknowledged: { bg: 'bg-amber-50', border: 'border-amber-200', badge: 'bg-amber-500 text-white' },
  resolved: { bg: 'bg-green-50', border: 'border-green-200', badge: 'bg-green-500 text-white' },
  false_alarm: { bg: 'bg-gray-50', border: 'border-gray-200', badge: 'bg-gray-500 text-white' },
}

const MapPlaceholder: React.FC<{ events: SosEvent[] }> = ({ events }) => (
  <div className="relative h-full w-full bg-slate-100 rounded-xl overflow-hidden">
    {/* Stylized map bg */}
    <div className="absolute inset-0" style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Cpath d='M0 20h40M20 0v40' stroke='%23e2e8f0' stroke-width='1'/%3E%3C/svg%3E")`,
      backgroundSize: '40px 40px',
    }} />
    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-slate-100/50" />
    {/* India outline simulation */}
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="text-gray-200 text-4xl font-bold opacity-30">🗺️</div>
    </div>
    {/* SOS Markers */}
    {events.map((ev, i) => {
      const x = 20 + (i * 22) % 60
      const y = 25 + (i * 17) % 50
      return (
        <div key={ev.id} className="absolute" style={{ left: `${x}%`, top: `${y}%` }}>
          {ev.status === 'active' ? (
            <div className="relative flex items-center justify-center">
              <span className="absolute h-8 w-8 rounded-full bg-red-500 opacity-30 animate-ping" />
              <div className="relative z-10 flex h-6 w-6 items-center justify-center rounded-full bg-red-600 shadow-lg border-2 border-white cursor-pointer">
                <Siren className="h-3 w-3 text-white" />
              </div>
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] rounded-md px-2 py-1 whitespace-nowrap shadow-lg">
                {ev.officerName}
              </div>
            </div>
          ) : (
            <div className={cn('flex h-5 w-5 items-center justify-center rounded-full shadow border-2 border-white cursor-pointer', ev.status === 'acknowledged' ? 'bg-amber-500' : 'bg-green-500')}>
              <MapPin className="h-2.5 w-2.5 text-white" />
            </div>
          )}
        </div>
      )
    })}
    {/* Legend */}
    <div className="absolute bottom-3 left-3 bg-white rounded-lg border border-gray-200 shadow-sm p-2 space-y-1">
      {[{ color: 'bg-red-500', label: 'Active SOS' }, { color: 'bg-amber-500', label: 'Acknowledged' }, { color: 'bg-green-500', label: 'Resolved' }].map(l => (
        <div key={l.label} className="flex items-center gap-1.5">
          <span className={cn('h-2.5 w-2.5 rounded-full', l.color)} />
          <span className="text-[10px] text-gray-600">{l.label}</span>
        </div>
      ))}
    </div>
    {/* Filter bar */}
    <div className="absolute top-3 left-3 flex gap-2">
      {['All Events', 'Active Only'].map(f => (
        <button key={f} className="bg-white rounded-lg border border-gray-200 shadow-sm px-2.5 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors">{f}</button>
      ))}
    </div>
  </div>
)

export default function SosPage() {
  const [events, setEvents] = useState(mockSosEvents)
  const [selected, setSelected] = useState<SosEvent | null>(null)
  const [ticker, setTicker] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setTicker(n => n + 1), 3000)
    return () => clearInterval(t)
  }, [])

  const acknowledge = (id: string) => {
    setEvents(prev => prev.map(e => e.id === id ? { ...e, status: 'acknowledged' as const, acknowledgedAt: new Date().toISOString(), acknowledgedBy: 'Super Admin' } : e))
  }
  const resolve = (id: string) => {
    setEvents(prev => prev.map(e => e.id === id ? { ...e, status: 'resolved' as const, resolvedAt: new Date().toISOString() } : e))
  }

  const active = events.filter(e => e.status === 'active')
  const acked = events.filter(e => e.status === 'acknowledged')

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Siren className={cn('h-5 w-5', active.length > 0 ? 'text-red-500 animate-pulse' : 'text-gray-400')} />
            SOS Monitoring Console
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">Real-time emergency response dashboard</p>
        </div>
        <div className="flex items-center gap-2">
          {active.length > 0 && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg px-3 py-1.5">
              <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-sm font-semibold text-red-700">{active.length} Active Emergency</span>
            </div>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: 'Active SOS', value: active.length, color: 'text-red-600' },
          { label: 'Acknowledged', value: acked.length, color: 'text-amber-600' },
          { label: 'Resolved Today', value: events.filter(e => e.status === 'resolved').length, color: 'text-green-600' },
          { label: 'Avg Response Time', value: '4m 32s', color: 'text-blue-600' },
        ].map(s => (
          <Card key={s.label} className="p-4">
            <p className="text-xs text-gray-500">{s.label}</p>
            <p className={`text-2xl font-bold mt-1 ${s.color}`}>{s.value}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-4">
        {/* Map */}
        <div className="col-span-12 lg:col-span-8">
          <Card className="overflow-hidden" style={{ height: 440 }}>
            <MapPlaceholder events={events} />
          </Card>
        </div>

        {/* Event Panel */}
        <div className="col-span-12 lg:col-span-4 space-y-2">
          <p className="text-xs font-semibold text-gray-500 px-1">LIVE EVENTS</p>
          <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
            <AnimatePresence>
              {events.map(ev => {
                const c = SOS_COLORS[ev.status]
                return (
                  <motion.div key={ev.id} layout initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                    onClick={() => setSelected(ev)}
                    className={cn('rounded-xl border p-3 cursor-pointer transition-all', c.bg, c.border, selected?.id === ev.id ? 'ring-2 ring-blue-500' : 'hover:shadow-sm')}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        {ev.status === 'active' && <Siren className="h-4 w-4 text-red-600 animate-pulse" />}
                        <span className="text-sm font-semibold text-gray-900">{ev.officerName}</span>
                      </div>
                      <span className={cn('text-[10px] font-bold uppercase px-2 py-0.5 rounded-full', c.badge)}>{ev.status}</span>
                    </div>
                    <p className="text-xs text-gray-600 flex items-center gap-1"><MapPin className="h-3 w-3" />{ev.siteName}</p>
                    <p className="text-xs text-gray-500">{ev.companyName}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-[10px] text-gray-400 flex items-center gap-1"><Clock className="h-3 w-3" />{timeAgo(ev.triggeredAt)}</span>
                      <span className="text-[10px] text-gray-500">L{ev.escalationLevel} escalation</span>
                    </div>
                    {ev.status === 'active' && (
                      <div className="flex gap-2 mt-2">
                        <Button size="sm" variant="outline" className="flex-1 text-[11px]" onClick={e => { e.stopPropagation(); acknowledge(ev.id) }}>
                          <CheckCircle className="h-3.5 w-3.5" /> Acknowledge
                        </Button>
                      </div>
                    )}
                    {ev.status === 'acknowledged' && (
                      <Button size="sm" className="w-full mt-2 text-[11px]" onClick={e => { e.stopPropagation(); resolve(ev.id) }}>
                        <CheckCircle className="h-3.5 w-3.5" /> Mark Resolved
                      </Button>
                    )}
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Selected Detail */}
      {selected && (
        <Card>
          <CardContent className="pt-5">
            <div className="flex items-start gap-6 flex-wrap">
              <div className="flex-1 min-w-64">
                <p className="text-xs font-semibold text-gray-500 mb-2">INCIDENT DETAILS</p>
                <h3 className="text-base font-bold text-gray-900">{selected.officerName}</h3>
                <div className="space-y-1 mt-2">
                  {[
                    { label: 'Site', value: selected.siteName },
                    { label: 'Company', value: selected.companyName },
                    { label: 'Triggered', value: formatDateTime(selected.triggeredAt) },
                    ...(selected.acknowledgedAt ? [{ label: 'Acknowledged', value: `${formatDateTime(selected.acknowledgedAt)} by ${selected.acknowledgedBy}` }] : []),
                    ...(selected.resolvedAt ? [{ label: 'Resolved', value: formatDateTime(selected.resolvedAt) }] : []),
                  ].map(d => (
                    <div key={d.label} className="flex gap-4 text-sm">
                      <span className="text-gray-500 w-28 shrink-0">{d.label}</span>
                      <span className="font-medium text-gray-900">{d.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 mb-2">QUICK ACTIONS</p>
                <div className="flex flex-col gap-2">
                  <Button variant="outline" size="sm" className="justify-start gap-2"><Phone className="h-4 w-4" /> Call Officer</Button>
                  <Button variant="outline" size="sm" className="justify-start gap-2"><AlertTriangle className="h-4 w-4" /> Escalate</Button>
                  <Button variant="outline" size="sm" className="justify-start gap-2"><User className="h-4 w-4" /> Dispatch Response</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
