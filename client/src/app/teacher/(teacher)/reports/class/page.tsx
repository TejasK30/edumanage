"use client"

import React, { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
  Download,
  FileText,
  Users,
  BarChart3,
  BookOpen,
  LineChart,
} from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function ClassReportsPage() {
  const [selectedClass, setSelectedClass] = useState<string>("10A")
  const [selectedSubject, setSelectedSubject] = useState<string>("Science")

  // Mock data for demonstration
  const classOptions = ["9A", "9B", "10A", "10B", "11A", "11B"]
  const subjectOptions = [
    "Mathematics",
    "Science",
    "History",
    "English",
    "Physics",
  ]

  const performanceData = {
    classAverage: 76,
    topScore: 98,
    lowestScore: 45,
    aboveAverage: 15,
    belowAverage: 10,
  }

  const attendanceData = {
    overall: 92,
    thisMonth: 94,
    lastMonth: 90,
  }

  const studentPerformance = [
    { id: 1, name: "Amy Wilson", average: 92, trend: "up", attendance: 98 },
    { id: 2, name: "James Lee", average: 85, trend: "stable", attendance: 95 },
    { id: 3, name: "Sarah Brown", average: 78, trend: "down", attendance: 88 },
    { id: 4, name: "Michael Chen", average: 95, trend: "up", attendance: 100 },
    {
      id: 5,
      name: "Robert Johnson",
      average: 65,
      trend: "down",
      attendance: 82,
    },
    { id: 6, name: "Emily Davis", average: 88, trend: "up", attendance: 94 },
  ]

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Class Reports</h1>
          <p className="text-muted-foreground">
            Track performance, attendance, and progress
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Select value={selectedClass} onValueChange={setSelectedClass}>
            <SelectTrigger className="w-full sm:w-[150px]">
              <SelectValue placeholder="Select class" />
            </SelectTrigger>
            <SelectContent>
              {classOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  Class {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedSubject} onValueChange={setSelectedSubject}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Select subject" />
            </SelectTrigger>
            <SelectContent>
              {subjectOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Class Average</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {performanceData.classAverage}%
            </div>
            <Progress className="mt-2" value={performanceData.classAverage} />
            <p className="text-xs text-muted-foreground mt-1">
              +2.5% from last assessment
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Attendance Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{attendanceData.overall}%</div>
            <Progress className="mt-2" value={attendanceData.overall} />
            <p className="text-xs text-muted-foreground mt-1">
              +4% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Students Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between text-sm">
              <div>
                <div className="font-medium">Above Average</div>
                <div className="text-muted-foreground">
                  {performanceData.aboveAverage} students
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium">Below Average</div>
                <div className="text-muted-foreground">
                  {performanceData.belowAverage} students
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="performance">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:w-auto lg:grid-cols-4">
          <TabsTrigger value="performance">
            <BarChart3 className="mr-2 h-4 w-4" />
            Performance
          </TabsTrigger>
          <TabsTrigger value="attendance">
            <Users className="mr-2 h-4 w-4" />
            Attendance
          </TabsTrigger>
          <TabsTrigger value="assignments">
            <FileText className="mr-2 h-4 w-4" />
            Assignments
          </TabsTrigger>
          <TabsTrigger value="progress">
            <LineChart className="mr-2 h-4 w-4" />
            Progress
          </TabsTrigger>
        </TabsList>
        <TabsContent value="performance" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Student Performance</CardTitle>
              <CardDescription>
                Overview of individual student performance in {selectedSubject}{" "}
                for Class {selectedClass}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-12 bg-muted p-3 rounded-t-md">
                  <div className="col-span-6 sm:col-span-5 font-medium">
                    Student
                  </div>
                  <div className="col-span-2 font-medium text-center hidden sm:block">
                    Attendance
                  </div>
                  <div className="col-span-3 font-medium text-center">
                    Average
                  </div>
                  <div className="col-span-3 sm:col-span-2 font-medium text-center">
                    Trend
                  </div>
                </div>
                {studentPerformance.map((student) => (
                  <div
                    key={student.id}
                    className="grid grid-cols-12 p-3 border-t"
                  >
                    <div className="col-span-6 sm:col-span-5">
                      {student.name}
                    </div>
                    <div className="col-span-2 text-center hidden sm:block">
                      {student.attendance}%
                    </div>
                    <div className="col-span-3 text-center">
                      {student.average}%
                    </div>
                    <div className="col-span-3 sm:col-span-2 text-center">
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs ${
                          student.trend === "up"
                            ? "bg-green-100 text-green-800"
                            : student.trend === "down"
                            ? "bg-red-100 text-red-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {student.trend === "up"
                          ? "↑"
                          : student.trend === "down"
                          ? "↓"
                          : "→"}{" "}
                        {student.trend}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="attendance" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Reports</CardTitle>
              <CardDescription>
                Track attendance patterns for Class {selectedClass}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Attendance data would be displayed here
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">
                      Overall
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {attendanceData.overall}%
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">
                      This Month
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {attendanceData.thisMonth}%
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">
                      Last Month
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {attendanceData.lastMonth}%
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="assignments" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Assignments Overview</CardTitle>
              <CardDescription>
                Track assignment completion and performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Assignment data would be displayed here
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="progress" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Progress Tracking</CardTitle>
              <CardDescription>
                Monitor class progress over the term
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Progress data would be displayed here
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
