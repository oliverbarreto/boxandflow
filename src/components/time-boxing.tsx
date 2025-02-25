"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"

interface TimeBoxingProps {
  showForm: boolean
  onOpenChange: (open: boolean) => void
}

export function TimeBoxing({ showForm, onOpenChange }: TimeBoxingProps) {
  const [startTime, setStartTime] = useState("09:00")
  const [endTime, setEndTime] = useState("17:00")
  const [progress, setProgress] = useState(0)
  const [isTimeSet, setIsTimeSet] = useState(false)
  const [elapsedHours, setElapsedHours] = useState(0)

  const calculateProgress = useCallback((startTime: Date, duration: number) => {
    const now = new Date()
    const elapsedTime = now.getTime() - startTime.getTime()
    const progress = Math.min((elapsedTime / (duration * 60 * 1000)) * 100, 100)
    setProgress(progress)
    setElapsedHours(elapsedTime / (60 * 60 * 1000))
    return progress
  }, [])

  useEffect(() => {
    if (!isTimeSet) return

    const now = new Date()
    const interval = setInterval(() => {
      const start = new Date(now.toDateString() + " " + startTime)
      const end = new Date(now.toDateString() + " " + endTime)
      const duration = (end.getTime() - start.getTime()) / (60 * 1000)
      calculateProgress(start, duration)
    }, 1000)

    return () => clearInterval(interval)
  }, [calculateProgress, endTime, isTimeSet, startTime])

  const handleSetTime = () => {
    setIsTimeSet(true)
    onOpenChange(false)
    const now = new Date()
    calculateProgress(
      new Date(now.toDateString() + " " + startTime),
      (new Date(now.toDateString() + " " + endTime).getTime() -
        new Date(now.toDateString() + " " + startTime).getTime()) /
        1000
    )
  }

  return (
    <>
      <div className="flex flex-col mr-8 justify-center">
        {isTimeSet ? (
          <div className="relative flex items-center">
            <div className="flex flex-col items-center">
              {/* End Time */}
              <span className="text-[0.6rem] text-zinc-400 mb-1">
                {endTime}
              </span>
              {/* Progress Bar */}
              <div className="relative w-8 h-20 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="absolute bottom-0 left-0 right-0 bg-emerald-500 transition-all duration-1000 ease-in-out"
                  style={{ height: `${progress}%` }}
                />
              </div>
              {/* Start Time */}
              <span className="text-[0.6rem] text-zinc-400 mt-1">
                {startTime}
              </span>
            </div>
            {elapsedHours > 0 && (
              <span className="absolute left-0 top-1/2 -translate-y-1/2 ml-2 text-[0.6rem] text-white text-light">
                {elapsedHours.toFixed(1)}h
              </span>
            )}
          </div>
        ) : null}
      </div>

      <Dialog open={showForm} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[425px] bg-zinc-900 text-zinc-100">
          <DialogHeader>
            <DialogTitle className="text-lg font-normal">
              Set Time-Boxing
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="start-time" className="text-right">
                  Start Time
                </Label>
                <Input
                  id="start-time"
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="bg-zinc-800 border-zinc-700 text-zinc-100"
                />
              </div>
              <div>
                <Label htmlFor="end-time" className="text-right">
                  End Time
                </Label>
                <Input
                  id="end-time"
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="bg-zinc-800 border-zinc-700 text-zinc-100"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <Button onClick={handleSetTime}>Set</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
