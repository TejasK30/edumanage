"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Download, Upload } from "lucide-react"
import Link from "next/link"
import { ChangeEvent, DragEvent, useState } from "react"

interface UploadResponse {
  success: boolean
  message: string
  errors?: string[]
}

const TEMPLATE_DATA = [
  {
    fullName: "John Doe",
    phoneNumber: "1234567890",
    parentsPhone: "9876543210",
    email: "john@example.com",
    address: "123 Main St",
    caste: "General",
    admissionYear: "2024",
    course: "Computer Science",
    fees: "50000",
    scholarship_applied: "Yes",
    dues: "0",
    department: "Engineering",
    className: "CS-2024",
  },
  {
    fullName: "Jane Smith",
    phoneNumber: "2345678901",
    parentsPhone: "8765432109",
    email: "jane@example.com",
    address: "456 Oak Ave",
    caste: "OBC",
    admissionYear: "2024",
    course: "Electronics",
    fees: "45000",
    scholarship_applied: "Yes",
    dues: "5000",
    department: "Engineering",
    className: "EC-2024",
  },
]

const API_URL =
  process.env.NEXT_PUBLIC_PYTHON_API_URL || "http://localhost:5000"

export default function UploadStudentsPage() {
  const [file, setFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const [isUploading, setIsUploading] = useState<boolean>(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (!isDragging) setIsDragging(true)
  }

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX
    const y = e.clientY

    if (x < rect.left || x >= rect.right || y < rect.top || y >= rect.bottom) {
      setIsDragging(false)
    }
  }

  const validateFile = (file: File): boolean => {
    const validTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel",
    ]
    if (!validTypes.includes(file.type)) {
      setError("Please upload only Excel files (.xlsx or .xls)")
      return false
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("File size should be less than 5MB")
      return false
    }
    return true
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    setError(null)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0]
      if (validateFile(droppedFile)) {
        setFile(droppedFile)
      }
      e.dataTransfer.clearData()
    }
  }

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    setError(null)
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0]
      if (validateFile(selectedFile)) {
        setFile(selectedFile)
      }
    }
  }

  const handleUpload = async () => {
    if (!file) {
      setError("Please select an Excel file to upload.")
      return
    }
    setIsUploading(true)
    setError(null)
    setMessage(null)
    try {
      const formData = new FormData()
      formData.append("file", file)

      const apiUrl =
        process.env.NEXT_PUBLIC_PYTHON_API_URL || "http://localhost:5000"
      const res = await fetch(`${apiUrl}/upload-students`, {
        method: "POST",
        body: formData,
      })
      const data: UploadResponse = await res.json()
      if (!res.ok) {
        throw new Error(data.errors || "Upload failed")
      }
      setMessage("Student data uploaded successfully.")
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.")
    } finally {
      setIsUploading(false)
    }
  }

  const handleDownloadTemplate = async () => {
    try {
      const apiUrl =
        process.env.NEXT_PUBLIC_PYTHON_API_URL || "http://localhost:5000"
      const response = await fetch(`${apiUrl}/download-template`)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "student_template.xlsx"
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (err) {
      setError("Failed to download template file.")
    }
  }
  return (
    <div className="min-h-screen bg-background p-4 md:p-6 space-y-6">
      <Card className="w-full max-w-6xl mx-auto">
        <CardHeader className="space-y-4">
          <CardTitle className="text-2xl font-bold text-foreground">
            Upload Student Data
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Please upload an Excel file with the following format:
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Template Data Table */}
          <div className="overflow-x-auto rounded-lg border border-border">
            <Table>
              <TableHeader className="bg-muted">
                <TableRow>
                  {Object.keys(TEMPLATE_DATA[0]).map((header) => (
                    <TableHead key={header} className="whitespace-nowrap">
                      {header.replace(/([A-Z])/g, " $1").trim()}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {TEMPLATE_DATA.map((row, index) => (
                  <TableRow key={index}>
                    {Object.values(row).map((value, i) => (
                      <TableCell key={i} className="whitespace-nowrap">
                        {value}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {error && (
            <div className="p-4 text-destructive text-center rounded-lg bg-destructive/10 animate-fadeIn">
              {error}
            </div>
          )}
          {message && (
            <div className="p-4 text-green-600 text-center rounded-lg bg-green-50 animate-fadeIn">
              {message}
            </div>
          )}

          {/* Upload Area */}
          <div
            className={`
              border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer
              ${
                isDragging
                  ? "border-primary-blue-400 bg-primary-blue-50"
                  : "border-primary-blue-200 hover:border-primary-blue-400"
              }
            `}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => document.getElementById("fileInput")?.click()}
          >
            <input
              type="file"
              id="fileInput"
              className="hidden"
              accept=".xlsx,.xls"
              onChange={handleFileSelect}
            />
            <Upload
              className={`mx-auto h-12 w-12 mb-4 transition-colors ${
                isDragging ? "text-primary-blue-600" : "text-primary-blue-500"
              }`}
            />
            <div className="text-sm text-Neutrals/neutrals-8">
              {file
                ? `Selected: ${file.name}`
                : "Click or drag to upload Excel file (.xlsx or .xls)"}
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col sm:flex-row gap-4 justify-between">
          <Button
            onClick={handleDownloadTemplate}
            variant="outline"
            className="w-full sm:w-auto"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Template
          </Button>
          <Button
            onClick={handleUpload}
            disabled={isUploading || !file}
            className="w-full sm:w-auto bg-primary-blue-500 hover:bg-primary-blue-600 disabled:opacity-50"
          >
            {isUploading ? (
              <>
                <span className="animate-spin mr-2">⏳</span>
                Uploading...
              </>
            ) : (
              "Upload Data"
            )}
          </Button>
        </CardFooter>
      </Card>

      <div className="text-center">
        <Link
          href="/admin/dashboard"
          className="text-primary-blue-500 hover:text-primary-blue-600 underline"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  )
}
