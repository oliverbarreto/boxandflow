"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

// Mock data for the chart
const mockData = {
  daily: [
    { name: "L", flows: 4 },
    { name: "M", flows: 6 },
    { name: "X", flows: 5 },
    { name: "J", flows: 7 },
    { name: "V", flows: 4 },
    { name: "S", flows: 3 },
    { name: "D", flows: 2 }
  ],
  weekly: [
    { name: "Sem 1", flows: 25 },
    { name: "Sem 2", flows: 30 },
    { name: "Sem 3", flows: 28 },
    { name: "Sem 4", flows: 32 }
  ],
  monthly: [
    { name: "Ene", flows: 100 },
    { name: "Feb", flows: 120 },
    { name: "Mar", flows: 110 },
    { name: "Abr", flows: 130 },
    { name: "May", flows: 125 },
    { name: "Jun", flows: 135 }
  ],
  yearly: [
    { name: "2023", flows: 1200 },
    { name: "2024", flows: 1500 },
    { name: "2025", flows: 1800 }
  ]
}

interface StatsViewProps {
  totalFocusPeriods: number
}

export function StatsView({ totalFocusPeriods }: StatsViewProps) {
  const [activeTab, setActiveTab] = useState("daily")

  return (
    <Card className="w-full bg-zinc-900/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-xl font-medium text-zinc-100">
          Estadísticas
        </CardTitle>
        <CardDescription className="text-zinc-400">
          Resumen de tus flows completados
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <h2 className="text-lg font-medium text-zinc-100">
            Total Focus Periods
          </h2>
          <p className="text-3xl font-bold text-emerald-500">
            {totalFocusPeriods}
          </p>
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-zinc-800">
            <TabsTrigger value="daily">Diario</TabsTrigger>
            <TabsTrigger value="weekly">Semanal</TabsTrigger>
            <TabsTrigger value="monthly">Mensual</TabsTrigger>
            <TabsTrigger value="yearly">Anual</TabsTrigger>
          </TabsList>
          {Object.entries(mockData).map(([period, data]) => (
            <TabsContent key={period} value={period} className="mt-4">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                  <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}`}
                  />
                  <Bar dataKey="flows" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}
