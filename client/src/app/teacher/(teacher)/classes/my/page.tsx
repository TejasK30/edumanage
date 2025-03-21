"use client"

import React, { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

// Define the type for a class
type ClassType = {
  id: string
  name: string
  section: string
  roomNumber: string
  studentCount: number
  schedule: string
  nextClass: string
}

// Mock hook response type
type TeacherClassesResponse = {
  data: ClassType[] | undefined
  isLoading: boolean
}

// Mock implementation of the hook
const useTeacherClasses = (): TeacherClassesResponse => {
  // In a real implementation, this would fetch data from an API
  // For now, we'll just return mock data
  return {
    data: undefined, // We'll use the mock data directly
    isLoading: false,
  }
}

export default function TeacherClasses() {
  const { data, isLoading } = useTeacherClasses()
  const [searchTerm, setSearchTerm] = useState("")

  // Mock data for development
  const mockClasses: ClassType[] = [
    {
      id: "c1",
      name: "Mathematics - Grade 10",
      section: "A",
      roomNumber: "101",
      studentCount: 32,
      schedule: "Mon, Wed, Fri - 10:00 AM",
      nextClass: "Today, 10:00 AM",
    },
    {
      id: "c2",
      name: "Physics - Grade 11",
      section: "B",
      roomNumber: "205",
      studentCount: 28,
      schedule: "Tue, Thu - 11:30 AM",
      nextClass: "Tomorrow, 11:30 AM",
    },
    {
      id: "c3",
      name: "Chemistry - Grade 10",
      section: "A",
      roomNumber: "Lab 3",
      studentCount: 30,
      schedule: "Mon, Wed - 2:00 PM",
      nextClass: "Today, 2:00 PM",
    },
    {
      id: "c4",
      name: "Biology - Grade 11",
      section: "C",
      roomNumber: "Lab 2",
      studentCount: 25,
      schedule: "Tue, Thu - 9:00 AM",
      nextClass: "Tomorrow, 9:00 AM",
    },
    {
      id: "c5",
      name: "Computer Science - Grade 12",
      section: "A",
      roomNumber: "ICT Lab",
      studentCount: 22,
      schedule: "Mon, Wed - 11:00 AM",
      nextClass: "Today, 11:00 AM",
    },
  ]

  // Use data from hook if available, otherwise use mock data
  const classes: ClassType[] = data || mockClasses

  const filteredClasses = classes.filter(
    (cls: ClassType) =>
      cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cls.section.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-12 w-[250px]" />
        <Skeleton className="h-12 w-full" />
        <div className="grid gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-[200px] rounded-lg" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="w-full bg-background text-foreground transition-none min-h-screen pr-4 py-2 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">My Classes</h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search classes..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button asChild>
          <Link href="/teacher/classes/timetables">View Timetable</Link>
        </Button>
      </div>

      <div className="grid gap-4">
        {filteredClasses.map((cls: ClassType) => (
          <Card key={cls.id} className="hover:bg-accent/5 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle>{cls.name}</CardTitle>
                <CardDescription>
                  Section: {cls.section} | Room: {cls.roomNumber}
                </CardDescription>
              </div>
              <Badge variant="outline">{cls.studentCount} Students</Badge>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Schedule</p>
                  <p className="font-medium">{cls.schedule}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Next Class
                  </p>
                  <p className="font-medium">{cls.nextClass}</p>
                </div>
                <div className="flex gap-2 sm:self-end">
                  <Button size="sm" variant="outline" asChild>
                    <Link
                      href={`/teacher/classes/attendance?classId=${cls.id}`}
                    >
                      Attendance
                    </Link>
                  </Button>
                  <Button size="sm" asChild>
                    <Link href={`/teacher/classes/my?classId=${cls.id}`}>
                      View Details
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
