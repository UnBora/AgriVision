"use client"

import { MessageSquare, MoreHorizontal, PlusCircle } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { MOCK_DATA } from "@/lib/mock-data"

export default function FarmerAccountsPage() {
  const { farmers } = MOCK_DATA.farmerAccounts

  return (
    <Dialog>
        <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle>Farmer Accounts</CardTitle>
                <CardDescription>Manage all user accounts in the system.</CardDescription>
            </div>
            <div className="flex items-center gap-2">
            <Select>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by language" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Languages</SelectItem>
                    <SelectItem value="khmer">Khmer</SelectItem>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="korean">Korean</SelectItem>
                </SelectContent>
            </Select>
            <Button><PlusCircle className="mr-2 h-4 w-4" /> Add Farmer</Button>
            </div>
        </CardHeader>
        <CardContent>
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Village</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Language</TableHead>
                <TableHead><span className="sr-only">Actions</span></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {farmers.map((farmer) => (
                <TableRow key={farmer.id}>
                    <TableCell className="font-medium flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={`https://i.pravatar.cc/40?u=${farmer.id}`} />
                            <AvatarFallback>{farmer.name.substring(0,2)}</AvatarFallback>
                        </Avatar>
                        {farmer.name}
                    </TableCell>
                    <TableCell>{farmer.village}</TableCell>
                    <TableCell><Badge variant="outline">{farmer.role}</Badge></TableCell>
                    <TableCell>{farmer.language}</TableCell>
                    <TableCell>
                    <DialogTrigger asChild>
                        <Button variant="ghost" size="sm"><MessageSquare className="mr-2 h-4 w-4"/> Send SMS</Button>
                    </DialogTrigger>
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </CardContent>
        </Card>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Send SMS Alert</DialogTitle>
                <DialogDescription>Compose and send an SMS to the selected user group.</DialogDescription>
            </DialogHeader>
            <div className="py-4">
                <Textarea placeholder="Type your message here. e.g., 'Warning: Heavy rain expected tomorrow morning.'" />
            </div>
            <DialogFooter>
                <Button>Send Message</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}
