import React from "react"
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
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Loader2, AlertCircle } from "lucide-react"
import { useAttendanceStore } from "@/store/attendanceStore"

const SessionDetailsDialog: React.FC = () => {
  const {
    sessionDetails,
    sessionDetailsLoading,
    setSelectedSession,
    clearError,
  } = useAttendanceStore()

  const handleClose = () => {
    setSelectedSession(null)
    clearError()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "present":
        return "bg-green-100 text-green-800"
      case "absent":
        return "bg-red-100 text-red-800"
      case "late":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Dialog
      open={!!sessionDetails}
      onOpenChange={(open) => !open && handleClose()}
    >
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Session Details</DialogTitle>
          <DialogDescription>
            {sessionDetails && (
              <span>
                {sessionDetails.class.name} - {sessionDetails.subject} (
                {new Date(sessionDetails.startTime).toLocaleDateString()})
              </span>
            )}
          </DialogDescription>
        </DialogHeader>
        {sessionDetailsLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : sessionDetails?.studentAttendance?.length === 0 ? (
          <div className="py-4 text-center">
            <AlertCircle className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
            <p className="text-gray-500">
              No attendance data recorded for this session.
            </p>
          </div>
        ) : (
          <div className="max-h-[60vh] overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Marked At</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sessionDetails?.studentAttendance?.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="font-medium">
                      {record.student.user.name}
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(record.status)}>
                        {record.status.charAt(0).toUpperCase() +
                          record.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(record.markedAt).toLocaleTimeString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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

export default SessionDetailsDialog
