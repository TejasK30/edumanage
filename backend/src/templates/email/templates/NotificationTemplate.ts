export interface EmailTemplateData {
  userName: string
  title: string
  message: string
  senderName: string
  date: string
}
export function generateEmailTemplate(data: EmailTemplateData): string {
  const { userName, title, message, senderName, date } = data
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Important Notification</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #333;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background-color: #7000ff;
      color: white;
      padding: 20px;
      text-align: center;
      border-radius: 5px 5px 0 0;
    }
    .content {
      background-color: #f9f9f9;
      padding: 20px;
      border-radius: 0 0 5px 5px;
      border: 1px solid #e0e0e0;
      border-top: none;
    }
    .footer {
      text-align: center;
      margin-top: 20px;
      font-size: 12px;
      color: #666;
    }
    .important-badge {
      display: inline-block;
      background-color: #ff3860;
      color: white;
      padding: 5px 10px;
      border-radius: 3px;
      font-size: 12px;
      margin-bottom: 10px;
    }
    .button {
      display: inline-block;
      background-color: #7000ff;
      color: white;
      padding: 12px 24px;
      text-decoration: none;
      border-radius: 4px;
      margin-top: 15px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Learning Platform Notification</h1>
    </div>
    <div class="content">
      <div class="important-badge">IMPORTANT</div>
      <h2>Hello ${userName},</h2>
      <p>You have received an important notification:</p>
      <h3>${title}</h3>
      <p>${message}</p>
      <p>Sent by: <strong>${senderName}</strong> on ${date}</p>
      <a href="https://yourplatform.com/notifications" class="button">View in Platform</a>
    </div>
    <div class="footer">
      <p>© 2025 Learning Platform. All rights reserved.</p>
      <p>If you no longer wish to receive these emails, you can <a href="https://yourplatform.com/settings/notifications">update your preferences</a>.</p>
    </div>
  </div>
</body>
</html>
  `
}
