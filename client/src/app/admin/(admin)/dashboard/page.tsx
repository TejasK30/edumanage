"use client"
import AttendanceChart, {
  AttendanceData,
} from "@/components/dashboard-components/AttendanceChart"
import PageHeader from "@/components/dashboard-components/page-header"
import RecentActivities from "@/components/dashboard-components/RecentActivites"
import StatsGrid from "@/components/dashboard-components/StatsGrid"
import UpcomingEvents from "@/components/dashboard-components/UpcomingEvents"
import {
  AlertCircle,
  BookOpen,
  Building,
  Calendar,
  Clock,
  DollarSign,
  FileText,
  GraduationCap,
  Library,
  MessageSquare,
  TrendingUp,
  Users,
} from "lucide-react"

// Sample data for attendance
const attendanceData: AttendanceData[] = [
  { month: "Jan", attendance: 92 },
  { month: "Feb", attendance: 88 },
  { month: "Mar", attendance: 95 },
  { month: "Apr", attendance: 90 },
  { month: "May", attendance: 87 },
  { month: "Jun", attendance: 89 },
]

// Sample statistics data
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
    icon: <BookOpen className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />,
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

// Sample recent activities data
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

// Sample upcoming events data
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

export default function AdminDashboardPage() {
  return (
    <div className="w-full bg-background text-foreground transition-none min-h-screen pr-4 py-2">
      <PageHeader title="Admin Dashboard" />
      {/* Quick Access */}
      <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
        <h3 className="text-lg font-medium mb-4">
          Administrative Quick Access
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {[
            {
              title: "Manage Students",
              icon: <Users className="h-5 w-5" />,
              link: "/admin/students",
            },
            {
              title: "Faculty & Staff",
              icon: <GraduationCap className="h-5 w-5" />,
              link: "/admin/faculty/list",
            },
            {
              title: "Financial Overview",
              icon: <DollarSign className="h-5 w-5" />,
              link: "/admin/finances/overview",
            },
            {
              title: "Academic Management",
              icon: <BookOpen className="h-5 w-5" />,
              link: "/admin/academics/management",
            },
            {
              title: "Examination Portal",
              icon: <FileText className="h-5 w-5" />,
              link: "/admin/academics/exams",
            },
            {
              title: "Placement Cell",
              icon: <Building className="h-5 w-5" />,
              link: "/admin/placements/companies",
            },
            {
              title: "Communications",
              icon: <MessageSquare className="h-5 w-5" />,
              link: "/admin/communications/announcements",
            },
            {
              title: "System Settings",
              icon: <AlertCircle className="h-5 w-5" />,
              link: "/admin/system/settings",
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
      <AttendanceChart data={attendanceData} />
      <StatsGrid stats={stats} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
        <RecentActivities activities={recentActivities} />
        <UpcomingEvents events={upcomingEvents} />
      </div>
    </div>
  )
}
