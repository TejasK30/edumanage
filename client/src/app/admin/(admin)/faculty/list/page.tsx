import { PageHeader } from "@/components/dashboard-components/page-header"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Download, Plus, Search, Users } from "lucide-react"
import Link from "next/link"

export default function FacultyPage() {
  // Summary statistics
  const stats = [
    { title: "Total Faculty", value: "325", change: "+12" },
    { title: "Full-time", value: "218", change: "+8" },
    { title: "Part-time", value: "107", change: "+4" },
    { title: "Faculty-Student Ratio", value: "1:16", change: "improved" },
  ]

  // Quick links
  const quickLinks = [
    {
      title: "Faculty List",
      href: "/admin/faculty/list",
      description: "View and manage faculty profiles",
    },
    {
      title: "Departments",
      href: "/admin/faculty/departments",
      description: "Manage academic departments",
    },
  ]

  // Recent activities
  const recentActivities = [
    {
      action: "New Faculty Joined",
      department: "Computer Science",
      date: "Mar 5, 2025",
    },
    {
      action: "Faculty Promotion",
      department: "Business School",
      date: "Mar 3, 2025",
    },
    {
      action: "Research Grant Approved",
      department: "Engineering",
      date: "Feb 28, 2025",
    },
    {
      action: "Leave Request Approved",
      department: "Mathematics",
      date: "Feb 25, 2025",
    },
  ]

  return (
    <div className="space-y-6">
      <PageHeader
        title="Faculty Management"
        description="Manage faculty members and departments"
        icon={Users}
      >
        <Button asChild>
          <Link href="/admin/faculty/new">
            <Plus className="mr-2 h-4 w-4" /> Add New Faculty
          </Link>
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
                {stat.change === "improved"
                  ? "⬆️ Improved"
                  : stat.change.startsWith("+")
                  ? "↑"
                  : "↓"}{" "}
                {stat.change.startsWith("+") || stat.change.startsWith("-")
                  ? `${stat.change} from last year`
                  : ""}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Quick Links */}
        <div className="md:col-span-1">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Quick Links</CardTitle>
              <CardDescription>Common faculty management tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {quickLinks.map((link, index) => (
                <div key={index} className="space-y-1">
                  <Link
                    href={link.href}
                    className="font-medium text-primary-blue-500 hover:underline"
                  >
                    {link.title}
                  </Link>
                  <p className="text-sm text-muted-foreground">
                    {link.description}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Recent Activities */}
        <div className="md:col-span-2">
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Activities</CardTitle>
                <CardDescription>Latest faculty updates</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" /> Export
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between border-b pb-2 last:border-0"
                  >
                    <div>
                      <p className="font-medium">{activity.action}</p>
                      <p className="text-sm text-muted-foreground">
                        {activity.department}
                      </p>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {activity.date}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Search Bar */}
      <Card>
        <CardHeader>
          <CardTitle>Faculty Directory</CardTitle>
          <CardDescription>Search for faculty members</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by name, department or expertise..."
                className="pl-8"
              />
            </div>
            <Button variant="outline">Filters</Button>
            <Button>Search</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
