"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { MOCK_DATA, chartConfig } from "@/lib/mock-data"

export default function AnalyticsReportsPage() {
  const { roiByCrop, sustainability } = MOCK_DATA.analytics

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Analytics & Reports</h1>
        <Select defaultValue="roi">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select report type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="roi">Yield & ROI</SelectItem>
            <SelectItem value="sustainability">Sustainability</SelectItem>
            <SelectItem value="compliance">Compliance</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Return on Investment (ROI) by Crop</CardTitle>
          <CardDescription>Analysis of revenue vs. investment for the last season.</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[350px] w-full">
            <BarChart data={roiByCrop}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="crop"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} stackId="a" />
              <Bar dataKey="investment" fill="var(--color-investment)" radius={4} stackId="a" />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Sustainability Report</CardTitle>
          <CardDescription>Key metrics for environmental impact.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Metric</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Change (YoY)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sustainability.map((metric, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{metric.metric}</TableCell>
                  <TableCell>{metric.value}</TableCell>
                  <TableCell className={metric.change.startsWith('-') ? 'text-green-500' : 'text-destructive'}>
                    {metric.change}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
