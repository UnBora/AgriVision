"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SettingsPage() {
  return (
    <div className="grid gap-6">
      <h1 className="text-3xl font-bold tracking-tight">System Settings</h1>
      <Tabs defaultValue="language" className="grid gap-6">
        <TabsList>
          <TabsTrigger value="language">Language & Region</TabsTrigger>
          <TabsTrigger value="roles">User Roles</TabsTrigger>
          <TabsTrigger value="privacy">Privacy & Data</TabsTrigger>
        </TabsList>

        <TabsContent value="language">
          <Card>
            <CardHeader>
              <CardTitle>Language</CardTitle>
              <CardDescription>Choose the display language for the dashboard.</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup defaultValue="english">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="english" id="english" />
                  <Label htmlFor="english">English</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="khmer" id="khmer" />
                  <Label htmlFor="khmer">Khmer (ភាសាខ្មែរ)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="korean" id="korean" />
                  <Label htmlFor="korean">Korean (한국어)</Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roles">
          <Card>
            <CardHeader>
              <CardTitle>User Roles</CardTitle>
              <CardDescription>Define permissions for different user roles.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {['Admin', 'Operator', 'Field Agent', 'Farmer'].map(role => (
                <div key={role} className="flex items-center justify-between rounded-lg border p-4">
                  <p className="font-medium">{role}</p>
                  <Button variant="outline">Edit Permissions</Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy">
          <Card>
            <CardHeader>
              <CardTitle>Privacy & Data</CardTitle>
              <CardDescription>Manage your data sharing and privacy settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="data-sharing">Anonymous Data Sharing</Label>
                  <p className="text-sm text-muted-foreground">Help improve AgriVision by sharing anonymous usage data.</p>
                </div>
                <Switch id="data-sharing" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="location-tracking">Precise Location Tracking</Label>
                   <p className="text-sm text-muted-foreground">Allow drones and sensors to use high-precision GPS.</p>
                </div>
                <Switch id="location-tracking" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="data-retention">Data Retention Policy</Label>
                  <p className="text-sm text-muted-foreground">Automatically delete data older than 2 years.</p>
                </div>
                <Switch id="data-retention" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
