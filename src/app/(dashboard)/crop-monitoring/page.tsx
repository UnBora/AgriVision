
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
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { MOCK_DATA } from "@/lib/mock-data"
import { useToast } from "@/hooks/use-toast"

export default function CropMonitoringPage() {
  const [crops, setCrops] = React.useState(MOCK_DATA.cropMonitoring.crops)
  const [selectedCrop, setSelectedCrop] = React.useState<any>(null)
  const [activeTab, setActiveTab] = React.useState("all")
  const [regionFilter, setRegionFilter] = React.useState("All")
  const [isAddDialogOpen, setAddDialogOpen] = React.useState(false)
  const [newCropData, setNewCropData] = React.useState({
    type: "",
    fieldId: "",
    region: "North",
  })
  const { toast } = useToast()

  const regions = ["All", ...Array.from(new Set(MOCK_DATA.cropMonitoring.crops.map((c) => c.region)))]

  const handleExport = async () => {
    const XLSX = await import("xlsx")
    const headers = ["Crop Type", "Field ID", "Region", "Status", "NDVI Score", "Last Updated"];
    const data = filteredCrops.map(crop => [
        crop.type,
        crop.fieldId,
        crop.region,
        crop.issue ? crop.issue : "Healthy",
        crop.ndvi,
        crop.lastUpdated,
    ]);

    const worksheet = XLSX.utils.aoa_to_sheet([headers, ...data]);

    // Adjust column widths for better readability
    const columnWidths = headers.map(header => ({
        wch: Math.max(header.length, 15) // width in characters
    }));
    worksheet['!cols'] = columnWidths;

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "CropData");
    
    XLSX.writeFile(workbook, "AgriVision_Crop_Data.xlsx");

    toast({ title: "Success", description: "Crop data has been exported to an Excel file." })
  }

  const handleAddCrop = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newCropData.type || !newCropData.fieldId) {
        toast({ variant: "destructive", title: "Error", description: "Please fill in all fields." })
        return
    }
    const newCrop = {
      id: `${newCropData.type.toUpperCase().substring(0,4)}-${String(Math.floor(Math.random() * 900) + 100).padStart(3, '0')}`,
      ndvi: (Math.random() * (0.95 - 0.55) + 0.55).toFixed(2),
      lastUpdated: 'Just now',
      issue: null,
      ...newCropData,
    }
    setCrops(prevCrops => [newCrop, ...prevCrops])
    setAddDialogOpen(false)
    setNewCropData({ type: '', fieldId: '', region: 'North' })
    toast({ title: "Success", description: `${newCrop.type} in field ${newCrop.fieldId} added.` })
  }
  
  const filteredCrops = React.useMemo(() => {
    return crops
      .filter((crop) => {
        if (activeTab === 'healthy') return !crop.issue
        if (activeTab === 'issue') return !!crop.issue
        return true
      })
      .filter((crop) => {
        if (regionFilter === 'All') return true
        return crop.region === regionFilter
      })
  }, [crops, activeTab, regionFilter])

  return (
    <>
      <Dialog onOpenChange={(isOpen) => !isOpen && setSelectedCrop(null)}>
        <Tabs defaultValue="all" onValueChange={setActiveTab}>
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
                  <DropdownMenuLabel>Filter by Region</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup value={regionFilter} onValueChange={setRegionFilter}>
                    {regions.map((region) => (
                      <DropdownMenuRadioItem key={region} value={region}>{region}</DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button size="sm" variant="outline" className="h-8 gap-1" onClick={handleExport}>
                <File className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Export
                </span>
              </Button>
              <DialogTrigger asChild>
                <Button size="sm" className="h-8 gap-1" onClick={() => setAddDialogOpen(true)}>
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Add Crop
                    </span>
                </Button>
              </DialogTrigger>
            </div>
          </div>
          <TabsContent value={activeTab}>
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
                      <TableHead>Region</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>NDVI Score</TableHead>
                      <TableHead>Last Updated</TableHead>
                      <TableHead>
                        <span className="sr-only">Actions</span>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCrops.map((crop) => (
                      <TableRow key={crop.id}>
                        <TableCell className="font-medium">{crop.type}</TableCell>
                        <TableCell>{crop.fieldId}</TableCell>
                        <TableCell>{crop.region}</TableCell>
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
                  Showing <strong>1-{filteredCrops.length}</strong> of <strong>{crops.length}</strong> crops
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* Analysis Dialog Content */}
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
            <DialogFooter>
                <DialogClose asChild>
                    <Button variant="outline">Close</Button>
                </DialogClose>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
      
      {/* Add Crop Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={handleAddCrop}>
          <DialogHeader>
            <DialogTitle>Add New Crop</DialogTitle>
            <DialogDescription>
              Enter the details for the new crop to monitor.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">
                Crop Type
              </Label>
              <Input
                id="type"
                value={newCropData.type}
                onChange={(e) => setNewCropData({ ...newCropData, type: e.target.value })}
                className="col-span-3"
                placeholder="e.g., Corn, Wheat"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="fieldId" className="text-right">
                Field ID
              </Label>
              <Input
                id="fieldId"
                value={newCropData.fieldId}
                onChange={(e) => setNewCropData({ ...newCropData, fieldId: e.target.value })}
                className="col-span-3"
                placeholder="e.g., F07"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="region" className="text-right">
                Region
              </Label>
              <Select 
                value={newCropData.region} 
                onValueChange={(value) => setNewCropData({ ...newCropData, region: value })}
              >
                  <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select a region" />
                  </SelectTrigger>
                  <SelectContent>
                      {regions.filter(r => r !== 'All').map(region => <SelectItem key={region} value={region}>{region}</SelectItem>)}
                  </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Add Crop</Button>
          </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
