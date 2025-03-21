import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Plus } from "lucide-react"

export default function ExamsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Examination Schedule</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Schedule Exam
        </Button>
      </div>

      <Tabs defaultValue="midterms">
        <TabsList>
          <TabsTrigger value="midterms">Midterms</TabsTrigger>
          <TabsTrigger value="finals">Finals</TabsTrigger>
          <TabsTrigger value="makeup">Make-up Exams</TabsTrigger>
        </TabsList>

        <TabsContent value="midterms" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Midterm Exams</CardTitle>
                <Input className="max-w-xs" placeholder="Search courses..." />
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Course</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Proctor</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    {
                      course: "CS101: Intro to Programming",
                      date: "Mar 25, 2025",
                      time: "9:00 AM",
                      location: "Exam Hall A",
                      duration: "1.5 hours",
                      proctor: "Dr. Alan Turing",
                    },
                    {
                      course: "MATH221: Linear Algebra",
                      date: "Mar 26, 2025",
                      time: "11:00 AM",
                      location: "Science Auditorium",
                      duration: "2 hours",
                      proctor: "Dr. Emma Davis",
                    },
                    {
                      course: "BUS330: Marketing Principles",
                      date: "Mar 27, 2025",
                      time: "2:00 PM",
                      location: "Business Center",
                      duration: "1.5 hours",
                      proctor: "Prof. Robert Johnson",
                    },
                    {
                      course: "ENG205: Technical Writing",
                      date: "Mar 28, 2025",
                      time: "4:00 PM",
                      location: "Arts Hall 410",
                      duration: "1 hour",
                      proctor: "Dr. Sarah Miller",
                    },
                  ].map((exam, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">
                        {exam.course}
                      </TableCell>
                      <TableCell>{exam.date}</TableCell>
                      <TableCell>{exam.time}</TableCell>
                      <TableCell>{exam.location}</TableCell>
                      <TableCell>{exam.duration}</TableCell>
                      <TableCell>{exam.proctor}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="finals" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Final Exams</CardTitle>
                <Input className="max-w-xs" placeholder="Search courses..." />
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Course</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Proctor</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    {
                      course: "CS101: Intro to Programming",
                      date: "May 20, 2025",
                      time: "9:00 AM",
                      location: "Main Hall",
                      duration: "3 hours",
                      proctor: "Dr. Alan Turing",
                    },
                    {
                      course: "MATH221: Linear Algebra",
                      date: "May 21, 2025",
                      time: "11:00 AM",
                      location: "Science Auditorium",
                      duration: "3 hours",
                      proctor: "Dr. Emma Davis",
                    },
                    {
                      course: "BUS330: Marketing Principles",
                      date: "May 22, 2025",
                      time: "2:00 PM",
                      location: "Business Center",
                      duration: "3 hours",
                      proctor: "Prof. Robert Johnson",
                    },
                    {
                      course: "ENG205: Technical Writing",
                      date: "May 23, 2025",
                      time: "4:00 PM",
                      location: "Arts Hall Auditorium",
                      duration: "2 hours",
                      proctor: "Dr. Sarah Miller",
                    },
                  ].map((exam, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">
                        {exam.course}
                      </TableCell>
                      <TableCell>{exam.date}</TableCell>
                      <TableCell>{exam.time}</TableCell>
                      <TableCell>{exam.location}</TableCell>
                      <TableCell>{exam.duration}</TableCell>
                      <TableCell>{exam.proctor}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="makeup" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Make-up Exams</CardTitle>
                <Input className="max-w-xs" placeholder="Search courses..." />
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Course</TableHead>
                    <TableHead>Student</TableHead>
                    <TableHead>Original Date</TableHead>
                    <TableHead>Make-up Date</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    {
                      course: "CS101: Intro to Programming",
                      student: "Alex Johnson",
                      original: "Mar 25, 2025",
                      makeup: "Apr 2, 2025",
                      reason: "Medical",
                      status: "Approved",
                    },
                    {
                      course: "MATH221: Linear Algebra",
                      student: "Emily Brown",
                      original: "Mar 26, 2025",
                      makeup: "Apr 3, 2025",
                      reason: "Family Emergency",
                      status: "Approved",
                    },
                    {
                      course: "BUS330: Marketing Principles",
                      student: "David Miller",
                      original: "Mar 27, 2025",
                      makeup: "Pending",
                      reason: "Athletic Event",
                      status: "Under Review",
                    },
                  ].map((exam, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">
                        {exam.course}
                      </TableCell>
                      <TableCell>{exam.student}</TableCell>
                      <TableCell>{exam.original}</TableCell>
                      <TableCell>{exam.makeup}</TableCell>
                      <TableCell>{exam.reason}</TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${
                            exam.status === "Approved"
                              ? "bg-green-100 text-green-700"
                              : exam.status === "Rejected"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {exam.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
