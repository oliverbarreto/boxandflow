"use client"

import { useState, useEffect, useRef } from "react"

import { SettingsDialog } from "@/components/settings-dialog"
import { StatsDialog } from "@/components/stats-dialog"
import { TimeBoxing } from "@/components/time-boxing"
import { Timer } from "@/components/timer"
import { ButtonActions } from "@/components/button-actions"

type TimerState = "focus" | "shortBreak" | "longBreak"
type TimerStatus = "idle" | "running" | "paused"

export function PomodoroTimer() {
  const [timeLeft, setTimeLeft] = useState(25 * 60)
  const [timerState, setTimerState] = useState<TimerState>("focus")
  const [status, setStatus] = useState<TimerStatus>("idle")
  const [showSettings, setShowSettings] = useState(false)
  const [showStats, setShowStats] = useState(false)
  const [showTimeBox, setShowTimeBox] = useState(false)
  const [cycleCount, setCycleCount] = useState(0)
  const [totalFocusPeriods, setTotalFocusPeriods] = useState(0)
  const [showActions, setShowActions] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const [settings, setSettings] = useState({
    flowDuration: "25",
    shortBreakDuration: "5",
    longBreakDuration: "30",
    cycleCount: "4",
    theme: "dark"
  })

  // Convert settings to numbers for calculations
  const flowDurationSeconds = parseInt(settings.flowDuration) * 60
  const shortBreakDurationSeconds = parseInt(settings.shortBreakDuration) * 60
  const longBreakDurationSeconds = parseInt(settings.longBreakDuration) * 60
  const focusPeriodsBeforeLongBreak = parseInt(settings.cycleCount)

  // Initialize timeLeft based on settings
  useEffect(() => {
    if (status === "idle") {
      setTimeLeft(
        timerState === "focus"
          ? flowDurationSeconds
          : timerState === "shortBreak"
          ? shortBreakDurationSeconds
          : longBreakDurationSeconds
      )
    }
  }, [
    timerState,
    status,
    flowDurationSeconds,
    shortBreakDurationSeconds,
    longBreakDurationSeconds
  ])

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (status === "running") {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            audioRef.current?.play().catch(() => {})
            setStatus("idle")

            if (timerState === "focus") {
              setTotalFocusPeriods((prev) => prev + 1)
              setCycleCount((prev) => prev + 1)
              if (cycleCount + 1 >= focusPeriodsBeforeLongBreak) {
                setTimerState("longBreak")
                setCycleCount(0)
                return longBreakDurationSeconds
              } else {
                setTimerState("shortBreak")
                return shortBreakDurationSeconds
              }
            } else {
              setTimerState("focus")
              return flowDurationSeconds
            }
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [
    status,
    timerState,
    cycleCount,
    focusPeriodsBeforeLongBreak,
    flowDurationSeconds,
    shortBreakDurationSeconds,
    longBreakDurationSeconds
  ])

  const toggleTimer = () => {
    setStatus((prev) => (prev === "running" ? "paused" : "running"))
  }

  const resetTimer = () => {
    setStatus("idle")
    setTimeLeft(
      timerState === "focus"
        ? flowDurationSeconds
        : timerState === "shortBreak"
        ? shortBreakDurationSeconds
        : longBreakDurationSeconds
    )
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`
  }

  return (
    <>
      <div
        className="flex rounded-lg bg-zinc-900/50 p-6 backdrop-blur-sm"
        onMouseEnter={() => setShowActions(true)}
        onMouseLeave={() => setShowActions(false)}
      >
        <audio ref={audioRef} src="/audio/bellsound.mp3" preload="auto" />
        <TimeBoxing showForm={showTimeBox} onOpenChange={setShowTimeBox} />
        <div className="flex-grow">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-xl font-medium text-zinc-100">
              {timerState === "focus" ? "Flow" : "Pausa"}
            </h1>
            <ButtonActions
              showActions={showActions}
              resetTimer={resetTimer}
              setShowTimeBox={setShowTimeBox}
              setShowStats={setShowStats}
              setShowSettings={setShowSettings}
            />
          </div>

          <Timer
            timeLeft={timeLeft}
            cycleCount={cycleCount}
            status={status}
            toggleTimer={toggleTimer}
            formatTime={formatTime}
          />
        </div>
      </div>

      <SettingsDialog
        open={showSettings}
        onOpenChange={setShowSettings}
        settings={settings}
        onSettingsChange={setSettings}
      />
      <StatsDialog
        open={showStats}
        onOpenChange={setShowStats}
        totalFocusPeriods={totalFocusPeriods}
      />
    </>
  )
}
