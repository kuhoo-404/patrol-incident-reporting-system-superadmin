import React, { useState } from 'react'
import { Plus, Search, MoreHorizontal, Edit2, Power, ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'
import { Card, CardContent, Badge, Button, Input, Modal, Drawer, Switch, Avatar } from '@/components/ui'
import { mockCompanies } from '@/services/mock/data'
import { Company } from '@/types'
import { STATUS_COLORS } from '@/constants'
import { formatDate, cn } from '@/utils'

const PLAN_COLORS = { enterprise: 'info', professional: 'warning', starter: 'default' } as const

export default function CompaniesPage() {
  const [search, setSearch] = useState('')
  const [companies, setCompanies] = useState(mockCompanies)
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null)
  const [showAdd, setShowAdd] = useState(false)
  const [drawerCompany, setDrawerCompany] = useState<Company | null>(null)

  const filtered = companies.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.city.toLowerCase().includes(search.toLowerCase()) ||
    c.industry.toLowerCase().includes(search.toLowerCase())
  )

  const toggleStatus = (id: string) => {
    setCompanies(prev => prev.map(c => c.id === id ? { ...c, status: c.status === 'active' ? 'inactive' : 'active' } : c))
  }

  return (
    <div className="p-6 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Company Management</h1>
          <p className="text-sm text-gray-500 mt-0.5">{companies.length} registered tenants</p>
        </div>
        <Button onClick={() => setShowAdd(true)}><Plus className="h-4 w-4" /> Add Company</Button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: 'Total Companies', value: companies.length, color: 'text-gray-900' },
          { label: 'Active', value: companies.filter(c => c.status === 'active').length, color: 'text-green-600' },
          { label: 'Enterprise Plan', value: companies.filter(c => c.plan === 'enterprise').length, color: 'text-blue-600' },
          { label: 'Total Officers', value: companies.reduce((a, c) => a + c.usersCount, 0), color: 'text-purple-600' },
        ].map(s => (
          <Card key={s.label} className="p-4">
            <p className="text-xs text-gray-500">{s.label}</p>
            <p className={`text-2xl font-bold mt-1 ${s.color}`}>{s.value}</p>
          </Card>
        ))}
      </div>

      {/* Search + Filter */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input placeholder="Search companies…" value={search} onChange={e => setSearch(e.target.value)} className="pl-8" />
        </div>
        <Badge variant="outline">{filtered.length} results</Badge>
      </div>

      {/* Company Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((company, i) => (
          <motion.div key={company.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card className="card-hover">
              <CardContent className="pt-5">
                {/* Top */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl text-white font-bold text-sm" style={{ background: company.primaryColor }}>
                      {company.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{company.name}</p>
                      <p className="text-xs text-gray-500">{company.industry}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={PLAN_COLORS[company.plan]}>{company.plan}</Badge>
                    <button onClick={() => setDrawerCompany(company)} className="text-gray-400 hover:text-gray-600">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 my-3 p-3 bg-gray-50 rounded-lg">
                  {[
                    { label: 'Regions', value: company.regionsCount },
                    { label: 'Sites', value: company.sitesCount },
                    { label: 'Users', value: company.usersCount },
                  ].map(s => (
                    <div key={s.label} className="text-center">
                      <p className="text-sm font-bold text-gray-900">{s.value}</p>
                      <p className="text-[10px] text-gray-500">{s.label}</p>
                    </div>
                  ))}
                </div>

                {/* Location & Status */}
                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                  <span>{company.city}, {company.state}</span>
                  <span>Expires {formatDate(company.contractExpiry)}</span>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <span className={cn('inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium', STATUS_COLORS[company.status])}>
                    {company.status.charAt(0).toUpperCase() + company.status.slice(1)}
                  </span>
                  <div className="flex items-center gap-2">
                    <Switch checked={company.status === 'active'} onChange={() => toggleStatus(company.id)} />
                    <button onClick={() => setDrawerCompany(company)} className="text-blue-600 hover:text-blue-700 text-xs font-medium flex items-center gap-1">
                      View <ExternalLink className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Add Company Modal */}
      <Modal open={showAdd} onClose={() => setShowAdd(false)} title="Onboard New Company" className="max-w-2xl">
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: 'Company Name', placeholder: 'e.g. Securitas India Pvt Ltd' },
            { label: 'Industry Type', placeholder: 'e.g. Security Services' },
            { label: 'Contact Email', placeholder: 'admin@company.com' },
            { label: 'Contact Phone', placeholder: '+91-XXXXXXXXXX' },
            { label: 'City', placeholder: 'City' },
            { label: 'State', placeholder: 'State' },
          ].map(f => (
            <div key={f.label} className="space-y-1.5">
              <label className="text-xs font-medium text-gray-700">{f.label}</label>
              <Input placeholder={f.placeholder} />
            </div>
          ))}
          <div className="space-y-1.5 col-span-2">
            <label className="text-xs font-medium text-gray-700">Address</label>
            <Input placeholder="Full address" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-700">Plan</label>
            <select className="flex h-9 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>starter</option><option>professional</option><option>enterprise</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-700">Brand Color</label>
            <Input type="color" className="h-9" defaultValue="#2563eb" />
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-5">
          <Button variant="outline" onClick={() => setShowAdd(false)}>Cancel</Button>
          <Button onClick={() => setShowAdd(false)}>Onboard Company</Button>
        </div>
      </Modal>

      {/* Detail Drawer */}
      <Drawer open={!!drawerCompany} onClose={() => setDrawerCompany(null)} title={drawerCompany?.name ?? ''}>
        {drawerCompany && (
          <div className="space-y-5">
            {/* Brand */}
            <div className="flex items-center gap-4 p-4 rounded-xl" style={{ background: drawerCompany.primaryColor + '15' }}>
              <div className="flex h-14 w-14 items-center justify-center rounded-xl text-white font-bold text-lg" style={{ background: drawerCompany.primaryColor }}>
                {drawerCompany.name.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <p className="font-bold text-gray-900">{drawerCompany.name}</p>
                <p className="text-sm text-gray-500">{drawerCompany.industry}</p>
                <span className={cn('inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium mt-1', STATUS_COLORS[drawerCompany.status])}>
                  {drawerCompany.status}
                </span>
              </div>
            </div>
            {/* Details */}
            <div className="space-y-3">
              {[
                { label: 'Email', value: drawerCompany.email },
                { label: 'Phone', value: drawerCompany.phone },
                { label: 'Address', value: `${drawerCompany.address}, ${drawerCompany.city}, ${drawerCompany.state}` },
                { label: 'Plan', value: drawerCompany.plan },
                { label: 'Contract Expiry', value: formatDate(drawerCompany.contractExpiry) },
              ].map(d => (
                <div key={d.label} className="flex justify-between text-sm py-2 border-b border-gray-50">
                  <span className="text-gray-500">{d.label}</span>
                  <span className="font-medium text-gray-900">{d.value}</span>
                </div>
              ))}
            </div>
            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              {[{ label: 'Regions', v: drawerCompany.regionsCount }, { label: 'Sites', v: drawerCompany.sitesCount }, { label: 'Users', v: drawerCompany.usersCount }].map(s => (
                <div key={s.label} className="text-center p-3 bg-gray-50 rounded-xl">
                  <p className="text-xl font-bold text-blue-600">{s.v}</p>
                  <p className="text-xs text-gray-500">{s.label}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1"><Edit2 className="h-4 w-4" /> Edit</Button>
              <Button variant={drawerCompany.status === 'active' ? 'destructive' : 'default'} className="flex-1">
                <Power className="h-4 w-4" /> {drawerCompany.status === 'active' ? 'Deactivate' : 'Activate'}
              </Button>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  )
}
