"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useEffect, useState } from "react"

interface FeeExtensionRequest {
  id: string
  studentId: string
  reason: string
  requestedNewDueDate: string
  status: string
  reviewedBy?: string | null
  reviewedAt?: string | null
  createdAt: string
  student: {
    name: string
  }
  reviewer?: {
    name: string
  }
}

export default function FeeExtensionRequestsPage() {
  const [requests, setRequests] = useState<FeeExtensionRequest[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")
  const [searchTerm, setSearchTerm] = useState<string>("")

  // Fetch fee extension requests from the backend
  useEffect(() => {
    async function fetchRequests() {
      setLoading(true)
      try {
        const res = await fetch("/api/fee-extension-requests")
        if (!res.ok) throw new Error("Failed to fetch data")
        const data = await res.json()
        setRequests(data)
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message || "An unexpected error occurred")
        } else {
          setError("An unexpected error occurred")
        }
      }
    }
    fetchRequests()
  }, [])

  // Filter requests based on search term over the reason or student name
  const filteredRequests = requests.filter(
    (request) =>
      request.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.student.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="p-4 space-y-6">
      <Card className="overflow-x-auto">
        <CardHeader>
          <CardTitle>Fee Extension Requests</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Search and action header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <Input
              type="text"
              placeholder="Search requests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-1/3"
            />
            <Button>Add New Request</Button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center p-4">
              <p>Loading...</p>
            </div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : (
            <Table className="min-w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>New Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Reviewed By</TableHead>
                  <TableHead>Reviewed At</TableHead>
                  <TableHead>Submitted</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell>
                      {request.student.name || request.studentId}
                    </TableCell>
                    <TableCell>{request.reason}</TableCell>
                    <TableCell>
                      {new Date(
                        request.requestedNewDueDate
                      ).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          request.status === "pending"
                            ? "warning"
                            : request.status === "approved"
                            ? "success"
                            : "destructive"
                        }
                      >
                        {request.status.charAt(0).toUpperCase() +
                          request.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {request.reviewer ? request.reviewer.name : "N/A"}
                    </TableCell>
                    <TableCell>
                      {request.reviewedAt
                        ? new Date(request.reviewedAt).toLocaleDateString()
                        : "N/A"}
                    </TableCell>
                    <TableCell>
                      {new Date(request.createdAt).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
