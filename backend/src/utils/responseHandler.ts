import { Response } from "express"
import { ApiResponse } from "../types"

export class ResponseHandler {
  static success<T>(
    res: Response,
    message: string,
    data?: T,
    statusCode = 200
  ): Response {
    const response: ApiResponse<T> = {
      success: true,
      message,
      data,
    }

    return res.status(statusCode).json(response)
  }

  static error(
    res: Response,
    message: string,
    statusCode = 400,
    error?: any
  ): Response {
    const response: ApiResponse = {
      success: false,
      message,
      error: error?.message || error,
    }

    return res.status(statusCode).json(response)
  }

  static notFound(res: Response, message = "Resource not found"): Response {
    return this.error(res, message, 404)
  }

  static unauthorized(
    res: Response,
    message = "Unauthorized access"
  ): Response {
    return this.error(res, message, 401)
  }

  static forbidden(res: Response, message = "Forbidden access"): Response {
    return this.error(res, message, 403)
  }

  static serverError(res: Response, error: any): Response {
    return this.error(res, "Internal server error", 500, error)
  }
}
