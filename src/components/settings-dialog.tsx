"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Lock } from "lucide-react"
import { useTheme } from "next-themes"

interface SettingsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSettingsChange: (settings: {
    flowDuration: string
    shortBreakDuration: string
    longBreakDuration: string
    cycleCount: string
    theme: string
  }) => void
  settings: {
    flowDuration: string
    shortBreakDuration: string
    longBreakDuration: string
    cycleCount: string
    theme: string
  }
}

const flowDurations = [
  { value: "15", label: "15 minutos" },
  { value: "20", label: "20 minutos" },
  { value: "25", label: "25 minutos" },
  { value: "30", label: "30 minutos" },
  { value: "45", label: "45 minutos" },
  { value: "50", label: "50 minutos" },
  { value: "60", label: "60 minutos" },
  { value: "90", label: "90 minutos" }
]

const shortBreakDurations = [
  { value: "5", label: "5 minutos" },
  { value: "10", label: "10 minutos" }
]

const longBreakDurations = [
  { value: "15", label: "15 minutos" },
  { value: "20", label: "20 minutos" },
  { value: "30", label: "30 minutos" }
]

const cycleOptions = [
  { value: "2", label: "2 flows + pausa larga" },
  { value: "3", label: "3 flows + pausa larga" },
  { value: "4", label: "4 flows + pausa larga" },
  { value: "5", label: "5 flows + pausa larga" },
  { value: "6", label: "6 flows + pausa larga" }
]

export function SettingsDialog({
  open,
  onOpenChange,
  onSettingsChange,
  settings
}: SettingsDialogProps) {
  const [flowDuration, setFlowDuration] = useState(settings.flowDuration)
  const [shortBreakDuration, setShortBreakDuration] = useState(
    settings.shortBreakDuration
  )
  const [longBreakDuration, setLongBreakDuration] = useState(
    settings.longBreakDuration
  )
  const [cycleCount, setCycleCount] = useState(settings.cycleCount)
  const [theme, setTheme] = useState<string>(settings.theme || "system")
  const { setTheme: setSystemTheme } = useTheme()

  // Update parent component when settings change
  useEffect(() => {
    onSettingsChange({
      flowDuration,
      shortBreakDuration,
      longBreakDuration,
      cycleCount,
      theme
    })
    setSystemTheme(theme)
  }, [
    flowDuration,
    shortBreakDuration,
    longBreakDuration,
    cycleCount,
    theme,
    onSettingsChange,
    setSystemTheme
  ])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-zinc-900 text-zinc-100">
        <DialogHeader>
          <DialogTitle className="text-lg font-normal">
            Configuración
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="grid gap-2">
            <Label htmlFor="flow-duration">Duración de flow</Label>
            <Select value={flowDuration} onValueChange={setFlowDuration}>
              <SelectTrigger
                id="flow-duration"
                className="bg-zinc-800 border-zinc-700"
              >
                <SelectValue placeholder="Seleccionar duración" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-800 border-zinc-700">
                {flowDurations.map((duration) => (
                  <SelectItem
                    key={duration.value}
                    value={duration.value}
                    className="text-zinc-100 focus:bg-zinc-700 focus:text-zinc-100"
                  >
                    {duration.label}
                  </SelectItem>
                ))}
                <SelectItem
                  value="custom"
                  disabled
                  className="text-zinc-400 focus:bg-zinc-700 focus:text-zinc-400"
                >
                  <div className="flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    Personalizar
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="short-break">Duración de pausa corta</Label>
            <Select
              value={shortBreakDuration}
              onValueChange={setShortBreakDuration}
            >
              <SelectTrigger
                id="short-break"
                className="bg-zinc-800 border-zinc-700"
              >
                <SelectValue placeholder="Seleccionar duración" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-800 border-zinc-700">
                {shortBreakDurations.map((duration) => (
                  <SelectItem
                    key={duration.value}
                    value={duration.value}
                    className="text-zinc-100 focus:bg-zinc-700 focus:text-zinc-100"
                  >
                    {duration.label}
                  </SelectItem>
                ))}
                <SelectItem
                  value="custom"
                  disabled
                  className="text-zinc-400 focus:bg-zinc-700 focus:text-zinc-400"
                >
                  <div className="flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    Personalizar
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="long-break">Duración de pausa larga</Label>
            <Select
              value={longBreakDuration}
              onValueChange={setLongBreakDuration}
            >
              <SelectTrigger
                id="long-break"
                className="bg-zinc-800 border-zinc-700"
              >
                <SelectValue placeholder="Seleccionar duración" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-800 border-zinc-700">
                {longBreakDurations.map((duration) => (
                  <SelectItem
                    key={duration.value}
                    value={duration.value}
                    className="text-zinc-100 focus:bg-zinc-700 focus:text-zinc-100"
                  >
                    {duration.label}
                  </SelectItem>
                ))}
                <SelectItem
                  value="custom"
                  disabled
                  className="text-zinc-400 focus:bg-zinc-700 focus:text-zinc-400"
                >
                  <div className="flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    Personalizar
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="cycle-count">Ciclo</Label>
            <Select value={cycleCount} onValueChange={setCycleCount}>
              <SelectTrigger
                id="cycle-count"
                className="bg-zinc-800 border-zinc-700"
              >
                <SelectValue placeholder="Seleccionar ciclo" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-800 border-zinc-700">
                {cycleOptions.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    className="text-zinc-100 focus:bg-zinc-700 focus:text-zinc-100"
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="theme">Theme</Label>
            <Select value={theme} onValueChange={setTheme}>
              <SelectTrigger id="theme" className="bg-zinc-800 border-zinc-700">
                <SelectValue placeholder="Select theme" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-800 border-zinc-700">
                <SelectItem
                  value="light"
                  className="text-zinc-100 focus:bg-zinc-700 focus:text-zinc-100"
                >
                  Light
                </SelectItem>
                <SelectItem
                  value="dark"
                  className="text-zinc-100 focus:bg-zinc-700 focus:text-zinc-100"
                >
                  Dark
                </SelectItem>
                <SelectItem
                  value="system"
                  className="text-zinc-100 focus:bg-zinc-700 focus:text-zinc-100"
                >
                  System
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
