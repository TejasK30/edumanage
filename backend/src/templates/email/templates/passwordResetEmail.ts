import { transporter } from "../../../config/emailConfig"

export interface EmailTemplate {
  subject: string
  html: string
  text: string
}

export const createPasswordResetEmail = (
  name: string,
  resetLink: string
): EmailTemplate => ({
  subject: "Reset Your Password",
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
        Reset Your Password
      </h2>
      <p>Hello ${name},</p>
      <p>
        We received a request to reset your password. Click the button below to proceed:
      </p>
      <div style="text-align: center; margin: 24px 0;">
        <a href="${resetLink}" style="
          background-color: #0569ff;
          color: #ffffff;
          padding: 12px 20px;
          text-decoration: none;
          border-radius: 4px;
          font-size: 16px;
        ">
          Reset Password
        </a>
      </div>
      <p>
        If you didn't request a password reset, please ignore this email.
      </p>
      <p>
        Best regards,<br>
        ${process.env.NEXT_PUBLIC_APP_NAME || "Our App"} Team
      </p>
    </div>
  `,
  text: `
    Hello ${name},
    
    We received a request to reset your password. Please use the link below to reset your password:
    
    ${resetLink}
    
    If you didn't request a password reset, please ignore this email.
    
    Best regards,
    ${process.env.NEXT_PUBLIC_APP_NAME || "Our App"} Team
  `,
})

export const sendPasswordResetEmail = async (
  to: string,
  name: string,
  resetLink: string
) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: createPasswordResetEmail(name, resetLink).subject,
    html: createPasswordResetEmail(name, resetLink).html,
    text: createPasswordResetEmail(name, resetLink).text,
  }

  await transporter.sendMail(mailOptions)
}
