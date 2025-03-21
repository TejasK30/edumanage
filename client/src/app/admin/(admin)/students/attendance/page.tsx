import {
  Calendar,
  Search,
  Download,
  Filter,
  CheckCircle2,
  XCircle,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { PageHeader } from "@/components/dashboard-components/page-header"

export default function StudentAttendancePage() {
  // Sample data
  const stats = [
    { title: "Average Attendance", value: "86.4%", change: "+1.8%" },
    { title: "Below 75%", value: "142 students", change: "-23" },
    { title: "Perfect Attendance", value: "423 students", change: "+12" },
    { title: "Today's Absences", value: "87 students", change: "-5" },
  ]

  // Sample attendance data
  const attendanceRecords = [
    {
      id: "ST001",
      name: "Alex Johnson",
      course: "CS 301",
      percentage: 92,
      lastWeek: [true, true, true, false, true],
    },
    {
      id: "ST002",
      name: "Maria Garcia",
      course: "ECON 202",
      percentage: 78,
      lastWeek: [true, false, true, false, true],
    },
    {
      id: "ST003",
      name: "James Wilson",
      course: "ENG 305",
      percentage: 95,
      lastWeek: [true, true, true, true, true],
    },
    {
      id: "ST004",
      name: "Aisha Patel",
      course: "BIO 101",
      percentage: 68,
      lastWeek: [false, true, false, true, false],
    },
    {
      id: "ST005",
      name: "Thomas Lee",
      course: "BUS 401",
      percentage: 85,
      lastWeek: [true, true, true, false, true],
    },
    {
      id: "ST006",
      name: "Sarah Miller",
      course: "PSY 202",
      percentage: 73,
      lastWeek: [false, true, true, true, false],
    },
  ]

  return (
    <div className="space-y-6">
      <PageHeader
        title="Student Attendance"
        description="Track and manage student attendance records"
        icon={Calendar}
      >
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </PageHeader>

      {/* Stats Cards */}
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
                {stat.change.startsWith("+") ? "↑" : "↓"}{" "}
                {stat.change.replace("+", "").replace("-", "")}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
            <div className="flex w-full items-center space-x-2 md:w-2/3">
              <div className="relative w-full">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                  <Search className="h-4 w-4 text-gray-400" />
                </span>
                <Input
                  placeholder="Search by name or ID..."
                  className="pl-8 w-full"
                  prefix={<Search className="h-4 w-4" />}
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Courses</SelectItem>
                  <SelectItem value="cs">Computer Science</SelectItem>
                  <SelectItem value="math">Mathematics</SelectItem>
                  <SelectItem value="eng">Engineering</SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue="semester">
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="semester">This Semester</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Attendance Table */}
      <Card>
        <CardHeader>
          <CardTitle>Attendance Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Attendance</TableHead>
                <TableHead>Last Week</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {attendanceRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          {record.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{record.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {record.id}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{record.course}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Progress
                        value={record.percentage}
                        className="w-[80px]"
                      />
                      <span className="text-sm font-medium">
                        {record.percentage}%
                      </span>
                      <Badge
                        variant={
                          record.percentage >= 75 ? "default" : "destructive"
                        }
                      >
                        {record.percentage >= 75 ? "Good" : "At Risk"}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      {record.lastWeek.map((present, i) =>
                        present ? (
                          <CheckCircle2
                            key={i}
                            className="h-5 w-5 text-green-500"
                          />
                        ) : (
                          <XCircle key={i} className="h-5 w-5 text-red-500" />
                        )
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
