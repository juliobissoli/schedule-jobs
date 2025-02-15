"use client"

import * as React from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface DebouncedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string
  change: (value: string) => void
  debounceMs?: number
}

export default function DebouncedInput({
  value: initialValue,
  change,
  debounceMs = 500,
  className,
  ...props
}: DebouncedInputProps) {
  const [value, setValue] = React.useState(initialValue)

  React.useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      change(value)
    }, debounceMs)

    return () => clearTimeout(timeout)
  }, [value, debounceMs, change])

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input {...props} value={value} onChange={(e) => setValue(e.target.value)} className={`pl-9 ${className}`} />
    </div>
  )
}

