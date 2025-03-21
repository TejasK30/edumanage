"use client"

import React, { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Search,
  UserPlus,
  Filter,
  Download,
  Mail,
  Phone,
  MoreHorizontal,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function StudentsPage() {
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [selectedClass, setSelectedClass] = useState<string>("all")

  // Mock data for demonstration
  const classOptions = ["all", "9A", "9B", "10A", "10B", "11A", "11B"]

  const students = [
    {
      id: 1,
      name: "James Wilson",
      avatar: "/api/placeholder/32/32",
      class: "10A",
      email: "james.wilson@school.edu",
      phone: "123-456-7890",
      attendance: 95,
      performance: 88,
      status: "active",
    },
    {
      id: 2,
      name: "Emma Johnson",
      avatar: "/api/placeholder/32/32",
      class: "10A",
      email: "emma.johnson@school.edu",
      phone: "123-456-7891",
      attendance: 92,
      performance: 79,
      status: "active",
    },
    {
      id: 3,
      name: "Michael Chen",
      avatar: "/api/placeholder/32/32",
      class: "10B",
      email: "michael.chen@school.edu",
      phone: "123-456-7892",
      attendance: 98,
      performance: 95,
      status: "active",
    },
    {
      id: 4,
      name: "Sarah Brown",
      avatar: "/api/placeholder/32/32",
      class: "10B",
      email: "sarah.brown@school.edu",
      phone: "123-456-7893",
      attendance: 88,
      performance: 78,
      status: "active",
    },
    {
      id: 5,
      name: "Robert Johnson",
      avatar: "/api/placeholder/32/32",
      class: "11A",
      email: "robert.johnson@school.edu",
      phone: "123-456-7894",
      attendance: 82,
      performance: 65,
      status: "inactive",
    },
    {
      id: 6,
      name: "Emily Davis",
      avatar: "/api/placeholder/32/32",
      class: "11A",
      email: "emily.davis@school.edu",
      phone: "123-456-7895",
      attendance: 94,
      performance: 88,
      status: "active",
    },
  ]

  // Filter students based on search and class
  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedClass === "all" || student.class === selectedClass)
  )

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Students</h1>
          <p className="text-muted-foreground">
            Manage students and view their information
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Add New Student
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle>Student Directory</CardTitle>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <div className="relative w-full sm:w-auto">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search students..."
                  className="pl-8 w-full sm:w-[250px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger className="w-full sm:w-[150px]">
                  <SelectValue placeholder="Class" />
                </SelectTrigger>
                <SelectContent>
                  {classOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option === "all" ? "All Classes" : `Class ${option}`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px]">Student</TableHead>
                  <TableHead className="hidden md:table-cell">Class</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Contact
                  </TableHead>
                  <TableHead className="text-center hidden sm:table-cell">
                    Attendance
                  </TableHead>
                  <TableHead className="text-center hidden sm:table-cell">
                    Performance
                  </TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="text-center py-6 text-muted-foreground"
                    >
                      No students found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>
                        <div className="flex items-center">
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarImage
                              src={student.avatar}
                              alt={student.name}
                            />
                            <AvatarFallback>
                              {student.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{student.name}</div>
                            <div className="text-xs text-muted-foreground md:hidden">
                              Class {student.class}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {student.class}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="text-sm">
                          <div className="flex items-center text-muted-foreground">
                            <Mail className="h-3 w-3 mr-1" />
                            {student.email}
                          </div>
                          <div className="flex items-center text-muted-foreground mt-1">
                            <Phone className="h-3 w-3 mr-1" />
                            {student.phone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-center hidden sm:table-cell">
                        <div className="text-sm font-medium">
                          {student.attendance}%
                        </div>
                      </TableCell>
                      <TableCell className="text-center hidden sm:table-cell">
                        <div className="text-sm font-medium">
                          {student.performance}%
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge
                          variant={
                            student.status === "active"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {student.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>View Profile</DropdownMenuItem>
                            <DropdownMenuItem>Edit Student</DropdownMenuItem>
                            <DropdownMenuItem>
                              Performance History
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Send Message</DropdownMenuItem>
                            <DropdownMenuItem>
                              Mark as Inactive
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Student Performance Overview</CardTitle>
            <CardDescription>
              Quick snapshot of student performance metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <div>Average Attendance</div>
                <div className="font-medium">91.5%</div>
              </div>
              <div className="flex justify-between">
                <div>Average Performance</div>
                <div className="font-medium">82.2%</div>
              </div>
              <div className="flex justify-between">
                <div>Active Students</div>
                <div className="font-medium">25</div>
              </div>
              <div className="flex justify-between">
                <div>Inactive Students</div>
                <div className="font-medium">2</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>
              Latest student-related activities and events
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="rounded-full w-2 h-2 bg-blue-500 mt-2 mr-2"></div>
                <div>
                  <div className="font-medium">
                    Added new student: Lisa Thompson
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Today, 9:42 AM
                  </div>
                </div>
              </div>
              <div className="flex items-start">
                <div className="rounded-full w-2 h-2 bg-green-500 mt-2 mr-2"></div>
                <div>
                  <div className="font-medium">
                    Updated student profile: Michael Chen
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Yesterday, 2:15 PM
                  </div>
                </div>
              </div>
              <div className="flex items-start">
                <div className="rounded-full w-2 h-2 bg-orange-500 mt-2 mr-2"></div>
                <div>
                  <div className="font-medium">
                    Student status changed: Robert Johnson
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Mar 18, 11:30 AM
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
