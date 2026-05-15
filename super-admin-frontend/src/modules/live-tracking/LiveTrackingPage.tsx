import React, { useState } from 'react'
import { MapPin, Play, Pause, SkipBack, SkipForward, Signal, AlertTriangle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, Button, Badge } from '@/components/ui'
import { mockUsers, mockSites } from '@/services/mock/data'
import { cn } from '@/utils'

const OFFICER_TRACKS = mockUsers.filter(u => u.deviceStatus === 'bound').slice(0, 4).map((u, i) => ({
  ...u,
  lat: mockSites[i % mockSites.length]?.lat ?? 13.0,
  lng: mockSites[i % mockSites.length]?.lng ?? 77.6,
  speed: Math.round(Math.random() * 5 + 1),
  accuracy: Math.round(Math.random() * 5 + 95),
  batteryLevel: Math.round(Math.random() * 40 + 60),
  site: mockSites[i % mockSites.length]?.name ?? 'Unknown Site',
  online: i !== 3,
}))

export default function LiveTrackingPage() {
  const [selected, setSelected] = useState(OFFICER_TRACKS[0])
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(30)

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Live Tracking</h1>
          <p className="text-sm text-gray-500 mt-0.5">{OFFICER_TRACKS.filter(o => o.online).length} officers online</p>
        </div>
        <Badge variant="success" className="animate-pulse">● Live</Badge>
      </div>

      <div className="grid grid-cols-12 gap-4">
        {/* Officer List */}
        <div className="col-span-12 lg:col-span-3 space-y-2">
          {OFFICER_TRACKS.map(officer => (
            <Card key={officer.id} onClick={() => setSelected(officer)} className={cn('p-3 cursor-pointer card-hover', selected.id === officer.id ? 'ring-2 ring-blue-500' : '')}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-semibold text-gray-900">{officer.name}</span>
                <span className={cn('h-2 w-2 rounded-full', officer.online ? 'bg-green-500 animate-pulse' : 'bg-gray-300')} />
              </div>
              <p className="text-xs text-gray-500">{officer.site}</p>
              <div className="flex items-center gap-3 mt-2">
                <div className="flex items-center gap-1 text-[10px] text-gray-500">
                  <Signal className="h-3 w-3" />{officer.accuracy}%
                </div>
                <div className="flex items-center gap-1 text-[10px] text-gray-500">
                  🔋 {officer.batteryLevel}%
                </div>
                <div className="text-[10px] text-gray-500">{officer.speed} km/h</div>
              </div>
            </Card>
          ))}
        </div>

        {/* Map */}
        <div className="col-span-12 lg:col-span-9">
          <Card className="overflow-hidden" style={{ height: 460 }}>
            <div className="relative h-full w-full bg-slate-100">
              {/* Grid bg */}
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Cpath d='M0 30h60M30 0v60' stroke='%23e2e8f0' stroke-width='1'/%3E%3C/svg%3E")`,
              }} />
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-transparent" />

              {/* Officer markers */}
              {OFFICER_TRACKS.map((o, i) => (
                <div key={o.id} className="absolute" style={{ left: `${20 + i * 20}%`, top: `${30 + i * 12}%` }}>
                  <div className={cn('flex h-8 w-8 items-center justify-center rounded-full border-2 border-white shadow-md cursor-pointer transition-transform hover:scale-110', o.online ? 'bg-blue-600' : 'bg-gray-400')}>
                    <span className="text-[10px] font-bold text-white">{o.name.split(' ').map(w => w[0]).join('')}</span>
                  </div>
                  {o.online && (
                    <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[9px] bg-blue-600 text-white px-1.5 rounded whitespace-nowrap">{o.speed}km/h</div>
                  )}
                </div>
              ))}

              {/* Sites */}
              {mockSites.slice(0, 3).map((site, i) => (
                <div key={site.id} className="absolute" style={{ left: `${15 + i * 28}%`, top: `${60 + i * 5}%` }}>
                  <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-lg px-2 py-1 shadow-sm">
                    <MapPin className="h-3 w-3 text-gray-500" />
                    <span className="text-[9px] text-gray-700 font-medium">{site.name.split(' ').slice(0, 2).join(' ')}</span>
                  </div>
                </div>
              ))}

              {/* Selected Officer info */}
              <div className="absolute top-3 right-3 bg-white rounded-xl border border-gray-200 shadow-md p-3 w-52">
                <p className="text-xs font-semibold text-gray-900">{selected.name}</p>
                <p className="text-[10px] text-gray-500 mb-2">{selected.site}</p>
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px]"><span className="text-gray-500">GPS Accuracy</span><span className="font-medium text-green-600">{selected.accuracy}%</span></div>
                  <div className="flex justify-between text-[10px]"><span className="text-gray-500">Speed</span><span className="font-medium">{selected.speed} km/h</span></div>
                  <div className="flex justify-between text-[10px]"><span className="text-gray-500">Battery</span><span className="font-medium">{selected.batteryLevel}%</span></div>
                </div>
              </div>

              {/* Anti-spoofing alert */}
              <div className="absolute bottom-3 right-3">
                <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg px-3 py-1.5">
                  <Signal className="h-3.5 w-3.5 text-green-600" />
                  <span className="text-xs font-medium text-green-700">GPS Integrity: Normal</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Playback Controls */}
          <Card className="p-4 mt-3">
            <div className="flex items-center gap-4">
              <p className="text-xs font-semibold text-gray-700 w-32 shrink-0">Route Playback</p>
              <div className="flex items-center gap-2">
                <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500"><SkipBack className="h-4 w-4" /></button>
                <button onClick={() => setPlaying(!playing)} className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                  {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </button>
                <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500"><SkipForward className="h-4 w-4" /></button>
              </div>
              <div className="flex-1">
                <input type="range" min={0} max={100} value={progress} onChange={e => setProgress(Number(e.target.value))} className="w-full h-1.5 accent-blue-600 cursor-pointer" />
                <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                  <span>06:00 AM</span><span>Current</span><span>06:00 PM</span>
                </div>
              </div>
              <select className="h-8 rounded-lg border border-gray-200 px-2 text-xs text-gray-700 focus:outline-none">
                <option>1x</option><option>2x</option><option>4x</option>
              </select>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
