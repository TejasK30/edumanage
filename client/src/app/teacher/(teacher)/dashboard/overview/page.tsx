"use client"

import AttendanceChart, {
  AttendanceData,
} from "@/components/dashboard-components/AttendanceChart"
import PageHeader from "@/components/dashboard-components/page-header"
import RecentActivities from "@/components/dashboard-components/RecentActivites"
import StatsGrid from "@/components/dashboard-components/StatsGrid"
import UpcomingEvents from "@/components/dashboard-components/UpcomingEvents"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BookOpen,
  Calendar,
  CheckSquare,
  Clock,
  FileText,
  GraduationCap,
  MessageSquare,
  TrendingUp,
  Users,
} from "lucide-react"

type Class = {
  id: number
  name: string
  time: string
  room: string
}

type Task = {
  id: number
  name: string
  dueDate: string
  type: string
}

type TeacherStats = {
  totalClasses: number
  totalStudents: number
  pendingAssignments: number
  attendanceRate: number
  avgGrade: number
  materialsUploaded: number
  hoursCompleted: number
  assessmentsCreated: number
}

const attendanceData: AttendanceData[] = [
  { month: "Jan", attendance: 94 },
  { month: "Feb", attendance: 91 },
  { month: "Mar", attendance: 96 },
  { month: "Apr", attendance: 93 },
  { month: "May", attendance: 89 },
  { month: "Jun", attendance: 95 },
]

const stats = [
  {
    title: "Total Students",
    value: "157",
    icon: (
      <Users className="h-5 w-5 text-primary-purple-500 dark:text-purple-400" />
    ),
    change: "Across 5 classes",
  },
  {
    title: "Classes",
    value: "5",
    icon: (
      <GraduationCap className="h-5 w-5 text-primary-blue-500 dark:text-blue-400" />
    ),
    change: "Current semester",
  },
  {
    title: "Assignments",
    value: "12",
    icon: (
      <FileText className="h-5 w-5 text-primary-purple-500 dark:text-purple-400" />
    ),
    change: "Pending for review",
  },
  {
    title: "Attendance Rate",
    value: "95.2%",
    icon: (
      <CheckSquare className="h-5 w-5 text-primary-blue-500 dark:text-blue-400" />
    ),
    change: "Last 30 days",
  },
  {
    title: "Average Grade",
    value: "78%",
    icon: <TrendingUp className="h-5 w-5 text-green-500 dark:text-green-400" />,
    change: "+3% from last term",
  },
  {
    title: "Materials Uploaded",
    value: "34",
    icon: <BookOpen className="h-5 w-5 text-orange-500 dark:text-orange-400" />,
    change: "This semester",
  },
  {
    title: "Hours Completed",
    value: "87",
    icon: <Clock className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />,
    change: "Out of 120 planned hours",
  },
  {
    title: "Assessments Created",
    value: "18",
    icon: <FileText className="h-5 w-5 text-pink-500 dark:text-pink-400" />,
    change: "This semester",
  },
]

const recentActivities = [
  {
    title: "Grade 11 Physics Quiz",
    detail: "Quiz created and published",
    icon: <FileText className="h-5 w-5 text-white" />,
    bg: "bg-purple-500",
  },
  {
    title: "Feedback Provided",
    detail: "25 assignments graded",
    icon: <CheckSquare className="h-5 w-5 text-white" />,
    bg: "bg-blue-500",
  },
  {
    title: "Monthly Report",
    detail: "Submitted to department head",
    icon: <TrendingUp className="h-5 w-5 text-white" />,
    bg: "bg-purple-400",
  },
  {
    title: "Math Olympiad Selections",
    detail: "5 students selected",
    icon: <Users className="h-5 w-5 text-white" />,
    bg: "bg-green-500",
  },
  {
    title: "Lab Materials Ordered",
    detail: "Expected delivery next week",
    icon: <BookOpen className="h-5 w-5 text-white" />,
    bg: "bg-red-500",
  },
  {
    title: "Curriculum Meeting",
    detail: "Updated syllabus for next term",
    icon: <Clock className="h-5 w-5 text-white" />,
    bg: "bg-indigo-500",
  },
  {
    title: "Parent-Teacher Meeting",
    detail: "Conducted 12 meetings this week",
    icon: <Users className="h-5 w-5 text-white" />,
    bg: "bg-orange-500",
  },
  {
    title: "Course Material Updated",
    detail: "Uploaded new resources for chemistry",
    icon: <BookOpen className="h-5 w-5 text-white" />,
    bg: "bg-teal-500",
  },
]

// Sample upcoming events data
const upcomingEvents = [
  {
    title: "Department Meeting",
    detail: "Oct 10, 2025 - Conference Room",
    icon: <Calendar className="h-5 w-5 text-white" />,
    bg: "bg-green-500",
  },
  {
    title: "Science Fair Judging",
    detail: "Oct 15, 2025 - Main Hall",
    icon: <GraduationCap className="h-5 w-5 text-white" />,
    bg: "bg-blue-500",
  },
  {
    title: "End of Term Exam",
    detail: "Oct 20, 2025 - Room 205",
    icon: <FileText className="h-5 w-5 text-white" />,
    bg: "bg-red-500",
  },
  {
    title: "Professional Development",
    detail: "Nov 05, 2025 - Online",
    icon: <TrendingUp className="h-5 w-5 text-white" />,
    bg: "bg-yellow-500",
  },
  {
    title: "Faculty Retreat",
    detail: "Nov 12, 2025 - Mountain Resort",
    icon: <Users className="h-5 w-5 text-white" />,
    bg: "bg-indigo-500",
  },
  {
    title: "Lab Supervision",
    detail: "Dec 05, 2025 - Lab 3",
    icon: <BookOpen className="h-5 w-5 text-white" />,
    bg: "bg-cyan-500",
  },
  {
    title: "Graduation Ceremony",
    detail: "Dec 10, 2025 - Auditorium",
    icon: <GraduationCap className="h-5 w-5 text-white" />,
    bg: "bg-blue-600",
  },
  {
    title: "Semester Planning",
    detail: "Dec 15, 2025 - Department Office",
    icon: <Calendar className="h-5 w-5 text-white" />,
    bg: "bg-pink-500",
  },
]

// Sample data for today's classes and pending tasks
const todaysClasses: Class[] = [
  {
    id: 1,
    name: "Mathematics - Grade 10",
    time: "10:00 AM",
    room: "Room 101",
  },
  { id: 2, name: "Physics - Grade 11", time: "11:30 AM", room: "Room 205" },
  { id: 3, name: "Chemistry - Grade 10", time: "2:00 PM", room: "Lab 3" },
  { id: 4, name: "Biology - Grade 12", time: "3:30 PM", room: "Lab 2" },
]

const pendingTasks: Task[] = [
  {
    id: 1,
    name: "Grade Math Assignment",
    dueDate: "Tomorrow",
    type: "Assignment",
  },
  { id: 2, name: "Prepare Physics Quiz", dueDate: "Today", type: "Exam" },
  {
    id: 3,
    name: "Submit Monthly Report",
    dueDate: "3 days",
    type: "Report",
  },
  {
    id: 4,
    name: "Update Course Materials",
    dueDate: "This week",
    type: "Content",
  },
]

export default function TeacherDashboardPage() {
  return (
    <div className="w-full bg-background text-foreground transition-none min-h-screen pr-4 py-2">
      <PageHeader title="Teacher Dashboard" />P{/* Quick Access */}
      <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
        <h3 className="text-lg font-medium mb-4">Teacher Quick Access</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {[
            {
              title: "My Classes",
              icon: <Users className="h-5 w-5" />,
              link: "/teacher/classes",
            },
            {
              title: "Assignments",
              icon: <FileText className="h-5 w-5" />,
              link: "/teacher/assignments",
            },
            {
              title: "Grade Book",
              icon: <TrendingUp className="h-5 w-5" />,
              link: "/teacher/grades",
            },
            {
              title: "Attendance",
              icon: <CheckSquare className="h-5 w-5" />,
              link: "/teacher/attendance",
            },
            {
              title: "Course Materials",
              icon: <BookOpen className="h-5 w-5" />,
              link: "/teacher/materials",
            },
            {
              title: "Student Reports",
              icon: <FileText className="h-5 w-5" />,
              link: "/teacher/reports",
            },
            {
              title: "Communications",
              icon: <MessageSquare className="h-5 w-5" />,
              link: "/teacher/communications",
            },
            {
              title: "Calendar",
              icon: <Calendar className="h-5 w-5" />,
              link: "/teacher/calendar",
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
      {/* Today's Classes and Tasks */}
      <div className="mt-6">
        <Tabs defaultValue="classes">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="classes">Today's Classes</TabsTrigger>
            <TabsTrigger value="tasks">Pending Tasks</TabsTrigger>
          </TabsList>
          <TabsContent value="classes" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Classes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {todaysClasses.map((cls) => (
                    <div
                      key={cls.id}
                      className="flex items-center justify-between pb-4 border-b last:border-0"
                    >
                      <div>
                        <h3 className="font-medium">{cls.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {cls.room}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{cls.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="tasks" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Pending Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingTasks.map((task) => (
                    <div
                      key={task.id}
                      className="flex items-center justify-between pb-4 border-b last:border-0"
                    >
                      <div>
                        <h3 className="font-medium">{task.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          Due: {task.dueDate}
                        </p>
                      </div>
                      <div className="bg-primary/10 text-primary text-xs py-1 px-3 rounded-full">
                        {task.type}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
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
