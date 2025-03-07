"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import {
  Users,
  GraduationCap,
  BookOpen,
  Calendar,
  Library,
  Bell,
  Clock,
  TrendingUp,
  MessageSquare,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import StatCard from "@/components/stat-card"

const attendanceData = [
  { month: "Jan", attendance: 92 },
  { month: "Feb", attendance: 88 },
  { month: "Mar", attendance: 95 },
  { month: "Apr", attendance: 90 },
  { month: "May", attendance: 87 },
  { month: "Jun", attendance: 89 },
]

export default function DashboardPage() {
  const stats = [
    {
      title: "Total Students",
      value: "2,845",
      icon: (
        <Users className="h-5 w-5 text-primary-purple-500 dark:text-purple-400" />
      ),
      change: "+12% from last semester",
    },
    {
      title: "Faculty Members",
      value: "127",
      icon: (
        <GraduationCap className="h-5 w-5 text-primary-blue-500 dark:text-blue-400" />
      ),
      change: "+3 new this month",
    },
    {
      title: "Active Courses",
      value: "89",
      icon: (
        <BookOpen className="h-5 w-5 text-primary-purple-500 dark:text-purple-400" />
      ),
      change: "Current semester",
    },
    {
      title: "Attendance Rate",
      value: "92%",
      icon: (
        <Clock className="h-5 w-5 text-primary-blue-500 dark:text-blue-400" />
      ),
      change: "Last 30 days",
    },
    {
      title: "New Admissions",
      value: "156",
      icon: <Calendar className="h-5 w-5 text-green-500 dark:text-green-400" />,
      change: "+8% compared to last term",
    },
    {
      title: "Graduation Rate",
      value: "87%",
      icon: (
        <TrendingUp className="h-5 w-5 text-orange-500 dark:text-orange-400" />
      ),
      change: "Steady over past year",
    },
    {
      title: "Courses Completed",
      value: "73",
      icon: (
        <BookOpen className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />
      ),
      change: "85% course completion rate",
    },
    {
      title: "Scholarships Awarded",
      value: "32",
      icon: (
        <GraduationCap className="h-5 w-5 text-pink-500 dark:text-pink-400" />
      ),
      change: "10 new this term",
    },
  ]

  const recentActivities = [
    {
      title: "Mid-term Examinations",
      detail: "Starting next week",
      icon: <Calendar className="h-5 w-5 text-white" />,
      bg: "bg-purple-500",
    },
    {
      title: "Library Updates",
      detail: "25 new books added",
      icon: <Library className="h-5 w-5 text-white" />,
      bg: "bg-blue-500",
    },
    {
      title: "Performance Report",
      detail: "Monthly report generated",
      icon: <TrendingUp className="h-5 w-5 text-white" />,
      bg: "bg-purple-400",
    },
    {
      title: "Sports Meet Results",
      detail: "Inter-department sports concluded",
      icon: <Users className="h-5 w-5 text-white" />,
      bg: "bg-green-500",
    },
    {
      title: "Workshop on AI",
      detail: "Hands-on session with industry experts",
      icon: <BookOpen className="h-5 w-5 text-white" />,
      bg: "bg-red-500",
    },
    {
      title: "Exam Results Published",
      detail: "Final exam results are out",
      icon: <Clock className="h-5 w-5 text-white" />,
      bg: "bg-indigo-500",
    },
    {
      title: "Student Council Meeting",
      detail: "Key decisions made on campus events",
      icon: <Users className="h-5 w-5 text-white" />,
      bg: "bg-orange-500",
    },
    {
      title: "Lab Maintenance Completed",
      detail: "All labs are now fully operational",
      icon: <BookOpen className="h-5 w-5 text-white" />,
      bg: "bg-teal-500",
    },
  ]

  const upcomingEvents = [
    {
      title: "Tech Symposium",
      detail: "Oct 10, 2025 - Main Auditorium",
      icon: <Calendar className="h-5 w-5 text-white" />,
      bg: "bg-green-500",
    },
    {
      title: "Coding Hackathon",
      detail: "Oct 15, 2025 - Lab 3B",
      icon: <MessageSquare className="h-5 w-5 text-white" />,
      bg: "bg-blue-500",
    },
    {
      title: "Alumni Meet",
      detail: "Oct 20, 2025 - Conference Hall",
      icon: <Users className="h-5 w-5 text-white" />,
      bg: "bg-red-500",
    },
    {
      title: "Cultural Fest",
      detail: "Nov 05, 2025 - Open Grounds",
      icon: <Library className="h-5 w-5 text-white" />,
      bg: "bg-yellow-500",
    },
    {
      title: "Guest Lecture Series",
      detail: "Nov 12, 2025 - Seminar Room 1",
      icon: <GraduationCap className="h-5 w-5 text-white" />,
      bg: "bg-indigo-500",
    },
    {
      title: "Industry Visit",
      detail: "Dec 05, 2025 - Corporate Campus",
      icon: <Calendar className="h-5 w-5 text-white" />,
      bg: "bg-cyan-500",
    },
    {
      title: "Career Fair",
      detail: "Dec 10, 2025 - Expo Center",
      icon: <MessageSquare className="h-5 w-5 text-white" />,
      bg: "bg-blue-600",
    },
    {
      title: "Scholarship Award Ceremony",
      detail: "Dec 15, 2025 - Auditorium",
      icon: <GraduationCap className="h-5 w-5 text-white" />,
      bg: "bg-pink-500",
    },
    {
      title: "New Course Launch Webinar",
      detail: "Dec 20, 2025 - Online",
      icon: <BookOpen className="h-5 w-5 text-white" />,
      bg: "bg-purple-600",
    },
  ]

  return (
    <div className="w-full bg-background text-foreground transition-none min-h-screen pr-4 py-2">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8 gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <Button
          variant="secondary"
          className="flex items-center gap-2 hover:bg-opacity-90 hover:shadow-md dark:hover:bg-muted/50"
        >
          <Bell size={18} />
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Attendance Chart */}
      <Card className="bg-card border-muted  hover:shadow-lg my-2">
        <CardHeader>
          <CardTitle>Attendance Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={attendanceData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--muted))"
                />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    color: "hsl(var(--foreground))",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="attendance"
                  stroke="#7c3aed"
                  strokeWidth={2}
                  dot={{ fill: "#7c3aed" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      {/* Charts, Activities, and Upcoming Events */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
        {/* Recent Activities */}
        <Card className="bg-card border-muted  hover:shadow-lg">
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map(({ title, detail, icon, bg }, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-4 p-3 rounded-lg -all duration-300 cursor-pointer 
                      bg-muted hover:bg-opacity-90 hover:shadow-md dark:hover:bg-muted/30`}
                >
                  <div className={`p-2 ${bg} rounded-full`}>{icon}</div>
                  <div>
                    <p className="text-sm font-medium">{title}</p>
                    <p className="text-xs text-muted-foreground">{detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card className="bg-card border-muted  hover:shadow-lg">
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map(({ title, detail, icon, bg }, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-4 p-3 rounded-lg -all duration-300 cursor-pointer 
                      bg-muted hover:bg-opacity-90 hover:shadow-md dark:hover:bg-muted/30`}
                >
                  <div className={`p-2 ${bg} rounded-full`}>{icon}</div>
                  <div>
                    <p className="text-sm font-medium">{title}</p>
                    <p className="text-xs text-muted-foreground">{detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
