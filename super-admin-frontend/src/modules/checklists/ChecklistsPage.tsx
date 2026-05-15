import React, { useState } from 'react'
import { Plus, GripVertical, Eye, Edit2, Trash2, Upload, ToggleLeft, Check, X } from 'lucide-react'
import { Card, CardContent, Button, Badge, Modal } from '@/components/ui'
import { cn } from '@/utils'

interface Question { id: string; order: number; text: string; type: 'yes_no_na' | 'numeric' | 'multiple_choice'; mandatory: boolean; requireUpload: boolean; requireRemark: boolean; riskScore: number }
interface Checklist { id: string; title: string; type: 'patrol' | 'occurrence'; status: 'draft' | 'published'; questions: Question[]; version: number }

const INITIAL: Checklist[] = [
  { id: 'cl1', title: 'Morning Gate Patrol Checklist', type: 'patrol', status: 'published', version: 3,
    questions: [
      { id: 'q1', order: 1, text: 'All entry gates checked and secured?', type: 'yes_no_na', mandatory: true, requireUpload: false, requireRemark: false, riskScore: 8 },
      { id: 'q2', order: 2, text: 'CCTV cameras operational?', type: 'yes_no_na', mandatory: true, requireUpload: true, requireRemark: false, riskScore: 9 },
      { id: 'q3', order: 3, text: 'Number of vehicles in parking', type: 'numeric', mandatory: false, requireUpload: false, requireRemark: false, riskScore: 2 },
      { id: 'q4', order: 4, text: 'Any suspicious activity observed?', type: 'yes_no_na', mandatory: true, requireUpload: false, requireRemark: true, riskScore: 10 },
    ] },
  { id: 'cl2', title: 'Fire Safety Occurrence Report', type: 'occurrence', status: 'draft', version: 1,
    questions: [
      { id: 'q5', order: 1, text: 'Fire extinguisher present at location?', type: 'yes_no_na', mandatory: true, requireUpload: true, requireRemark: false, riskScore: 10 },
      { id: 'q6', order: 2, text: 'Evacuation route clear?', type: 'yes_no_na', mandatory: true, requireUpload: false, requireRemark: false, riskScore: 9 },
    ] },
]

const Q_TYPE_COLORS: Record<string, string> = {
  yes_no_na: 'bg-blue-50 text-blue-700 border-blue-200',
  numeric: 'bg-green-50 text-green-700 border-green-200',
  multiple_choice: 'bg-purple-50 text-purple-700 border-purple-200',
}

export default function ChecklistsPage() {
  const [checklists, setChecklists] = useState(INITIAL)
  const [selected, setSelected] = useState<Checklist>(INITIAL[0])
  const [showAdd, setShowAdd] = useState(false)
  const [preview, setPreview] = useState(false)

  const addQuestion = () => {
    const newQ: Question = { id: `q${Date.now()}`, order: selected.questions.length + 1, text: 'New question', type: 'yes_no_na', mandatory: false, requireUpload: false, requireRemark: false, riskScore: 5 }
    const updated = { ...selected, questions: [...selected.questions, newQ] }
    setSelected(updated)
    setChecklists(prev => prev.map(c => c.id === selected.id ? updated : c))
  }

  const publish = () => {
    const updated = { ...selected, status: selected.status === 'draft' ? 'published' as const : 'draft' as const }
    setSelected(updated)
    setChecklists(prev => prev.map(c => c.id === selected.id ? updated : c))
  }

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Checklist Builder</h1>
          <p className="text-sm text-gray-500 mt-0.5">Build and manage patrol & occurrence checklists</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setPreview(true)}><Eye className="h-4 w-4" /> Preview</Button>
          <Button onClick={() => setShowAdd(true)}><Plus className="h-4 w-4" /> New Checklist</Button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4">
        {/* Checklist List */}
        <div className="col-span-12 lg:col-span-4 space-y-2">
          {checklists.map(cl => (
            <Card key={cl.id} onClick={() => setSelected(cl)} className={cn('cursor-pointer card-hover p-4', selected.id === cl.id ? 'ring-2 ring-blue-500' : '')}>
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900">{cl.title}</p>
                  <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                    <Badge variant={cl.type === 'patrol' ? 'info' : 'warning'}>{cl.type}</Badge>
                    <Badge variant={cl.status === 'published' ? 'success' : 'default'}>{cl.status}</Badge>
                    <span className="text-[10px] text-gray-400">v{cl.version}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{cl.questions.length} questions</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Builder Canvas */}
        <div className="col-span-12 lg:col-span-8">
          <Card>
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <div>
                <h2 className="text-sm font-bold text-gray-900">{selected.title}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant={selected.status === 'published' ? 'success' : 'default'}>{selected.status}</Badge>
                  <span className="text-xs text-gray-400">v{selected.version} · {selected.questions.length} questions</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant={selected.status === 'published' ? 'outline' : 'default'} onClick={publish}>
                  {selected.status === 'published' ? 'Unpublish' : 'Publish'}
                </Button>
                <Button size="sm" onClick={addQuestion}><Plus className="h-3.5 w-3.5" /> Add Question</Button>
              </div>
            </div>
            <CardContent className="pt-4 space-y-2">
              {selected.questions.map((q, i) => (
                <div key={q.id} className="flex items-start gap-3 p-3 rounded-lg border border-gray-100 hover:border-gray-200 bg-white hover:bg-gray-50/50 transition-all group">
                  <GripVertical className="h-4 w-4 text-gray-300 mt-0.5 cursor-grab shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-xs font-bold text-gray-400">Q{q.order}</span>
                      <span className={cn('inline-flex items-center rounded border px-1.5 py-0.5 text-[10px] font-medium', Q_TYPE_COLORS[q.type])}>{q.type.replace(/_/g, '/')}</span>
                      {q.mandatory && <Badge variant="danger" className="text-[10px] px-1.5 py-0">Required</Badge>}
                      {q.requireUpload && <Badge variant="info" className="text-[10px] px-1.5 py-0"><Upload className="h-2.5 w-2.5" /> Upload</Badge>}
                      {q.requireRemark && <Badge variant="warning" className="text-[10px] px-1.5 py-0">Remark</Badge>}
                      <span className="text-[10px] text-gray-400 ml-auto">Risk: {q.riskScore}/10</span>
                    </div>
                    <p className="text-sm text-gray-800">{q.text}</p>
                    {q.type === 'yes_no_na' && (
                      <div className="flex gap-2 mt-2">
                        {['Yes', 'No', 'N/A'].map(opt => (
                          <span key={opt} className="px-2 py-0.5 text-xs rounded-md bg-gray-100 text-gray-600">{opt}</span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                    <button className="p-1 text-gray-400 hover:text-blue-600 rounded"><Edit2 className="h-3.5 w-3.5" /></button>
                    <button className="p-1 text-gray-400 hover:text-red-600 rounded"><Trash2 className="h-3.5 w-3.5" /></button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Preview Modal */}
      <Modal open={preview} onClose={() => setPreview(false)} title={`Preview: ${selected.title}`} className="max-w-2xl">
        <div className="space-y-4">
          <div className="flex gap-2 flex-wrap">
            <Badge variant="info">{selected.type}</Badge>
            <Badge variant={selected.status === 'published' ? 'success' : 'default'}>{selected.status}</Badge>
          </div>
          {selected.questions.map(q => (
            <div key={q.id} className="p-3 bg-gray-50 rounded-lg border border-gray-100">
              <p className="text-sm font-medium text-gray-800 mb-2">{q.order}. {q.text} {q.mandatory && <span className="text-red-500">*</span>}</p>
              {q.type === 'yes_no_na' && (
                <div className="flex gap-2">
                  {['Yes', 'No', 'N/A'].map(o => <button key={o} className="px-3 py-1 text-xs rounded-lg border border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-colors">{o}</button>)}
                </div>
              )}
              {q.type === 'numeric' && <input type="number" className="h-8 w-32 rounded-lg border border-gray-200 px-2 text-sm" placeholder="Enter value" />}
              {q.requireRemark && <textarea className="mt-2 w-full h-16 rounded-lg border border-gray-200 p-2 text-xs resize-none" placeholder="Remark…" />}
              {q.requireUpload && (
                <div className="mt-2 flex items-center gap-2 p-2 border-2 border-dashed border-gray-200 rounded-lg">
                  <Upload className="h-4 w-4 text-gray-400" />
                  <span className="text-xs text-gray-500">Upload evidence</span>
                </div>
              )}
            </div>
          ))}
          <Button className="w-full" onClick={() => setPreview(false)}>Close Preview</Button>
        </div>
      </Modal>
    </div>
  )
}
