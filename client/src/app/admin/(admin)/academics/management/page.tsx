import PageHeader from "@/components/dashboard-components/page-header"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  BookmarkCheck,
  BookOpen,
  FileText,
  GraduationCap,
  Library,
} from "lucide-react"
import Link from "next/link"

export default function AcademicsPage() {
  // Academic stats
  const stats = [
    { title: "Active Programs", value: "28", icon: GraduationCap },
    { title: "Total Courses", value: "184", icon: BookOpen },
    { title: "Departments", value: "18", icon: Library },
    { title: "Current Semester", value: "Spring 2025", icon: BookmarkCheck },
  ]

  // Academic modules
  const modules = [
    {
      title: "Courses",
      description: "Manage academic courses and curriculum",
      icon: BookOpen,
      href: "/admin/academics/courses",
      stats: "184 active courses",
    },
    {
      title: "Programs",
      description: "Manage degree programs and specializations",
      icon: GraduationCap,
      href: "/admin/academics/programs",
      stats: "28 programs",
    },
    {
      title: "Curriculum",
      description: "Design and update program curriculum",
      icon: FileText,
      href: "/admin/academics/curriculum",
      stats: "42 curriculums",
    },
    {
      title: "Exams",
      description: "Schedule and manage examinations",
      icon: BookmarkCheck,
      href: "/admin/academics/exams",
      stats: "Spring 2025 exams",
    },
  ]

  return (
    <div className="space-y-6">
      <PageHeader
        title="Academic Management"
        description="Manage academic programs, courses, and curriculum"
        icon={BookOpen}
      />

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

      {/* Academic Modules */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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

      {/* Academic Calendar */}
      <Card>
        <CardHeader>
          <CardTitle>Academic Calendar</CardTitle>
          <CardDescription>Spring 2025 Semester</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between border-b pb-2">
              <div>
                <p className="font-medium">Classes Begin</p>
                <p className="text-sm text-muted-foreground">All programs</p>
              </div>
              <div className="text-right">
                <p className="font-medium">January 15, 2025</p>
              </div>
            </div>
            <div className="flex justify-between border-b pb-2">
              <div>
                <p className="font-medium">Mid-Term Exams</p>
                <p className="text-sm text-muted-foreground">All programs</p>
              </div>
              <div className="text-right">
                <p className="font-medium">March 3-7, 2025</p>
              </div>
            </div>
            <div className="flex justify-between border-b pb-2">
              <div>
                <p className="font-medium">Spring Break</p>
                <p className="text-sm text-muted-foreground">No classes</p>
              </div>
              <div className="text-right">
                <p className="font-medium">March 24-28, 2025</p>
              </div>
            </div>
            <div className="flex justify-between">
              <div>
                <p className="font-medium">Final Exams</p>
                <p className="text-sm text-muted-foreground">All programs</p>
              </div>
              <div className="text-right">
                <p className="font-medium">May 10-20, 2025</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
