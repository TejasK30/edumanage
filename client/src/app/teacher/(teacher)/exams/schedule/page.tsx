"use client"

import React, { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { CalendarIcon, Plus } from "lucide-react"

export default function ExamsSchedulePage() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  // Mock exam data
  const exams = [
    {
      id: 1,
      subject: "Mathematics",
      date: "2025-03-25",
      time: "09:00 AM",
      duration: "2 hours",
      venue: "Hall A",
    },
    {
      id: 2,
      subject: "Science",
      date: "2025-03-27",
      time: "10:00 AM",
      duration: "1.5 hours",
      venue: "Lab 3",
    },
    {
      id: 3,
      subject: "English",
      date: "2025-04-01",
      time: "11:00 AM",
      duration: "2 hours",
      venue: "Hall B",
    },
    {
      id: 4,
      subject: "History",
      date: "2025-04-03",
      time: "09:00 AM",
      duration: "1.5 hours",
      venue: "Room 101",
    },
  ]

  // Sample highlighted dates for exams
  const highlightedDates = [
    new Date(2025, 2, 25),
    new Date(2025, 2, 27),
    new Date(2025, 3, 1),
    new Date(2025, 3, 3),
  ]

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Exam Schedule</h1>
          <p className="text-muted-foreground">
            View and manage upcoming examinations
          </p>
        </div>
        <Button className="shrink-0">
          <Plus className="mr-2 h-4 w-4" /> Schedule Exam
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Calendar View</CardTitle>
            <CardDescription>Exam dates are highlighted</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border mx-auto"
              modifiers={{
                highlighted: highlightedDates,
              }}
              modifiersStyles={{
                highlighted: { backgroundColor: "rgb(219 234 254)" },
              }}
            />
            <div className="mt-4">
              <div className="flex items-center gap-2 text-sm">
                <div className="h-3 w-3 rounded-full bg-blue-100"></div>
                <span>Exam days</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Upcoming Exams</CardTitle>
            <CardDescription>All scheduled examinations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Subject</TableHead>
                    <TableHead className="hidden md:table-cell">Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead className="hidden sm:table-cell">
                      Duration
                    </TableHead>
                    <TableHead className="hidden lg:table-cell">
                      Venue
                    </TableHead>
                    <TableHead className="text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {exams.map((exam) => (
                    <TableRow key={exam.id}>
                      <TableCell className="font-medium">
                        {exam.subject}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {exam.date}
                      </TableCell>
                      <TableCell>{exam.time}</TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {exam.duration}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        {exam.venue}
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge className="whitespace-nowrap" variant="outline">
                          <CalendarIcon className="mr-1 h-3 w-3" />
                          Scheduled
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
