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
  BookMarked,
  Link,
  CreditCard,
  Inbox,
  Clock,
  Trophy,
  Settings,
  LifeBuoy,
} from "lucide-react"

export const StudentNavItems = [
  {
    title: "Dashboard",
    url: "/student/dashboard",
    icon: Home,
    isActive: true,
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
      {
        title: "Learning Modules",
        url: "/student/courses/modules",
        icon: BookMarked,
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
      {
        title: "Graded",
        url: "/student/assignments/graded",
        icon: CheckSquare,
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
      { title: "Backlogs", url: "/student/exams/backlogs", icon: Clock },
    ],
  },
  {
    title: "Attendance",
    url: "/student/attendance",
    icon: ClipboardList,
    items: [
      {
        title: "Daily Attendance",
        url: "/student/attendance/daily",
        icon: Calendar,
      },
      {
        title: "Semester Report",
        url: "/student/attendance/semester",
        icon: FileText,
      },
      {
        title: "Shortage Warnings",
        url: "/student/attendance/shortage",
        icon: Bell,
      },
    ],
  },
  {
    title: "Academics",
    url: "/student/academics",
    icon: GraduationCap,
    items: [
      { title: "Grades", url: "/student/academics/grades", icon: Award },
      {
        title: "CGPA Calculator",
        url: "/student/academics/cgpa",
        icon: Gauge,
      },
      {
        title: "Semester Results",
        url: "/student/academics/results",
        icon: Trophy,
      },
      {
        title: "Academic Progress",
        url: "/student/academics/progress",
        icon: BarChart2,
      },
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
      { title: "Lab Reports", url: "/student/labs/reports", icon: FileText },
    ],
  },
  {
    title: "Fees & Payments",
    url: "/student/fees",
    icon: CreditCard,
    items: [
      { title: "Fee Details", url: "/student/fees/details", icon: FileText },
      { title: "Payment History", url: "/student/fees/history", icon: Clock },
      { title: "Due Payments", url: "/student/fees/due", icon: Bell },
      {
        title: "Extension Requests",
        url: "/student/fees/extension",
        icon: Calendar,
      },
    ],
  },
  {
    title: "Career",
    url: "/student/career",
    icon: Briefcase,
    items: [
      {
        title: "Internship Opportunities",
        url: "/student/career/internships",
        icon: Link,
      },
      { title: "Job Postings", url: "/student/career/jobs", icon: Briefcase },
      {
        title: "My Applications",
        url: "/student/career/applications",
        icon: ClipboardList,
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
        icon: Link,
      },
      {
        title: "My Borrowings",
        url: "/student/library/borrowings",
        icon: ClipboardList,
      },
    ],
  },
  {
    title: "Messages",
    url: "/student/messages",
    icon: MessageSquare,
  },
  {
    title: "Profile",
    url: "/student/profile",
    icon: User,
  },
  {
    title: "Settings",
    url: "/student/settings",
    icon: Settings,
  },
  {
    title: "Help & Support",
    url: "/student/help",
    icon: LifeBuoy,
  },
]

export const StudentQuickAccess = [
  {
    name: "Today's Classes",
    url: "/student/timetable/today",
    icon: Calendar,
  },
  {
    name: "Attendance",
    url: "/student/attendance/status",
    icon: ClipboardList,
  },
  { name: "Grades", url: "/student/grades", icon: GraduationCap },
  { name: "Notifications", url: "/student/notifications", icon: Bell },
  { name: "Messages", url: "/student/messages", icon: MessageSquare },
]

export const StudentProjects = [
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
]
