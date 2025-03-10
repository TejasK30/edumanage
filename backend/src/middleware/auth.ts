import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import { environment } from "../config/env"
import { prisma } from "../db/client"
import { ResponseHandler } from "../utils/responseHandler"

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return ResponseHandler.unauthorized(
        res,
        "No authorization token provided"
      )
    }

    const token = authHeader.split(" ")[1]

    const decoded = jwt.verify(token, environment.jwtSecret) as { id: string }

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      include: {
        studentProfile: true,
        teacherProfile: true,
        staffProfile: true,
      },
    })

    if (!user) {
      return ResponseHandler.unauthorized(
        res,
        "Invalid token or user not found"
      )
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { lastSeen: new Date() },
    })

    req.user = user

    next()
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return ResponseHandler.unauthorized(res, "Invalid token")
    }
    return ResponseHandler.serverError(res, error)
  }
}

export const authorizeRoles = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return ResponseHandler.unauthorized(res, "User not authenticated")
    }

    if (!roles.includes(req.user.role)) {
      return ResponseHandler.forbidden(
        res,
        "Not authorized to access this resource"
      )
    }

    next()
  }
}
