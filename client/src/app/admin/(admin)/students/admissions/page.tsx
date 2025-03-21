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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Filter, Mail, Search, UserPlus } from "lucide-react"

export default function AdmissionsPage() {
  // Sample data - would come from API in real app
  const applications = [
    {
      id: "APP1001",
      name: "Ryan Thompson",
      program: "Computer Science",
      date: "2023-10-15",
      status: "Pending Review",
    },
    {
      id: "APP1002",
      name: "Sophia Martinez",
      program: "Electrical Engineering",
      date: "2023-10-14",
      status: "Interview Scheduled",
    },
    {
      id: "APP1003",
      name: "Daniel Kim",
      program: "Business Analytics",
      date: "2023-10-12",
      status: "Documents Pending",
    },
    {
      id: "APP1004",
      name: "Olivia Johnson",
      program: "Psychology",
      date: "2023-10-10",
      status: "Approved",
    },
    {
      id: "APP1005",
      name: "Ethan Williams",
      program: "Mechanical Engineering",
      date: "2023-10-08",
      status: "Pending Review",
    },
    {
      id: "APP1006",
      name: "Ava Garcia",
      program: "Data Science",
      date: "2023-10-05",
      status: "Rejected",
    },
  ]

  // Statistics for today
  const todayStats = [
    { title: "New Applications", value: "23" },
    { title: "Under Review", value: "45" },
    { title: "Approved Today", value: "12" },
    { title: "Rejected Today", value: "5" },
  ]

  return (
    <div className="space-y-6">
      <PageHeader
        title="Admissions"
        description="Manage student applications and admissions process"
        icon={UserPlus}
      >
        <div className="flex space-x-2">
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            New Application
          </Button>
          <Button variant="outline">
            <Mail className="mr-2 h-4 w-4" />
            Bulk Email
          </Button>
        </div>
      </PageHeader>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        {todayStats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Application Management */}
      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
          <TabsTrigger value="all">All Applications</TabsTrigger>
        </TabsList>

        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
              <div className="flex w-full space-x-2 md:w-2/3">
                <div className="relative w-full">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search applications..."
                    className="pl-10 w-full"
                    prefix={<Search className="h-4 w-4" />}
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex space-x-2">
                <Select defaultValue="all-programs">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Program" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-programs">All Programs</SelectItem>
                    <SelectItem value="cs">Computer Science</SelectItem>
                    <SelectItem value="eng">Engineering</SelectItem>
                    <SelectItem value="bus">Business</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <TabsContent value="pending">
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Application ID</TableHead>
                    <TableHead>Applicant Name</TableHead>
                    <TableHead>Program</TableHead>
                    <TableHead>Date Applied</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {applications
                    .filter(
                      (app) =>
                        app.status !== "Approved" && app.status !== "Rejected"
                    )
                    .map((application) => (
                      <TableRow key={application.id}>
                        <TableCell>{application.id}</TableCell>
                        <TableCell>
                          <div className="font-medium">{application.name}</div>
                        </TableCell>
                        <TableCell>{application.program}</TableCell>
                        <TableCell>
                          {new Date(application.date).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              application.status === "Pending Review"
                                ? "default"
                                : application.status === "Interview Scheduled"
                                ? "secondary"
                                : "outline"
                            }
                          >
                            {application.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button variant="outline" size="sm">
                              Review
                            </Button>
                            <Button variant="default" size="sm">
                              Approve
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Other tabs would have similar content */}
        <TabsContent value="approved">
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Application ID</TableHead>
                    <TableHead>Applicant Name</TableHead>
                    <TableHead>Program</TableHead>
                    <TableHead>Date Applied</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {applications
                    .filter((app) => app.status === "Approved")
                    .map((application) => (
                      <TableRow key={application.id}>
                        <TableCell>{application.id}</TableCell>
                        <TableCell>
                          <div className="font-medium">{application.name}</div>
                        </TableCell>
                        <TableCell>{application.program}</TableCell>
                        <TableCell>
                          {new Date(application.date).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Badge variant="success">{application.status}</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm">
                            Enroll
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Similar content for other tabs */}
      </Tabs>
    </div>
  )
}
