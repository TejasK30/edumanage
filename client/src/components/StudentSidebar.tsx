"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { StudentNavItems } from "@/constants/studentConstants"
import { Briefcase, School, Users } from "lucide-react"
import React, { useEffect, useState } from "react"
import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"
import { TeamSwitcher } from "./team-switcher"

type StudentSidebarProps = React.ComponentProps<typeof Sidebar> & {
  studentId?: string
  clubs?: Array<{ name: string; logo: any; plan: string }>
}

export default function StudentSidebar({
  studentId,
  clubs = [],
  ...props
}: StudentSidebarProps) {
  const [studentData, setStudentData] = useState({
    user: {
      name: "John Doe",
      email: "john.doe@engineering.edu.in",
      avatar: "/avatars/student.jpg",
    },
    teams: clubs.length
      ? clubs
      : [
          { name: "Robotics Club", logo: School, plan: "Member" },
          { name: "Coding Society", logo: Briefcase, plan: "Member" },
          { name: "Tech Fest Organizers", logo: Users, plan: "Lead" },
        ],
  })

  const [academicInfo, setAcademicInfo] = useState({
    semester: 5,
    department: "Computer Science",
    className: "CS302",
    dues: 0,
  })

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (studentId) {
      setIsLoading(true)
      fetch(`/api/students/${studentId}`)
        .then((res) => res.json())
        .then((data) => {
          setStudentData({
            user: {
              name: data.fullName,
              email: data.email,
              avatar: "/avatars/student.jpg",
            },
            teams: clubs.length ? clubs : studentData.teams,
          })

          setAcademicInfo({
            semester: data.currentSemester,
            department: data.department,
            className: data.className,
            dues: parseFloat(data.dues),
          })

          setIsLoading(false)
        })
        .catch((err) => {
          console.error("Failed to fetch student data:", err)
          setIsLoading(false)
        })
    }
  }, [studentId])

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={studentData.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={StudentNavItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={studentData.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
