"use client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
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
import {
  Calendar,
  CheckCircle as CheckCheck,
  Clock,
  Loader2,
  Search,
  UserCheck,
} from "lucide-react"
import React, { useEffect } from "react"

import AttendanceRecordDialog from "@/components/AttendanceRecordDialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useStudentAttendanceStore } from "@/store/studentAttendanceStore"
import { ActiveSession } from "@/types/attendance"

const StudentAttendanceDashboard: React.FC = () => {
  const {
    activeSessions,
    attendanceRecords,
    attendanceSummary,
    loading,
    recordsLoading,
    error,
    filterSubject,
    filterStatus,
    filterDateFrom,
    filterDateTo,
    setFilterSubject,
    setFilterStatus,
    setFilterDateFrom,
    setFilterDateTo,
    fetchStudentData,
    fetchAttendanceRecords,
    clearFilters,
    selfMarkAttendance,
    setSelectedRecord,
    setShowRecordDetails,
  } = useStudentAttendanceStore()

  useEffect(() => {
    fetchStudentData()
  }, [fetchStudentData])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "present":
        return <Badge className="bg-green-100 text-green-800">Present</Badge>
      case "absent":
        return <Badge className="bg-red-100 text-red-800">Absent</Badge>
      case "late":
        return <Badge className="bg-yellow-100 text-yellow-800">Late</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>
    }
  }

  return (
    <div className="container p-4 mx-auto">
      <h1 className="text-2xl font-bold mb-6">My Attendance</h1>

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="active">Active Sessions</TabsTrigger>
          <TabsTrigger value="history">Attendance History</TabsTrigger>
          <TabsTrigger value="stats">Attendance Statistics</TabsTrigger>
        </TabsList>

        {/* Active Sessions Tab */}
        <TabsContent value="active">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="mr-2" size={18} />
                Active Class Sessions
              </CardTitle>
              <CardDescription>
                Mark your attendance for ongoing class sessions
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
              ) : activeSessions.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Calendar className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                  <p>No active class sessions found</p>
                  <p className="text-sm text-gray-400 mt-2">
                    Active sessions will appear here when your teachers start
                    them
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {activeSessions.map((session: ActiveSession) => (
                    <Card key={session.id} className="overflow-hidden">
                      <div className="p-4 bg-primary/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
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
                        {session.studentAttendance ? (
                          <div className="flex items-center">
                            <CheckCheck className="w-5 h-5 text-green-500 mr-2" />
                            <div>
                              <p className="text-sm font-medium">
                                Marked as {session.studentAttendance.status}
                              </p>
                              <p className="text-xs text-gray-500">
                                at{" "}
                                {new Date(
                                  session.studentAttendance.markedAt
                                ).toLocaleTimeString()}
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div className="flex gap-2">
                            <Button
                              onClick={() =>
                                selfMarkAttendance(session.id, "present")
                              }
                              variant="default"
                              size="sm"
                            >
                              <UserCheck className="w-4 h-4 mr-1" /> Mark
                              Present
                            </Button>
                            <Button
                              onClick={() =>
                                selfMarkAttendance(session.id, "late")
                              }
                              variant="outline"
                              size="sm"
                            >
                              <Clock className="w-4 h-4 mr-1" /> Mark Late
                            </Button>
                          </div>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Attendance History Tab */}
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="mr-2" size={18} />
                Attendance History
              </CardTitle>
              <CardDescription>
                View your past attendance records
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Filters */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div>
                    <label className="text-sm font-medium block mb-1">
                      Subject
                    </label>
                    <Select
                      value={filterSubject}
                      onValueChange={setFilterSubject}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="All subjects" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All subjects</SelectItem>
                        {[
                          ...new Set(
                            attendanceRecords.map(
                              (record) => record.session.subject
                            )
                          ),
                        ].map((subject) => (
                          <SelectItem key={subject} value={subject}>
                            {subject}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-1">
                      Status
                    </label>
                    <Select
                      value={filterStatus}
                      onValueChange={setFilterStatus}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="All statuses" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All statuses</SelectItem>
                        <SelectItem value="present">Present</SelectItem>
                        <SelectItem value="absent">Absent</SelectItem>
                        <SelectItem value="late">Late</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-1">
                      From Date
                    </label>
                    <Input
                      type="date"
                      value={filterDateFrom}
                      onChange={(e) => setFilterDateFrom(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-1">
                      To Date
                    </label>
                    <Input
                      type="date"
                      value={filterDateTo}
                      onChange={(e) => setFilterDateTo(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={clearFilters}>
                    Clear Filters
                  </Button>
                  <Button onClick={fetchAttendanceRecords}>
                    <Search className="w-4 h-4 mr-2" /> Apply Filters
                  </Button>
                </div>

                {recordsLoading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  </div>
                ) : attendanceRecords.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Alert className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                    <p>No attendance records found</p>
                    <p className="text-sm text-gray-400 mt-2">
                      Try adjusting your filters or check back later
                    </p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Class</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {attendanceRecords.map((record) => (
                        <TableRow key={record.id}>
                          <TableCell>
                            {new Date(
                              record.session.startTime
                            ).toLocaleDateString()}
                          </TableCell>
                          <TableCell>{record.session.class.name}</TableCell>
                          <TableCell>{record.session.subject}</TableCell>
                          <TableCell>{getStatusBadge(record.status)}</TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setSelectedRecord(record)
                                setShowRecordDetails(true)
                              }}
                            >
                              View Details
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Attendance Statistics Tab */}
        <TabsContent value="stats">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <UserCheck className="mr-2" size={18} />
                Attendance Statistics
              </CardTitle>
              <CardDescription>
                View your attendance summary and analytics
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
              ) : !attendanceSummary ? (
                <div className="text-center py-8 text-gray-500">
                  <Calendar className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                  <p>No attendance data available</p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-center">
                          <p className="text-sm text-gray-500 mb-1">
                            Total Sessions
                          </p>
                          <p className="text-3xl font-bold">
                            {attendanceSummary.totalSessions}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-center">
                          <p className="text-sm text-gray-500 mb-1">Present</p>
                          <p className="text-3xl font-bold text-green-600">
                            {attendanceSummary.presentCount}
                            <span className="text-sm font-normal text-gray-500 ml-1">
                              (
                              {Math.round(
                                (attendanceSummary.presentCount /
                                  attendanceSummary.totalSessions) *
                                  100
                              )}
                              %)
                            </span>
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-center">
                          <p className="text-sm text-gray-500 mb-1">Absent</p>
                          <p className="text-3xl font-bold text-red-600">
                            {attendanceSummary.absentCount}
                            <span className="text-sm font-normal text-gray-500 ml-1">
                              (
                              {Math.round(
                                (attendanceSummary.absentCount /
                                  attendanceSummary.totalSessions) *
                                  100
                              )}
                              %)
                            </span>
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-center">
                          <p className="text-sm text-gray-500 mb-1">Late</p>
                          <p className="text-3xl font-bold text-yellow-600">
                            {attendanceSummary.lateCount}
                            <span className="text-sm font-normal text-gray-500 ml-1">
                              (
                              {Math.round(
                                (attendanceSummary.lateCount /
                                  attendanceSummary.totalSessions) *
                                  100
                              )}
                              %)
                            </span>
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">
                      Subject Breakdown
                    </h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Subject</TableHead>
                          <TableHead>Total</TableHead>
                          <TableHead>Present</TableHead>
                          <TableHead>Absent</TableHead>
                          <TableHead>Late</TableHead>
                          <TableHead>Attendance %</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {Object.entries(attendanceSummary.subjectBreakdown).map(
                          ([subject, data]) => (
                            <TableRow key={subject}>
                              <TableCell className="font-medium">
                                {subject}
                              </TableCell>
                              <TableCell>{data.total}</TableCell>
                              <TableCell className="text-green-600">
                                {data.present}
                              </TableCell>
                              <TableCell className="text-red-600">
                                {data.absent}
                              </TableCell>
                              <TableCell className="text-yellow-600">
                                {data.late}
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center">
                                  <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                                    <div
                                      className="bg-primary h-2.5 rounded-full"
                                      style={{ width: `${data.percentage}%` }}
                                    ></div>
                                  </div>
                                  <span>{data.percentage}%</span>
                                </div>
                              </TableCell>
                            </TableRow>
                          )
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <AttendanceRecordDialog />
    </div>
  )
}

export default StudentAttendanceDashboard
