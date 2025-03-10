import React, { useState } from "react"
import {
  createSession,
  markAttendance,
  endSession,
} from "../lib/api/attendanceApi"

const TakeAttendance = ({ teacherId }: { teacherId: string }) => {
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [students, setStudents] = useState<
    { studentId: string; isPresent: boolean }[]
  >([])
  const [date, setDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  )

  const handleCreateSession = async () => {
    const response = await createSession({ teacherId, date })
    setSessionId(response.data.id)
  }

  const handleMarkAttendance = async (
    studentId: string,
    isPresent: boolean
  ) => {
    await markAttendance({ sessionId, studentId, isPresent })
    setStudents((prev) =>
      prev.map((student) =>
        student.studentId === studentId ? { ...student, isPresent } : student
      )
    )
  }

  const handleEndSession = async () => {
    await endSession({ sessionId })
    setSessionId(null)
    setStudents([])
  }

  return (
    <div>
      <h2>Take Attendance</h2>
      {!sessionId ? (
        <button onClick={handleCreateSession}>Start Session</button>
      ) : (
        <div>
          <button onClick={handleEndSession}>End Session</button>
          <ul>
            {students.map((student) => (
              <li key={student.studentId}>
                {student.studentId}
                <button
                  onClick={() => handleMarkAttendance(student.studentId, true)}
                >
                  Present
                </button>
                <button
                  onClick={() => handleMarkAttendance(student.studentId, false)}
                >
                  Absent
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default TakeAttendance
