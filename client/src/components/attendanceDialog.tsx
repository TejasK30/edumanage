import React, { useEffect, useState } from "react"
import { Student } from "@/types/attendance"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { Loader2, CheckCircle2 } from "lucide-react"
import { useAttendanceStore } from "@/store/attendanceStore"

const AttendanceDialog: React.FC = () => {
  const { selectedSession, students, markAttendance, setSelectedSession } =
    useAttendanceStore()
  const [attendanceStatus, setAttendanceStatus] = useState<
    Record<string, "present" | "absent" | "late">
  >({})
  const [attendanceRemarks, setAttendanceRemarks] = useState<
    Record<string, string>
  >({})
  const [marking, setMarking] = useState(false)

  useEffect(() => {
    if (selectedSession) {
      const status: Record<string, "present" | "absent" | "late"> = {}
      const remarks: Record<string, string> = {}
      students.forEach((student: Student) => {
        status[student.id] = "present"
        remarks[student.id] = ""
      })
      setAttendanceStatus(status)
      setAttendanceRemarks(remarks)
    }
  }, [selectedSession, students])

  const handleSave = async () => {
    if (!selectedSession) return
    setMarking(true)
    const attendanceData: Record<
      string,
      { status: "present" | "absent" | "late"; remarks?: string }
    > = {}
    Object.keys(attendanceStatus).forEach((studentId) => {
      attendanceData[studentId] = {
        status: attendanceStatus[studentId],
        remarks: attendanceRemarks[studentId] || undefined,
      }
    })
    await markAttendance(selectedSession.id, attendanceData)
    setMarking(false)
  }

  const handleClose = () => {
    setSelectedSession(null)
  }

  return (
    <Dialog
      open={!!selectedSession}
      onOpenChange={(open) => !open && handleClose()}
    >
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Mark Attendance</DialogTitle>
          <DialogDescription>
            {selectedSession && (
              <span>
                {selectedSession.class.name} - {selectedSession.subject} (
                {new Date(selectedSession.startTime).toLocaleString()})
              </span>
            )}
          </DialogDescription>
        </DialogHeader>
        {students.length === 0 ? (
          <div className="py-4 text-center">
            <p className="text-gray-500">No students found in this class.</p>
          </div>
        ) : (
          <div className="max-h-[60vh] overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>ID</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Remarks</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student: Student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">
                      {student.user.name}
                    </TableCell>
                    <TableCell>
                      {student.customId || student.id.slice(0, 8)}
                    </TableCell>
                    <TableCell>
                      <Select
                        value={attendanceStatus[student.id] || "present"}
                        onValueChange={(value: "present" | "absent" | "late") =>
                          setAttendanceStatus((prev) => ({
                            ...prev,
                            [student.id]: value,
                          }))
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="present">Present</SelectItem>
                          <SelectItem value="absent">Absent</SelectItem>
                          <SelectItem value="late">Late</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Input
                        placeholder="Optional remarks"
                        value={attendanceRemarks[student.id] || ""}
                        onChange={(e) =>
                          setAttendanceRemarks((prev) => ({
                            ...prev,
                            [student.id]: e.target.value,
                          }))
                        }
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={marking || students.length === 0}
          >
            {marking ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <CheckCircle2 className="w-4 h-4 mr-2" />
            )}
            Save Attendance
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AttendanceDialog
