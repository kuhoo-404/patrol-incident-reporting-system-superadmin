import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Building2, Users, AlertTriangle, Siren, TrendingUp,
  ClipboardCheck, AlertCircle, MapPin, ArrowUpRight, ArrowDownRight,
  Activity, Clock, CheckCircle2, XCircle,
} from 'lucide-react'
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts'
import { Card, CardHeader, CardTitle, CardContent, Badge } from '@/components/ui'
import { cn, timeAgo, formatNumber } from '@/utils'
import {
  dashboardKpis, patrolTrendData, companyPerformanceData,
  incidentCategoryData, mockIncidents, mockSosEvents, mockAuditLogs,
} from '@/services/mock/data'

// ── Animated Counter ─────────────────────────────────────────
const AnimatedCounter: React.FC<{ value: number; duration?: number }> = ({ value, duration = 1200 }) => {
  const [display, setDisplay] = useState(0)
  useEffect(() => {
    let start = 0
    const step = value / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= value) { setDisplay(value); clearInterval(timer) }
      else setDisplay(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [value, duration])
  return <>{formatNumber(display)}</>
}

// ── KPI Card ─────────────────────────────────────────────────
const KpiCard: React.FC<{
  label: string; value: number; change: number; icon: React.ReactNode
  colorIcon: string; colorBg: string; unit?: string; trend?: 'up' | 'down'; pulse?: boolean
  delay?: number
}> = ({ label, value, change, icon, colorIcon, colorBg, unit, trend = 'up', pulse, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.35, delay }}
  >
    <Card className="p-5 card-hover h-full">
      <div className="flex items-start justify-between mb-4">
        <div className={cn('flex h-11 w-11 items-center justify-center rounded-xl relative', colorBg)}>
          {icon}
          {pulse && <span className="absolute inset-0 rounded-xl animate-ping opacity-20 bg-red-400" />}
        </div>
        <div className={cn('flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full', trend === 'up' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600')}>
          {trend === 'up' ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
          {Math.abs(change)}%
        </div>
      </div>
      <p className="text-2xl font-bold text-gray-900 dark:text-white leading-none mb-1">
        <AnimatedCounter value={value} />
        {unit && <span className="text-base font-normal text-gray-500 ml-1">{unit}</span>}
      </p>
      <p className="text-sm text-gray-500 font-medium">{label}</p>
      <p className="text-xs text-gray-400 mt-0.5">vs last month</p>
    </Card>
  </motion.div>
)

const SEVERITY_DOT: Record<string, string> = {
  critical: 'bg-red-500', high: 'bg-orange-500', medium: 'bg-amber-400', low: 'bg-blue-400',
}
const STATUS_LABEL: Record<string, { label: string; color: string }> = {
  open: { label: 'Open', color: 'text-red-600 bg-red-50 border border-red-100' },
  under_investigation: { label: 'Investigating', color: 'text-blue-600 bg-blue-50 border border-blue-100' },
  resolved: { label: 'Resolved', color: 'text-green-600 bg-green-50 border border-green-100' },
  closed: { label: 'Closed', color: 'text-gray-500 bg-gray-50 border border-gray-100' },
}
const PIE_COLORS = ['#2563eb', '#7c3aed', '#0891b2', '#16a34a', '#dc2626', '#9ca3af']

export default function DashboardPage() {
  const kpis = [
    { label: 'Active Companies', value: dashboardKpis.activeCompanies, change: 8, icon: <Building2 className="h-5 w-5 text-blue-600" />, colorBg: 'bg-blue-50', colorIcon: 'text-blue-600', delay: 0 },
    { label: 'Active Officers', value: dashboardKpis.activeOfficers, change: 12, icon: <Users className="h-5 w-5 text-indigo-600" />, colorBg: 'bg-indigo-50', colorIcon: 'text-indigo-600', delay: 0.05 },
    { label: 'Open Incidents', value: dashboardKpis.openIncidents, change: 5, icon: <AlertTriangle className="h-5 w-5 text-orange-600" />, colorBg: 'bg-orange-50', colorIcon: 'text-orange-600', trend: 'down' as const, delay: 0.1 },
    { label: 'Active SOS Alerts', value: dashboardKpis.activeSos, change: 50, icon: <Siren className="h-5 w-5 text-red-600" />, colorBg: 'bg-red-50', colorIcon: 'text-red-600', pulse: true, trend: 'down' as const, delay: 0.15 },
    { label: 'Escalated Tickets', value: dashboardKpis.escalatedTickets, change: 3, icon: <TrendingUp className="h-5 w-5 text-amber-600" />, colorBg: 'bg-amber-50', colorIcon: 'text-amber-600', trend: 'down' as const, delay: 0.2 },
    { label: 'Checklist Completion', value: dashboardKpis.checklistCompletion, change: 4, icon: <ClipboardCheck className="h-5 w-5 text-green-600" />, colorBg: 'bg-green-50', colorIcon: 'text-green-600', unit: '%', delay: 0.25 },
    { label: 'SLA Breaches', value: dashboardKpis.slaBreaches, change: 20, icon: <AlertCircle className="h-5 w-5 text-red-600" />, colorBg: 'bg-red-50', colorIcon: 'text-red-600', trend: 'down' as const, delay: 0.3 },
    { label: 'Active Sites', value: dashboardKpis.activeSites, change: 6, icon: <MapPin className="h-5 w-5 text-purple-600" />, colorBg: 'bg-purple-50', colorIcon: 'text-purple-600', delay: 0.35 },
  ]

  return (
    <div className="p-8 space-y-8">

      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Operations Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Platform-wide visibility — real-time operational overview</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
            <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm font-medium text-green-700">All Systems Operational</span>
          </div>
        </div>
      </div>

      {/* SOS Alert Banner */}
      {mockSosEvents.filter(s => s.status === 'active').length > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="flex items-center gap-4 bg-red-50 border border-red-200 rounded-xl px-5 py-4"
        >
          <Siren className="h-5 w-5 text-red-600 animate-pulse shrink-0" />
          <p className="text-sm font-semibold text-red-700 flex-1">
            🚨 {mockSosEvents.filter(s => s.status === 'active').length} Active SOS Emergency — Amit Singh at Manyata Tech Park requires immediate attention
          </p>
          <button className="text-sm font-semibold text-red-600 hover:text-red-800 border border-red-300 rounded-lg px-4 py-1.5 hover:bg-red-100 transition-colors whitespace-nowrap">
            View SOS →
          </button>
        </motion.div>
      )}

      {/* KPI Grid — 4 per row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <KpiCard key={kpi.label} {...kpi} change={kpi.change} trend={kpi.trend ?? 'up'} />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-12 gap-5">

        {/* Patrol Trend */}
        <div className="col-span-12 lg:col-span-8">
          <Card className="h-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base">Patrol Completion & Incident Trend</CardTitle>
                  <p className="text-xs text-gray-400 mt-0.5">Last 6 months · all companies</p>
                </div>
                <Badge variant="outline">6 Months</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={230}>
                <AreaChart data={patrolTrendData} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
                  <defs>
                    <linearGradient id="gradComp" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.12} />
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: 13, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }} />
                  <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 13, paddingTop: 12 }} />
                  <Area type="monotone" dataKey="completion" name="Completion %" stroke="#2563eb" strokeWidth={2.5} fill="url(#gradComp)" dot={{ r: 4, fill: '#2563eb', strokeWidth: 0 }} activeDot={{ r: 6 }} />
                  <Area type="monotone" dataKey="incidents" name="Incidents" stroke="#dc2626" strokeWidth={2} fill="none" dot={{ r: 4, fill: '#dc2626', strokeWidth: 0 }} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Incident Category Pie */}
        <div className="col-span-12 lg:col-span-4">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-base">Incidents by Category</CardTitle>
              <p className="text-xs text-gray-400 mt-0.5">Current month</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={190}>
                <PieChart>
                  <Pie data={incidentCategoryData} cx="50%" cy="50%" innerRadius={50} outerRadius={78} paddingAngle={3} dataKey="value">
                    {incidentCategoryData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: 13 }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-y-1.5 mt-2">
                {incidentCategoryData.map((d, i) => (
                  <div key={d.name} className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full shrink-0" style={{ background: PIE_COLORS[i % PIE_COLORS.length] }} />
                    <span className="text-xs text-gray-500 truncate">{d.name}</span>
                    <span className="text-xs font-semibold text-gray-700 ml-auto">{d.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-12 gap-5">

        {/* Company Performance */}
        <div className="col-span-12 lg:col-span-7">
          <Card className="h-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base">Company Compliance Benchmarking</CardTitle>
                  <p className="text-xs text-gray-400 mt-0.5">April 2024</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={210}>
                <BarChart data={companyPerformanceData} margin={{ top: 4, right: 8, left: -16, bottom: 0 }} barCategoryGap="32%">
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: 13 }} />
                  <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 13, paddingTop: 12 }} />
                  <Bar dataKey="compliance" name="Compliance %" fill="#2563eb" radius={[5, 5, 0, 0]} />
                  <Bar dataKey="incidents" name="Incidents" fill="#fca5a5" radius={[5, 5, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Active SOS Panel */}
        <div className="col-span-12 lg:col-span-5">
          <Card className="h-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  <Siren className="h-4 w-4 text-red-500 animate-pulse" />
                  SOS Monitor
                </CardTitle>
                <Badge variant="danger">{mockSosEvents.filter(s => s.status === 'active').length} Active</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockSosEvents.map(sos => (
                <div
                  key={sos.id}
                  className={cn(
                    'rounded-xl border p-4 text-sm',
                    sos.status === 'active' ? 'bg-red-50 border-red-200 sos-pulse' :
                    sos.status === 'acknowledged' ? 'bg-amber-50 border-amber-200' :
                    'bg-green-50 border-green-200'
                  )}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-900">{sos.officerName}</span>
                    <span className={cn(
                      'text-[10px] font-bold uppercase px-2.5 py-1 rounded-full',
                      sos.status === 'active' ? 'bg-red-500 text-white' :
                      sos.status === 'acknowledged' ? 'bg-amber-500 text-white' :
                      'bg-green-500 text-white'
                    )}>
                      {sos.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600">{sos.siteName} · {sos.companyName}</p>
                  <p className="text-xs text-gray-400 mt-1">{timeAgo(sos.triggeredAt)} · Escalation L{sos.escalationLevel}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Live Incident Feed */}
        <div className="col-span-12 lg:col-span-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  <Activity className="h-4 w-4 text-blue-500" />
                  Live Incident Feed
                </CardTitle>
                <Badge variant="info">6 Total</Badge>
              </div>
            </CardHeader>
            <CardContent className="divide-y divide-gray-50">
              {mockIncidents.slice(0, 5).map(inc => (
                <div key={inc.id} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
                  <span className={cn('mt-2 h-2 w-2 rounded-full shrink-0', SEVERITY_DOT[inc.severity])} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 truncate">{inc.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{inc.siteName} · {inc.companyName}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className={cn('text-[11px] font-semibold px-2 py-0.5 rounded-full inline-block', STATUS_LABEL[inc.status]?.color)}>
                      {STATUS_LABEL[inc.status]?.label}
                    </span>
                    <p className="text-[11px] text-gray-400 mt-1">{timeAgo(inc.createdAt)}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Recent Audit Actions */}
        <div className="col-span-12 lg:col-span-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-400" />
                Recent Audit Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="divide-y divide-gray-50">
              {mockAuditLogs.slice(0, 5).map(log => (
                <div key={log.id} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
                  <div className={cn(
                    'mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[9px] font-bold text-white',
                    log.severity === 'critical' ? 'bg-red-500' : log.severity === 'warning' ? 'bg-amber-500' : 'bg-gray-400'
                  )}>
                    {log.action.slice(0, 1)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 truncate">{log.description}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{log.userName} · {log.module}</p>
                  </div>
                  <p className="text-[11px] text-gray-400 shrink-0">{timeAgo(log.createdAt)}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* SLA Overview */}
        <div className="col-span-12">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">SLA Compliance Overview</CardTitle>
                <span className="text-xs text-gray-400">Current period</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'On Track', value: 89, icon: <CheckCircle2 className="h-5 w-5 text-green-500" />, color: 'text-green-600', bg: 'bg-green-50' },
                  { label: 'At Risk', value: 6, icon: <Clock className="h-5 w-5 text-amber-500" />, color: 'text-amber-600', bg: 'bg-amber-50' },
                  { label: 'Breached', value: 2, icon: <XCircle className="h-5 w-5 text-red-500" />, color: 'text-red-600', bg: 'bg-red-50' },
                  { label: 'Avg Resolution', value: '4.2h', icon: <Activity className="h-5 w-5 text-blue-500" />, color: 'text-blue-600', bg: 'bg-blue-50' },
                ].map(item => (
                  <div key={item.label} className={cn('flex items-center gap-4 p-4 rounded-xl', item.bg)}>
                    {item.icon}
                    <div>
                      <p className={cn('text-2xl font-bold', item.color)}>{item.value}</p>
                      <p className="text-sm text-gray-500 mt-0.5">{item.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
