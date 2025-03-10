import nodemailer from "nodemailer"
import { readFileSync } from "fs"
import { join } from "path"
import dotenv from "dotenv"

dotenv.config()

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || "smtp.example.com",
  port: parseInt(process.env.EMAIL_PORT || "587"),
  secure: process.env.EMAIL_SECURE === "true",
  auth: {
    user: process.env.EMAIL_USER || "",
    pass: process.env.EMAIL_PASSWORD || "",
  },
})

const templateCache: Record<string, string> = {}

const getTemplate = (templateName: string): string => {
  if (templateCache[templateName]) {
    return templateCache[templateName]
  }

  const templatePath = join(
    __dirname,
    "../templates/emails",
    `${templateName}.html`
  )
  const templateSource = readFileSync(templatePath, "utf8")
  templateCache[templateName] = templateSource
  return templateSource
}

interface EmailOptions {
  to: string
  subject: string
  template: string
  context: Record<string, any>
  from?: string
}

const compileTemplate = (
  template: string,
  context: Record<string, any>
): string => {
  return template.replace(/{{(.*?)}}/g, (_, key) => context[key.trim()] || "")
}

export const sendEmail = async (options: EmailOptions): Promise<void> => {
  try {
    const template = getTemplate(options.template)
    const html = compileTemplate(template, options.context)

    await transporter.sendMail({
      from:
        options.from ||
        `"Learning Platform" <${
          process.env.EMAIL_FROM || "notifications@example.com"
        }>`,
      to: options.to,
      subject: options.subject,
      html,
    })
  } catch (error) {
    console.error("Failed to send email:", error)
    throw error
  }
}

export const verifyEmailConfig = async (): Promise<boolean> => {
  try {
    await transporter.verify()
    return true
  } catch (error) {
    console.error("Email configuration verification failed:", error)
    return false
  }
}
