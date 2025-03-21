"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "./ui/sidebar"
import { AdminNavItems } from "@/constants/adminConstants"
import { Building2, DollarSign, School } from "lucide-react"
import React, { useEffect, useState } from "react"
import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"
import { TeamSwitcher } from "./team-switcher"

type AdminSidebarProps = React.ComponentProps<typeof Sidebar> & {
  adminId?: string
  departments?: Array<{ name: string; logo: any; plan: string }>
}

export default function AdminSidebar({
  adminId,
  departments = [],
  ...props
}: AdminSidebarProps) {
  const [adminData, setAdminData] = useState({
    user: {
      name: "Admin User",
      email: "admin@college.edu",
      avatar: "/avatars/admin.jpg",
    },
    departments: departments.length
      ? departments
      : [
          { name: "Computer Science", logo: School, plan: "Department" },
          { name: "Engineering", logo: Building2, plan: "Department" },
          { name: "Business School", logo: DollarSign, plan: "Department" },
        ],
  })

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (adminId) {
      setIsLoading(true)
      fetch(`/api/staff/${adminId}`)
        .then((res) => res.json())
        .then((data) => {
          setAdminData({
            user: {
              name: `${data.firstName} ${data.lastName}`,
              email: data.user.email,
              avatar: "/avatars/admin.jpg",
            },
            departments: departments.length
              ? departments
              : adminData.departments,
          })
          setIsLoading(false)
        })
        .catch((err) => {
          console.error("Failed to fetch admin data:", err)
          setIsLoading(false)
        })
    }
  }, [adminId])

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={adminData.departments} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={AdminNavItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={adminData.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
