import { Users, Search, Download, Filter, Plus } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Link from "next/link"
import { PageHeader } from "@/components/dashboard-components/page-header"

export default function StudentListPage() {
  // Sample data - would come from API in real app
  const students = [
    {
      id: "ST001",
      name: "Alex Johnson",
      email: "alex.j@example.edu",
      program: "Computer Science",
      year: "3rd Year",
      status: "Active",
    },
    {
      id: "ST002",
      name: "Maria Garcia",
      email: "m.garcia@example.edu",
      program: "Economics",
      year: "2nd Year",
      status: "Active",
    },
    {
      id: "ST003",
      name: "James Wilson",
      email: "j.wilson@example.edu",
      program: "Mechanical Engineering",
      year: "4th Year",
      status: "Active",
    },
    {
      id: "ST004",
      name: "Aisha Patel",
      email: "a.patel@example.edu",
      program: "Biology",
      year: "1st Year",
      status: "Active",
    },
    {
      id: "ST005",
      name: "Thomas Lee",
      email: "t.lee@example.edu",
      program: "Business Admin",
      year: "3rd Year",
      status: "On Leave",
    },
    {
      id: "ST006",
      name: "Sarah Miller",
      email: "s.miller@example.edu",
      program: "Psychology",
      year: "4th Year",
      status: "Active",
    },
    {
      id: "ST007",
      name: "David Chen",
      email: "d.chen@example.edu",
      program: "Physics",
      year: "2nd Year",
      status: "Probation",
    },
    {
      id: "ST008",
      name: "Emma Rodriguez",
      email: "e.rodriguez@example.edu",
      program: "Literature",
      year: "1st Year",
      status: "Active",
    },
  ]

  return (
    <div className="space-y-6">
      <PageHeader
        title="Student List"
        description="View and manage all student records"
        icon={Users}
      >
        <Button asChild>
          <Link href="/admin/students/admissions">
            <Plus className="mr-2 h-4 w-4" />
            Add Student
          </Link>
        </Button>
      </PageHeader>

      {/* Filters and Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
            <div className="flex w-full items-center space-x-2 md:w-2/3">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, ID, or email..."
                  className="pl-10 w-full"
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
                  <SelectValue placeholder="Program" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Programs</SelectItem>
                  <SelectItem value="cs">Computer Science</SelectItem>
                  <SelectItem value="eng">Engineering</SelectItem>
                  <SelectItem value="bus">Business</SelectItem>
                  <SelectItem value="arts">Arts & Humanities</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Students Table */}
      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Program</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.id}</TableCell>
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
                          {student.email}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{student.program}</TableCell>
                  <TableCell>{student.year}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        student.status === "Active"
                          ? "default"
                          : student.status === "On Leave"
                          ? "secondary"
                          : "destructive"
                      }
                    >
                      {student.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <span className="text-xl">⋯</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                        <DropdownMenuItem>Edit Details</DropdownMenuItem>
                        <DropdownMenuItem>Academic Record</DropdownMenuItem>
                        <DropdownMenuItem>Attendance</DropdownMenuItem>
                        <DropdownMenuItem>Fee Status</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
