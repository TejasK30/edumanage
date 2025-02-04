"use client"

import * as React from "react"
import {
  GraduationCap,
  Users,
  BookOpen,
  Calendar,
  ClipboardList,
  Library,
  Settings2,
  School,
  Building2,
  DollarSign,
  UserCog,
  Bell,
  BarChart,
  MessageSquare,
  LifeBuoy,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "Admin User",
    email: "admin@college.edu",
    avatar: "/avatars/admin.jpg",
  },
  departments: [
    { name: "Computer Science", logo: School, plan: "Department" },
    { name: "Engineering", logo: Building2, plan: "Department" },
    { name: "Business School", logo: DollarSign, plan: "Department" },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: BarChart,
      isActive: true,
      items: [
        { title: "Overview", url: "/dashboard/overview" },
        { title: "Analytics", url: "/dashboard/analytics" },
        { title: "Reports", url: "/dashboard/reports" },
      ],
    },
    {
      title: "Students",
      url: "/students",
      icon: GraduationCap,
      items: [
        { title: "All Students", url: "/students/all" },
        { title: "Admissions", url: "/students/admissions" },
        { title: "Attendance", url: "/students/attendance" },
        { title: "Performance", url: "/students/performance" },
        { title: "Student Portal", url: "/students/portal" }, // 🔥 NEW FEATURE
      ],
    },
    {
      title: "Faculty",
      url: "/faculty",
      icon: Users,
      items: [
        { title: "Directory", url: "/faculty/directory" },
        { title: "Schedules", url: "/faculty/schedules" },
        { title: "Departments", url: "/faculty/departments" },
      ],
    },
    {
      title: "Academics",
      url: "/academics",
      icon: BookOpen,
      items: [
        { title: "Courses", url: "/academics/courses" },
        { title: "Programs", url: "/academics/programs" },
        { title: "Curriculum", url: "/academics/curriculum" },
        { title: "Assignments", url: "/academics/assignments" }, // 🔥 NEW FEATURE
        { title: "Examinations", url: "/academics/exams" }, // 🔥 NEW FEATURE
      ],
    },
    {
      title: "Schedule",
      url: "/schedule",
      icon: Calendar,
      items: [
        { title: "Class Schedule", url: "/schedule/classes" },
        { title: "Exam Schedule", url: "/schedule/exams" },
        { title: "Events", url: "/schedule/events" },
      ],
    },
    {
      title: "Library",
      url: "/library",
      icon: Library,
      items: [
        { title: "Catalog", url: "/library/catalog" },
        { title: "Issue/Return", url: "/library/transactions" },
        { title: "Digital Resources", url: "/library/digital" },
      ],
    },
    {
      title: "Administration",
      url: "/admin",
      icon: UserCog,
      items: [
        { title: "Staff Management", url: "/admin/staff" },
        { title: "Resources", url: "/admin/resources" },
        { title: "Facilities", url: "/admin/facilities" },
        { title: "Finance", url: "/admin/finance" }, // 🔥 NEW FEATURE
      ],
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings2,
      items: [
        { title: "General", url: "/settings/general" },
        { title: "Notifications", url: "/settings/notifications" },
        { title: "Security", url: "/settings/security" },
      ],
    },
    {
      title: "Help Center",
      url: "/help",
      icon: LifeBuoy, // 🔥 NEW FEATURE
      items: [
        { title: "FAQs", url: "/help/faqs" },
        { title: "Guides", url: "/help/guides" },
        { title: "Support", url: "/help/support" },
      ],
    },
  ],
  quickAccess: [
    { name: "Attendance Records", url: "/attendance", icon: ClipboardList },
    { name: "Notifications", url: "/notifications", icon: Bell },
    { name: "Reports", url: "/reports", icon: BarChart },
    { name: "Messages", url: "/messages", icon: MessageSquare }, // 🔥 NEW FEATURE
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.departments} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.quickAccess} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
