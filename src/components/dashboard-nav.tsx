"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart,
  Bot,
  CloudSun,
  LayoutDashboard,
  Leaf,
  School,
  Settings,
  Signal,
  Truck,
  Users,
} from "lucide-react"

import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/crop-monitoring", icon: Leaf, label: "Crop Monitoring" },
  { href: "/iot-sensors", icon: Signal, label: "IoT Sensors" },
  { href: "/drone-manager", icon: Bot, label: "Drone Manager" },
  { href: "/climate-tools", icon: CloudSun, label: "Climate Tools" },
  { href: "/supply-chain", icon: Truck, label: "Supply Chain" },
  { href: "/farmer-accounts", icon: Users, label: "Farmer Accounts" },
  { href: "/training-center", icon: School, label: "Training Center" },
  { href: "/analytics-reports", icon: BarChart, label: "Analytics" },
  { href: "/settings", icon: Settings, label: "Settings" },
]

export function DashboardNav() {
  const pathname = usePathname()

  return (
    <SidebarMenu>
      {navItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <Link href={item.href} legacyBehavior passHref>
            <SidebarMenuButton
              isActive={pathname === item.href}
              tooltip={item.label}
            >
              <item.icon />
              <span>{item.label}</span>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  )
}
