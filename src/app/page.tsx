import { PomodoroTimer } from "@/components/pomodoro-timer"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-zinc-950">
      <div className="w-full max-w-md mx-auto">
        <PomodoroTimer />
      </div>
    </main>
  )
}
