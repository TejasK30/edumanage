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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"

interface DataImport {
  id: string
  name: string
  type: string
  status: "completed" | "processing" | "failed"
  date: string
  records: number
}

interface DataExport {
  id: string
  name: string
  format: string
  status: "completed" | "processing" | "failed"
  date: string
  size: string
}

export default function DataPage() {
  const [searchImport, setSearchImport] = useState("")
  const [searchExport, setSearchExport] = useState("")

  const importData: DataImport[] = [
    {
      id: "IMP001",
      name: "Student Records Import",
      type: "CSV",
      status: "completed",
      date: "2025-03-01",
      records: 1250,
    },
    {
      id: "IMP002",
      name: "Staff Records Import",
      type: "Excel",
      status: "completed",
      date: "2025-02-15",
      records: 120,
    },
    {
      id: "IMP003",
      name: "Course Registrations",
      type: "JSON",
      status: "processing",
      date: "2025-03-10",
      records: 3500,
    },
    {
      id: "IMP004",
      name: "Exam Results",
      type: "CSV",
      status: "failed",
      date: "2025-03-05",
      records: 850,
    },
  ]

  const exportData: DataExport[] = [
    {
      id: "EXP001",
      name: "Students Report",
      format: "PDF",
      status: "completed",
      date: "2025-03-05",
      size: "2.5 MB",
    },
    {
      id: "EXP002",
      name: "Attendance Report",
      format: "Excel",
      status: "completed",
      date: "2025-03-02",
      size: "1.2 MB",
    },
    {
      id: "EXP003",
      name: "Financial Report",
      format: "CSV",
      status: "processing",
      date: "2025-03-10",
      size: "5.8 MB",
    },
    {
      id: "EXP004",
      name: "Academic Performance",
      format: "PDF",
      status: "failed",
      date: "2025-03-07",
      size: "3.1 MB",
    },
  ]

  const filteredImports = importData.filter(
    (item) =>
      item.name.toLowerCase().includes(searchImport.toLowerCase()) ||
      item.type.toLowerCase().includes(searchImport.toLowerCase())
  )

  const filteredExports = exportData.filter(
    (item) =>
      item.name.toLowerCase().includes(searchExport.toLowerCase()) ||
      item.format.toLowerCase().includes(searchExport.toLowerCase())
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-washed-blue-100 text-washed-blue-800">
            Completed
          </Badge>
        )
      case "processing":
        return (
          <Badge className="bg-primary-purple-100 text-primary-purple-800">
            Processing
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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-Neutrals/neutrals-12">
          Data Management
        </h1>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button className="bg-primary-blue-600 hover:bg-primary-blue-700">
            Import Data
          </Button>
          <Button variant="outline">Export Data</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-Neutrals/neutrals-7">
              Total Imports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{importData.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-Neutrals/neutrals-7">
              Total Exports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{exportData.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-Neutrals/neutrals-7">
              Total Records
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {importData
                .reduce((acc, item) => acc + item.records, 0)
                .toLocaleString()}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-Neutrals/neutrals-7">
              Processing
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {importData.filter((i) => i.status === "processing").length +
                exportData.filter((i) => i.status === "processing").length}
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="imports" className="w-full">
        <TabsList className="grid w-full md:w-auto grid-cols-2">
          <TabsTrigger value="imports">Data Imports</TabsTrigger>
          <TabsTrigger value="exports">Data Exports</TabsTrigger>
        </TabsList>

        <TabsContent value="imports">
          <Card>
            <CardHeader className="bg-Neutrals/neutrals-2 border-b">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <CardTitle>Import History</CardTitle>
                <Input
                  placeholder="Search imports..."
                  value={searchImport}
                  onChange={(e) => setSearchImport(e.target.value)}
                  className="max-w-sm mt-2 md:mt-0"
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Records</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredImports.length > 0 ? (
                    filteredImports.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">
                          {item.name}
                        </TableCell>
                        <TableCell>{item.type}</TableCell>
                        <TableCell>{item.records.toLocaleString()}</TableCell>
                        <TableCell>{item.date}</TableCell>
                        <TableCell>{getStatusBadge(item.status)}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              View
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
                        No import data found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="exports">
          <Card>
            <CardHeader className="bg-Neutrals/neutrals-2 border-b">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <CardTitle>Export History</CardTitle>
                <Input
                  placeholder="Search exports..."
                  value={searchExport}
                  onChange={(e) => setSearchExport(e.target.value)}
                  className="max-w-sm mt-2 md:mt-0"
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Format</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredExports.length > 0 ? (
                    filteredExports.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">
                          {item.name}
                        </TableCell>
                        <TableCell>{item.format}</TableCell>
                        <TableCell>{item.size}</TableCell>
                        <TableCell>{item.date}</TableCell>
                        <TableCell>{getStatusBadge(item.status)}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              Download
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
                        No export data found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
