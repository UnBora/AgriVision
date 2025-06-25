"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MOCK_DATA } from "@/lib/mock-data"
import { useToast } from "@/hooks/use-toast"

export default function SettingsPage() {
  const [roles, setRoles] = React.useState(MOCK_DATA.settings.roles)
  const [selectedRole, setSelectedRole] = React.useState<any>(null)
  const [pendingPermissions, setPendingPermissions] = React.useState<string[]>([])
  const { toast } = useToast()

  const handleOpenDialog = (role: any) => {
    setSelectedRole(role)
    setPendingPermissions([...role.permissions])
  }

  const handlePermissionChange = (permissionId: string, checked: boolean) => {
    setPendingPermissions(prev => {
      if (checked) {
        if (permissionId === 'all') return ['all']
        return [...prev, permissionId].filter(p => p !== 'all')
      } else {
        if (permissionId === 'all') return []
        return prev.filter(p => p !== permissionId)
      }
    })
  }

  const handleSaveChanges = () => {
    if (!selectedRole) return
    setRoles(prevRoles =>
      prevRoles.map(r =>
        r.name === selectedRole.name
          ? { ...r, permissions: pendingPermissions }
          : r
      )
    )
    toast({
        title: "Permissions Updated",
        description: `Permissions for the ${selectedRole.name} role have been saved.`,
    })
    setSelectedRole(null) // This will close the dialog
  }

  const allPermissions = MOCK_DATA.settings.allPermissions

  return (
    <Dialog onOpenChange={(open) => !open && setSelectedRole(null)}>
      <div className="grid gap-6">
        <h1 className="text-3xl font-bold tracking-tight">System Settings</h1>
        <Tabs defaultValue="roles" className="grid gap-6">
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
                {roles.map(role => (
                  <div key={role.name} className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                        <p className="font-medium">{role.name}</p>
                        <p className="text-sm text-muted-foreground">
                            {role.permissions.includes('all') ? 'Full Access' : `${role.permissions.length} permissions`}
                        </p>
                    </div>
                    <DialogTrigger asChild>
                      <Button variant="outline" onClick={() => handleOpenDialog(role)}>Edit Permissions</Button>
                    </DialogTrigger>
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

      {selectedRole && (
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Permissions for {selectedRole.name}</DialogTitle>
            <DialogDescription>
              Select the permissions this role should have.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {allPermissions.map(permission => (
              <div key={permission.id} className="flex items-center space-x-3">
                <Checkbox
                  id={`perm-${permission.id}`}
                  checked={pendingPermissions.includes('all') || pendingPermissions.includes(permission.id)}
                  disabled={selectedRole.name === 'Admin' || (pendingPermissions.includes('all') && permission.id !== 'all')}
                  onCheckedChange={(checked) => handlePermissionChange(permission.id, !!checked)}
                />
                <Label htmlFor={`perm-${permission.id}`} className="font-normal flex-1 cursor-pointer">{permission.label}</Label>
              </div>
            ))}
          </div>
          <DialogFooter>
            <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleSaveChanges} disabled={selectedRole.name === 'Admin'}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  )
}
