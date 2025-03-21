import { Users } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { PageHeader } from "@/components/dashboard-components/page-header"

export default function StudentsPage() {
  // Summary statistics
  const stats = [
    { title: "Total Students", value: "5,284", change: "+12%" },
    { title: "Undergraduate", value: "3,842", change: "+8%" },
    { title: "Graduate", value: "1,442", change: "+15%" },
    { title: "International", value: "782", change: "+23%" },
  ]

  // Quick links
  const quickLinks = [
    {
      title: "Admissions",
      href: "/admin/students/admissions",
      description: "Manage new student applications",
    },
    {
      title: "Student List",
      href: "/admin/student-list",
      description: "View and edit student profiles",
    },
    {
      title: "Attendance",
      href: "/admin/students/attendance",
      description: "Track student attendance",
    },
    {
      title: "Performance",
      href: "/admin/students/performance-analytics",
      description: "Monitor academic performance",
    },
    {
      title: "Results",
      href: "/admin/students/results",
      description: "View and manage exam results",
    },
    {
      title: "Progression",
      href: "/admin/students/progression",
      description: "Track year-to-year progression",
    },
  ]

  return (
    <div className="space-y-6">
      <PageHeader
        title="Students"
        description="Manage all student-related activities"
        icon={Users}
      >
        <Button asChild>
          <Link href="/admin/student-list">View All Students</Link>
        </Button>
      </PageHeader>

      {/* Summary Statistics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.change.startsWith("+") ? "↑" : "↓"} {stat.change} from
                last year
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Links */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {quickLinks.map((link, index) => (
          <Card key={index} className="transition-all hover:border-primary">
            <CardHeader className="pb-2">
              <CardTitle>{link.title}</CardTitle>
              <CardDescription>{link.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" asChild className="w-full">
                <Link href={link.href}>Access {link.title}</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
