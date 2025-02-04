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
  ]

  return (
    <div className="bg-background text-foreground min-h-screen px-8 py-6">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8 gap-4">
        <h1 className="text-3xl font-bold tracking-tight">College Dashboard</h1>
        <Button
          variant="secondary"
          className="flex items-center gap-2 hover:bg-opacity-90 hover:shadow-md dark:hover:bg-muted/50"
        >
          <Bell size={18} />
          Notifications
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Charts & Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Attendance Chart */}
        <Card className="bg-card border-muted transition hover:shadow-lg">
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
                  <XAxis
                    dataKey="month"
                    stroke="hsl(var(--muted-foreground))"
                  />
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

        {/* Recent Activities */}
        {/* Recent Activities */}
        <Card className="bg-card border-muted transition hover:shadow-lg">
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map(({ title, detail, icon, bg }, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-4 p-3 rounded-lg transition-all duration-300 cursor-pointer 
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
