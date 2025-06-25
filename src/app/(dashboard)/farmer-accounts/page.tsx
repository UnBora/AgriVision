"use client"

import * as React from "react"
import { Loader2, MessageSquare, MoreHorizontal, PlusCircle } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { MOCK_DATA } from "@/lib/mock-data"
import { translateText } from "@/ai/flows/translate-text-flow"

export default function FarmerAccountsPage() {
  const { farmers } = MOCK_DATA.farmerAccounts
  const { toast } = useToast()
  
  const [selectedFarmer, setSelectedFarmer] = React.useState<any>(null)
  const [message, setMessage] = React.useState("Warning: Heavy rain expected tomorrow morning. Please take necessary precautions for your crops.")
  const [isTranslating, setIsTranslating] = React.useState(false)

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

  return (
    <Dialog onOpenChange={(open) => !open && setSelectedFarmer(null)}>
        <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle>Farmer Accounts</CardTitle>
                <CardDescription>Manage all user accounts in the system.</CardDescription>
            </div>
            <div className="flex items-center gap-2">
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
  )
}
