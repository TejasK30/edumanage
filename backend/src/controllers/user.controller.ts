import { prisma } from "../db/client"
import { Request, Response } from "express"

export const getUserById = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = req.params

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        customId: true,
        name: true,
        email: true,
        role: true,
        isVerified: true,
        lastSeen: true,
        isOnline: true,
      },
    })

    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }

    return res.json({ user })
  } catch (error) {
    console.error("Get user by ID error:", error)
    return res.status(500).json({ error: "Internal server error" })
  }
}

// Update user
export const updateUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params
    const { name, email, phone } = req.body
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" })
    }

    if (req.user.id !== id && req.user.role !== "admin") {
      return res
        .status(403)
        .json({ error: "You do not have permission to update this user" })
    }

    const existingUser = await prisma.user.findUnique({
      where: { id },
    })

    if (!existingUser) {
      return res.status(404).json({ error: "User not found" })
    }

    // Prepare the update data
    const updateData: any = {}
    if (name) updateData.name = name

    // Check if email is being changed and if it's already in use
    if (email && email !== existingUser.email) {
      const emailExists = await prisma.user.findUnique({
        where: { email },
      })

      if (emailExists) {
        return res.status(409).json({ error: "Email already in use" })
      }

      updateData.email = email
    }

    if (phone) {
      updateData.phone = {
        countryCode: phone.countryCode,
        number: phone.number,
      }

      await prisma.phoneNumber.upsert({
        where: {
          id:
            (
              await prisma.phoneNumber.findFirst({
                where: { userId: id },
              })
            )?.id || "create-new",
        },
        update: {
          phoneNumber: `${phone.countryCode}${phone.number}`,
        },
        create: {
          userId: id,
          phoneNumber: `${phone.countryCode}${phone.number}`,
        },
      })
    }

    // Update the user
    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        customId: true,
        name: true,
        email: true,
        role: true,
      },
    })

    return res.json({
      message: "User updated successfully",
      user: updatedUser,
    })
  } catch (error) {
    console.error("Update user error:", error)
    return res.status(500).json({ error: "Internal server error" })
  }
}

// Update FCM token
export const updateFcmToken = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = req.params
    const { fcmToken } = req.body

    if (!fcmToken) {
      return res.status(400).json({ error: "FCM token is required" })
    }

    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" })
    }

    if (req.user.id !== id) {
      return res
        .status(403)
        .json({ error: "You do not have permission to update this token" })
    }

    // Update FCM token
    await prisma.user.update({
      where: { id },
      data: { fcmToken },
    })

    return res.json({ message: "FCM token updated successfully" })
  } catch (error) {
    console.error("Update FCM token error:", error)
    return res.status(500).json({ error: "Internal server error" })
  }
}

// Get user notifications
export const getUserNotifications = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = req.params
    const { page = 1, limit = 10, type } = req.query

    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" })
    }

    if (req.user.id !== id) {
      return res.status(403).json({
        error: "You do not have permission to view these notifications",
      })
    }

    // Prepare filter conditions
    const where: any = { userId: id }
    if (type) {
      where.type = type
    }

    const total = await prisma.notification.count({ where })

    // Get paginated notifications
    const notifications = await prisma.notification.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            role: true,
          },
        },
      },
    })

    return res.json({
      notifications,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / Number(limit)),
      },
    })
  } catch (error) {
    console.error("Get notifications error:", error)
    return res.status(500).json({ error: "Internal server error" })
  }
}

// Update notification preferences
export const updateNotificationPreferences = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = req.params
    const preferences = req.body

    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" })
    }

    if (req.user.id !== id) {
      return res.status(403).json({
        error: "You do not have permission to update these preferences",
      })
    }

    // Validate the preferences
    const validPreferenceKeys = [
      "emailNotifications",
      "pushNotifications",
      "inAppNotifications",
      "assignmentNotifications",
      "announcementNotifications",
      "gradeNotifications",
      "messageNotifications",
    ]

    // Check that all keys are valid
    const invalidKeys = Object.keys(preferences).filter(
      (key) => !validPreferenceKeys.includes(key)
    )
    if (invalidKeys.length > 0) {
      return res
        .status(400)
        .json({ error: `Invalid preference keys: ${invalidKeys.join(", ")}` })
    }

    // Update the preferences
    await prisma.notificationPreference.upsert({
      where: {
        userId: id,
      },
      update: preferences,
      create: {
        userId: id,
        ...preferences,
      },
    })

    return res.json({
      message: "Notification preferences updated successfully",
    })
  } catch (error) {
    console.error("Update notification preferences error:", error)
    return res.status(500).json({ error: "Internal server error" })
  }
}
