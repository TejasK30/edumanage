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
  Database,
  FileCode,
  Award,
  Cpu,
  Zap,
  Terminal,
  HelpCircle,
  Layers,
  Lock,
} from "lucide-react"

export const AdminNavItems = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: BarChart2,
    isActive: true,
    items: [
      { title: "Overview", url: "/admin/dashboard/overview", icon: Inbox },
      {
        title: "Analytics",
        url: "/admin/dashboard/analytics",
        icon: BarChart2,
      },
      { title: "Reports", url: "/admin/dashboard/reports", icon: FileText },
    ],
  },
  {
    title: "Students",
    url: "/admin/students",
    icon: GraduationCap,
    items: [
      {
        title: "Student Directory",
        url: "/admin/students/directory",
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
        url: "/admin/students/performance",
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
    items: [
      {
        title: "Faculty Directory",
        url: "/admin/faculty/directory",
        icon: User,
      },
      {
        title: "Teaching Assignments",
        url: "/admin/faculty/assignments",
        icon: ClipboardList,
      },
      {
        title: "Performance Reviews",
        url: "/admin/faculty/reviews",
        icon: FileText,
      },
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
    items: [
      {
        title: "Course Management",
        url: "/admin/academics/courses",
        icon: Library,
      },
      {
        title: "Program Structure",
        url: "/admin/academics/programs",
        icon: Layers,
      },
      {
        title: "Curriculum Development",
        url: "/admin/academics/curriculum",
        icon: BookOpen,
      },
      {
        title: "Examination Control",
        url: "/admin/academics/exams",
        icon: Calendar,
      },
      {
        title: "Backlog Management",
        url: "/admin/academics/backlogs",
        icon: FileText,
      },
    ],
  },
  {
    title: "Timetable",
    url: "/admin/timetable",
    icon: Calendar,
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
    title: "Infrastructure",
    url: "/admin/infrastructure",
    icon: Building2,
    items: [
      {
        title: "Classrooms",
        url: "/admin/infrastructure/classrooms",
        icon: School,
      },
      { title: "Laboratories", url: "/admin/infrastructure/labs", icon: Cpu },
      {
        title: "Library Resources",
        url: "/admin/infrastructure/library",
        icon: Library,
      },
      {
        title: "IT Infrastructure",
        url: "/admin/infrastructure/it",
        icon: Terminal,
      },
    ],
  },
  {
    title: "Finances",
    url: "/admin/finances",
    icon: DollarSign,
    items: [
      { title: "Fee Structure", url: "/admin/finances/fees", icon: FileText },
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
    items: [
      {
        title: "Job Postings",
        url: "/admin/placements/jobs",
        icon: Briefcase,
      },
      {
        title: "Internship Programs",
        url: "/admin/placements/internships",
        icon: Award,
      },
      {
        title: "Company Connections",
        url: "/admin/placements/companies",
        icon: Building2,
      },
      {
        title: "Student Applications",
        url: "/admin/placements/applications",
        icon: ClipboardList,
      },
    ],
  },
  {
    title: "Data Management",
    url: "/admin/data",
    icon: Database,
    items: [
      { title: "Database", url: "/admin/data/database", icon: Database },
      {
        title: "Import/Export",
        url: "/admin/data/import-export",
        icon: FileCode,
      },
      { title: "Backups", url: "/admin/data/backups", icon: Layers },
    ],
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
    items: [
      { title: "User Management", url: "/admin/system/users", icon: Users },
      {
        title: "Role Management",
        url: "/admin/system/roles",
        icon: ShieldCheck,
      },
      { title: "Permissions", url: "/admin/system/permissions", icon: Lock },
      {
        title: "System Settings",
        url: "/admin/system/settings",
        icon: Settings,
      },
    ],
  },
  {
    title: "Help & Support",
    url: "/admin/help",
    icon: LifeBuoy,
    items: [
      { title: "Documentation", url: "/admin/help/docs", icon: BookOpen },
      { title: "FAQs", url: "/admin/help/faqs", icon: HelpCircle },
      {
        title: "Contact Support",
        url: "/admin/help/support",
        icon: LifeBuoy,
      },
    ],
  },
]

export const AdminQuickAccess = [
  {
    name: "Student Statistics",
    url: "/admin/stats/students",
    icon: BarChart2,
  },
  {
    name: "Faculty Attendance",
    url: "/admin/attendance/faculty",
    icon: ClipboardList,
  },
  { name: "Recent Notifications", url: "/admin/notifications", icon: Bell },
  { name: "Pending Approvals", url: "/admin/approvals", icon: FileText },
]
