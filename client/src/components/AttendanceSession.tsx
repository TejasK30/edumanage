import React, { useEffect, useState } from "react"
import { getSessionDetails } from "../lib/api/attendanceApi"

const AttendanceSession = ({ sessionId }: { sessionId: string }) => {
  const [session, setSession] = useState<any>(null)

  useEffect(() => {
    const fetchSessionDetails = async () => {
      const response = await getSessionDetails(sessionId)
      setSession(response.data)
    }

    fetchSessionDetails()
  }, [sessionId])

  if (!session) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h2>Attendance Session Details</h2>
      <p>Session ID: {session.id}</p>
      <p>Teacher ID: {session.teacherId}</p>
      <p>Date: {new Date(session.date).toLocaleDateString()}</p>
      <ul>
        {session.records.map((record: any) => (
          <li key={record.studentId}>
            {record.studentId}: {record.isPresent ? "Present" : "Absent"}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AttendanceSession
