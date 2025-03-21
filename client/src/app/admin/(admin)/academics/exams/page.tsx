"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Exam {
  id: string
  name: string
  course: string
  date: string
  type: "midterm" | "final" | "quiz"
  status: "scheduled" | "completed" | "cancelled"
}

export default function ExamsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")

  const examsData: Exam[] = [
    {
      id: "EX001",
      name: "Database Systems Midterm",
      course: "Database Systems",
      date: "2025-03-20",
      type: "midterm",
      status: "scheduled",
    },
    {
      id: "EX002",
      name: "Calculus Final",
      course: "Calculus 101",
      date: "2025-04-10",
      type: "final",
      status: "scheduled",
    },
    {
      id: "EX003",
      name: "Programming Quiz",
      course: "Introduction to Programming",
      date: "2025-03-15",
      type: "quiz",
      status: "completed",
    },
    {
      id: "EX004",
      name: "Machine Learning Final",
      course: "Advanced Machine Learning",
      date: "2025-04-25",
      type: "final",
      status: "scheduled",
    },
  ]

  const filteredData = examsData.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.course.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = filterType === "all" || item.type === filterType

    return matchesSearch && matchesType
  })

  const upcomingExams = filteredData.filter(
    (item) => item.status === "scheduled"
  )
  const completedExams = filteredData.filter(
    (item) => item.status === "completed"
  )
  const cancelledExams = filteredData.filter(
    (item) => item.status === "cancelled"
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "scheduled":
        return (
          <Badge className="bg-primary-blue-100 text-primary-blue-800 border-primary-blue-200">
            Scheduled
          </Badge>
        )
      case "completed":
        return (
          <Badge className="bg-washed-purple-100 text-washed-purple-800 border-washed-purple-200">
            Completed
          </Badge>
        )
      case "cancelled":
        return (
          <Badge className="bg-Neutrals/neutrals-4 text-Neutrals/neutrals-8 border-Neutrals/neutrals-5">
            Cancelled
          </Badge>
        )
      default:
        return <Badge>{status}</Badge>
    }
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "midterm":
        return (
          <Badge
            variant="outline"
            className="bg-washed-blue-50 text-washed-blue-800"
          >
            Midterm
          </Badge>
        )
      case "final":
        return (
          <Badge
            variant="outline"
            className="bg-primary-purple-50 text-primary-purple-800"
          >
            Final
          </Badge>
        )
      case "quiz":
        return (
          <Badge
            variant="outline"
            className="bg-Neutrals/neutrals-3 text-Neutrals/neutrals-9"
          >
            Quiz
          </Badge>
        )
      default:
        return <Badge variant="outline">{type}</Badge>
    }
  }

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-Neutrals/neutrals-12">
          Exams Management
        </h1>
        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          <Input
            placeholder="Search exams..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="midterm">Midterm</SelectItem>
              <SelectItem value="final">Final</SelectItem>
              <SelectItem value="quiz">Quiz</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-primary-blue-600 hover:bg-primary-blue-700">
            Schedule Exam
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-Neutrals/neutrals-7">
              Upcoming Exams
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{upcomingExams.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-Neutrals/neutrals-7">
              Completed Exams
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{completedExams.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-Neutrals/neutrals-7">
              Cancelled Exams
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{cancelledExams.length}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full md:w-auto grid-cols-3">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="all">All Exams</TabsTrigger>
        </TabsList>

        {["upcoming", "completed", "all"].map((tab) => (
          <TabsContent key={tab} value={tab}>
            <Card>
              <CardHeader className="bg-Neutrals/neutrals-2 border-b">
                <CardTitle className="capitalize">
                  {tab === "all" ? "All" : tab} Exams
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Exam Name</TableHead>
                      <TableHead>Course</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {(tab === "all"
                      ? filteredData
                      : tab === "upcoming"
                      ? upcomingExams
                      : completedExams
                    ).length > 0 ? (
                      (tab === "all"
                        ? filteredData
                        : tab === "upcoming"
                        ? upcomingExams
                        : completedExams
                      ).map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">
                            {item.name}
                          </TableCell>
                          <TableCell>{item.course}</TableCell>
                          <TableCell>{item.date}</TableCell>
                          <TableCell>{getTypeBadge(item.type)}</TableCell>
                          <TableCell>{getStatusBadge(item.status)}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                View
                              </Button>
                              <Button variant="outline" size="sm">
                                Edit
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={6}
                          className="text-center py-6 text-Neutrals/neutrals-7"
                        >
                          No exams found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
