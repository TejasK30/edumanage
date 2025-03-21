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
import { FileText, Plus, Search } from "lucide-react"

export default function TemplatesPage() {
  const templates = [
    {
      id: 1,
      name: "Welcome Email",
      type: "Email",
      lastModified: "2025-03-05",
      category: "Onboarding",
    },
    {
      id: 2,
      name: "Assignment Reminder",
      type: "Push",
      lastModified: "2025-02-25",
      category: "Academic",
    },
    {
      id: 3,
      name: "Payment Due",
      type: "Email & Push",
      lastModified: "2025-02-15",
      category: "Finance",
    },
  ]

  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
        <CardTitle className="text-lg font-semibold text-primary-blue-800">
          Message Templates
        </CardTitle>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search templates..."
              className="pl-8 w-full sm:w-64"
            />
          </div>
          <Button className="bg-primary-blue-500 hover:bg-primary-blue-600">
            <Plus className="mr-2 h-4 w-4" />
            New Template
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Template Name</TableHead>
                <TableHead className="hidden sm:table-cell">Type</TableHead>
                <TableHead className="hidden sm:table-cell">Category</TableHead>
                <TableHead className="hidden sm:table-cell">
                  Last Modified
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {templates.map((template) => (
                <TableRow
                  key={template.id}
                  className="cursor-pointer hover:bg-muted"
                >
                  <TableCell className="font-medium flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary-blue-500" />
                    {template.name}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {template.type}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {template.category}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {template.lastModified}
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
