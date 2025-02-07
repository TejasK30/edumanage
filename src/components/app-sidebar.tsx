"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar"
import {
  Bell,
  BookOpen,
  Calendar,
  ClipboardList,
  Command,
  Frame,
  Gauge,
  Library,
  Map,
  PieChart,
  SquareTerminal,
  User,
} from "lucide-react"
import React from "react"
import { NavMain } from "./nav-main"
import { NavProjects } from "./nav-projects"
import { NavUser } from "./nav-user"
import { TeamSwitcher } from "./team-switcher"

const data = {
  user: {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "/avatars/student.jpg",
  },
  teams: [
    {
      name: "Computer Science Dept.",
      logo: Gauge,
      plan: "Enrolled",
    },
    {
      name: "Mathematics Club",
      logo: Command,
      plan: "Member",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/student/dashboard",
      icon: SquareTerminal,
      isActive: true,
      items: [
        { title: "Overview", url: "/student/dashboard" },
        { title: "Progress", url: "/student/progress" },
      ],
    },
    {
      title: "Courses",
      url: "/student/courses",
      icon: BookOpen,
      items: [
        { title: "Current Courses", url: "/student/courses" },
        { title: "Completed Courses", url: "/student/completed-courses" },
      ],
    },
    {
      title: "Assignments",
      url: "/student/assignments",
      icon: ClipboardList,
      items: [
        { title: "Upcoming", url: "/student/assignments/upcoming" },
        { title: "Submitted", url: "/student/assignments/submitted" },
      ],
    },
    {
      title: "Exams",
      url: "/student/exams",
      icon: Calendar,
      items: [
        { title: "Schedule", url: "/student/exams/schedule" },
        { title: "Results", url: "/student/exams/results" },
      ],
    },
    {
      title: "Library",
      url: "/student/library",
      icon: Library,
    },
    {
      title: "Profile",
      url: "/student/profile",
      icon: User,
    },
    {
      title: "Notifications",
      url: "/student/notifications",
      icon: Bell,
    },
  ],
  projects: [
    {
      name: "AI Research",
      url: "/student/projects/ai-research",
      icon: Frame,
    },
    {
      name: "Mathematics Club",
      url: "/student/projects/math-club",
      icon: PieChart,
    },
    {
      name: "Geography Field Work",
      url: "/student/projects/geo-fieldwork",
      icon: Map,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
