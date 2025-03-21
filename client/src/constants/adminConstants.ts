import {
  Award,
  BarChart2,
  Bell,
  BookOpen,
  Briefcase,
  Building2,
  Calendar,
  ClipboardList,
  Database,
  DollarSign,
  FileText,
  Gauge,
  GraduationCap,
  Inbox,
  Library,
  MessagesSquare,
  Settings,
  ShieldCheck,
  Users,
  Zap,
} from "lucide-react"

export const AdminNavItems = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: BarChart2,
    isActive: true,
    items: [
      {
        title: "Analytics",
        url: "/admin/analytics",
        icon: BarChart2,
      },
    ],
  },
  {
    title: "Students",
    url: "/admin/students",
    icon: GraduationCap,
    isActive: false,
    items: [
      {
        title: "Student Directory",
        url: "/admin/students/student-list",
        icon: Users,
      },
      {
        title: "New Admissions",
        url: "/admin/students/admissions",
        icon: Briefcase,
      },
      {
        title: "Attendance Overview",
        url: "/admin/students/attendance",
        icon: ClipboardList,
      },
      {
        title: "Performance Analytics",
        url: "/admin/students/performance-analytics",
        icon: Gauge,
      },
      {
        title: "Semester Results",
        url: "/admin/students/results",
        icon: FileText,
      },
      {
        title: "Academic Progression",
        url: "/admin/students/progression",
        icon: Award,
      },
    ],
  },
  {
    title: "Faculty",
    url: "/admin/faculty",
    icon: Users,
    isActive: false,
    items: [
      {
        title: "Department Allocation",
        url: "/admin/faculty/departments",
        icon: Briefcase,
      },
    ],
  },
  {
    title: "Academics",
    url: "/admin/academics",
    icon: BookOpen,
    isActive: false,
    items: [
      {
        title: "Course Management",
        url: "/admin/academics/courses",
        icon: Library,
      },
    ],
  },
  {
    title: "Timetable",
    url: "/admin/timetable",
    icon: Calendar,
    isActive: false,
    items: [
      {
        title: "Class Schedules",
        url: "/admin/timetable/classes",
        icon: Calendar,
      },
      {
        title: "Exam Schedules",
        url: "/admin/timetable/exams",
        icon: FileText,
      },
      {
        title: "Event Calendar",
        url: "/admin/timetable/events",
        icon: Calendar,
      },
    ],
  },
  {
    title: "Finances",
    url: "/admin/finances",
    icon: DollarSign,
    isActive: false,
    items: [
      { title: "Fee Structure", url: "/admin/finances/fees", icon: FileText },
      { title: "Overview", url: "/admin/finances/overview", icon: FileText },
      {
        title: "Payment Records",
        url: "/admin/finances/payments",
        icon: DollarSign,
      },
      {
        title: "Scholarships",
        url: "/admin/finances/scholarships",
        icon: Award,
      },
      {
        title: "Extension Requests",
        url: "/admin/finances/extensions",
        icon: Calendar,
      },
      {
        title: "Financial Reports",
        url: "/admin/finances/reports",
        icon: BarChart2,
      },
    ],
  },
  {
    title: "Placement Cell",
    url: "/admin/placements",
    icon: Briefcase,
    isActive: false,
    items: [
      {
        title: "Job Postings",
        url: "/admin/placements/jobs",
        icon: Briefcase,
      },
      {
        title: "Company Connections",
        url: "/admin/placements/companies",
        icon: Building2,
      },
    ],
  },
  {
    title: "Data Management",
    url: "/admin/data",
    icon: Database,
    isActive: false,
  },
  {
    title: "Communications",
    url: "/admin/communications",
    icon: MessagesSquare,
    items: [
      {
        title: "Announcements",
        url: "/admin/communications/announcements",
        icon: Bell,
      },
      {
        title: "Notifications",
        url: "/admin/communications/notifications",
        icon: Zap,
      },
      {
        title: "Email Templates",
        url: "/admin/communications/templates",
        icon: FileText,
      },
    ],
  },
  {
    title: "System",
    url: "/admin/system",
    icon: Settings,
    isActive: false,
    items: [
      {
        title: "Role Management",
        url: "/admin/system/roles",
        icon: ShieldCheck,
      },
      {
        title: "System Settings",
        url: "/admin/system/settings",
        icon: Settings,
      },
    ],
  },
]
