"use client"

import AdminSidebar from "@/components/AdminSidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AdminSidebar />
        <SidebarTrigger />
        {children}
      </div>
    </SidebarProvider>
  )
}
