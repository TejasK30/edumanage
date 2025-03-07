"use client"

import StatCard from "@/components/stat-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Bell,
  BookOpen,
  Calendar,
  Clock,
  Library,
  TrendingUp,
  Users,
} from "lucide-react"
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

const attendanceData = [
  { month: "Jan", attendance: 92 },
  { month: "Feb", attendance: 88 },
  { month: "Mar", attendance: 95 },
  { month: "Apr", attendance: 90 },
  { month: "May", attendance: 87 },
  { month: "Jun", attendance: 89 },
]

const stats = [
  {
    title: "Enrolled Courses",
    value: "6",
    icon: (
      <BookOpen className="h-5 w-5 text-primary-purple-500 dark:text-purple-400" />
    ),
    change: "Updated weekly",
  },
  {
    title: "Pending Assignments",
    value: "2",
    icon: (
      <Calendar className="h-5 w-5 text-primary-blue-500 dark:text-blue-400" />
    ),
    change: "Due in 3 days",
  },
  {
    title: "Upcoming Exams",
    value: "1",
    icon: (
      <Clock className="h-5 w-5 text-primary-blue-500 dark:text-blue-400" />
    ),
    change: "Next exam in 5 days",
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
    title: "Library Books Borrowed",
    value: "3",
    icon: (
      <Library className="h-5 w-5 text-primary-purple-500 dark:text-purple-400" />
    ),
    change: "Return due soon",
  },
  {
    title: "Club Activities",
    value: "2",
    icon: (
      <Users className="h-5 w-5 text-primary-purple-500 dark:text-purple-400" />
    ),
    change: "Upcoming meeting",
  },
  {
    title: "Current GPA",
    value: "3.7",
    icon: (
      <TrendingUp className="h-5 w-5 text-primary-blue-500 dark:text-blue-400" />
    ),
    change: "Semester average",
  },
  {
    title: "New Announcements",
    value: "5",
    icon: (
      <Bell className="h-5 w-5 text-primary-purple-500 dark:text-purple-400" />
    ),
    change: "Check notifications",
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
    title: "Assignment Submission",
    detail: "Math assignment due tomorrow",
    icon: <BookOpen className="h-5 w-5 text-white" />,
    bg: "bg-green-500",
  },
  {
    title: "Club Meeting",
    detail: "Coding club meets today",
    icon: <Users className="h-5 w-5 text-white" />,
    bg: "bg-red-500",
  },
  {
    title: "Exam Results",
    detail: "Recent exam scores posted",
    icon: <Clock className="h-5 w-5 text-white" />,
    bg: "bg-indigo-500",
  },
]

const upcomingDeadlines = [
  {
    title: "Math Assignment",
    detail: "Due: Oct 25, 2025",
    icon: <Calendar className="h-5 w-5 text-white" />,
    bg: "bg-orange-500",
  },
  {
    title: "Physics Lab Report",
    detail: "Due: Oct 27, 2025",
    icon: <BookOpen className="h-5 w-5 text-white" />,
    bg: "bg-teal-500",
  },
  {
    title: "Chemistry Quiz",
    detail: "Due: Oct 28, 2025",
    icon: <Clock className="h-5 w-5 text-white" />,
    bg: "bg-red-500",
  },
]

export default function DashboardPage() {
  return (
    <div className="w-full bg-background text-foreground transition-none min-h-screen pr-4 py-2">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4 text-center sm:text-left">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Student Dashboard
        </h1>
        <Button
          variant="secondary"
          className="flex items-center gap-2 hover:bg-opacity-90 hover:shadow-md dark:hover:bg-muted/50"
        >
          <Bell size={18} />
          Notifications
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {/* Attendance Chart */}
        <Card className="bg-card border-muted transition hover:shadow-lg">
          <CardHeader>
            <CardTitle>Attendance Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] sm:h-[300px]">
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
        <Card className="bg-card border-muted transition hover:shadow-lg">
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map(({ title, detail, icon, bg }, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 cursor-pointer bg-muted hover:bg-opacity-90 hover:shadow-md dark:hover:bg-muted/30`}
                >
                  <div className={`p-2 ${bg} rounded-full`}>{icon}</div>
                  <div>
                    <p className="text-sm sm:text-base font-medium">{title}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      {detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Deadlines */}
      <div className="mt-6">
        <Card className="bg-card border-muted transition hover:shadow-lg">
          <CardHeader>
            <CardTitle>Upcoming Deadlines</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingDeadlines.map(({ title, detail, icon, bg }, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 cursor-pointer bg-muted hover:bg-opacity-90 hover:shadow-md dark:hover:bg-muted/30`}
                >
                  <div className={`p-2 ${bg} rounded-full`}>{icon}</div>
                  <div>
                    <p className="text-sm sm:text-base font-medium">{title}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      {detail}
                    </p>
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
