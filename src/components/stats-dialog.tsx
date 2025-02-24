"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { StatsView } from "@/components/stats-view"

interface StatsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  totalFocusPeriods: number
}

export function StatsDialog({ open, onOpenChange, totalFocusPeriods }: StatsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-zinc-900 text-zinc-100">
        <DialogHeader>
          <DialogTitle className="text-lg font-normal">Statistics</DialogTitle>
        </DialogHeader>
        <StatsView totalFocusPeriods={totalFocusPeriods} />
      </DialogContent>
    </Dialog>
  )
}

