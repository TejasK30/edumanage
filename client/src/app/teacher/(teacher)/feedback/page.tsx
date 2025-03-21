"use client"

import PageHeader from "@/components/dashboard-components/page-header"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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
import {
  BarChart2,
  Calendar,
  CheckCircle,
  Download,
  MessageCircle,
  MessageSquare,
  Search,
  Star,
} from "lucide-react"
import { useState } from "react"

// Sample data for demonstration
const feedbackData = [
  {
    id: 1,
    student: "Alex Johnson",
    class: "Mathematics 101",
    date: "2025-03-15",
    rating: 4,
    comment:
      "The class was very informative. I really enjoyed the interactive examples.",
    status: "New",
    avatar: "/avatars/01.png",
  },
  {
    id: 2,
    student: "Samantha Lee",
    class: "Physics 202",
    date: "2025-03-14",
    rating: 5,
    comment:
      "Dr. Smith explains complex concepts very clearly. The demonstrations were helpful.",
    status: "Reviewed",
    avatar: "/avatars/02.png",
  },
  {
    id: 3,
    student: "Michael Chen",
    class: "Computer Science 303",
    date: "2025-03-13",
    rating: 3,
    comment:
      "The pace was a bit fast. Would appreciate more examples for the algorithms.",
    status: "New",
    avatar: "/avatars/03.png",
  },
  {
    id: 4,
    student: "Emily Wilson",
    class: "Chemistry 201",
    date: "2025-03-12",
    rating: 4,
    comment:
      "Lab session was excellent. Could use more time for the complex experiments.",
    status: "Reviewed",
    avatar: "/avatars/04.png",
  },
  {
    id: 5,
    student: "James Brown",
    class: "English Literature",
    date: "2025-03-10",
    rating: 2,
    comment:
      "The reading assignments are too lengthy. Would appreciate more discussion time.",
    status: "New",
    avatar: "/avatars/05.png",
  },
]

// Rating distribution for analytics
const ratingDistribution = [
  { rating: 5, count: 12, percentage: 40 },
  { rating: 4, count: 10, percentage: 33 },
  { rating: 3, count: 5, percentage: 17 },
  { rating: 2, count: 2, percentage: 7 },
  { rating: 1, count: 1, percentage: 3 },
]

// Class feedback summary
const classFeedback = [
  { class: "Mathematics 101", avgRating: 4.2, totalFeedbacks: 15 },
  { class: "Physics 202", avgRating: 4.5, totalFeedbacks: 12 },
  { class: "Computer Science 303", avgRating: 3.8, totalFeedbacks: 10 },
  { class: "Chemistry 201", avgRating: 4.0, totalFeedbacks: 8 },
  { class: "English Literature", avgRating: 3.2, totalFeedbacks: 5 },
]

export default function FeedbackPage() {
  // Teacher view uses these filters to narrow down feedback that requires attention.
  const [selectedStatus, setSelectedStatus] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedClass, setSelectedClass] = useState("all")

  // Filter feedbacks based on search term and filters
  const filteredFeedbacks = feedbackData.filter((feedback) => {
    const matchesSearch =
      feedback.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.class.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus =
      selectedStatus === "All" || feedback.status === selectedStatus
    const matchesDate = selectedDate === "" || feedback.date === selectedDate
    const matchesClass =
      selectedClass === "all" || feedback.class === selectedClass

    return matchesSearch && matchesStatus && matchesDate && matchesClass
  })

  return (
    <div className="container px-4 py-6 mx-auto max-w-7xl">
      <PageHeader
        title="Feedback"
        icon={MessageCircle}
        description="Manage student feedbacks"
      />

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Feedback</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="responses">My Replies</TabsTrigger>
        </TabsList>

        {/* All Feedback Tab */}
        <TabsContent value="all" className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Feedback Manager</CardTitle>
              <CardDescription>
                Review and manage student feedback for your classes.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4 mb-6 md:flex-row">
                <div className="relative flex-1">
                  <Search className="absolute w-4 h-4 left-3 top-3 text-muted-foreground" />
                  <Input
                    placeholder="Search feedback..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Select
                  value={selectedStatus}
                  onValueChange={setSelectedStatus}
                >
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Status</SelectItem>
                    <SelectItem value="New">New</SelectItem>
                    <SelectItem value="Reviewed">Reviewed</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Classes</SelectItem>
                    <SelectItem value="Mathematics 101">
                      Mathematics 101
                    </SelectItem>
                    <SelectItem value="Physics 202">Physics 202</SelectItem>
                    <SelectItem value="Computer Science 303">
                      Computer Science 303
                    </SelectItem>
                    <SelectItem value="Chemistry 201">Chemistry 201</SelectItem>
                    <SelectItem value="English Literature">
                      English Literature
                    </SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full md:w-[180px]"
                />
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Class</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead className="w-[300px]">Comment</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredFeedbacks.length > 0 ? (
                      filteredFeedbacks.map((feedback) => (
                        <TableRow key={feedback.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                              <Avatar className="w-8 h-8">
                                <AvatarImage
                                  src={feedback.avatar}
                                  alt={feedback.student}
                                />
                                <AvatarFallback>
                                  {feedback.student.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              {feedback.student}
                            </div>
                          </TableCell>
                          <TableCell>{feedback.class}</TableCell>
                          <TableCell>
                            {new Date(feedback.date).toLocaleDateString(
                              "en-US"
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              {feedback.rating}
                              <Star className="w-4 h-4 ml-1 text-yellow-400 fill-yellow-400" />
                            </div>
                          </TableCell>
                          <TableCell className="max-w-xs truncate">
                            {feedback.comment}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                feedback.status === "New"
                                  ? "default"
                                  : "secondary"
                              }
                            >
                              {feedback.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-6">
                          No feedback found matching your filters.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Rating Distribution</CardTitle>
                <CardDescription>
                  Overall rating distribution across all classes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {ratingDistribution.map((item) => (
                    <div key={item.rating} className="space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center">
                          <span className="mr-2">{item.rating}</span>
                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {item.count} ({item.percentage}%)
                        </span>
                      </div>
                      <div className="w-full h-2 overflow-hidden rounded-full bg-secondary">
                        <div
                          className="h-full bg-primary"
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Feedback by Class</CardTitle>
                <CardDescription>
                  Average ratings and feedback count by class
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Class</TableHead>
                      <TableHead>Average Rating</TableHead>
                      <TableHead className="text-right"># Feedbacks</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {classFeedback.map((item) => (
                      <TableRow key={item.class}>
                        <TableCell className="font-medium">
                          {item.class}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            {item.avgRating.toFixed(1)}
                            <Star className="w-4 h-4 ml-1 text-yellow-400 fill-yellow-400" />
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          {item.totalFeedbacks}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Feedback Trends</CardTitle>
                <CardDescription>
                  Average rating trends over the past months
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-64 text-center text-muted-foreground">
                  <BarChart2 className="w-12 h-12 mb-2" />
                  <div>
                    <p>
                      Chart visualization of feedback trends would appear here
                    </p>
                    <p className="text-sm">Tracking monthly average ratings</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  Change Period
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export Data
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        {/* My Responses Tab */}
        <TabsContent value="responses" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>My Replies to Feedback</CardTitle>
              <CardDescription>
                Track the replies you have sent to student feedback.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-6">
                {feedbackData
                  .filter((item) => item.status === "Reviewed")
                  .map((feedback) => (
                    <Card
                      key={feedback.id}
                      className="overflow-hidden border shadow-sm"
                    >
                      <div className="p-4 border-b bg-muted/20">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            <Avatar className="w-8 h-8">
                              <AvatarImage
                                src={feedback.avatar}
                                alt={feedback.student}
                              />
                              <AvatarFallback>
                                {feedback.student.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{feedback.student}</p>
                              <p className="text-sm text-muted-foreground">
                                {feedback.class}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center">
                              {feedback.rating}
                              <Star className="w-4 h-4 ml-1 text-yellow-400 fill-yellow-400" />
                            </div>
                            <Badge variant="outline">
                              {new Date(feedback.date).toLocaleDateString(
                                "en-US"
                              )}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex flex-col space-y-4">
                          <div>
                            <h4 className="mb-1 text-sm font-medium text-muted-foreground">
                              Student Comment:
                            </h4>
                            <p>{feedback.comment}</p>
                          </div>
                          <div>
                            <h4 className="mb-1 text-sm font-medium text-muted-foreground">
                              Your Reply:
                            </h4>
                            <p className="p-3 rounded-md bg-muted/30">
                              Thank you for your feedback. I have noted your
                              suggestions and will follow up accordingly.
                            </p>
                          </div>
                          <div className="flex justify-end space-x-2">
                            <Button size="sm" variant="outline">
                              <MessageSquare className="w-4 h-4 mr-2" />
                              Reply Again
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
