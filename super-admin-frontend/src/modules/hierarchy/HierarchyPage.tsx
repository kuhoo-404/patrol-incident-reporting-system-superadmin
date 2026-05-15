import React, { useState } from 'react'
import { ChevronRight, ChevronDown, Plus, Edit2, Trash2, MapPin, Building2, Globe, TreePine, Home } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, Badge, Button, Drawer, Input } from '@/components/ui'
import { cn } from '@/utils'

interface HierarchyNode { id: string; name: string; type: 'company' | 'region' | 'city' | 'site' | 'campus'; children?: HierarchyNode[]; status: 'active' | 'inactive'; count?: number }

const MOCK_TREE: HierarchyNode[] = [
  {
    id: 'c1', name: 'Securitas India Pvt Ltd', type: 'company', status: 'active', count: 342,
    children: [
      { id: 'r1', name: 'South Region', type: 'region', status: 'active', count: 124,
        children: [
          { id: 'city1', name: 'Bengaluru', type: 'city', status: 'active', count: 98,
            children: [
              { id: 's1', name: 'Manyata Tech Park', type: 'site', status: 'active', count: 24,
                children: [{ id: 'cam1', name: 'Block A Campus', type: 'campus', status: 'active', count: 8 }] },
              { id: 's2', name: 'Whitefield IT Hub', type: 'site', status: 'active', count: 18 },
            ] },
          { id: 'city2', name: 'Chennai', type: 'city', status: 'active', count: 26,
            children: [{ id: 's7', name: 'OMR Tech Corridor', type: 'site', status: 'active', count: 12 }] },
        ] },
      { id: 'r2', name: 'West Region', type: 'region', status: 'active', count: 90,
        children: [
          { id: 'city3', name: 'Mumbai', type: 'city', status: 'active', count: 90,
            children: [
              { id: 's3', name: 'BKC Corporate Tower', type: 'site', status: 'active', count: 12 },
              { id: 's4', name: 'Nariman Point Office', type: 'site', status: 'active', count: 8 },
            ] },
        ] },
    ],
  },
  {
    id: 'c2', name: 'G4S Security Solutions', type: 'company', status: 'active', count: 210,
    children: [
      { id: 'r3', name: 'North Region', type: 'region', status: 'active', count: 110,
        children: [
          { id: 'city4', name: 'Delhi', type: 'city', status: 'active', count: 110,
            children: [{ id: 's8', name: 'Connaught Place HQ', type: 'site', status: 'active', count: 20 }] },
        ] },
    ],
  },
]

const TYPE_ICON: Record<string, React.ReactNode> = {
  company: <Building2 className="h-4 w-4" />,
  region: <Globe className="h-4 w-4" />,
  city: <TreePine className="h-4 w-4" />,
  site: <MapPin className="h-4 w-4" />,
  campus: <Home className="h-4 w-4" />,
}
const TYPE_COLOR: Record<string, string> = {
  company: 'bg-blue-50 text-blue-700 border-blue-200',
  region: 'bg-purple-50 text-purple-700 border-purple-200',
  city: 'bg-teal-50 text-teal-700 border-teal-200',
  site: 'bg-green-50 text-green-700 border-green-200',
  campus: 'bg-amber-50 text-amber-700 border-amber-200',
}

const TreeNode: React.FC<{ node: HierarchyNode; depth?: number; onSelect: (n: HierarchyNode) => void }> = ({ node, depth = 0, onSelect }) => {
  const [open, setOpen] = useState(depth < 2)
  const hasChildren = (node.children?.length ?? 0) > 0
  return (
    <div>
      <div
        className={cn('flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors group', 'ml-' + (depth * 4))}
        style={{ marginLeft: depth * 20 }}
        onClick={() => { if (hasChildren) setOpen(!open); onSelect(node) }}
      >
        {hasChildren ? (
          <button className="text-gray-400 hover:text-gray-600">{open ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}</button>
        ) : <span className="w-3.5" />}
        <span className={cn('flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-medium', TYPE_COLOR[node.type])}>{TYPE_ICON[node.type]}{node.type}</span>
        <span className="text-sm font-medium text-gray-800">{node.name}</span>
        {node.count && <span className="text-xs text-gray-400 ml-1">({node.count} users)</span>}
        <span className={cn('ml-auto text-[10px] font-semibold px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity', node.status === 'active' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500')}>{node.status}</span>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-1 text-gray-400 hover:text-blue-600 rounded" onClick={e => { e.stopPropagation() }}><Edit2 className="h-3.5 w-3.5" /></button>
          <button className="p-1 text-gray-400 hover:text-red-600 rounded" onClick={e => { e.stopPropagation() }}><Trash2 className="h-3.5 w-3.5" /></button>
        </div>
      </div>
      <AnimatePresence>
        {open && node.children && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }}>
            {node.children.map(child => <TreeNode key={child.id} node={child} depth={depth + 1} onSelect={onSelect} />)}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function HierarchyPage() {
  const [selected, setSelected] = useState<HierarchyNode | null>(null)
  const [showAdd, setShowAdd] = useState(false)

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Entity Hierarchy</h1>
          <p className="text-sm text-gray-500 mt-0.5">Company → Region → City → Site → Campus</p>
        </div>
        <Button onClick={() => setShowAdd(true)}><Plus className="h-4 w-4" /> Add Node</Button>
      </div>

      <div className="grid grid-cols-12 gap-4">
        {/* Tree */}
        <div className="col-span-12 lg:col-span-8">
          <Card>
            <CardContent className="pt-5">
              <div className="mb-4 flex gap-2 flex-wrap">
                {(['company', 'region', 'city', 'site', 'campus'] as const).map(t => (
                  <span key={t} className={cn('flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-medium', TYPE_COLOR[t])}>{TYPE_ICON[t]}{t}</span>
                ))}
              </div>
              <div className="space-y-1">
                {MOCK_TREE.map(node => <TreeNode key={node.id} node={node} onSelect={setSelected} />)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Details Panel */}
        <div className="col-span-12 lg:col-span-4 space-y-4">
          {selected ? (
            <Card>
              <CardContent className="pt-5 space-y-4">
                <div className="flex items-center gap-3">
                  <span className={cn('flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm font-medium', TYPE_COLOR[selected.type])}>
                    {TYPE_ICON[selected.type]}{selected.type}
                  </span>
                  <Badge variant={selected.status === 'active' ? 'success' : 'default'}>{selected.status}</Badge>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">{selected.name}</h2>
                  <p className="text-sm text-gray-500 capitalize">{selected.type} Node</p>
                </div>
                {selected.count && (
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-700">{selected.count}</p>
                    <p className="text-xs text-blue-600">Users in this hierarchy</p>
                  </div>
                )}
                {selected.children && (
                  <div>
                    <p className="text-xs font-semibold text-gray-500 mb-2">CHILDREN ({selected.children.length})</p>
                    <div className="space-y-1">
                      {selected.children.map(child => (
                        <div key={child.id} className="flex items-center gap-2 p-2 rounded-lg bg-gray-50 text-sm">
                          <span className={cn('flex items-center gap-1 rounded border px-1.5 py-0.5 text-[10px] font-medium', TYPE_COLOR[child.type])}>{child.type}</span>
                          <span className="text-gray-700 font-medium">{child.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1"><Edit2 className="h-3.5 w-3.5" /> Edit</Button>
                  <Button variant="destructive" size="sm" className="flex-1"><Trash2 className="h-3.5 w-3.5" /> Delete</Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="pt-5">
                <div className="flex flex-col items-center justify-center py-12 text-center gap-2">
                  <TreePine className="h-10 w-10 text-gray-200" />
                  <p className="text-sm text-gray-500">Select a node to view details</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Summary */}
          <Card>
            <CardContent className="pt-4">
              <p className="text-xs font-semibold text-gray-500 mb-3">HIERARCHY SUMMARY</p>
              <div className="space-y-2">
                {[
                  { label: 'Companies', count: 6, color: 'bg-blue-500' },
                  { label: 'Regions', count: 14, color: 'bg-purple-500' },
                  { label: 'Cities', count: 28, color: 'bg-teal-500' },
                  { label: 'Sites', count: 89, color: 'bg-green-500' },
                  { label: 'Campuses', count: 34, color: 'bg-amber-500' },
                ].map(s => (
                  <div key={s.label} className="flex items-center gap-2">
                    <span className={cn('h-2 w-2 rounded-full', s.color)} />
                    <span className="text-sm text-gray-600 flex-1">{s.label}</span>
                    <span className="text-sm font-semibold text-gray-900">{s.count}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Add Node Modal */}
      <Drawer open={showAdd} onClose={() => setShowAdd(false)} title="Add Hierarchy Node">
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-700">Node Type</label>
            <select className="flex h-9 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              {['company', 'region', 'city', 'site', 'campus'].map(t => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-700">Name</label>
            <Input placeholder="Node name" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-700">Parent Node</label>
            <select className="flex h-9 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Securitas India Pvt Ltd</option>
              <option>G4S Security Solutions</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-700">Latitude</label>
              <Input type="number" placeholder="e.g. 13.0475" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-700">Longitude</label>
              <Input type="number" placeholder="e.g. 77.6209" />
            </div>
          </div>
          <div className="flex gap-2 pt-2">
            <Button variant="outline" className="flex-1" onClick={() => setShowAdd(false)}>Cancel</Button>
            <Button className="flex-1" onClick={() => setShowAdd(false)}>Add Node</Button>
          </div>
        </div>
      </Drawer>
    </div>
  )
}
