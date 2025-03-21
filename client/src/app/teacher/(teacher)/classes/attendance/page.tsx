"use client"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AttendanceSession, Class } from "@/types/attendance"
import {
  Calendar,
  Clock,
  Loader2,
  PlusCircle,
  UserCheck,
  Users,
  X,
} from "lucide-react"
import React, { useEffect, useState } from "react"

import AttendanceDialog from "@/components/attendanceDialog"
import { useAttendanceStore } from "@/store/attendanceStore"
import SessionDetailsDialog from "./SessionDetailsDialog"

const TeacherAttendanceDashboard: React.FC = () => {
  const {
    classes,
    activeSessions,
    recentSessions,
    sessionLoading,
    error,
    fetchTeacherClasses,
    fetchClassStudents,
    fetchActiveSessions,
    createSession,
    endSession,
    setSelectedSession,
    selectedSession,
    clearError,
  } = useAttendanceStore()

  const [createSessionForm, setCreateSessionForm] = useState({
    classId: "",
    subject: "",
  })
  const [selectedTab, setSelectedTab] = useState("active")

  useEffect(() => {
    fetchTeacherClasses()
    fetchActiveSessions()
  }, [fetchTeacherClasses, fetchActiveSessions])

  // Set default class and fetch students if classes are loaded
  useEffect(() => {
    if (classes.length > 0 && !createSessionForm.classId) {
      setCreateSessionForm((prev) => ({ ...prev, classId: classes[0].id }))
      fetchClassStudents(classes[0].id)
    }
  }, [classes, createSessionForm.classId, fetchClassStudents])

  const handleClassChange = (value: string) => {
    setCreateSessionForm((prev) => ({ ...prev, classId: value }))
    fetchClassStudents(value)
  }

  const handleCreateSession = async () => {
    if (!createSessionForm.classId || !createSessionForm.subject) return
    await createSession(createSessionForm)
    setCreateSessionForm((prev) => ({ ...prev, subject: "" }))
  }

  const handleEndSession = async (sessionId: string) => {
    await endSession(sessionId)
  }

  return (
    <div className="container p-4 mx-auto">
      <h1 className="text-2xl font-bold mb-6">Attendance Management</h1>

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Tabs
        value={selectedTab}
        onValueChange={setSelectedTab}
        className="w-full"
      >
        <TabsList className="mb-4">
          <TabsTrigger value="active" id="active-tab">
            Active Sessions
          </TabsTrigger>
          <TabsTrigger value="create" id="create-tab">
            Create Session
          </TabsTrigger>
          <TabsTrigger value="history" id="history-tab">
            Recent Sessions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="mr-2" size={18} />
                Active Attendance Sessions
              </CardTitle>
              <CardDescription>
                Manage ongoing attendance sessions
              </CardDescription>
            </CardHeader>
            <CardContent>
              {sessionLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
              ) : activeSessions.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Users className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                  <p>No active attendance sessions found</p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => setSelectedTab("create")}
                  >
                    Create New Session
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {activeSessions.map((session: AttendanceSession) => (
                    <Card key={session.id} className="overflow-hidden">
                      <div className="p-4 bg-primary/5 flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold flex items-center">
                            <span className="mr-1">{session.class.name}</span>
                            <Badge variant="outline" className="ml-2">
                              {session.subject}
                            </Badge>
                          </h3>
                          <p className="text-sm text-gray-500">
                            Started:{" "}
                            {new Date(session.startTime).toLocaleTimeString()}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedSession(session)}
                          >
                            <UserCheck className="w-4 h-4 mr-1" /> Mark
                            Attendance
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-red-200 hover:bg-red-50 text-red-600"
                            onClick={() => handleEndSession(session.id)}
                          >
                            <X className="w-4 h-4 mr-1" /> End Session
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="create">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <PlusCircle className="mr-2" size={18} />
                Create New Attendance Session
              </CardTitle>
              <CardDescription>
                Start a new attendance session for a class
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <label htmlFor="class" className="text-sm font-medium">
                      Select Class
                    </label>
                    <Select
                      value={createSessionForm.classId}
                      onValueChange={handleClassChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a class" />
                      </SelectTrigger>
                      <SelectContent>
                        {classes.map((cls: Class) => (
                          <SelectItem key={cls.id} value={cls.id}>
                            {cls.name} - Grade {cls.grade}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      placeholder="e.g., Mathematics, Science"
                      value={createSessionForm.subject}
                      onChange={(e) =>
                        setCreateSessionForm((prev) => ({
                          ...prev,
                          subject: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button
                onClick={handleCreateSession}
                disabled={
                  !createSessionForm.classId ||
                  !createSessionForm.subject ||
                  sessionLoading
                }
              >
                {sessionLoading ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <PlusCircle className="w-4 h-4 mr-2" />
                )}
                Create Attendance Session
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="mr-2" size={18} />
                Recent Attendance Sessions
              </CardTitle>
              <CardDescription>
                View recently completed attendance sessions
              </CardDescription>
            </CardHeader>
            <CardContent>
              {sessionLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
              ) : recentSessions.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Calendar className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                  <p>No recent attendance sessions found</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Class</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentSessions.map((session: AttendanceSession) => (
                      <TableRow key={session.id}>
                        <TableCell className="font-medium">
                          {session.class.name}
                        </TableCell>
                        <TableCell>{session.subject}</TableCell>
                        <TableCell>
                          {new Date(session.startTime).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          {new Date(session.startTime).toLocaleTimeString()} -{" "}
                          {session.endTime
                            ? new Date(session.endTime).toLocaleTimeString()
                            : "Ongoing"}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              session.status === "completed"
                                ? "outline"
                                : "secondary"
                            }
                          >
                            {session.status === "completed"
                              ? "Completed"
                              : "Ongoing"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <AttendanceDialog />
      <SessionDetailsDialog />
    </div>
  )
}

export default TeacherAttendanceDashboard
