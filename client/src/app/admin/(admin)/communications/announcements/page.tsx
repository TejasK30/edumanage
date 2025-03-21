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
import { PlusCircle, Search } from "lucide-react"

export default function AnnouncementsPage() {
  const announcements = [
    {
      id: 1,
      title: "New Semester Schedule",
      target: "All Students",
      date: "2025-03-10",
      status: "Published",
    },
    {
      id: 2,
      title: "Faculty Meeting",
      target: "Teachers",
      date: "2025-03-15",
      status: "Draft",
    },
    {
      id: 3,
      title: "Campus Maintenance",
      target: "All",
      date: "2025-03-20",
      status: "Scheduled",
    },
  ]

  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
        <CardTitle className="text-lg font-semibold text-primary-blue-800">
          Announcements
        </CardTitle>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search announcements..."
              className="pl-8 w-full sm:w-64"
            />
          </div>
          <Button className="bg-primary-blue-500 hover:bg-primary-blue-600">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead className="hidden sm:table-cell">
                  Target Group
                </TableHead>
                <TableHead className="hidden sm:table-cell">Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {announcements.map((announcement) => (
                <TableRow
                  key={announcement.id}
                  className="cursor-pointer hover:bg-muted"
                >
                  <TableCell className="font-medium">
                    {announcement.title}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {announcement.target}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {announcement.date}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        announcement.status === "Published"
                          ? "bg-primary-blue-100 text-primary-blue-800"
                          : announcement.status === "Draft"
                          ? "bg-Neutrals/neutrals-3 text-Neutrals/neutrals-8"
                          : "bg-washed-purple-100 text-washed-purple-800"
                      }`}
                    >
                      {announcement.status}
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
