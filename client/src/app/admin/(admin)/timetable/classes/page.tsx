import { Calendar, Grid, Clock, Book, Users, Download } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Link from "next/link"
import { PageHeader } from "@/components/dashboard-components/page-header"

export default function TimetablePage() {
  // Timetable stats
  const stats = [
    { title: "Classes Today", value: "87", icon: Book },
    { title: "Rooms Utilized", value: "42", icon: Grid },
    { title: "Average Class Size", value: "37", icon: Users },
    { title: "Exam Days", value: "14", icon: Calendar },
  ]

  // Timetable modules
  const modules = [
    {
      title: "Classes",
      description: "Manage class schedules",
      icon: Clock,
      href: "/admin/timetable/classes",
      stats: "480 weekly classes",
    },
    {
      title: "Exams",
      description: "Manage exam schedules",
      icon: Book,
      href: "/admin/timetable/exams",
      stats: "Spring 2025 exams",
    },
    {
      title: "Events",
      description: "Manage academic events",
      icon: Calendar,
      href: "/admin/timetable/events",
      stats: "12 upcoming events",
    },
  ]

  // Today's schedule
  const todaySchedule = [
    {
      time: "08:00 - 09:30",
      course: "CS101",
      room: "L201",
      faculty: "Dr. James Wilson",
    },
    {
      time: "09:45 - 11:15",
      course: "MTH201",
      room: "L105",
      faculty: "Dr. Elena Rodriguez",
    },
    {
      time: "11:30 - 13:00",
      course: "PHY102",
      room: "L302",
      faculty: "Dr. Robert Kim",
    },
    {
      time: "14:00 - 15:30",
      course: "BUS310",
      room: "L401",
      faculty: "Dr. Michael Patel",
    },
    {
      time: "15:45 - 17:15",
      course: "ENG205",
      room: "L203",
      faculty: "Dr. Lisa Chen",
    },
  ]

  return (
    <div className="space-y-6">
      <PageHeader
        title="Timetable Management"
        description="Manage class schedules, exam timetables, and academic events"
        icon={Calendar}
      >
        <div className="flex space-x-2">
          <Select defaultValue="spring2025">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Semester" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="spring2025">Spring 2025</SelectItem>
              <SelectItem value="fall2024">Fall 2024</SelectItem>
              <SelectItem value="summer2024">Summer 2024</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Download className="mr-2 h-4 w-4" /> Export Schedule
          </Button>
        </div>
      </PageHeader>

      {/* Summary Statistics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Timetable Modules */}
      <div className="grid gap-4 md:grid-cols-3">
        {modules.map((module, index) => {
          const Icon = module.icon
          return (
            <Card key={index} className="flex flex-col">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Icon className="h-5 w-5 text-primary-blue-500" />
                  <CardTitle>{module.title}</CardTitle>
                </div>
                <CardDescription>{module.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground">{module.stats}</p>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href={module.href}>Manage {module.title}</Link>
                </Button>
              </CardFooter>
            </Card>
          )
        })}
      </div>

      {/* Today's Schedule */}
      <Card>
        <CardHeader>
          <CardTitle>Today&apos;s Schedule</CardTitle>
          <CardDescription>March 12, 2025</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {todaySchedule.map((item, index) => (
              <div
                key={index}
                className="flex justify-between border-b last:border-0 pb-2 last:pb-0"
              >
                <div className="space-y-1">
                  <p className="font-medium">{item.course}</p>
                  <p className="text-sm text-muted-foreground">
                    Faculty: {item.faculty}
                  </p>
                </div>
                <div className="text-right space-y-1">
                  <p className="font-medium">{item.time}</p>
                  <p className="text-sm text-muted-foreground">
                    Room: {item.room}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button asChild variant="outline" className="w-full">
            <Link href="/admin/timetable/classes">View Full Schedule</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
