import React, { useState } from 'react'
import { Download, Calendar, BarChart3, TrendingUp, PieChart } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, Button, Badge } from '@/components/ui'
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart as RePieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts'
import { companyPerformanceData, patrolTrendData, incidentCategoryData } from '@/services/mock/data'

const MONTHLY_SLA = [
  { month: 'Nov', onTrack: 85, breached: 8 }, { month: 'Dec', onTrack: 88, breached: 5 },
  { month: 'Jan', onTrack: 82, breached: 11 }, { month: 'Feb', onTrack: 90, breached: 4 },
  { month: 'Mar', onTrack: 92, breached: 3 }, { month: 'Apr', onTrack: 89, breached: 6 },
]
const OFFICER_PERF = [
  { name: 'Amit Singh', patrol: 98, incidents: 2, sos: 1 },
  { name: 'Ravi Verma', patrol: 91, incidents: 1, sos: 1 },
  { name: 'Vikram Reddy', patrol: 85, incidents: 4, sos: 0 },
  { name: 'Priya Sharma', patrol: 94, incidents: 0, sos: 0 },
]
const PIE_COLORS = ['#2563eb', '#7c3aed', '#0891b2', '#16a34a', '#dc2626', '#9ca3af']

const ChartCard: React.FC<{ title: string; subtitle?: string; children: React.ReactNode; action?: React.ReactNode }> = ({ title, subtitle, children, action }) => (
  <Card>
    <CardHeader>
      <div className="flex items-center justify-between">
        <div>
          <CardTitle>{title}</CardTitle>
          {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
        </div>
        {action}
      </div>
    </CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
)

export default function AnalyticsPage() {
  const [period, setPeriod] = useState('6m')

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-sm text-gray-500 mt-0.5">Platform-wide performance intelligence</p>
        </div>
        <div className="flex gap-2">
          <div className="flex rounded-lg border border-gray-200 overflow-hidden">
            {['1m', '3m', '6m', '1y'].map(p => (
              <button key={p} onClick={() => setPeriod(p)} className={`px-3 py-1.5 text-xs font-medium transition-colors ${period === p ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}>{p}</button>
            ))}
          </div>
          <Button variant="outline"><Download className="h-4 w-4" /> Export</Button>
          <Button variant="outline"><Calendar className="h-4 w-4" /> Schedule</Button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4">
        {/* Patrol Trend */}
        <div className="col-span-12 lg:col-span-8">
          <ChartCard title="Patrol Completion Trend" subtitle="Last 6 months · All companies" action={<Badge variant="outline">All Companies</Badge>}>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={patrolTrendData} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: 12 }} />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
                <Area type="monotone" dataKey="completion" name="Completion %" stroke="#2563eb" strokeWidth={2} fill="url(#g1)" />
                <Area type="monotone" dataKey="incidents" name="Incidents" stroke="#dc2626" strokeWidth={2} fill="none" />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Incident Pie */}
        <div className="col-span-12 lg:col-span-4">
          <ChartCard title="Incidents by Type">
            <ResponsiveContainer width="100%" height={180}>
              <RePieChart>
                <Pie data={incidentCategoryData} cx="50%" cy="50%" innerRadius={45} outerRadius={72} paddingAngle={3} dataKey="value">
                  {incidentCategoryData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '10px', fontSize: 12 }} />
              </RePieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-1 mt-1">
              {incidentCategoryData.map((d, i) => (
                <div key={d.name} className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full shrink-0" style={{ background: PIE_COLORS[i % PIE_COLORS.length] }} />
                  <span className="text-[10px] text-gray-500 truncate">{d.name}</span>
                </div>
              ))}
            </div>
          </ChartCard>
        </div>

        {/* Company Benchmarking */}
        <div className="col-span-12 lg:col-span-6">
          <ChartCard title="Company Compliance Benchmarking" subtitle="Compliance % by company">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={companyPerformanceData} margin={{ top: 4, right: 8, left: -20, bottom: 0 }} barCategoryGap="30%">
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: '10px', fontSize: 12 }} />
                <Bar dataKey="compliance" name="Compliance %" fill="#2563eb" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* SLA Performance */}
        <div className="col-span-12 lg:col-span-6">
          <ChartCard title="SLA Performance" subtitle="On-track vs Breached tickets">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={MONTHLY_SLA} margin={{ top: 4, right: 8, left: -20, bottom: 0 }} barCategoryGap="30%">
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: '10px', fontSize: 12 }} />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="onTrack" name="On Track" fill="#16a34a" radius={[4, 4, 0, 0]} />
                <Bar dataKey="breached" name="Breached" fill="#dc2626" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Officer Performance */}
        <div className="col-span-12">
          <ChartCard title="Officer Performance Leaderboard" subtitle="Patrol completion rate · April 2024">
            <div className="space-y-2">
              {OFFICER_PERF.sort((a, b) => b.patrol - a.patrol).map((o, i) => (
                <div key={o.name} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                  <span className={`text-sm font-bold w-6 text-center ${i === 0 ? 'text-amber-500' : 'text-gray-400'}`}>#{i + 1}</span>
                  <span className="text-sm font-semibold text-gray-900 w-36">{o.name}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${o.patrol}%` }} />
                      </div>
                      <span className="text-xs font-semibold text-blue-700 w-10 text-right">{o.patrol}%</span>
                    </div>
                  </div>
                  <div className="flex gap-3 text-xs text-gray-500">
                    <span>Incidents: {o.incidents}</span>
                    <span>SOS: {o.sos}</span>
                  </div>
                </div>
              ))}
            </div>
          </ChartCard>
        </div>
      </div>
    </div>
  )
}
