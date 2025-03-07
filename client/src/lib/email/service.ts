import nodemailer from "nodemailer"
import { emailConfig } from "./config"
import { createVerificationEmail } from "./templates/verificationEmail"

class EmailService {
  private transporter: nodemailer.Transporter
  private static instance: EmailService

  private constructor() {
    this.transporter = nodemailer.createTransport(emailConfig.smtp)
  }

  public static getInstance(): EmailService {
    if (!EmailService.instance) {
      EmailService.instance = new EmailService()
    }
    return EmailService.instance
  }

  public async verifyConnection(): Promise<boolean> {
    try {
      await this.transporter.verify()
      return true
    } catch (error) {
      console.error("Email service connection error:", error)
      return false
    }
  }

  public async sendVerificationEmail(
    to: string,
    name: string,
    otp: string
  ): Promise<boolean> {
    try {
      const template = createVerificationEmail(name, otp)

      await this.transporter.sendMail({
        from: emailConfig.from,
        to,
        subject: template.subject,
        text: template.text,
        html: template.html,
      })

      return true
    } catch (error) {
      console.error("Failed to send verification email:", error)
      return false
    }
  }
}

export const emailService = EmailService.getInstance()
