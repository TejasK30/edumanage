"use client"

import { PageHeader } from "@/components/dashboard-components/page-header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DollarSign } from "lucide-react"
import { useState } from "react"

export default function FeesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const feesData = [
    {
      id: "FEE001",
      name: "Undergraduate Tuition",
      department: "Computer Science",
      level: "Undergraduate",
      category: "Tuition",
      amount: 12000,
      academicYear: "2024-2025",
      status: "active",
    },
    {
      id: "FEE002",
      name: "Graduate Tuition",
      department: "Computer Science",
      level: "Graduate",
      category: "Tuition",
      amount: 15000,
      academicYear: "2024-2025",
      status: "active",
    },
    {
      id: "FEE003",
      name: "Laboratory Fee",
      department: "Physics",
      level: "Undergraduate",
      category: "Lab",
      amount: 1500,
      academicYear: "2024-2025",
      status: "active",
    },
    {
      id: "FEE004",
      name: "Library Fee",
      department: "All",
      level: "All",
      category: "Infrastructure",
      amount: 500,
      academicYear: "2024-2025",
      status: "inactive",
    },
  ]

  const filteredData = feesData.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.department.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || item.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-washed-blue-100 text-washed-blue-800">
            Active
          </Badge>
        )
      case "inactive":
        return (
          <Badge className="bg-Neutrals/neutrals-4 text-Neutrals/neutrals-8">
            Inactive
          </Badge>
        )
      case "draft":
        return (
          <Badge className="bg-primary-purple-100 text-primary-purple-800">
            Draft
          </Badge>
        )
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <div className="p-4 md:p-6">
      <PageHeader
        title="Fee Management"
        description="Manage fees"
        icon={DollarSign}
      />
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          <Input
            placeholder="Search fees..."
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
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-primary-blue-600 hover:bg-primary-blue-700">
            Add Fee
          </Button>
        </div>
      </div>

      <Card className="overflow-hidden">
        <CardHeader className="border-b">
          <CardTitle>Fee Structures</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Level</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Academic Year</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.department}</TableCell>
                    <TableCell>{item.level}</TableCell>
                    <TableCell>${item.amount.toLocaleString()}</TableCell>
                    <TableCell>{item.academicYear}</TableCell>
                    <TableCell>{getStatusBadge(item.status)}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          Delete
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
                    No fee structures found
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
