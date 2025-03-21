import {
  GitBranch,
  Search,
  Download,
  Filter,
  AlertTriangle,
} from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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
import { PageHeader } from "@/components/dashboard-components/page-header"

export default function ProgressionPage() {
  // Sample statistics
  const stats = [
    { title: "Advancing to Next Year", value: "4,128", percentage: "92.7%" },
    { title: "Conditional Progression", value: "215", percentage: "4.8%" },
    { title: "Repeating Year", value: "89", percentage: "2%" },
    { title: "Academic Dismissal", value: "23", percentage: "0.5%" },
  ]

  // Sample student progression data
  const students = [
    {
      id: "ST001",
      name: "Alex Johnson",
      program: "Computer Science",
      year: "2nd Year",
      credits: 56,
      gpa: 3.6,
      status: "Clear",
    },
    {
      id: "ST002",
      name: "Maria Garcia",
      program: "Economics",
      year: "3rd Year",
      credits: 84,
      gpa: 3.2,
      status: "Clear",
    },
    {
      id: "ST003",
      name: "James Wilson",
      program: "Mechanical Engineering",
      year: "4th Year",
      credits: 112,
      gpa: 3.8,
      status: "Clear",
    },
    {
      id: "ST004",
      name: "Aisha Patel",
      program: "Biology",
      year: "2nd Year",
      credits: 46,
      gpa: 2.4,
      status: "At Risk",
    },
    {
      id: "ST005",
      name: "Thomas Lee",
      program: "Business Admin",
      year: "3rd Year",
      credits: 74,
      gpa: 2.2,
      status: "Probation",
    },
    {
      id: "ST006",
      name: "Sarah Miller",
      program: "Psychology",
      year: "1st Year",
      credits: 28,
      gpa: 3.5,
      status: "Clear",
    },
  ]

  return (
    <div className="space-y-6">
      <PageHeader
        title="Student Progression"
        description="Track student academic progress and year-to-year advancement"
        icon={GitBranch}
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
                {stat.percentage} of student body
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
              <Input
                placeholder="Search by name or ID..."
                className="w-full"
                prefix={<Search className="h-4 w-4" />}
              />
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Program" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Programs</SelectItem>
                  <SelectItem value="cs">Computer Science</SelectItem>
                  <SelectItem value="eng">Engineering</SelectItem>
                  <SelectItem value="bus">Business</SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue="all">
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  <SelectItem value="1">1st Year</SelectItem>
                  <SelectItem value="2">2nd Year</SelectItem>
                  <SelectItem value="3">3rd Year</SelectItem>
                  <SelectItem value="4">4th Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Student Progression Table */}
      <Card>
        <CardHeader>
          <CardTitle>Student Progression Status</CardTitle>
          <CardDescription>
            Progression status for current academic year
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Program</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>Credits Earned</TableHead>
                <TableHead>Current GPA</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          {student.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{student.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {student.id}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{student.program}</TableCell>
                  <TableCell>{student.year}</TableCell>
                  <TableCell>{student.credits}</TableCell>
                  <TableCell>{student.gpa.toFixed(1)}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        student.status === "Clear"
                          ? "default"
                          : student.status === "At Risk"
                          ? "warning"
                          : "destructive"
                      }
                    >
                      {student.status === "At Risk" && (
                        <AlertTriangle className="mr-1 h-3 w-3" />
                      )}
                      {student.status}
                    </Badge>
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
