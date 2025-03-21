"use client"

import StudentSidebar from "@/components/StudentSidebar"
import DynamicBreadcrumb from "@/components/DynamicBreadCrumb"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <StudentSidebar />
        <div className="flex-1 flex flex-col">
          <SidebarTrigger />
          <div className="px-4">
            <DynamicBreadcrumb />
          </div>
          <main className="p-4 flex-1">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}
