import * as React from 'react'
import { cn } from '@/utils'

// ── Button ──────────────────────────────────────────────────
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'destructive' | 'secondary' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  loading?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', loading, children, disabled, ...props }, ref) => {
    const base = 'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed'
    const variants = {
      default: 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 shadow-sm',
      outline: 'border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-300',
      ghost: 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
      destructive: 'bg-red-600 text-white hover:bg-red-700',
      secondary: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
      link: 'text-blue-600 underline-offset-4 hover:underline p-0 h-auto',
    }
    const sizes = {
      default: 'h-9 px-4 py-2 text-sm',
      sm: 'h-7 px-3 text-xs',
      lg: 'h-11 px-6 text-base',
      icon: 'h-9 w-9',
    }
    return (
      <button ref={ref} className={cn(base, variants[variant], sizes[size], className)} disabled={disabled || loading} {...props}>
        {loading && <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />}
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'

// ── Badge ────────────────────────────────────────────────────
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'outline'
}

export const Badge: React.FC<BadgeProps> = ({ className, variant = 'default', ...props }) => {
  const variants = {
    default: 'bg-gray-100 text-gray-700 border-gray-200',
    success: 'bg-green-100 text-green-700 border-green-200',
    warning: 'bg-amber-100 text-amber-700 border-amber-200',
    danger: 'bg-red-100 text-red-700 border-red-200',
    info: 'bg-blue-100 text-blue-700 border-blue-200',
    outline: 'border-gray-300 text-gray-600 bg-white',
  }
  return (
    <span className={cn('inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium', variants[variant], className)} {...props} />
  )
}

// ── Card ─────────────────────────────────────────────────────
export const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <div className={cn('bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm', className)} {...props} />
)

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <div className={cn('flex flex-col gap-1 p-6 pb-4', className)} {...props} />
)

export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({ className, ...props }) => (
  <h3 className={cn('text-[15px] font-semibold text-gray-900 dark:text-gray-100 leading-tight', className)} {...props} />
)

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <div className={cn('px-6 pb-6 pt-0', className)} {...props} />
)

// ── Input ────────────────────────────────────────────────────
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        'flex h-9 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100',
        className
      )}
      {...props}
    />
  )
)
Input.displayName = 'Input'

// ── Select ───────────────────────────────────────────────────
export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, ...props }, ref) => (
    <select
      ref={ref}
      className={cn(
        'flex h-9 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100',
        className
      )}
      {...props}
    />
  )
)
Select.displayName = 'Select'

// ── Switch ───────────────────────────────────────────────────
export interface SwitchProps {
  checked: boolean
  onChange: (checked: boolean) => void
  className?: string
}

export const Switch: React.FC<SwitchProps> = ({ checked, onChange, className }) => (
  <button
    role="switch"
    aria-checked={checked}
    onClick={() => onChange(!checked)}
    className={cn(
      'relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
      checked ? 'bg-blue-600' : 'bg-gray-200',
      className
    )}
  >
    <span className={cn('pointer-events-none block h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200', checked ? 'translate-x-4' : 'translate-x-0')} />
  </button>
)

// ── Separator ────────────────────────────────────────────────
export const Separator: React.FC<{ className?: string; orientation?: 'horizontal' | 'vertical' }> = ({ className, orientation = 'horizontal' }) => (
  <div className={cn('shrink-0 bg-gray-100 dark:bg-gray-800', orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px', className)} />
)

// ── Avatar ───────────────────────────────────────────────────
export const Avatar: React.FC<{ name: string; size?: 'sm' | 'md' | 'lg'; className?: string }> = ({ name, size = 'md', className }) => {
  const initials = name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
  const colors = ['bg-blue-500', 'bg-purple-500', 'bg-green-500', 'bg-amber-500', 'bg-rose-500', 'bg-indigo-500']
  const color = colors[name.charCodeAt(0) % colors.length]
  const sizes = { sm: 'h-7 w-7 text-xs', md: 'h-8 w-8 text-sm', lg: 'h-10 w-10 text-base' }
  return (
    <div className={cn('flex items-center justify-center rounded-full font-semibold text-white', color, sizes[size], className)}>
      {initials}
    </div>
  )
}

// ── Spinner ──────────────────────────────────────────────────
export const Spinner: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn('h-5 w-5 animate-spin rounded-full border-2 border-gray-200 border-t-blue-600', className)} />
)

// ── Skeleton ─────────────────────────────────────────────────
export const Skeleton: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn('animate-pulse rounded-md bg-gray-100 dark:bg-gray-800', className)} />
)

// ── EmptyState ───────────────────────────────────────────────
export const EmptyState: React.FC<{ icon?: React.ReactNode; title: string; description?: string; action?: React.ReactNode }> = ({ icon, title, description, action }) => (
  <div className="flex flex-col items-center justify-center py-16 text-center gap-3">
    {icon && <div className="text-gray-300 mb-2">{icon}</div>}
    <p className="text-sm font-medium text-gray-500">{title}</p>
    {description && <p className="text-xs text-gray-400 max-w-xs">{description}</p>}
    {action && <div className="mt-2">{action}</div>}
  </div>
)

// ── Tooltip ──────────────────────────────────────────────────
export const Tooltip: React.FC<{ children: React.ReactNode; content: string }> = ({ children, content }) => (
  <div className="relative group inline-flex">
    {children}
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-50">
      <div className="bg-gray-900 text-white text-xs rounded-md px-2 py-1 whitespace-nowrap shadow-lg">{content}</div>
    </div>
  </div>
)

// ── Modal/Dialog ──────────────────────────────────────────────
export const Modal: React.FC<{ open: boolean; onClose: () => void; title: string; children: React.ReactNode; className?: string }> = ({ open, onClose, title, children, className }) => {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className={cn('relative bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-lg border border-gray-100 dark:border-gray-800', className)}>
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h2 className="text-base font-semibold text-gray-900">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  )
}

// ── Drawer ────────────────────────────────────────────────────
export const Drawer: React.FC<{ open: boolean; onClose: () => void; title: string; children: React.ReactNode; width?: string }> = ({ open, onClose, title, children, width = 'max-w-lg' }) => (
  <div className={cn('fixed inset-0 z-50 flex justify-end transition-all', open ? 'visible' : 'invisible')}>
    <div className={cn('absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300', open ? 'opacity-100' : 'opacity-0')} onClick={onClose} />
    <div className={cn('relative h-full bg-white dark:bg-gray-900 shadow-2xl border-l border-gray-100 dark:border-gray-800 flex flex-col w-full transition-transform duration-300 ease-out', width, open ? 'translate-x-0' : 'translate-x-full')}>
      <div className="flex items-center justify-between p-5 border-b border-gray-100 shrink-0">
        <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">{title}</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-5">{children}</div>
    </div>
  </div>
)

// ── Table ─────────────────────────────────────────────────────
export const Table: React.FC<React.HTMLAttributes<HTMLTableElement>> = ({ className, ...props }) => (
  <div className="w-full overflow-auto"><table className={cn('w-full caption-bottom text-sm', className)} {...props} /></div>
)
export const TableHeader: React.FC<React.HTMLAttributes<HTMLTableSectionElement>> = ({ className, ...props }) => (
  <thead className={cn('[&_tr]:border-b border-gray-100 bg-gray-50/50', className)} {...props} />
)
export const TableBody: React.FC<React.HTMLAttributes<HTMLTableSectionElement>> = ({ className, ...props }) => (
  <tbody className={cn('[&_tr:last-child]:border-0', className)} {...props} />
)
export const TableRow: React.FC<React.HTMLAttributes<HTMLTableRowElement>> = ({ className, ...props }) => (
  <tr className={cn('border-b border-gray-50 hover:bg-gray-50/70 transition-colors', className)} {...props} />
)
export const TableHead: React.FC<React.ThHTMLAttributes<HTMLTableCellElement>> = ({ className, ...props }) => (
  <th className={cn('h-10 px-4 text-left align-middle text-xs font-semibold text-gray-500 uppercase tracking-wide', className)} {...props} />
)
export const TableCell: React.FC<React.TdHTMLAttributes<HTMLTableCellElement>> = ({ className, ...props }) => (
  <td className={cn('px-4 py-3 align-middle text-sm text-gray-700 dark:text-gray-300', className)} {...props} />
)
