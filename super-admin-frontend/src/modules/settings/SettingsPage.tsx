import React, { useState } from 'react'
import { Save, Clock, Shield, Bell, MapPin, Siren, ScrollText, Check } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Switch, Badge } from '@/components/ui'

const SettingRow: React.FC<{ label: string; description: string; children: React.ReactNode }> = ({ label, description, children }) => (
  <div className="flex items-center justify-between py-4 border-b border-gray-50">
    <div className="flex-1 pr-8">
      <p className="text-sm font-medium text-gray-900">{label}</p>
      <p className="text-xs text-gray-500 mt-0.5">{description}</p>
    </div>
    <div className="shrink-0">{children}</div>
  </div>
)

export default function SettingsPage() {
  const [saved, setSaved] = useState(false)
  const [settings, setSettings] = useState({
    slaResponseTime: '4',
    slaResolutionTime: '24',
    sessionTimeout: '30',
    maxLoginAttempts: '5',
    gpsAccuracyThreshold: '50',
    sosAutoEscalate: true,
    sosEscalateAfter: '5',
    emailNotifications: true,
    smsNotifications: true,
    auditRetentionDays: '90',
    twoFactorAuth: true,
    maintenanceMode: false,
  })

  const set = (key: string, val: string | boolean) => setSettings(s => ({ ...s, [key]: val }))
  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000) }

  const sections = [
    {
      title: 'SLA Configuration', icon: <Clock className="h-4 w-4 text-blue-600" />, settings: [
        { label: 'Initial Response SLA (hours)', desc: 'Maximum time to first respond to a new incident', key: 'slaResponseTime', type: 'input' },
        { label: 'Resolution SLA (hours)', desc: 'Maximum time to resolve a non-critical incident', key: 'slaResolutionTime', type: 'input' },
      ],
    },
    {
      title: 'Security Settings', icon: <Shield className="h-4 w-4 text-purple-600" />, settings: [
        { label: 'Session Timeout (minutes)', desc: 'Auto-logout after inactivity period', key: 'sessionTimeout', type: 'input' },
        { label: 'Max Login Attempts', desc: 'Lock account after N failed attempts', key: 'maxLoginAttempts', type: 'input' },
        { label: 'Two-Factor Authentication', desc: 'Require 2FA for all Super Admin logins', key: 'twoFactorAuth', type: 'switch' },
        { label: 'Maintenance Mode', desc: 'Restrict access to maintenance operations only', key: 'maintenanceMode', type: 'switch' },
      ],
    },
    {
      title: 'GPS & Tracking', icon: <MapPin className="h-4 w-4 text-green-600" />, settings: [
        { label: 'GPS Accuracy Threshold (meters)', desc: 'Alert if GPS accuracy drops below this threshold', key: 'gpsAccuracyThreshold', type: 'input' },
      ],
    },
    {
      title: 'SOS Configuration', icon: <Siren className="h-4 w-4 text-red-600" />, settings: [
        { label: 'Auto-Escalate SOS', desc: 'Automatically escalate unacknowledged SOS alerts', key: 'sosAutoEscalate', type: 'switch' },
        { label: 'Escalate After (minutes)', desc: 'Escalate SOS if not acknowledged within N minutes', key: 'sosEscalateAfter', type: 'input' },
      ],
    },
    {
      title: 'Notifications', icon: <Bell className="h-4 w-4 text-amber-600" />, settings: [
        { label: 'Email Notifications', desc: 'Send alerts via email to configured recipients', key: 'emailNotifications', type: 'switch' },
        { label: 'SMS Notifications', desc: 'Send critical alerts via SMS', key: 'smsNotifications', type: 'switch' },
      ],
    },
    {
      title: 'Audit Policy', icon: <ScrollText className="h-4 w-4 text-gray-600" />, settings: [
        { label: 'Audit Log Retention (days)', desc: 'How long to retain immutable audit logs', key: 'auditRetentionDays', type: 'input' },
      ],
    },
  ]

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">System Settings</h1>
          <p className="text-sm text-gray-500 mt-0.5">Platform-wide configuration and operational policies</p>
        </div>
        <Button onClick={handleSave}>
          {saved ? <><Check className="h-4 w-4" /> Saved!</> : <><Save className="h-4 w-4" /> Save All Settings</>}
        </Button>
      </div>

      <div className="grid grid-cols-12 gap-4">
        {sections.map(section => (
          <div key={section.title} className="col-span-12 lg:col-span-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">{section.icon}{section.title}</CardTitle>
              </CardHeader>
              <CardContent>
                {section.settings.map(s => (
                  <SettingRow key={s.key} label={s.label} description={s.desc}>
                    {s.type === 'switch'
                      ? <Switch checked={settings[s.key as keyof typeof settings] as boolean} onChange={v => set(s.key, v)} />
                      : <Input value={settings[s.key as keyof typeof settings] as string} onChange={e => set(s.key, e.target.value)} className="w-24 text-center" />}
                  </SettingRow>
                ))}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  )
}
