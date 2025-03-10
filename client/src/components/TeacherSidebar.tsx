"use client"
import React, { useEffect, useState } from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { NavMain } from "./nav-main"
import { NavProjects } from "./nav-projects"
import { NavUser } from "./nav-user"
import { TeamSwitcher } from "./team-switcher"
import { Award, BookOpen } from "lucide-react"
import {
  TeacherNavItems,
  TeacherProjectItems,
  TeacherQuickAccess,
} from "@/constants/teacherConstants"

type TeacherSidebarProps = React.ComponentProps<typeof Sidebar> & {
  teacherId?: string
  departments?: Array<{ name: string; logo: any; plan: string }>
}

export default function TeacherSidebar({
  teacherId,
  departments = [],
  ...props
}: TeacherSidebarProps) {
  const [teacherData, setTeacherData] = useState({
    user: {
      name: "Jane Smith",
      email: "jane.smith@college.edu",
      avatar: "/avatars/teacher.jpg",
    },
    teams: departments.length
      ? departments
      : [
          {
            name: "Mathematics Department",
            logo: BookOpen,
            plan: "Department",
          },
          { name: "Science Faculty", logo: Award, plan: "Department" },
        ],
  })

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (teacherId) {
      setIsLoading(true)
      fetch(`/api/teachers/${teacherId}`)
        .then((res) => res.json())
        .then((data) => {
          setTeacherData({
            user: {
              name: `${data.firstName} ${data.lastName}`,
              email: data.user.email,
              avatar: "/avatars/teacher.jpg",
            },
            teams: data.departments || teacherData.teams,
          })
          setIsLoading(false)
        })
        .catch((err) => {
          console.error("Failed to fetch teacher data:", err)
          setIsLoading(false)
        })
    }
  }, [teacherId])

  return (
    <Sidebar collapsible="icon" className="bg-white shadow-lg" {...props}>
      <SidebarHeader className="border-b">
        <TeamSwitcher teams={teacherData.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={TeacherNavItems} />
        <NavProjects projects={TeacherQuickAccess} />
        <NavProjects projects={TeacherProjectItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={teacherData.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
