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
import { Filter, Plus, Search } from "lucide-react"

export default function PermissionsPage() {
  const permissions = [
    {
      id: 1,
      name: "user.create",
      description: "Create new users",
      module: "Users",
    },
    {
      id: 2,
      name: "course.edit",
      description: "Edit course details",
      module: "Courses",
    },
    {
      id: 3,
      name: "grade.view",
      description: "View student grades",
      module: "Grades",
    },
  ]

  return (
    <div className="container mx-auto p-4">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Permissions</h1>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Permission
          </Button>
        </div>
      </div>

      {/* Card with Search and Table */}
      <Card>
        <CardHeader>
          <CardTitle>Permissions List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Input
              placeholder="Search by permission name..."
              prefix={<Search className="h-4 w-4" />}
            />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Permission Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Module</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {permissions.map((permission) => (
                <TableRow key={permission.id}>
                  <TableCell>{permission.name}</TableCell>
                  <TableCell>{permission.description}</TableCell>
                  <TableCell>{permission.module}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
