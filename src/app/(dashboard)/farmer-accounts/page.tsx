
"use client"

import * as React from "react"
import { Loader2, MessageSquare, MoreHorizontal, PlusCircle } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { MOCK_DATA } from "@/lib/mock-data"
import { translateText } from "@/ai/flows/translate-text-flow"

export default function FarmerAccountsPage() {
  const [farmers, setFarmers] = React.useState(MOCK_DATA.farmerAccounts.farmers)
  const { toast } = useToast()
  
  const [selectedFarmer, setSelectedFarmer] = React.useState<any>(null)
  const [message, setMessage] = React.useState("Warning: Heavy rain expected tomorrow morning. Please take necessary precautions for your crops.")
  const [isTranslating, setIsTranslating] = React.useState(false)

  const [isAddFarmerDialogOpen, setAddFarmerDialogOpen] = React.useState(false)
  const [newFarmerData, setNewFarmerData] = React.useState({
    name: "",
    village: "",
    email: "",
    phoneNumber: "",
    role: "Farmer",
    language: "English",
  })

  const handleAddFarmer = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newFarmerData.name || !newFarmerData.village || !newFarmerData.email || !newFarmerData.phoneNumber) {
      toast({ variant: "destructive", title: "Error", description: "Please fill in all fields." })
      return
    }
    const newFarmer = {
      id: `FARM-${String(Math.floor(Math.random() * 900) + 100).padStart(3, '0')}`,
      ...newFarmerData,
    }
    setFarmers(prevFarmers => [newFarmer, ...prevFarmers])
    setAddFarmerDialogOpen(false)
    setNewFarmerData({ name: "", village: "", email: "", phoneNumber: "", role: "Farmer", language: "English" })
    toast({ title: "Success", description: `${newFarmer.name} has been added.` })
  }

  const handleTranslate = async () => {
    if (!message || !selectedFarmer || selectedFarmer.language.toLowerCase() === 'english') {
      toast({ description: "No translation needed for English." });
      return;
    }
    setIsTranslating(true);
    try {
      const result = await translateText({ text: message, targetLanguage: selectedFarmer.language });
      if (result.translatedText) {
        setMessage(result.translatedText);
        toast({ title: "Message translated successfully!" });
      }
    } catch (error) {
      console.error("Translation failed:", error);
      toast({ title: "Translation Failed", description: "Could not translate message.", variant: "destructive" });
    } finally {
      setIsTranslating(false);
    }
  }

  const farmerRoles = ["Farmer", "Trainer", "Field Agent", "Admin"]
  const languages = ["English", "Khmer", "Korean", "Spanish"]

  return (
    <>
      <Dialog onOpenChange={(open) => !open && setSelectedFarmer(null)}>
          <Card>
          <CardHeader className="flex flex-row items-center justify-between">
              <div>
                  <CardTitle>Farmer Accounts</CardTitle>
                  <CardDescription>Manage all user accounts in the system.</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <DialogTrigger asChild>
                  <Button onClick={() => setAddFarmerDialogOpen(true)}>
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Farmer
                  </Button>
                </DialogTrigger>
              </div>
          </CardHeader>
          <CardContent>
              <Table>
              <TableHeader>
                  <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Village</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
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
                      <TableCell>{farmer.email}</TableCell>
                      <TableCell>{farmer.phoneNumber}</TableCell>
                      <TableCell><Badge variant="outline">{farmer.role}</Badge></TableCell>
                      <TableCell>{farmer.language}</TableCell>
                      <TableCell>
                        <DialogTrigger asChild>
                            <Button variant="ghost" size="sm" onClick={() => setSelectedFarmer(farmer)}>
                                <MessageSquare className="mr-2 h-4 w-4"/> Send SMS
                            </Button>
                        </DialogTrigger>
                      </TableCell>
                  </TableRow>
                  ))}
              </TableBody>
              </Table>
          </CardContent>
          </Card>
          {selectedFarmer && (
              <DialogContent>
                  <DialogHeader>
                      <DialogTitle>Send SMS to {selectedFarmer.name}</DialogTitle>
                      <DialogDescription>
                          Compose a message in English and translate it to {selectedFarmer.language} if needed.
                      </DialogDescription>
                  </DialogHeader>
                  <div className="py-4">
                      <Textarea 
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Type your message here..."
                          rows={5}
                      />
                  </div>
                  <DialogFooter className="gap-2 sm:justify-between">
                    <Button 
                          onClick={handleTranslate} 
                          variant="outline" 
                          disabled={isTranslating || !selectedFarmer || selectedFarmer.language.toLowerCase() === 'english'}>
                          {isTranslating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <MessageSquare className="mr-2 h-4 w-4" />}
                          Translate to {selectedFarmer?.language}
                      </Button>
                      <Button>Send Message</Button>
                  </DialogFooter>
              </DialogContent>
          )}
      </Dialog>

      <Dialog open={isAddFarmerDialogOpen} onOpenChange={setAddFarmerDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleAddFarmer}>
            <DialogHeader>
              <DialogTitle>Add New Farmer</DialogTitle>
              <DialogDescription>
                Enter the details for the new farmer.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newFarmerData.name}
                  onChange={(e) => setNewFarmerData({ ...newFarmerData, name: e.target.value })}
                  className="col-span-3"
                  placeholder="e.g., John Doe"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="village" className="text-right">
                  Village
                </Label>
                <Input
                  id="village"
                  value={newFarmerData.village}
                  onChange={(e) => setNewFarmerData({ ...newFarmerData, village: e.target.value })}
                  className="col-span-3"
                  placeholder="e.g., Kandal"
                />
              </div>
               <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={newFarmerData.email}
                  onChange={(e) => setNewFarmerData({ ...newFarmerData, email: e.target.value })}
                  className="col-span-3"
                  placeholder="e.g., farmer@example.com"
                />
              </div>
               <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phoneNumber" className="text-right">
                  Phone
                </Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  value={newFarmerData.phoneNumber}
                  onChange={(e) => setNewFarmerData({ ...newFarmerData, phoneNumber: e.target.value })}
                  className="col-span-3"
                  placeholder="e.g., 555-123-4567"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right">
                  Role
                </Label>
                <Select
                  value={newFarmerData.role}
                  onValueChange={(value) => setNewFarmerData({ ...newFarmerData, role: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    {farmerRoles.map(role => <SelectItem key={role} value={role}>{role}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="language" className="text-right">
                  Language
                </Label>
                <Select
                  value={newFarmerData.language}
                  onValueChange={(value) => setNewFarmerData({ ...newFarmerData, language: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a language" />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map(lang => <SelectItem key={lang} value={lang}>{lang}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Add Farmer</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
