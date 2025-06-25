"use client"

import Image from "next/image"
import { Clock, Eye, MessageCircle, PlusCircle, Video } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MOCK_DATA } from "@/lib/mock-data"

export default function TrainingCenterPage() {
  const { videos, forumSummary } = MOCK_DATA.trainingCenter

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Training Center</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Resource
        </Button>
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
  )
}
