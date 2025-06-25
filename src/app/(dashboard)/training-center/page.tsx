
"use client"

import * as React from "react"
import Image from "next/image"
import { Clock, Eye, MessageCircle, PlusCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { MOCK_DATA } from "@/lib/mock-data"

export default function TrainingCenterPage() {
  const [videos, setVideos] = React.useState(MOCK_DATA.trainingCenter.videos)
  const { forumSummary } = MOCK_DATA.trainingCenter
  
  const [isAddDialogOpen, setAddDialogOpen] = React.useState(false)
  const [newResourceData, setNewResourceData] = React.useState({
    title: "",
    duration: "",
    thumbnailUrl: "https://placehold.co/600x400.png",
  })
  const { toast } = useToast()

  const handleAddResource = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newResourceData.title || !newResourceData.duration) {
      toast({ variant: "destructive", title: "Error", description: "Please fill in all required fields." })
      return
    }
    const newVideo = {
      id: `VID-${String(Math.floor(Math.random() * 900) + 100).padStart(3, '0')}`,
      views: 0,
      "data-ai-hint": "training farmer",
      ...newResourceData,
    }
    setVideos(prevVideos => [newVideo, ...prevVideos])
    setAddDialogOpen(false)
    setNewResourceData({ title: '', duration: '', thumbnailUrl: 'https://placehold.co/600x400.png' })
    toast({ title: "Success", description: `${newVideo.title} has been added.` })
  }

  return (
    <Dialog open={isAddDialogOpen} onOpenChange={setAddDialogOpen}>
      <div className="grid gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Training Center</h1>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> Add Resource
            </Button>
          </DialogTrigger>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Video Tutorials</CardTitle>
            <CardDescription>A collection of tutorials to help farmers.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {videos.map((video) => (
              <Card key={video.id}>
                <CardContent className="p-0">
                  <div className="relative aspect-video">
                    <Image
                      src={video.thumbnailUrl}
                      alt={video.title}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-t-lg"
                      data-ai-hint={video['data-ai-hint']}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-2 leading-tight">{video.title}</h3>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {video.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-3 w-3" /> {video.views.toLocaleString()} views
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Forum Summary</CardTitle>
            <CardDescription>Recent hot topics from the community forum.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {forumSummary.map((post, index) => (
                <li key={index} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{post.topic}</p>
                    <p className="text-sm text-muted-foreground">Last post: {post.lastPost}</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MessageCircle className="h-4 w-4" />
                    <span>{post.replies} replies</span>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleAddResource}>
          <DialogHeader>
            <DialogTitle>Add New Resource</DialogTitle>
            <DialogDescription>
              Enter the details for the new training video. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                value={newResourceData.title}
                onChange={(e) => setNewResourceData({ ...newResourceData, title: e.target.value })}
                className="col-span-3"
                placeholder="e.g., Advanced Irrigation"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="duration" className="text-right">
                Duration
              </Label>
              <Input
                id="duration"
                value={newResourceData.duration}
                onChange={(e) => setNewResourceData({ ...newResourceData, duration: e.target.value })}
                className="col-span-3"
                placeholder="e.g., 12:45"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="thumbnailUrl" className="text-right">
                Thumbnail URL
              </Label>
              <Input
                id="thumbnailUrl"
                value={newResourceData.thumbnailUrl}
                onChange={(e) => setNewResourceData({ ...newResourceData, thumbnailUrl: e.target.value })}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Add Resource</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
