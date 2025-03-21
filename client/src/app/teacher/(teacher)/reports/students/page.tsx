"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowUpDown,
  BarChart3,
  BookOpen,
  Download,
  FileText,
  GraduationCap,
  LineChart,
  MoreHorizontal,
  PieChart,
  Printer,
  Search,
  Send,
} from "lucide-react"
import { useState } from "react"

// Types
interface Student {
  id: string
  name: string
  avatar: string
  grade: number
  performance: "excellent" | "good" | "average" | "needs-improvement"
  attendance: number
  assignments: {
    completed: number
    total: number
  }
  subjects: {
    name: string
    grade: number
    trend: "up" | "down" | "stable"
  }[]
}

interface Class {
  id: string
  name: string
  period: string
  students: number
}

export default function StudentReportsPage() {
  const [selectedClass, setSelectedClass] = useState<string>("all")
  const [selectedPeriod, setSelectedPeriod] = useState<string>("semester")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [sortColumn, setSortColumn] = useState<string>("name")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  // Mock data for students
  const students: Student[] = [
    {
      id: "s1",
      name: "Emma Johnson",
      avatar: "/avatars/emma.png",
      grade: 92,
      performance: "excellent",
      attendance: 98,
      assignments: {
        completed: 24,
        total: 25,
      },
      subjects: [
        { name: "Mathematics", grade: 94, trend: "up" },
        { name: "Science", grade: 91, trend: "stable" },
        { name: "English", grade: 90, trend: "up" },
      ],
    },
    {
      id: "s2",
      name: "Michael Chen",
      avatar: "/avatars/michael.png",
      grade: 86,
      performance: "good",
      attendance: 95,
      assignments: {
        completed: 22,
        total: 25,
      },
      subjects: [
        { name: "Mathematics", grade: 88, trend: "up" },
        { name: "Science", grade: 90, trend: "up" },
        { name: "English", grade: 80, trend: "down" },
      ],
    },
    {
      id: "s3",
      name: "Sophia Rodriguez",
      avatar: "/avatars/sophia.png",
      grade: 77,
      performance: "average",
      attendance: 88,
      assignments: {
        completed: 20,
        total: 25,
      },
      subjects: [
        { name: "Mathematics", grade: 72, trend: "down" },
        { name: "Science", grade: 80, trend: "stable" },
        { name: "English", grade: 79, trend: "up" },
      ],
    },
    {
      id: "s4",
      name: "Jamal Williams",
      avatar: "/avatars/jamal.png",
      grade: 65,
      performance: "needs-improvement",
      attendance: 78,
      assignments: {
        completed: 18,
        total: 25,
      },
      subjects: [
        { name: "Mathematics", grade: 68, trend: "up" },
        { name: "Science", grade: 65, trend: "down" },
        { name: "English", grade: 62, trend: "down" },
      ],
    },
    {
      id: "s5",
      name: "Olivia Thompson",
      avatar: "/avatars/olivia.png",
      grade: 89,
      performance: "good",
      attendance: 93,
      assignments: {
        completed: 23,
        total: 25,
      },
      subjects: [
        { name: "Mathematics", grade: 85, trend: "stable" },
        { name: "Science", grade: 92, trend: "up" },
        { name: "English", grade: 90, trend: "stable" },
      ],
    },
  ]

  // Mock data for classes
  const classes: Class[] = [
    { id: "c1", name: "Algebra II", period: "1st Period", students: 28 },
    { id: "c2", name: "Biology", period: "3rd Period", students: 24 },
    {
      id: "c3",
      name: "English Literature",
      period: "5th Period",
      students: 26,
    },
  ]

  // Filter students by search query and selected class
  const filteredStudents = students.filter((student) => {
    const matchesSearch = student.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
    const matchesClass = selectedClass === "all" || true // In a real app, filter by class
    return matchesSearch && matchesClass
  })

  // Sort students
  const sortedStudents = [...filteredStudents].sort((a, b) => {
    if (sortColumn === "name") {
      return sortDirection === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    } else if (sortColumn === "grade") {
      return sortDirection === "asc" ? a.grade - b.grade : b.grade - a.grade
    } else if (sortColumn === "attendance") {
      return sortDirection === "asc"
        ? a.attendance - b.attendance
        : b.attendance - a.attendance
    }
    return 0
  })

  // Handle sort click
  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  // Performance Badge component
  const PerformanceBadge = ({
    performance,
  }: {
    performance: Student["performance"]
  }) => {
    const variants = {
      excellent:
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      good: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      average:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
      "needs-improvement":
        "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    }

    const labels = {
      excellent: "Excellent",
      good: "Good",
      average: "Average",
      "needs-improvement": "Needs Improvement",
    }

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${variants[performance]}`}
      >
        {labels[performance]}
      </span>
    )
  }

  // Trend indicator component
  const TrendIndicator = ({ trend }: { trend: "up" | "down" | "stable" }) => {
    if (trend === "up") {
      return <span className="text-green-600">↑</span>
    } else if (trend === "down") {
      return <span className="text-red-600">↓</span>
    }
    return <span className="text-gray-500">→</span>
  }

  return (
    <div className="container px-4 py-6 mx-auto max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Student Reports</h1>
          <p className="text-muted-foreground mt-1">
            View and analyze student performance and generate reports
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <FileText className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Class Average</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">82%</div>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </div>
            <Progress value={82} className="h-2 mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Assignment Completion
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">94%</div>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </div>
            <Progress value={94} className="h-2 mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Attendance Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">90%</div>
              <LineChart className="h-4 w-4 text-muted-foreground" />
            </div>
            <Progress value={90} className="h-2 mt-2" />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-7 mb-6">
        <div className="md:col-span-5">
          <Card>
            <CardHeader>
              <CardTitle>Student Performance</CardTitle>
              <CardDescription>
                View and filter student performance data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1 grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="class-filter">Class</Label>
                    <Select
                      value={selectedClass}
                      onValueChange={setSelectedClass}
                    >
                      <SelectTrigger id="class-filter">
                        <SelectValue placeholder="Select class" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Classes</SelectItem>
                        {classes.map((cls) => (
                          <SelectItem key={cls.id} value={cls.id}>
                            {cls.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="period-filter">Time Period</Label>
                    <Select
                      value={selectedPeriod}
                      onValueChange={setSelectedPeriod}
                    >
                      <SelectTrigger id="period-filter">
                        <SelectValue placeholder="Select period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="week">Current Week</SelectItem>
                        <SelectItem value="month">Current Month</SelectItem>
                        <SelectItem value="semester">
                          Current Semester
                        </SelectItem>
                        <SelectItem value="year">Academic Year</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-8 h-4 w-4 text-muted-foreground" />
                  <Label htmlFor="search-students">Search</Label>
                  <Input
                    id="search-students"
                    placeholder="Search students..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[250px]">
                        <Button
                          variant="ghost"
                          onClick={() => handleSort("name")}
                          className="flex items-center gap-1"
                        >
                          Student
                          {sortColumn === "name" && (
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          )}
                        </Button>
                      </TableHead>
                      <TableHead>
                        <Button
                          variant="ghost"
                          onClick={() => handleSort("grade")}
                          className="flex items-center gap-1"
                        >
                          Grade
                          {sortColumn === "grade" && (
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          )}
                        </Button>
                      </TableHead>
                      <TableHead>Performance</TableHead>
                      <TableHead>
                        <Button
                          variant="ghost"
                          onClick={() => handleSort("attendance")}
                          className="flex items-center gap-1"
                        >
                          Attendance
                          {sortColumn === "attendance" && (
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          )}
                        </Button>
                      </TableHead>
                      <TableHead>Assignment Completion</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedStudents.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center">
                            <Avatar className="h-8 w-8 mr-2">
                              <AvatarImage
                                src={student.avatar}
                                alt={student.name}
                              />
                              <AvatarFallback>
                                {student.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            {student.name}
                          </div>
                        </TableCell>
                        <TableCell>{student.grade}%</TableCell>
                        <TableCell>
                          <PerformanceBadge performance={student.performance} />
                        </TableCell>
                        <TableCell>{student.attendance}%</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress
                              value={
                                (student.assignments.completed /
                                  student.assignments.total) *
                                100
                              }
                              className="h-2 w-full max-w-[100px]"
                            />
                            <span className="text-sm">
                              {student.assignments.completed}/
                              {student.assignments.total}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                View Full Report
                              </DropdownMenuItem>
                              <DropdownMenuItem>Email Report</DropdownMenuItem>
                              <DropdownMenuItem>Print Report</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                View Student Details
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Performance Distribution</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center items-center">
                <div className="h-[200px] w-[200px] relative rounded-full flex items-center justify-center overflow-hidden border-8 border-background">
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "conic-gradient(#10b981 0% 20%, #3b82f6 20% 40%, #f59e0b 40% 75%, #ef4444 75% 100%)",
                    }}
                  ></div>
                  <div className="bg-background rounded-full h-[70%] w-[70%] flex items-center justify-center">
                    <GraduationCap className="h-8 w-8" />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="justify-between text-xs text-muted-foreground">
                <div className="flex items-center">
                  <span className="h-3 w-3 rounded-full bg-green-500 mr-1"></span>
                  Excellent: 20%
                </div>
                <div className="flex items-center">
                  <span className="h-3 w-3 rounded-full bg-blue-500 mr-1"></span>
                  Good: 20%
                </div>
                <div className="flex items-center">
                  <span className="h-3 w-3 rounded-full bg-amber-500 mr-1"></span>
                  Average: 35%
                </div>
                <div className="flex items-center">
                  <span className="h-3 w-3 rounded-full bg-red-500 mr-1"></span>
                  Needs Help: 25%
                </div>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  Generate Class Report
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Send className="mr-2 h-4 w-4" />
                  Email Reports to Parents
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Printer className="mr-2 h-4 w-4" />
                  Print All Reports
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <PieChart className="mr-2 h-4 w-4" />
                  View Analytics Dashboard
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Tabs defaultValue="academic">
        <TabsList className="mb-4">
          <TabsTrigger value="academic">Academic Performance</TabsTrigger>
          <TabsTrigger value="attendance">Attendance Reports</TabsTrigger>
          <TabsTrigger value="behavior">Behavior Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="academic">
          <Card>
            <CardHeader>
              <CardTitle>Subject Performance</CardTitle>
              <CardDescription>
                Average performance by subject area
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex flex-col space-y-1.5">
                  <div className="flex justify-between">
                    <h3 className="font-medium">Mathematics</h3>
                    <span>85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <div className="flex justify-between">
                    <h3 className="font-medium">Science</h3>
                    <span>88%</span>
                  </div>
                  <Progress value={88} className="h-2" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <div className="flex justify-between">
                    <h3 className="font-medium">English</h3>
                    <span>79%</span>
                  </div>
                  <Progress value={79} className="h-2" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <div className="flex justify-between">
                    <h3 className="font-medium">History</h3>
                    <span>82%</span>
                  </div>
                  <Progress value={82} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attendance">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Overview</CardTitle>
              <CardDescription>Monthly attendance summary</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">
                        Present
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-green-500">
                        90%
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">
                        Absent
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-red-500">6%</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">
                        Tardy
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-amber-500">
                        4%
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="mt-6">
                  <h3 className="font-medium mb-2">
                    Students with Attendance Concerns
                  </h3>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Student</TableHead>
                          <TableHead>Attendance Rate</TableHead>
                          <TableHead>Absences</TableHead>
                          <TableHead>Tardies</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">
                            <div className="flex items-center">
                              <Avatar className="h-8 w-8 mr-2">
                                <AvatarImage
                                  src="/avatars/jamal.png"
                                  alt="Jamal Williams"
                                />
                                <AvatarFallback>JW</AvatarFallback>
                              </Avatar>
                              Jamal Williams
                            </div>
                          </TableCell>
                          <TableCell>78%</TableCell>
                          <TableCell>8</TableCell>
                          <TableCell>3</TableCell>
                          <TableCell>
                            <Button size="sm" variant="outline">
                              Contact Parent
                            </Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">
                            <div className="flex items-center">
                              <Avatar className="h-8 w-8 mr-2">
                                <AvatarImage
                                  src="/avatars/sophia.png"
                                  alt="Sophia Rodriguez"
                                />
                                <AvatarFallback>SR</AvatarFallback>
                              </Avatar>
                              Sophia Rodriguez
                            </div>
                          </TableCell>
                          <TableCell>88%</TableCell>
                          <TableCell>4</TableCell>
                          <TableCell>5</TableCell>
                          <TableCell>
                            <Button size="sm" variant="outline">
                              Contact Parent
                            </Button>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="behavior">
          <Card>
            <CardHeader>
              <CardTitle>Behavior Reports</CardTitle>
              <CardDescription>
                Student behavior and conduct summary
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <GraduationCap className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">
                  No behavior incidents reported
                </h3>
                <p className="text-muted-foreground mb-4">
                  There are no behavior incidents to report for the current
                  period
                </p>
                <Button variant="outline">View Previous Reports</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
