interface EmailTemplate {
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
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Welcome to ${process.env.NEXT_PUBLIC_APP_NAME || "Our App"}!</h2>
      <p>Hello ${name},</p>
      <p>Thank you for signing up. Please use the following verification code to complete your registration:</p>
      <div style="background-color: #f4f4f4; padding: 12px; text-align: center; font-size: 24px; letter-spacing: 4px; margin: 24px 0;">
        <strong>${otp}</strong>
      </div>
      <p>This code will expire in 15 minutes.</p>
      <p>If you didn't create an account, please ignore this email.</p>
      <p>Best regards,<br>${
        process.env.NEXT_PUBLIC_APP_NAME || "Our App"
      } Team</p>
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
