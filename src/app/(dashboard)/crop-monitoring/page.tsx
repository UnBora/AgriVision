"use client"

import * as React from "react"
import Image from "next/image"
import {
  File,
  ListFilter,
  MoreHorizontal,
  PlusCircle,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { MOCK_DATA } from "@/lib/mock-data"

export default function CropMonitoringPage() {
  const [selectedCrop, setSelectedCrop] = React.useState<any>(null)
  const crops = MOCK_DATA.cropMonitoring.crops

  return (
    <Dialog>
      <Tabs defaultValue="all">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="healthy">Healthy</TabsTrigger>
            <TabsTrigger value="issue" className="text-destructive">Issues</TabsTrigger>
          </TabsList>
          <div className="ml-auto flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <ListFilter className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Filter
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>
                  Region
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Crop Type</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>
                  Issue
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button size="sm" variant="outline" className="h-8 gap-1">
              <File className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Export
              </span>
            </Button>
            <Button size="sm" className="h-8 gap-1">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Add Crop
              </span>
            </Button>
          </div>
        </div>
        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>Crop Monitoring</CardTitle>
              <CardDescription>
                Real-time data on all your crops across different fields.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Crop Type</TableHead>
                    <TableHead>Field ID</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>NDVI Score</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {crops.map((crop) => (
                    <TableRow key={crop.id}>
                      <TableCell className="font-medium">{crop.type}</TableCell>
                      <TableCell>{crop.fieldId}</TableCell>
                      <TableCell>
                        <Badge variant={crop.issue ? "destructive" : "secondary"}>
                          {crop.issue ? crop.issue : "Healthy"}
                        </Badge>
                      </TableCell>
                      <TableCell>{crop.ndvi}</TableCell>
                      <TableCell>{crop.lastUpdated}</TableCell>
                      <TableCell>
                        <DialogTrigger asChild>
                           <Button 
                              aria-haspopup="true" 
                              size="sm" 
                              variant="outline"
                              onClick={() => setSelectedCrop(crop)}
                            >
                              View Image Analysis
                            </Button>
                        </DialogTrigger>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <div className="text-xs text-muted-foreground">
                Showing <strong>1-6</strong> of <strong>{crops.length}</strong> crops
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
      {selectedCrop && (
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Image Analysis for {selectedCrop.type} in {selectedCrop.fieldId}</DialogTitle>
            <DialogDescription>
              AI-powered analysis of the latest satellite imagery.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            <div className="relative aspect-square rounded-lg overflow-hidden">
                 <Image src="https://placehold.co/600x600.png" alt="Plant" layout="fill" objectFit="cover" data-ai-hint="plant agriculture"/>
            </div>
            <div>
                <h3 className="font-semibold mb-2">Health Report</h3>
                <div className="space-y-2 text-sm">
                    <p><strong>NDVI Score:</strong> <span className="text-primary font-bold">{selectedCrop.ndvi}</span></p>
                    <p><strong>Status:</strong> <Badge variant={selectedCrop.issue ? "destructive" : "secondary"}>{selectedCrop.issue ? selectedCrop.issue : "Healthy"}</Badge></p>
                    {selectedCrop.issue === 'pest' && <p className="text-destructive">Detected signs of aphid infestation on 15% of the sample.</p>}
                    {selectedCrop.issue === 'drought' && <p className="text-destructive">Significant water stress detected. Immediate irrigation recommended.</p>}
                    {!selectedCrop.issue && <p className="text-green-600">Plant is in excellent health. No issues detected.</p>}
                    <p><strong>Recommendation:</strong></p>
                    <p className="text-muted-foreground">{selectedCrop.issue ? 'Deploy targeted pest control drone.' : 'Continue standard monitoring.'}</p>
                </div>
            </div>
          </div>
        </DialogContent>
      )}
    </Dialog>
  )
}
