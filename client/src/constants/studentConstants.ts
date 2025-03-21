import {
  Award,
  BarChart2,
  Bell,
  BookOpen,
  Briefcase,
  Calendar,
  CheckSquare,
  ClipboardList,
  Clock,
  Cpu,
  CreditCard,
  FileText,
  Gauge,
  GraduationCap,
  Home,
  Inbox,
  Library,
  MessageSquare,
  Pencil,
  Settings,
  Trophy,
  User,
  UserCog,
  Zap,
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
    isActive: false,
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
    isActive: false,
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
    isActive: false,
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
    isActive: false,
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
    ],
  },
  {
    title: "Academics",
    url: "/student/academics",
    icon: GraduationCap,
    isActive: false,
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
    isActive: false,
    items: [
      {
        title: "Lab Schedules",
        url: "/student/labs/schedule",
        icon: Calendar,
      },
    ],
  },
  {
    title: "Fees & Payments",
    url: "/student/fees",
    icon: CreditCard,
    isActive: false,
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
    isActive: false,
    items: [
      { title: "Job Postings", url: "/student/career/jobs", icon: Briefcase },
    ],
  },
  {
    title: "Messages",
    url: "/student/messages",
    icon: MessageSquare,
    isActive: false,
    items: [
      {
        title: "Inbox",
        url: "/student/messages/inbox",
        icon: Inbox,
      },
      {
        title: "Sent",
        url: "/student/messages/sent",
        icon: Pencil,
      },
    ],
  },
  {
    title: "Profile",
    url: "/student/profile",
    icon: User,
    isActive: false,
    items: [
      {
        title: "View Profile",
        url: "/student/profile/view",
        icon: User,
      },
      {
        title: "Edit Profile",
        url: "/student/profile/edit",
        icon: Pencil,
      },
    ],
  },
  {
    title: "Settings",
    url: "/student/settings",
    icon: Settings,
    isActive: false,
    items: [
      {
        title: "Account Settings",
        url: "/student/settings/account",
        icon: UserCog,
      },
    ],
  },
  {
    title: "Quick Access",
    url: "/student/quick-access",
    icon: Zap,
    isActive: false,
    items: [
      {
        title: "Today's Classes",
        url: "/student/timetable/today",
        icon: Calendar,
      },
      {
        title: "Attendance",
        url: "/student/attendance/status",
        icon: ClipboardList,
      },
      {
        title: "Grades",
        url: "/student/grades",
        icon: GraduationCap,
      },
      {
        title: "Notifications",
        url: "/student/notifications",
        icon: Bell,
      },
      {
        title: "Messages",
        url: "/student/messages",
        icon: MessageSquare,
      },
    ],
  },
]
