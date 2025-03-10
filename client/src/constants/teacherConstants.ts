import {
  Award,
  BarChart2,
  BookMarked,
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
  LifeBuoy,
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
      {
        title: "Statistics",
        url: "/teacher/dashboard/statistics",
        icon: BarChart2,
      },
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
    title: "Resources",
    url: "/teacher/resources",
    icon: BookMarked,
    items: [
      { title: "My Resources", url: "/teacher/resources/my", icon: BookOpen },
      {
        title: "Create Resource",
        url: "/teacher/resources/create",
        icon: FileText,
      },
      {
        title: "LMS Modules",
        url: "/teacher/resources/lms",
        icon: BookMarked,
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
      { title: "Grade Exams", url: "/teacher/exams/grade", icon: FileText },
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
      { title: "Grading", url: "/teacher/students/grading", icon: Award },
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
  {
    title: "Help",
    url: "/teacher/help",
    icon: LifeBuoy,
  },
]

export const TeacherQuickAccess = [
  { name: "Today's Classes", url: "/teacher/classes/today", icon: School },
  {
    name: "Mark Attendance",
    url: "/teacher/attendance/mark",
    icon: ClipboardList,
  },
  {
    name: "Pending Grades",
    url: "/teacher/grading/pending",
    icon: CheckSquare,
  },
  { name: "New Messages", url: "/teacher/messages/unread", icon: Inbox },
]

export const TeacherProjectItems = [
  { name: "Research Initiative", url: "/teacher/research", icon: Award },
  {
    name: "Curriculum Development",
    url: "/teacher/curriculum",
    icon: BookOpen,
  },
]
