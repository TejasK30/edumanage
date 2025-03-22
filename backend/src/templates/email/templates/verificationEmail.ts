import { transporter } from "../../../config/emailConfig"

export interface EmailTemplate {
  subject: string
  html: string
  text: string
}

export const createVerificationEmail = (
  name: string,
  otp: string
): EmailTemplate => ({
  subject: "Verify Your Email Address",
  html: `
    <div style="
      font-family: Arial, sans-serif;
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      color: #161427;
      padding: 20px;
      border: 1px solid #d9d9dc;
    ">
      <h2 style="
        color: #0569ff;
        margin-bottom: 20px;
      ">
        Welcome to ${process.env.NEXT_PUBLIC_APP_NAME || "Our App"}!
      </h2>
      <p>Hello ${name},</p>
      <p>
        Thank you for signing up. Please use the following verification code to complete your registration:
      </p>
      <div style="
        background-color: #f0f3ff;
        padding: 12px;
        text-align: center;
        font-size: 24px;
        letter-spacing: 4px;
        margin: 24px 0;
      ">
        <strong>${otp}</strong>
      </div>
      <p>This code will expire in 15 minutes.</p>
      <p>If you didn't create an account, please ignore this email.</p>
      <p>
        Best regards,<br>
        ${process.env.NEXT_PUBLIC_APP_NAME || "Our App"} Team
      </p>
    </div>
  `,
  text: `
    Welcome to ${process.env.NEXT_PUBLIC_APP_NAME || "Our App"}!
    
    Hello ${name},
    
    Thank you for signing up. Please use the following verification code to complete your registration:
    
    ${otp}
    
    This code will expire in 15 minutes.
    
    If you didn't create an account, please ignore this email.
    
    Best regards,
    ${process.env.NEXT_PUBLIC_APP_NAME || "Our App"} Team
  `,
})

export const createWelcomeEmail = (name: string): EmailTemplate => ({
  subject: "Welcome to Our Platform!",
  html: `
    <div style="
      font-family: Arial, sans-serif;
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      color: #161427;
      padding: 20px;
      border: 1px solid #d9d9dc;
    ">
      <h2 style="
        color: #0569ff;
        margin-bottom: 20px;
      ">
        Welcome to ${process.env.NEXT_PUBLIC_APP_NAME || "Our App"}!
      </h2>
      <p>Hello ${name},</p>
      <p>
        Thank you for verifying your email. Your account is now active and you can start using our platform!
      </p>
      <p>
        Best regards,<br>
        ${process.env.NEXT_PUBLIC_APP_NAME || "Our App"} Team
      </p>
    </div>
  `,
  text: `
    Welcome to ${process.env.NEXT_PUBLIC_APP_NAME || "Our App"}!
    
    Hello ${name},
    
    Thank you for verifying your email. Your account is now active and you can start using our platform!
    
    Best regards,
    ${process.env.NEXT_PUBLIC_APP_NAME || "Our App"} Team
  `,
})

export const sendVerificationEmail = async (
  to: string,
  name: string,
  otp: string
) => {
  const mailOptions = {
    from: `"${process.env.NEXT_PUBLIC_APP_NAME || "Our App"}" <${
      process.env.EMAIL_USER
    }>`,
    to,
    ...createVerificationEmail(name, otp),
  }

  await transporter.sendMail(mailOptions)
}

export const sendWelcomeEmail = async (to: string, name: string) => {
  const mailOptions = {
    from: `"${process.env.NEXT_PUBLIC_APP_NAME || "Our App"}" <${
      process.env.EMAIL_USER
    }>`,
    to,
    ...createWelcomeEmail(name),
  }

  await transporter.sendMail(mailOptions)
}
