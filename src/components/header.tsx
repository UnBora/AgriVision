"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Bell, Home, PanelLeft, Search } from "lucide-react"
import { ModeToggle } from "./mode-toggle"
import { DashboardNav } from "./dashboard-nav"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"

export function Header() {
  const pathname = usePathname()
  const pageTitle = pathname.split("/").pop()?.replace(/-/g, " ") || "Dashboard"

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <nav className="grid gap-6 text-lg font-medium">
            <DashboardNav />
          </nav>
        </SheetContent>
      </Sheet>
      <Breadcrumb className="hidden md:flex">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard">
                <Home className="h-4 w-4" />
                <span className="sr-only">Dashboard</span>
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="capitalize">{pageTitle}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="relative ml-auto flex-1 md:grow-0">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search..."
          className="w-full rounded-lg bg-secondary pl-8 md:w-[200px] lg:w-[320px]"
        />
      </div>
      <ModeToggle />
      <Button variant="ghost" size="icon" className="relative">
        <Bell className="h-5 w-5" />
        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">3</span>
        <span className="sr-only">Toggle notifications</span>
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="overflow-hidden rounded-full">
            <Avatar>
              <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="User" />
              <AvatarFallback>FA</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}

// Minimal Breadcrumb components for Header
const Breadcrumb = ({
    className,
    ...props
  }: React.ComponentProps<"nav">) => {
    return <nav aria-label="breadcrumb" className={className} {...props} />
}

const BreadcrumbList = React.forwardRef<
    HTMLOListElement,
    React.ComponentProps<"ol">
  >(({ className, ...props }, ref) => (
    <ol
      ref={ref}
      className={`flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5 ${className}`}
      {...props}
    />
))
BreadcrumbList.displayName = "BreadcrumbList"

const BreadcrumbItem = React.forwardRef<
    HTMLLIElement,
    React.ComponentProps<"li">
  >(({ className, ...props }, ref) => (
    <li
      ref={ref}
      className={`inline-flex items-center gap-1.5 ${className}`}
      {...props}
    />
))
BreadcrumbItem.displayName = "BreadcrumbItem"

const BreadcrumbLink = React.forwardRef<
    HTMLAnchorElement,
    React.ComponentProps<"a"> & {
      asChild?: boolean
    }
  >(({ asChild, className, ...props }, ref) => {
    const Comp = asChild ? "span" : "a"
    return (
      <Comp
        ref={ref}
        className={`transition-colors hover:text-foreground ${className}`}
        {...props}
      />
    )
})
BreadcrumbLink.displayName = "BreadcrumbLink"

const BreadcrumbPage = React.forwardRef<
    HTMLSpanElement,
    React.ComponentProps<"span">
  >(({ className, ...props }, ref) => (
    <span
      ref={ref}
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={`font-normal text-foreground ${className}`}
      {...props}
    />
))
BreadcrumbPage.displayName = "BreadcrumbPage"

const BreadcrumbSeparator = ({
    children,
    className,
    ...props
  }: React.ComponentProps<"li">) => (
    <li
      role="presentation"
      aria-hidden="true"
      className={`[&>svg]:size-3.5 ${className}`}
      {...props}
    >
      {children ?? <ChevronRightIcon />}
    </li>
)
BreadcrumbSeparator.displayName = "BreadcrumbSeparator"


function ChevronRightIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m9 18 6-6-6-6" />
      </svg>
    )
  }
