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
import { useState } from "react"

interface CurriculumItem {
  id: string
  name: string
  department: string
  level: string
  status: "active" | "draft" | "archived"
  lastUpdated: string
}

export default function CurriculumPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const curriculumData: CurriculumItem[] = [
    {
      id: "CUR001",
      name: "Computer Science Fundamentals",
      department: "Computer Science",
      level: "Undergraduate",
      status: "active",
      lastUpdated: "2025-03-01",
    },
    {
      id: "CUR002",
      name: "Advanced Mathematics",
      department: "Mathematics",
      level: "Undergraduate",
      status: "active",
      lastUpdated: "2025-02-15",
    },
    {
      id: "CUR003",
      name: "Data Structures",
      department: "Computer Science",
      level: "Undergraduate",
      status: "draft",
      lastUpdated: "2025-03-10",
    },
    {
      id: "CUR004",
      name: "Machine Learning",
      department: "Computer Science",
      level: "Graduate",
      status: "active",
      lastUpdated: "2025-01-20",
    },
  ]

  const filteredData = curriculumData.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.level.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-primary-green-500"
      case "draft":
        return "bg-washed-blue-500"
      case "archived":
        return "bg-Neutrals/neutrals-7"
      default:
        return "bg-Neutrals/neutrals-5"
    }
  }

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-Neutrals/neutrals-12">
          Curriculum Management
        </h1>
        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          <Input
            placeholder="Search curriculum..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
          <Button className="bg-primary-blue-600 hover:bg-primary-blue-700">
            Add Curriculum
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-Neutrals/neutrals-7">
              Total Curricula
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{curriculumData.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-Neutrals/neutrals-7">
              Active Curricula
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {curriculumData.filter((i) => i.status === "active").length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-Neutrals/neutrals-7">
              Departments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {new Set(curriculumData.map((i) => i.department)).size}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="overflow-hidden">
        <CardHeader className="bg-Neutrals/neutrals-2 border-b">
          <CardTitle>Curriculum List</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Level</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Updated</TableHead>
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
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`${
                          item.status === "active"
                            ? "bg-primary-blue-100 text-primary-blue-800"
                            : item.status === "draft"
                            ? "bg-washed-purple-100 text-washed-purple-800"
                            : "bg-Neutrals/neutrals-4 text-Neutrals/neutrals-8"
                        }`}
                      >
                        {item.status.charAt(0).toUpperCase() +
                          item.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>{item.lastUpdated}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-destructive hover:bg-destructive/10"
                        >
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-6 text-Neutrals/neutrals-7"
                  >
                    No curriculum data found
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
