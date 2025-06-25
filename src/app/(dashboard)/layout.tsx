import * as React from "react"
import { Leaf } from "lucide-react"

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarProvider,
  SidebarInset,
} from "@/components/ui/sidebar"
import { DashboardNav } from "@/components/dashboard-nav"
import { Header } from "@/components/header"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar className="hidden lg:flex lg:flex-col lg:border-r">
          <SidebarHeader className="p-4">
            <div className="flex items-center gap-2">
              <div className="bg-primary/20 text-primary rounded-lg p-2">
                <Leaf className="h-6 w-6" />
              </div>
              <h1 className="text-xl font-semibold">AgriVision</h1>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <DashboardNav />
          </SidebarContent>
          <SidebarFooter>
            {/* Can add footer content here */}
          </SidebarFooter>
        </Sidebar>
        <div className="flex flex-1 flex-col">
          <Header />
          <main className="flex-1 overflow-y-auto p-4 pt-6 md:p-6 lg:p-8">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
