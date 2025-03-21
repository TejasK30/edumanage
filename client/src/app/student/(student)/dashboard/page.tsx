"use client"
import { useState, useEffect } from "react"
import AttendanceChart from "@/components/dashboard-components/AttendanceChart"
import RecentActivities from "@/components/dashboard-components/RecentActivites"
import StatsGrid from "@/components/dashboard-components/StatsGrid"
import UpcomingEvents from "@/components/dashboard-components/UpcomingEvents"
import {
  Bell,
  BookOpen,
  Calendar,
  Clock,
  Library,
  GraduationCap,
  TrendingUp,
  Users,
  FileText,
  AlertCircle,
} from "lucide-react"
import PageHeader from "@/components/dashboard-components/page-header"

export default function StudentDashboardPage() {
  const [loading, setLoading] = useState(true)

  // Simulate loading data
  useEffect(() => {
    setTimeout(() => setLoading(false), 800)
  }, [])

  // Attendance data with current semester months
  const attendanceData = [
    { month: "Jan", attendance: 92 },
    { month: "Feb", attendance: 88 },
    { month: "Mar", attendance: 95 },
    { month: "Apr", attendance: 90 },
    { month: "May", attendance: 87 },
    { month: "Jun", attendance: 89 },
  ]

  // Academic performance data
  const academicPerformance = [
    { subject: "Mathematics", score: 85 },
    { subject: "Physics", score: 78 },
    { subject: "Chemistry", score: 92 },
    { subject: "Computer Science", score: 95 },
    { subject: "English", score: 88 },
  ]

  // Student stats - personalized data
  const studentStats = [
    {
      title: "Current Courses",
      value: "6",
      icon: <BookOpen className="h-5 w-5 text-blue-500" />,
      change: "All courses on track",
      link: "/student/courses/current",
    },
    {
      title: "Pending Assignments",
      value: "3",
      icon: <FileText className="h-5 w-5 text-amber-500" />,
      change: "Nearest due in 2 days",
      link: "/student/assignments/upcoming",
    },
    {
      title: "Attendance Rate",
      value: "91%",
      icon: <Clock className="h-5 w-5 text-green-500" />,
      change: "Above minimum requirement",
      link: "/student/attendance/status",
    },
    {
      title: "Current CGPA",
      value: "3.7",
      icon: <GraduationCap className="h-5 w-5 text-purple-500" />,
      change: "+0.2 from last semester",
      link: "/student/academics/cgpa",
    },
    {
      title: "Upcoming Exams",
      value: "2",
      icon: <AlertCircle className="h-5 w-5 text-red-500" />,
      change: "Next exam in 5 days",
      link: "/student/exams/schedule",
    },
    {
      title: "Library Books",
      value: "3",
      icon: <Library className="h-5 w-5 text-indigo-500" />,
      change: "Due in 7 days",
      link: "/student/profile",
    },
  ]

  // Recent activities - personalized to student
  const recentActivities = [
    {
      title: "Assignment Submitted",
      detail: "Data Structures - Received 95%",
      icon: <FileText className="h-5 w-5 text-white" />,
      bg: "bg-green-500",
      timestamp: "Today, 10:30 AM",
    },
    {
      title: "Attendance Marked",
      detail: "Present in all classes today",
      icon: <Clock className="h-5 w-5 text-white" />,
      bg: "bg-blue-500",
      timestamp: "Today, 9:00 AM",
    },
    {
      title: "New Announcement",
      detail: "Tech Symposium registration open",
      icon: <Bell className="h-5 w-5 text-white" />,
      bg: "bg-purple-500",
      timestamp: "Yesterday",
    },
    {
      title: "Fee Payment Due",
      detail: "Last date for semester payment",
      icon: <AlertCircle className="h-5 w-5 text-white" />,
      bg: "bg-amber-500",
      timestamp: "2 days ago",
    },
    {
      title: "Quiz Result",
      detail: "Computer Networks - Scored 85%",
      icon: <TrendingUp className="h-5 w-5 text-white" />,
      bg: "bg-indigo-500",
      timestamp: "3 days ago",
    },
  ]

  // Upcoming deadlines
  const upcomingDeadlines = [
    {
      title: "Algorithm Design Assignment",
      detail: "Due: Mar 18, 2025 (3 days left)",
      icon: <FileText className="h-5 w-5 text-white" />,
      bg: "bg-red-500",
      link: "/student/assignments/upcoming",
    },
    {
      title: "Database Midterm Exam",
      detail: "Date: Mar 20, 2025 (5 days left)",
      icon: <BookOpen className="h-5 w-5 text-white" />,
      bg: "bg-amber-500",
      link: "/student/exams/schedule",
    },
    {
      title: "Library Book Return",
      detail: "Due: Mar 22, 2025 (7 days left)",
      icon: <Library className="h-5 w-5 text-white" />,
      bg: "bg-blue-500",
    },
    {
      title: "Semester Fee Payment",
      detail: "Due: Mar 31, 2025 (16 days left)",
      icon: <Calendar className="h-5 w-5 text-white" />,
      bg: "bg-purple-500",
      link: "/student/fees/due",
    },
  ]

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="w-full bg-background text-foreground min-h-screen pr-4 py-2">
      <PageHeader
        title="Student Dashboard"
        description="Welcome back, John Smith"
        icon={GraduationCap}
      />

      {/* Quick Links */}
      <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
        <h3 className="text-lg font-medium mb-4">Quick Access</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {[
            {
              title: "Attendance",
              icon: <Clock className="h-5 w-5" />,
              link: "/student/attendance/daily",
            },
            {
              title: "Grades",
              icon: <TrendingUp className="h-5 w-5" />,
              link: "/student/grades",
            },
            {
              title: "Timetable",
              icon: <Calendar className="h-5 w-5" />,
              link: "/student/timetable/today",
            },
            {
              title: "Assignments",
              icon: <FileText className="h-5 w-5" />,
              link: "/student/assignments",
            },
            {
              title: "Fee Details",
              icon: <Library className="h-5 w-5" />,
              link: "/student/fees/details",
            },
            {
              title: "Exams",
              icon: <BookOpen className="h-5 w-5" />,
              link: "/student/exams",
            },
            {
              title: "Profile",
              icon: <Users className="h-5 w-5" />,
              link: "/student/profile",
            },
            {
              title: "Notifications",
              icon: <Bell className="h-5 w-5" />,
              link: "/student/notifications",
            },
          ].map((item, index) => (
            <a
              key={index}
              href={item.link}
              className="flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <div className="w-10 h-10 flex items-center justify-center bg-blue-100 dark:bg-blue-900 rounded-full mb-2">
                {item.icon}
              </div>
              <span className="text-sm font-medium">{item.title}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Academic Performance and Attendance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <AttendanceChart data={attendanceData} />

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
          <h3 className="text-lg font-medium mb-4">Academic Performance</h3>
          <div className="space-y-3">
            {academicPerformance.map((subject) => (
              <div key={subject.subject} className="relative">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">{subject.subject}</span>
                  <span className="text-sm font-medium">{subject.score}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div
                    className={`h-2.5 rounded-full ${
                      subject.score >= 90
                        ? "bg-green-500"
                        : subject.score >= 80
                        ? "bg-blue-500"
                        : subject.score >= 70
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                    style={{ width: `${subject.score}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activities and Upcoming Deadlines */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <RecentActivities activities={recentActivities} />
        <UpcomingEvents events={upcomingDeadlines} />
      </div>
      {/* Quick Stats */}
      <StatsGrid stats={studentStats} />
    </div>
  )
}
