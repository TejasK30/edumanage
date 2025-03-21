import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Plus, Shield } from "lucide-react"

export default function RolesPage() {
  const roles = [
    { id: 1, name: "Administrator", users: 12, permissions: "All" },
    { id: 2, name: "Teacher", users: 45, permissions: "Medium" },
    { id: 3, name: "Student", users: 1190, permissions: "Limited" },
  ]

  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
        <CardTitle className="text-lg font-semibold text-primary-blue-800">
          Roles
        </CardTitle>
        <Button className="bg-primary-purple-500 hover:bg-primary-purple-600">
          <Plus className="mr-2 h-4 w-4" />
          Create Role
        </Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Role Name</TableHead>
                <TableHead className="hidden sm:table-cell">Users</TableHead>
                <TableHead>Permissions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roles.map((role) => (
                <TableRow
                  key={role.id}
                  className="cursor-pointer hover:bg-muted"
                >
                  <TableCell className="font-medium flex items-center gap-2">
                    <Shield className="h-4 w-4 text-primary-purple-500" />
                    {role.name}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {role.users}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        role.permissions === "All"
                          ? "bg-primary-purple-100 text-primary-purple-800"
                          : role.permissions === "Medium"
                          ? "bg-washed-blue-100 text-washed-blue-800"
                          : "bg-Neutrals/neutrals-3 text-Neutrals/neutrals-8"
                      }`}
                    >
                      {role.permissions}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
