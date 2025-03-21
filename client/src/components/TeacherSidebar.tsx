"use client"

import React, { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"
import { TeamSwitcher } from "./team-switcher"
import { Award, BookOpen, Sun, Moon, Laptop } from "lucide-react"
import { TeacherNavItems } from "@/constants/teacherConstants"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

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
  const { theme, setTheme } = useTheme()

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
      </SidebarContent>
      <SidebarFooter>
        <div className="mb-4 px-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="w-full">
                Theme:{" "}
                {theme === "dark"
                  ? "Dark"
                  : theme === "light"
                  ? "Light"
                  : "System"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onSelect={() => setTheme("light")}>
                <div className="flex items-center gap-2">
                  <Sun className="w-4 h-4" />
                  <span>Light</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setTheme("dark")}>
                <div className="flex items-center gap-2">
                  <Moon className="w-4 h-4" />
                  <span>Dark</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setTheme("system")}>
                <div className="flex items-center gap-2">
                  <Laptop className="w-4 h-4" />
                  <span>System</span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <NavUser user={teacherData.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
