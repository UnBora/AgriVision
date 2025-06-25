"use client"

import Image from "next/image"
import { Battery, BatteryFull, BatteryLow, MoreHorizontal, PlusCircle } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MOCK_DATA } from "@/lib/mock-data"

export default function DroneManagerPage() {
  const { drones, flightPaths } = MOCK_DATA.droneManager

  const getBatteryIcon = (battery: string) => {
    const level = parseInt(battery)
    if (level > 70) return <BatteryFull className="text-green-500" />
    if (level > 20) return <Battery className="text-yellow-500" />
    return <BatteryLow className="text-destructive" />
  }

  return (
    <Dialog>
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Drone Manager</h1>
            <DialogTrigger asChild>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" /> Schedule Mission
                </Button>
            </DialogTrigger>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Drone Fleet</CardTitle>
              <CardDescription>Overview of all available drones.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Drone ID</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Battery</TableHead>
                    <TableHead>Last Mission</TableHead>
                    <TableHead><span className="sr-only">Actions</span></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {drones.map((drone) => (
                    <TableRow key={drone.id}>
                      <TableCell className="font-medium">{drone.id}</TableCell>
                      <TableCell>
                        <Badge variant={drone.status === 'In-Flight' ? 'default' : 'secondary'}>
                          {drone.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="flex items-center gap-2">
                        {getBatteryIcon(drone.battery)} {drone.battery}
                      </TableCell>
                      <TableCell>{drone.lastMission}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Logs</DropdownMenuItem>
                            <DropdownMenuItem>Abort Mission</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Recent Flight Paths</CardTitle>
              <CardDescription>Visualization of the last 5 drone missions.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative w-full h-[300px] rounded-lg overflow-hidden bg-muted">
                <Image src="https://placehold.co/800x600.png" alt="Map of fields" layout="fill" objectFit="cover" data-ai-hint="farm satellite"/>
                <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 320 200">
                  {flightPaths.map((path, index) => (
                    <path
                      key={index}
                      d={path}
                      stroke={`hsl(${index * 60}, 70%, 50%)`}
                      strokeWidth="2"
                      fill="none"
                      className="animate-pulse"
                      style={{ animationDelay: `${index * 0.2}s` }}
                    />
                  ))}
                </svg>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Schedule New Drone Mission</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="drone-id" className="text-right">Drone</Label>
            <Select>
                <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a drone" />
                </SelectTrigger>
                <SelectContent>
                    {drones.filter(d => d.status === 'Idle').map(d => <SelectItem key={d.id} value={d.id}>{d.id}</SelectItem>)}
                </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="mission-type" className="text-right">Mission Type</Label>
            <Select>
                <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a mission" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="scan">NDVI Scan</SelectItem>
                    <SelectItem value="dust">Crop Dusting</SelectItem>
                    <SelectItem value="pest">Pest Spotting</SelectItem>
                    <SelectItem value="seed">Seeding</SelectItem>
                </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="field-id" className="text-right">Field ID</Label>
            <Input id="field-id" defaultValue="F01" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Schedule</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
