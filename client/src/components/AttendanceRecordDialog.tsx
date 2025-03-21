import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import React from "react"
import { useStudentAttendanceStore } from "../store/studentAttendanceStore"

const AttendanceRecordDialog: React.FC = () => {
  const { selectedRecord, showRecordDetails, setShowRecordDetails } =
    useStudentAttendanceStore()

  const handleClose = () => {
    setShowRecordDetails(false)
  }

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
    <Dialog
      open={showRecordDetails}
      onOpenChange={(open) => !open && handleClose()}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Attendance Record Details</DialogTitle>
          <DialogDescription>
            {selectedRecord && (
              <span>
                {selectedRecord.session.class.name} -{" "}
                {selectedRecord.session.subject}
              </span>
            )}
          </DialogDescription>
        </DialogHeader>
        {selectedRecord && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Date</p>
                <p>
                  {new Date(
                    selectedRecord.session.startTime
                  ).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Time</p>
                <p>
                  {new Date(
                    selectedRecord.session.startTime
                  ).toLocaleTimeString()}{" "}
                  -{" "}
                  {selectedRecord.session.endTime
                    ? new Date(
                        selectedRecord.session.endTime
                      ).toLocaleTimeString()
                    : "Not ended"}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Status</p>
                <p>{getStatusBadge(selectedRecord.status)}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Marked At</p>
                <p>{new Date(selectedRecord.markedAt).toLocaleTimeString()}</p>
              </div>
            </div>
            {selectedRecord.remarks && (
              <div>
                <p className="text-sm font-medium text-gray-500">Remarks</p>
                <p className="mt-1 p-2 bg-gray-50 rounded">
                  {selectedRecord.remarks}
                </p>
              </div>
            )}
          </div>
        )}
        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AttendanceRecordDialog
