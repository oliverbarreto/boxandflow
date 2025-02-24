import { Button } from "@/components/ui/button"
import { Play, Pause } from "lucide-react"

interface TimerProps {
  timeLeft: number
  cycleCount: number
  status: "idle" | "running" | "paused"
  toggleTimer: () => void
  formatTime: (seconds: number) => string
}

export function Timer({
  timeLeft,
  cycleCount,
  status,
  toggleTimer,
  formatTime
}: TimerProps) {
  return (
    <>
      {/* Timer Display */}
      <div className="text-center mb-8">
        <div className="text-6xl font-light text-zinc-100 mb-6">
          {formatTime(timeLeft)}
        </div>
        <div className="flex justify-center gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className={`h-2 w-2 rounded-full ${
                i === cycleCount ? "bg-emerald-500" : "bg-zinc-700"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Timer Control */}
      <div className="flex justify-center">
        <Button
          variant="ghost"
          size="icon"
          className="h-12 w-12 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20"
          onClick={toggleTimer}
        >
          {status === "running" ? (
            <Pause className="h-5 w-5 text-emerald-500" />
          ) : (
            <Play className="h-5 w-5 text-emerald-500" />
          )}
        </Button>
      </div>
    </>
  )
}
