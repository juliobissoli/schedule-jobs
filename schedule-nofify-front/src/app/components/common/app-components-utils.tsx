import { cn } from '@/lib/utils'

export type DashboardPageGenericProps<T = unknown> = {
  children: React.ReactNode
  className?: string
} & T


export function AppPageTitle({
  className,
  children,
}: DashboardPageGenericProps) {
  return (

    <h1
      className={cn([
        `text-lg tracking-widest text-muted-foreground uppercase font-light`,
        className,
      ])}>
      {children}
    </h1>
  )
}