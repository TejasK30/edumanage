import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, Send } from "lucide-react"

export default function NotificationsPage() {
  const notifications = [
    {
      id: 1,
      title: "Assignment Due",
      recipients: "Computer Science - Year 3",
      sentAt: "2025-03-10 14:30",
      status: "Delivered",
    },
    {
      id: 2,
      title: "Exam Schedule",
      recipients: "All Students",
      sentAt: "2025-03-05 09:15",
      status: "Failed",
    },
    {
      id: 3,
      title: "Registration Reminder",
      recipients: "New Students",
      sentAt: "2025-03-01 16:45",
      status: "Pending",
    },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
          <CardTitle className="text-lg font-semibold text-primary-blue-800">
            Notifications
          </CardTitle>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
            <Select defaultValue="all">
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-primary-blue-500 hover:bg-primary-blue-600">
              <Send className="mr-2 h-4 w-4" />
              Send New
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="w-full grid grid-cols-3 mb-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="push">Push</TabsTrigger>
              <TabsTrigger value="email">Email</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="space-y-4">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead className="hidden sm:table-cell">
                        Recipients
                      </TableHead>
                      <TableHead className="hidden sm:table-cell">
                        Sent At
                      </TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {notifications.map((notification) => (
                      <TableRow
                        key={notification.id}
                        className="cursor-pointer hover:bg-muted"
                      >
                        <TableCell className="font-medium">
                          {notification.title}
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          {notification.recipients}
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          {notification.sentAt}
                        </TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              notification.status === "Delivered"
                                ? "bg-primary-blue-100 text-primary-blue-800"
                                : notification.status === "Failed"
                                ? "bg-destructive/10 text-destructive"
                                : "bg-washed-purple-100 text-washed-purple-800"
                            }`}
                          >
                            {notification.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            <TabsContent
              value="push"
              className="flex items-center justify-center h-32"
            >
              <div className="text-center">
                <Bell className="mx-auto h-8 w-8 text-washed-purple-500 mb-2" />
                <p className="text-muted-foreground">
                  Push notification logs displayed here
                </p>
              </div>
            </TabsContent>
            <TabsContent
              value="email"
              className="flex items-center justify-center h-32"
            >
              <div className="text-center">
                <Send className="mx-auto h-8 w-8 text-washed-purple-500 mb-2" />
                <p className="text-muted-foreground">
                  Email notification logs displayed here
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
