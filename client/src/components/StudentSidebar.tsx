"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar"
import {
  Award,
  BarChart2,
  Bell,
  BookOpen,
  Briefcase,
  Calendar,
  CheckSquare,
  ClipboardList,
  Cpu,
  FileText,
  Gauge,
  GraduationCap,
  Home,
  Library,
  MessageSquare,
  School,
  User,
  Users,
} from "lucide-react"
import React from "react"
import { NavMain } from "./nav-main"
import { NavProjects } from "./nav-projects"
import { NavUser } from "./nav-user"
import { TeamSwitcher } from "./team-switcher"

const data = {
  user: {
    name: "John Doe",
    email: "john.doe@engineering.edu.in",
    avatar: "/avatars/student.jpg",
  },
  teams: [
    { name: "Robotics Club", logo: School, plan: "Member" },
    { name: "Coding Society", logo: Briefcase, plan: "Member" },
    { name: "Tech Fest Organizers", logo: Users, plan: "Lead" },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/student/dashboard",
      icon: Home,
      isActive: true,
      items: [
        { title: "Overview", url: "/student/dashboard/overview", icon: Gauge },
        {
          title: "Progress",
          url: "/student/dashboard/progress",
          icon: BarChart2,
        },
      ],
    },
    {
      title: "Courses",
      url: "/student/courses",
      icon: BookOpen,
      items: [
        {
          title: "Current Courses",
          url: "/student/courses/current",
          icon: Library,
        },
        {
          title: "Completed Courses",
          url: "/student/courses/completed",
          icon: CheckSquare,
        },
      ],
    },
    {
      title: "Assignments",
      url: "/student/assignments",
      icon: ClipboardList,
      items: [
        {
          title: "Upcoming",
          url: "/student/assignments/upcoming",
          icon: Calendar,
        },
        {
          title: "Submitted",
          url: "/student/assignments/submitted",
          icon: FileText,
        },
      ],
    },
    {
      title: "Exams",
      url: "/student/exams",
      icon: Calendar,
      items: [
        { title: "Schedule", url: "/student/exams/schedule", icon: Calendar },
        { title: "Results", url: "/student/exams/results", icon: FileText },
      ],
    },
    {
      title: "Laboratories",
      url: "/student/labs",
      icon: Cpu,
      items: [
        {
          title: "Lab Schedules",
          url: "/student/labs/schedule",
          icon: Calendar,
        },
        {
          title: "Experiment Manuals",
          url: "/student/labs/manuals",
          icon: BookOpen,
        },
        {
          title: "Equipment Booking",
          url: "/student/labs/booking",
          icon: ClipboardList,
        },
      ],
    },
    {
      title: "Workshops & Seminars",
      url: "/student/workshops",
      icon: Briefcase,
      items: [
        {
          title: "Upcoming Workshops",
          url: "/student/workshops/upcoming",
          icon: Calendar,
        },
        {
          title: "Past Seminars",
          url: "/student/workshops/past",
          icon: FileText,
        },
      ],
    },
    {
      title: "Internships",
      url: "/student/internships",
      icon: Award,
      items: [
        {
          title: "Opportunities",
          url: "/student/internships/opportunities",
          icon: Briefcase,
        },
        {
          title: "Applications",
          url: "/student/internships/applications",
          icon: ClipboardList,
        },
      ],
    },
    {
      title: "Placement Cell",
      url: "/student/placements",
      icon: Award,
      items: [
        {
          title: "Job Openings",
          url: "/student/placements/jobs",
          icon: Briefcase,
        },
        {
          title: "Interview Prep",
          url: "/student/placements/interview",
          icon: BookOpen,
        },
      ],
    },
    {
      title: "Library",
      url: "/student/library",
      icon: Library,
      items: [
        { title: "Catalog", url: "/student/library/catalog", icon: BookOpen },
        {
          title: "Digital Resources",
          url: "/student/library/digital",
          icon: BookOpen,
        },
      ],
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
  quickAccess: [
    { name: "Attendance", url: "/student/attendance", icon: ClipboardList },
    { name: "Grades", url: "/student/grades", icon: GraduationCap },
    { name: "Technical Fests", url: "/student/fests", icon: Users },
    { name: "Events", url: "/student/events", icon: Calendar },
    { name: "Messages", url: "/student/messages", icon: MessageSquare },
  ],
  projects: [
    {
      name: "Capstone Project",
      url: "/student/projects/capstone",
      icon: BookOpen,
    },
    {
      name: "Research Initiative",
      url: "/student/projects/research",
      icon: Gauge,
    },
  ],
}

export default function StudentSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
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
