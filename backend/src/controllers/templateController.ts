import { Request, Response } from "express"
import { existsSync } from "fs"
import path from "path"

export async function gettemplate(req: Request, res: Response): Promise<any> {
  try {
    const templateDir = path.join(process.cwd(), "public", "template")
    const filename = "student_template.xlsx"

    const filePath = path.join(templateDir, filename)

    if (!existsSync(filePath)) {
      return res.status(404).json({ error: "Template not found" })
    }

    return res.download(filePath, filename)
  } catch (err) {
    console.error("Error sending template file:", err)
    return res.status(500).json({ error: "Error sending template file" })
  }
}
