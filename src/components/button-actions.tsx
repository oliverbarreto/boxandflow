import { Button } from "@/components/ui/button"
import { RotateCcw, BarChart3, EllipsisVertical, Box } from "lucide-react"

interface ButtonActionsProps {
  showActions: boolean
  resetTimer: () => void
  setShowTimeBox: (show: boolean) => void
  setShowStats: (show: boolean) => void
  setShowSettings: (show: boolean) => void
}

export function ButtonActions({
  showActions,
  resetTimer,
  setShowTimeBox,
  setShowStats,
  setShowSettings
}: ButtonActionsProps) {
  return (
    <div className="flex gap-2">
      <div
        className={`flex gap-2 transition-opacity duration-200 ${
          showActions ? "opacity-100" : "opacity-0"
        }`}
      >
        <Button variant="ghost" size="icon" onClick={resetTimer}>
          <RotateCcw className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowTimeBox(true)}
        >
          <Box className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => setShowStats(true)}>
          <BarChart3 className="h-4 w-4" />
        </Button>
      </div>
      <Button variant="ghost" size="icon" onClick={() => setShowSettings(true)}>
        <EllipsisVertical className="h-4 w-4" />
      </Button>
    </div>
  )
}
