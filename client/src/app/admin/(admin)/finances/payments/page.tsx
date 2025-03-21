"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { PageHeader } from "@/components/dashboard-components/page-header"
import { DollarSign } from "lucide-react"

export default function PaymentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const paymentsData = [
    {
      id: "PAY001",
      studentId: "STU1234",
      studentName: "John Doe",
      amount: 5000,
      date: "2025-02-15",
      method: "Credit Card",
      status: "completed",
      reference: "REF1234",
    },
    {
      id: "PAY002",
      studentId: "STU2345",
      studentName: "Jane Smith",
      amount: 5000,
      date: "2025-02-18",
      method: "Bank Transfer",
      status: "pending",
      reference: "REF2345",
    },
    {
      id: "PAY003",
      studentId: "STU3456",
      studentName: "Alex Johnson",
      amount: 3500,
      date: "2025-02-20",
      method: "Online Payment",
      status: "completed",
      reference: "REF3456",
    },
    {
      id: "PAY004",
      studentId: "STU4567",
      studentName: "Sam Wilson",
      amount: 4000,
      date: "2025-02-22",
      method: "Cash",
      status: "failed",
      reference: "REF4567",
    },
  ]

  const filteredData = paymentsData.filter((item) => {
    const matchesSearch =
      item.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.reference.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = filterStatus === "all" || item.status === filterStatus

    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-washed-blue-100 text-washed-blue-800">
            Completed
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-primary-purple-100 text-primary-purple-800">
            Pending
          </Badge>
        )
      case "failed":
        return (
          <Badge className="bg-destructive/10 text-destructive">Failed</Badge>
        )
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <div className="p-4 md:p-6">
      <PageHeader
        title="Payment Records"
        icon={DollarSign}
        description="Manage Payment Records"
      />
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          <Input
            placeholder="Search payments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-primary-blue-600 hover:bg-primary-blue-700">
            Record Payment
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-Neutrals/neutrals-7">
              Total Payments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              $
              {paymentsData
                .reduce((acc, item) => acc + item.amount, 0)
                .toLocaleString()}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-Neutrals/neutrals-7">
              Completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              $
              {paymentsData
                .filter((p) => p.status === "completed")
                .reduce((acc, item) => acc + item.amount, 0)
                .toLocaleString()}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-Neutrals/neutrals-7">
              Pending
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              $
              {paymentsData
                .filter((p) => p.status === "pending")
                .reduce((acc, item) => acc + item.amount, 0)
                .toLocaleString()}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="overflow-hidden">
        <CardHeader className="border-b">
          <CardTitle>Payment History</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Reference</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{item.studentName}</p>
                        <p className="text-sm text-Neutrals/neutrals-7">
                          {item.studentId}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>${item.amount.toLocaleString()}</TableCell>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>{item.method}</TableCell>
                    <TableCell>{item.reference}</TableCell>
                    <TableCell>{getStatusBadge(item.status)}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          Receipt
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-6 text-Neutrals/neutrals-7"
                  >
                    No payments found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
