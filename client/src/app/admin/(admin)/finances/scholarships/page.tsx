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

export default function ScholarshipsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const scholarshipsData = [
    {
      id: "SCH001",
      name: "Merit Scholarship",
      amount: 5000,
      eligibility: "GPA 3.5+",
      deadline: "2025-05-15",
      status: "active",
      recipients: 25,
    },
    {
      id: "SCH002",
      name: "Sports Excellence",
      amount: 3000,
      eligibility: "Athletics Achievement",
      deadline: "2025-05-20",
      status: "active",
      recipients: 15,
    },
    {
      id: "SCH003",
      name: "Need-Based Grant",
      amount: 4000,
      eligibility: "Financial Need",
      deadline: "2025-05-10",
      status: "active",
      recipients: 30,
    },
    {
      id: "SCH004",
      name: "International Student Support",
      amount: 6000,
      eligibility: "International Students",
      deadline: "2025-04-30",
      status: "inactive",
      recipients: 10,
    },
  ]

  const filteredScholarships = scholarshipsData.filter((scholarship) =>
    scholarship.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Scholarship Programs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <Input
              type="text"
              placeholder="Search scholarships..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-1/3"
            />
            <Button>Add New Scholarship</Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Amount ($)</TableHead>
                <TableHead>Eligibility</TableHead>
                <TableHead>Deadline</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Recipients</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredScholarships.map((scholarship) => (
                <TableRow key={scholarship.id}>
                  <TableCell>{scholarship.id}</TableCell>
                  <TableCell>{scholarship.name}</TableCell>
                  <TableCell>{scholarship.amount}</TableCell>
                  <TableCell>{scholarship.eligibility}</TableCell>
                  <TableCell>{scholarship.deadline}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        scholarship.status === "active"
                          ? "success"
                          : "destructive"
                      }
                    >
                      {scholarship.status.charAt(0).toUpperCase() +
                        scholarship.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>{scholarship.recipients}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
