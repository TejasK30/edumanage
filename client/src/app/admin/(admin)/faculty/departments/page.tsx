import { FolderKanban, Plus, Search, MoreHorizontal } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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
import Link from "next/link"
import PageHeader from "@/components/dashboard-components/page-header"

export default function DepartmentsPage() {
  // Department data
  const departments = [
    {
      id: 1,
      name: "Computer Science",
      hod: "Dr. James Wilson",
      faculty: 42,
      students: 780,
    },
    {
      id: 2,
      name: "Electrical Engineering",
      hod: "Dr. Sarah Chen",
      faculty: 38,
      students: 645,
    },
    {
      id: 3,
      name: "Business Administration",
      hod: "Dr. Michael Patel",
      faculty: 35,
      students: 720,
    },
    {
      id: 4,
      name: "Mathematics",
      hod: "Dr. Elena Rodriguez",
      faculty: 24,
      students: 350,
    },
    {
      id: 5,
      name: "Physics",
      hod: "Dr. Robert Kim",
      faculty: 22,
      students: 290,
    },
  ]

  return (
    <div className="space-y-6">
      <PageHeader
        title="Academic Departments"
        description="Manage university departments and their faculty members"
        icon={FolderKanban}
      >
        <Button asChild>
          <Link href="/admin/faculty/departments/new">
            <Plus className="mr-2 h-4 w-4" /> Add Department
          </Link>
        </Button>
      </PageHeader>

      {/* Department Summary */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Total Departments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">+2 from last year</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Faculty</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">325</div>
            <p className="text-xs text-muted-foreground">
              Across all departments
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Students Enrolled
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5,240</div>
            <p className="text-xs text-muted-foreground">+320 from last year</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Research Projects
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">84</div>
            <p className="text-xs text-muted-foreground">Active projects</p>
          </CardContent>
        </Card>
      </div>

      {/* Department List */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Departments</CardTitle>
            <CardDescription>List of all academic departments</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search departments..."
                className="w-64 pl-8"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Department</TableHead>
                <TableHead>Head of Department</TableHead>
                <TableHead className="text-center">Faculty</TableHead>
                <TableHead className="text-center">Students</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {departments.map((dept) => (
                <TableRow key={dept.id}>
                  <TableCell className="font-medium">{dept.name}</TableCell>
                  <TableCell>{dept.hod}</TableCell>
                  <TableCell className="text-center">{dept.faculty}</TableCell>
                  <TableCell className="text-center">{dept.students}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
