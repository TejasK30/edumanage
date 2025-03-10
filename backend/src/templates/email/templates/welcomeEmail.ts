import nodemailer from "nodemailer"

export interface EmailTemplate {
  subject: string
  html: string
  text: string
}

export const createWelcomeEmail = (name: string): EmailTemplate => ({
  subject: "Welcome to " + (process.env.NEXT_PUBLIC_APP_NAME || "Our App"),
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
        Your email has been successfully verified. Thank you for joining us!
      </p>
      <p>
        We’re excited to have you on board. Enjoy exploring our app!
      </p>
      <p>
        Best regards,<br>
        ${process.env.NEXT_PUBLIC_APP_NAME || "Our App"} Team
      </p>
    </div>
  `,
  text: `
    Hello ${name},
    
    Your email has been successfully verified. Thank you for joining us!
    
    We’re excited to have you on board. Enjoy exploring our app!
    
    Best regards,
    ${process.env.NEXT_PUBLIC_APP_NAME || "Our App"} Team
  `,
})

export const sendWelcomeEmail = async (to: string, name: string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: createWelcomeEmail(name).subject,
    html: createWelcomeEmail(name).html,
    text: createWelcomeEmail(name).text,
  }

  await transporter.sendMail(mailOptions)
}
