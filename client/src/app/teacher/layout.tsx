"use client"

import StudentSidebar from "@/components/StudentSidebar"
import TeacherSidebar from "@/components/TeacherSidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <TeacherSidebar />
        <SidebarTrigger />
        {children}
      </div>
    </SidebarProvider>
  )
}
