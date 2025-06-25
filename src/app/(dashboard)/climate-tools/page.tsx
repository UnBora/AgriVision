"use client"

import { CloudDrizzle, CloudLightning, CloudSun, Droplets, Sun, Thermometer } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { MOCK_DATA } from "@/lib/mock-data"

const weatherIcons: { [key: string]: React.ElementType } = {
  "cloud-sun": CloudSun,
  sun: Sun,
  "cloud-drizzle": CloudDrizzle,
  "cloud-lightning": CloudLightning,
}

export default function ClimateToolsPage() {
  const { forecast, recommendations } = MOCK_DATA.climateTools

  return (
    <div className="grid gap-6">
      <h1 className="text-3xl font-bold tracking-tight">Climate Tools</h1>
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Weather Forecast</CardTitle>
            <CardDescription>Next 4-day forecast for your primary location.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {forecast.map((day, index) => {
              const Icon = weatherIcons[day.icon] || Sun
              return (
                <div key={index} className="flex flex-col items-center gap-2 rounded-lg border p-4">
                  <h3 className="font-semibold">{day.day}</h3>
                  <Icon className="h-12 w-12 text-primary" />
                  <div className="flex items-center gap-2">
                    <Thermometer className="h-4 w-4 text-muted-foreground" />
                    <span>{day.temp}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Droplets className="h-4 w-4 text-muted-foreground" />
                    <span>{day.rain}</span>
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Irrigation Scheduler</CardTitle>
            <CardDescription>
              Plan your irrigation schedule for the week.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0 flex justify-center">
            <Calendar
              mode="single"
              selected={new Date()}
              className="p-0"
              modifiers={{
                irrigation: [new Date(), new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)]
              }}
              modifiersStyles={{
                irrigation: {
                    border: '2px solid hsl(var(--primary))',
                    borderRadius: '50%'
                }
              }}
            />
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Climate Recommendations</CardTitle>
          <CardDescription>AI-powered suggestions based on climate data.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {recommendations.map((rec, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg">{rec.crop}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{rec.recommendation}</p>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
