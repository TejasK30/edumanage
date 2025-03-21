"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useFetchTeacherData, useTeacherClasses } from "@/hooks/useT"
import { Calendar, ChevronRight, Clock, Users } from "lucide-react"
import { useState } from "react"

export default function TimetablesPage() {
  const [selectedDay, setSelectedDay] = useState<string>("monday")
  const { data: classesData, isLoading: classesLoading } = useTeacherClasses()

  const { data: timetableData, isLoading: timetableLoading } =
    useFetchTeacherData(["teacherTimetable"], "/teacher/timetable")

  // Mock timetable data
  const timetable = timetableData || {
    monday: [
      {
        id: "m1",
        subject: "Mathematics",
        class: "Grade 10-A",
        room: "Room 101",
        startTime: "08:00",
        endTime: "09:30",
      },
      {
        id: "m2",
        subject: "Physics",
        class: "Grade 11-B",
        room: "Room 203",
        startTime: "10:00",
        endTime: "11:30",
      },
      {
        id: "m3",
        subject: "Computer Science",
        class: "Grade 12-A",
        room: "Lab 3",
        startTime: "13:00",
        endTime: "14:30",
      },
    ],
    tuesday: [
      {
        id: "t1",
        subject: "Chemistry",
        class: "Grade 10-A",
        room: "Room 105",
        startTime: "08:00",
        endTime: "09:30",
      },
      {
        id: "t2",
        subject: "Mathematics",
        class: "Grade 11-B",
        room: "Room 201",
        startTime: "10:00",
        endTime: "11:30",
      },
    ],
    wednesday: [
      {
        id: "w1",
        subject: "Biology",
        class: "Grade 11-C",
        room: "Lab 2",
        startTime: "09:00",
        endTime: "10:30",
      },
      {
        id: "w2",
        subject: "Computer Science",
        class: "Grade 12-A",
        room: "Lab 3",
        startTime: "13:00",
        endTime: "14:30",
      },
      {
        id: "w3",
        subject: "Physics",
        class: "Grade 11-B",
        room: "Room 203",
        startTime: "15:00",
        endTime: "16:30",
      },
    ],
    thursday: [
      {
        id: "th1",
        subject: "Mathematics",
        class: "Grade 10-A",
        room: "Room 101",
        startTime: "08:00",
        endTime: "09:30",
      },
      {
        id: "th2",
        subject: "Chemistry",
        class: "Grade 10-A",
        room: "Room 105",
        startTime: "10:00",
        endTime: "11:30",
      },
    ],
    friday: [
      {
        id: "f1",
        subject: "Physics",
        class: "Grade 11-B",
        room: "Room 203",
        startTime: "08:00",
        endTime: "09:30",
      },
      {
        id: "f2",
        subject: "Biology",
        class: "Grade 11-C",
        room: "Lab 2",
        startTime: "10:00",
        endTime: "11:30",
      },
      {
        id: "f3",
        subject: "Computer Science",
        class: "Grade 12-A",
        room: "Lab 3",
        startTime: "13:00",
        endTime: "14:30",
      },
    ],
  }

  const days = ["monday", "tuesday", "wednesday", "thursday", "friday"]

  const getTimeSlotClasses = (slot: any) => {
    let currentTime = new Date()
    let [startHour, startMinute] = slot.startTime.split(":").map(Number)
    let [endHour, endMinute] = slot.endTime.split(":").map(Number)

    let startDate = new Date()
    startDate.setHours(startHour, startMinute)

    let endDate = new Date()
    endDate.setHours(endHour, endMinute)

    if (currentTime >= startDate && currentTime <= endDate) {
      return "border-l-4 border-green-500"
    }

    if (currentTime < startDate) {
      return "border-l-4 border-blue-500"
    }

    return "border-l-4 border-gray-200"
  }

  return (
    <div className="w-full bg-background text-foreground transition-none min-h-screen pr-4 py-2 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Class Timetable</h1>
        <Button variant="outline">Export Schedule</Button>
      </div>

      <Tabs defaultValue={selectedDay} onValueChange={setSelectedDay}>
        <TabsList className="grid grid-cols-5 mb-6">
          {days.map((day) => (
            <TabsTrigger key={day} value={day} className="capitalize">
              {day}
            </TabsTrigger>
          ))}
        </TabsList>

        {days.map((day) => (
          <TabsContent key={day} value={day}>
            <Card>
              <CardHeader>
                <CardTitle className="capitalize flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  {day}'s Schedule
                </CardTitle>
              </CardHeader>
              <CardContent>
                {timetableLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center space-x-4">
                        <Skeleton className="h-12 w-12 rounded-full" />
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-[250px]" />
                          <Skeleton className="h-4 w-[200px]" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : timetable[day]?.length > 0 ? (
                  <div className="space-y-4">
                    {timetable[day].map((slot) => (
                      <Card key={slot.id} className={getTimeSlotClasses(slot)}>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <h3 className="font-semibold text-lg">
                                {slot.subject}
                              </h3>
                              <div className="flex items-center text-sm text-muted-foreground mt-1">
                                <Users className="h-4 w-4 mr-1" />
                                <span>{slot.class}</span>
                                <span className="mx-2">•</span>
                                <Clock className="h-4 w-4 mr-1" />
                                <span>
                                  {slot.startTime} - {slot.endTime}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <Badge variant="outline" className="mr-2">
                                {slot.room}
                              </Badge>
                              <Button variant="ghost" size="sm">
                                <ChevronRight className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No classes scheduled for {day}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
