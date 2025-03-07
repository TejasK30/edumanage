"use client"

import {
  BarChart2,
  Bell,
  BookOpen,
  Briefcase,
  Building2,
  Calendar,
  ClipboardList,
  DollarSign,
  FileText,
  Gauge,
  GraduationCap,
  Inbox,
  Library,
  LifeBuoy,
  MessagesSquare,
  School,
  Settings,
  ShieldCheck,
  User,
  Users,
} from "lucide-react"
import React from "react"
import { NavMain } from "./nav-main"
import { NavProjects } from "./nav-projects"
import { NavUser } from "./nav-user"
import { TeamSwitcher } from "./team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "./ui/sidebar"

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
      icon: BarChart2,
      isActive: true,
      items: [
        { title: "Overview", url: "/dashboard/overview", icon: Inbox },
        { title: "Analytics", url: "/dashboard/analytics", icon: BarChart2 },
        { title: "Reports", url: "/dashboard/reports", icon: FileText },
      ],
    },
    {
      title: "Students",
      url: "/students",
      icon: GraduationCap,
      items: [
        { title: "All Students", url: "/students/all", icon: Users },
        { title: "Admissions", url: "/students/admissions", icon: Briefcase },
        {
          title: "Attendance",
          url: "/students/attendance",
          icon: ClipboardList,
        },
        { title: "Performance", url: "/students/performance", icon: Gauge },
        { title: "Student Portal", url: "/students/portal", icon: User },
      ],
    },
    {
      title: "Faculty",
      url: "/faculty",
      icon: Users,
      items: [
        { title: "Directory", url: "/faculty/directory", icon: User },
        { title: "Schedules", url: "/faculty/schedules", icon: Calendar },
        { title: "Departments", url: "/faculty/departments", icon: Briefcase },
      ],
    },
    {
      title: "Academics",
      url: "/academics",
      icon: BookOpen,
      items: [
        { title: "Courses", url: "/academics/courses", icon: Library },
        { title: "Programs", url: "/academics/programs", icon: Briefcase },
        { title: "Curriculum", url: "/academics/curriculum", icon: BookOpen },
        {
          title: "Assignments",
          url: "/academics/assignments",
          icon: ClipboardList,
        },
        { title: "Examinations", url: "/academics/exams", icon: Calendar },
      ],
    },
    {
      title: "Schedule",
      url: "/schedule",
      icon: Calendar,
      items: [
        { title: "Class Schedule", url: "/schedule/classes", icon: Calendar },
        { title: "Exam Schedule", url: "/schedule/exams", icon: FileText },
        { title: "Events", url: "/schedule/events", icon: MessagesSquare },
      ],
    },
    {
      title: "Library",
      url: "/library",
      icon: Library,
      items: [
        { title: "Catalog", url: "/library/catalog", icon: BookOpen },
        {
          title: "Issue/Return",
          url: "/library/transactions",
          icon: ClipboardList,
        },
        { title: "Digital Resources", url: "/library/digital", icon: BookOpen },
      ],
    },
    {
      title: "Administration",
      url: "/admin",
      icon: User,
      items: [
        { title: "Staff Management", url: "/admin/staff", icon: Users },
        { title: "Resources", url: "/admin/resources", icon: BookOpen },
        { title: "Facilities", url: "/admin/facilities", icon: Building2 },
        { title: "Finance", url: "/admin/finance", icon: DollarSign }, // 🔥 NEW FEATURE
      ],
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
      items: [
        { title: "General", url: "/settings/general", icon: Settings },
        { title: "Notifications", url: "/settings/notifications", icon: Bell },
        { title: "Security", url: "/settings/security", icon: ShieldCheck },
      ],
    },
    {
      title: "Help Center",
      url: "/help",
      icon: LifeBuoy,
      items: [
        { title: "FAQs", url: "/help/faqs", icon: BookOpen },
        { title: "Guides", url: "/help/guides", icon: BookOpen },
        { title: "Support", url: "/help/support", icon: MessagesSquare },
      ],
    },
  ],
  quickAccess: [
    { name: "Attendance Records", url: "/attendance", icon: ClipboardList },
    { name: "Notifications", url: "/notifications", icon: Bell },
    { name: "Reports", url: "/reports", icon: BarChart2 },
    { name: "Messages", url: "/messages", icon: MessagesSquare },
  ],
}
export default function AdminSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
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
    </Sidebar>
  )
}
