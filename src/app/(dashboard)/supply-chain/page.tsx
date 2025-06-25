"use client"

import Image from "next/image"
import { ListFilter, MoreHorizontal, Truck } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MOCK_DATA } from "@/lib/mock-data"

export default function SupplyChainPage() {
  const { products } = MOCK_DATA.supplyChain

  return (
    <Dialog>
        <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle>Supply Chain Management</CardTitle>
                <CardDescription>Track products from farm to market.</CardDescription>
            </div>
            <div className="flex gap-2">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="h-8 gap-1">
                        <ListFilter className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                            Filter
                        </span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>Filter by Season</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Summer</DropdownMenuItem>
                        <DropdownMenuItem>Autumn</DropdownMenuItem>
                        <DropdownMenuItem>Winter</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <DialogTrigger asChild>
                    <Button>
                        <Truck className="mr-2 h-4 w-4" /> Optimize Route
                    </Button>
                </DialogTrigger>
            </div>
        </CardHeader>
        <CardContent>
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Expected Yield</TableHead>
                <TableHead>Storage Temp.</TableHead>
                <TableHead>Market Price</TableHead>
                <TableHead>Season</TableHead>
                <TableHead><span className="sr-only">Actions</span></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {products.map((product) => (
                <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.product}</TableCell>
                    <TableCell>{product.yield}</TableCell>
                    <TableCell>{product.storageTemp}</TableCell>
                    <TableCell>{product.marketPrice}</TableCell>
                    <TableCell>
                        <Badge variant="outline">{product.season}</Badge>
                    </TableCell>
                    <TableCell>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Track Shipment</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </CardContent>
        </Card>
        <DialogContent className="sm:max-w-[800px]">
            <DialogHeader>
            <DialogTitle>AI Route Optimization</DialogTitle>
            <DialogDescription>
                Most efficient delivery path from farm to distribution center.
            </DialogDescription>
            </DialogHeader>
            <div className="relative w-full h-[450px] rounded-lg overflow-hidden bg-muted mt-4">
                <Image src="https://placehold.co/800x600.png" alt="Map with route" layout="fill" objectFit="cover" data-ai-hint="map route"/>
                 <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 300 200">
                    <path
                        d="M20 150 C 50 50, 150 50, 280 180"
                        stroke="hsl(var(--primary))"
                        strokeWidth="3"
                        fill="none"
                        strokeDasharray="5,5"
                        className="animate-pulse"
                    />
                    <circle cx="20" cy="150" r="5" fill="hsl(var(--accent))" stroke="white" strokeWidth="2" />
                    <circle cx="280" cy="180" r="5" fill="hsl(var(--accent))" stroke="white" strokeWidth="2" />
                </svg>
            </div>
        </DialogContent>
    </Dialog>
  )
}
