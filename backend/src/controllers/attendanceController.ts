import { Request, Response } from "express"
import { ResponseHandler } from "../utils/responseHandler"
import { attendanceService } from "../services/attendanceService"

export const createSession = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    if (!req.user?.teacherProfile) {
      return ResponseHandler.forbidden(
        res,
        "Only teachers can create attendance sessions"
      )
    }

    const session = await attendanceService.createSession(
      req.user.teacherProfile.id,
      req.body
    )

    return ResponseHandler.success(
      res,
      "Attendance session created successfully",
      session,
      201
    )
  } catch (error) {
    return ResponseHandler.serverError(res, error)
  }
}

export const markAttendance = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    if (!req.user?.teacherProfile) {
      return ResponseHandler.forbidden(res, "Only teachers can mark attendance")
    }

    const attendance = await attendanceService.markAttendance(
      req.user.teacherProfile.id,
      req.body
    )

    return ResponseHandler.success(
      res,
      "Attendance marked successfully",
      attendance
    )
  } catch (error) {
    return ResponseHandler.serverError(res, error)
  }
}

export const endSession = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    if (!req.user?.teacherProfile) {
      return ResponseHandler.forbidden(
        res,
        "Only teachers can end attendance sessions"
      )
    }

    const session = await attendanceService.endSession(
      req.user.teacherProfile.id,
      req.body
    )

    return ResponseHandler.success(
      res,
      "Attendance session ended successfully",
      session
    )
  } catch (error) {
    return ResponseHandler.serverError(res, error)
  }
}

export const getSessionDetails = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { sessionId } = req.params

    const session = await attendanceService.getSessionDetails(sessionId)

    return ResponseHandler.success(
      res,
      "Attendance session details retrieved successfully",
      session
    )
  } catch (error) {
    return ResponseHandler.serverError(res, error)
  }
}

export const getStudentAttendance = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    let studentId: string

    if (req.user?.role === "teacher" || req.user?.role === "staff") {
      studentId = req.params.studentId
    } else if (req.user?.studentProfile) {
      studentId = req.user.studentProfile.id
    } else {
      return ResponseHandler.forbidden(
        res,
        "Unauthorized to view attendance records"
      )
    }

    const { classId, subject } = req.query

    const attendanceRecords = await attendanceService.getStudentAttendance(
      studentId,
      classId as string,
      subject as string
    )

    return ResponseHandler.success(
      res,
      "Student attendance records retrieved successfully",
      attendanceRecords
    )
  } catch (error) {
    return ResponseHandler.serverError(res, error)
  }
}

export const getClassAttendanceStats = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    if (!(req.user?.role === "teacher" || req.user?.role === "staff")) {
      return ResponseHandler.forbidden(
        res,
        "Only teachers and staff can view class statistics"
      )
    }

    const { classId } = req.params
    const { startDate, endDate } = req.query

    const parsedStartDate = startDate
      ? new Date(startDate as string)
      : undefined
    const parsedEndDate = endDate ? new Date(endDate as string) : undefined

    const stats = await attendanceService.getClassAttendanceStats(
      classId,
      parsedStartDate,
      parsedEndDate
    )

    return ResponseHandler.success(
      res,
      "Class attendance statistics retrieved successfully",
      stats
    )
  } catch (error) {
    return ResponseHandler.serverError(res, error)
  }
}

export const getActiveSessions = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    if (!req.user?.teacherProfile) {
      return ResponseHandler.forbidden(
        res,
        "Only teachers can view active sessions"
      )
    }

    const sessions = await attendanceService.getActiveSessions(
      req.user.teacherProfile.id
    )

    return ResponseHandler.success(
      res,
      "Active attendance sessions retrieved successfully",
      sessions
    )
  } catch (error) {
    return ResponseHandler.serverError(res, error)
  }
}
