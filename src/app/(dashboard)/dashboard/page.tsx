"use client"

import { Activity, AlertTriangle, Droplets, Wind } from "lucide-react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { MOCK_DATA, chartConfig } from "@/lib/mock-data"
import { ChartContainer } from "@/components/ui/chart"
import Image from 'next/image'

export default function Dashboard() {
  const { activeSensors, cropHealthAlerts, droneFlightsToday, weeklyRainForecast, fieldHeatmapData } = MOCK_DATA.dashboard

  return (
    <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
      <div className="grid gap-4 md:grid-cols-2 xl:col-span-3 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Active Sensors
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeSensors}</div>
            <p className="text-xs text-muted-foreground">
              +2 from last hour
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Crop Health Alerts
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{cropHealthAlerts}</div>
            <p className="text-xs text-muted-foreground">
              3 new alerts require attention
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Drone Flights Today</CardTitle>
            <Wind className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{droneFlightsToday}</div>
            <p className="text-xs text-muted-foreground">
              +5 missions compared to yesterday
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Weekly Rain Forecast
            </CardTitle>
            <Droplets className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="pb-2">
            <ChartContainer config={chartConfig} className="h-[50px] w-full">
              <BarChart accessibilityLayer data={weeklyRainForecast}>
                <Bar dataKey="rain" fill="var(--color-rain)" radius={2} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="xl:col-span-3">
        <CardHeader>
          <CardTitle>Interactive Field Map</CardTitle>
          <CardDescription>
            Heatmap showing field data hotspots. Click on a point for details.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] rounded-lg overflow-hidden">
            <Image 
                src="https://placehold.co/1200x600.png"
                alt="Field map" 
                layout="fill"
                objectFit="cover"
                data-ai-hint="farm satellite"
            />
            {fieldHeatmapData.map((point, index) => {
                const color = `hsla(120, 100%, 50%, ${point.value})`
                return (
                    <div 
                        key={index} 
                        className="absolute rounded-full transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all hover:scale-125"
                        style={{
                            top: point.top,
                            left: point.left,
                            width: `${point.value * 50 + 20}px`,
                            height: `${point.value * 50 + 20}px`,
                            background: `radial-gradient(circle, ${color} 0%, transparent 70%)`
                        }}
                    />
                )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
