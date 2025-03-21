import {
  Award,
  BarChart2,
  BookOpen,
  Briefcase,
  Calendar,
  CheckSquare,
  ClipboardList,
  FileText,
  Gauge,
  GraduationCap,
  Home,
  Inbox,
  MessageSquare,
  School,
  Settings,
  Users,
} from "lucide-react"

export const TeacherNavItems = [
  {
    title: "Dashboard",
    url: "/teacher/dashboard",
    icon: Home,
    isActive: true,
    items: [
      { title: "Overview", url: "/teacher/dashboard/overview", icon: Gauge },
    ],
  },
  {
    title: "Classes",
    url: "/teacher/classes",
    icon: School,
    items: [
      { title: "My Classes", url: "/teacher/classes/my", icon: Users },
      {
        title: "Class Attendance",
        url: "/teacher/classes/attendance",
        icon: ClipboardList,
      },
      {
        title: "Timetables",
        url: "/teacher/classes/timetables",
        icon: Calendar,
      },
    ],
  },
  {
    title: "LMS Modules",
    url: "/teacher/lms-modules",
    icon: BookOpen,
    items: [
      {
        title: "Materials",
        url: "/teacher/lms-modules/materials",
        icon: BookOpen,
      },
      {
        title: "Polls",
        url: "/teacher/lms-modules/polls",
        icon: CheckSquare,
      },
    ],
  },
  {
    title: "Assignments",
    url: "/teacher/assignments",
    icon: FileText,
    items: [
      {
        title: "Create Assignment",
        url: "/teacher/assignments/create",
        icon: Briefcase,
      },
      {
        title: "Review Submissions",
        url: "/teacher/assignments/submissions",
        icon: CheckSquare,
      },
    ],
  },
  {
    title: "Exams",
    url: "/teacher/exams",
    icon: Calendar,
    items: [
      {
        title: "Exam Schedule",
        url: "/teacher/exams/schedule",
        icon: Calendar,
      },
    ],
  },
  {
    title: "Students",
    url: "/teacher/students",
    icon: GraduationCap,
    items: [
      {
        title: "Performance",
        url: "/teacher/students/performance",
        icon: BarChart2,
      },
      {
        title: "Attendance",
        url: "/teacher/students/attendance",
        icon: ClipboardList,
      },
    ],
  },
  {
    title: "Messages",
    url: "/teacher/messages",
    icon: MessageSquare,
  },
  {
    title: "Reports",
    url: "/teacher/reports",
    icon: BarChart2,
    items: [
      { title: "Class Reports", url: "/teacher/reports/class", icon: Users },
      {
        title: "Student Reports",
        url: "/teacher/reports/students",
        icon: GraduationCap,
      },
      {
        title: "Attendance Reports",
        url: "/teacher/reports/attendance",
        icon: ClipboardList,
      },
    ],
  },
  {
    title: "Feedback",
    url: "/teacher/feedback",
    icon: MessageSquare,
  },
  {
    title: "Settings",
    url: "/teacher/settings",
    icon: Settings,
  },
]
