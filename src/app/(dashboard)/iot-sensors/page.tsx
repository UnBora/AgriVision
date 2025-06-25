"use client"

import { PlusCircle, Wifi, WifiOff } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { MOCK_DATA, chartConfig } from "@/lib/mock-data"

export default function IoTSensorsPage() {
  const { sensors, soilData } = MOCK_DATA.iotSensors

  return (
    <div className="grid gap-4 md:gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">IoT Sensors</h1>
          <p className="text-muted-foreground">Manage and monitor all your IoT devices.</p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Sensor
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {sensors.map((sensor) => (
          <Card key={sensor.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{sensor.type}</CardTitle>
              {sensor.status === "Online" ? (
                <Wifi className="h-4 w-4 text-green-500" />
              ) : (
                <WifiOff className="h-4 w-4 text-destructive" />
              )}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{sensor.value}</div>
              <p className="text-xs text-muted-foreground">
                ID: {sensor.id}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Real-time Soil Data</CardTitle>
          <CardDescription>Live data stream from active sensors in Field F01.</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <BarChart data={soilData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="time"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 5)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Bar dataKey="moisture" fill="var(--color-moisture)" radius={4} />
              <Bar dataKey="pH" fill="var(--color-pH)" radius={4} />
              <Bar dataKey="temp" fill="var(--color-temp)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
