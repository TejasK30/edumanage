"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AlertCircle,
  CheckCircle,
  Clock,
  Download,
  Eye,
  FileText,
  MoreVertical,
  Search,
} from "lucide-react"
import { useState } from "react"

export default function SubmissionsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSubmission, setSelectedSubmission] = useState<any>(null)

  // Mock data
  const newSubmissions = [
    {
      id: "sub1",
      assignment: "Term Paper: AI Ethics",
      student: {
        name: "Alex Johnson",
        id: "S10045",
        avatar: "https://i.pravatar.cc/150?img=1",
      },
      submittedAt: "2025-03-19T14:30:00Z",
      dueDate: "2025-03-20T23:59:00Z",
      status: "on_time",
      fileCount: 2,
      files: ["AI Ethics Paper.docx", "References.pdf"],
    },
    {
      id: "sub2",
      assignment: "Term Paper: AI Ethics",
      student: {
        name: "Sam Smith",
        id: "S10046",
        avatar: "https://i.pravatar.cc/150?img=2",
      },
      submittedAt: "2025-03-19T15:15:00Z",
      dueDate: "2025-03-20T23:59:00Z",
      status: "on_time",
      fileCount: 1,
      files: ["Ethics_Paper_Final.pdf"],
    },
    {
      id: "sub3",
      assignment: "Term Paper: AI Ethics",
      student: {
        name: "Taylor Wilson",
        id: "S10050",
        avatar: "https://i.pravatar.cc/150?img=3",
      },
      submittedAt: "2025-03-18T09:45:00Z",
      dueDate: "2025-03-20T23:59:00Z",
      status: "on_time",
      fileCount: 3,
      files: ["Paper_Draft.docx", "Final_Paper.pdf", "Images.zip"],
    },
  ]

  const gradedSubmissions = [
    {
      id: "sub4",
      assignment: "Research Proposal",
      student: {
        name: "Jordan Lee",
        id: "S10048",
        avatar: "https://i.pravatar.cc/150?img=4",
      },
      submittedAt: "2025-03-10T11:20:00Z",
      gradedAt: "2025-03-15T16:40:00Z",
      dueDate: "2025-03-12T23:59:00Z",
      status: "graded",
      grade: 92,
      maxGrade: 100,
      feedback: "Excellent work! Well-researched and thoughtfully presented.",
      fileCount: 1,
      files: ["Research_Proposal_Final.pdf"],
    },
    {
      id: "sub5",
      assignment: "Research Proposal",
      student: {
        name: "Riley Thompson",
        id: "S10052",
        avatar: "https://i.pravatar.cc/150?img=5",
      },
      submittedAt: "2025-03-09T22:15:00Z",
      gradedAt: "2025-03-15T15:30:00Z",
      dueDate: "2025-03-12T23:59:00Z",
      status: "graded",
      grade: 85,
      maxGrade: 100,
      feedback: "Good analysis but needs more supporting evidence.",
      fileCount: 2,
      files: ["Proposal.docx", "Data.xlsx"],
    },
  ]

  const lateSubmissions = [
    {
      id: "sub6",
      assignment: "Term Paper: AI Ethics",
      student: {
        name: "Casey Brown",
        id: "S10055",
        avatar: "https://i.pravatar.cc/150?img=6",
      },
      submittedAt: "2025-03-21T10:15:00Z",
      dueDate: "2025-03-20T23:59:00Z",
      status: "late",
      fileCount: 1,
      files: ["Late_Submission_Ethics.pdf"],
    },
  ]

  // Filter function
  const filterSubmissions = (submissions: any[]) => {
    if (!searchTerm) return submissions

    return submissions.filter(
      (sub) =>
        sub.student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.assignment.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  // Status badge renderer
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "on_time":
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200"
          >
            On Time
          </Badge>
        )
      case "late":
        return (
          <Badge
            variant="outline"
            className="bg-yellow-50 text-yellow-700 border-yellow-200"
          >
            Late
          </Badge>
        )
      case "graded":
        return (
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-700 border-blue-200"
          >
            Graded
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  // View submission dialog content
  const viewSubmissionDialog = (submission: any) => {
    return (
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={submission.student.avatar}
              alt={submission.student.name}
            />
            <AvatarFallback>
              {submission.student.name
                .split(" ")
                .map((n: string) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium">{submission.student.name}</h3>
            <p className="text-sm text-muted-foreground">
              {submission.student.id}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Submitted on</p>
            <p>{new Date(submission.submittedAt).toLocaleString()}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Due date</p>
            <p>{new Date(submission.dueDate).toLocaleString()}</p>
          </div>
        </div>

        {submission.status === "graded" && (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <p className="font-medium">Grade</p>
              <p className="font-medium">
                {submission.grade}/{submission.maxGrade}
              </p>
            </div>
            <Progress
              value={(submission.grade / submission.maxGrade) * 100}
              className="h-2"
            />
            <div className="mt-4">
              <p className="text-muted-foreground mb-1">Feedback</p>
              <p>{submission.feedback}</p>
            </div>
          </div>
        )}

        <div>
          <p className="text-muted-foreground mb-2">
            Files ({submission.fileCount})
          </p>
          <div className="space-y-2">
            {submission.files.map((file: string, index: number) => (
              <div
                key={index}
                className="flex items-center justify-between border rounded-md p-3"
              >
                <div className="flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-blue-500" />
                  <span>{file}</span>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {submission.status !== "graded" && (
          <div className="mt-4">
            <Button className="w-full">Grade Submission</Button>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Assignment Submissions
          </h1>
          <p className="text-muted-foreground">
            View and grade student submissions
          </p>
        </div>
        <div className="w-full md:w-auto mt-4 md:mt-0">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search submissions..."
              className="pl-8 w-full md:w-80"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <Tabs defaultValue="new" className="w-full">
        <TabsList className="grid w-full grid-cols-3 md:max-w-md">
          <TabsTrigger value="new" className="flex items-center">
            <AlertCircle className="h-4 w-4 mr-2" />
            <span>New</span>
            <Badge className="ml-2">{newSubmissions.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="graded" className="flex items-center">
            <CheckCircle className="h-4 w-4 mr-2" />
            <span>Graded</span>
            <Badge className="ml-2">{gradedSubmissions.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="late" className="flex items-center">
            <Clock className="h-4 w-4 mr-2" />
            <span>Late</span>
            <Badge className="ml-2">{lateSubmissions.length}</Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="new" className="mt-6">
          <div className="grid gap-4">
            {filterSubmissions(newSubmissions).length > 0 ? (
              filterSubmissions(newSubmissions).map((submission) => (
                <Card key={submission.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex flex-col sm:flex-row items-start p-4 sm:items-center">
                      <div className="flex items-center flex-grow">
                        <Avatar className="h-10 w-10 mr-4">
                          <AvatarImage src={submission.student.avatar} />
                          <AvatarFallback>
                            {submission.student.name
                              .split(" ")
                              .map((n: string) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="grid gap-0.5">
                          <div className="flex items-center">
                            <p className="font-medium">
                              {submission.student.name}
                            </p>
                            <p className="ml-2 text-sm text-muted-foreground">
                              ({submission.student.id})
                            </p>
                          </div>
                          <p className="text-sm text-muted-foreground truncate">
                            {submission.assignment}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center mt-2 sm:mt-0">
                        <div className="flex flex-col items-end mr-4">
                          <div className="flex items-center">
                            {renderStatusBadge(submission.status)}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {new Date(
                              submission.submittedAt
                            ).toLocaleDateString()}
                          </p>
                        </div>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => setSelectedSubmission(submission)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[500px]">
                            <DialogHeader>
                              <DialogTitle>{submission.assignment}</DialogTitle>
                              <DialogDescription>
                                Submission details
                              </DialogDescription>
                            </DialogHeader>
                            {viewSubmissionDialog(submission)}
                          </DialogContent>
                        </Dialog>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              Grade Submission
                            </DropdownMenuItem>
                            <DropdownMenuItem>Download Files</DropdownMenuItem>
                            <DropdownMenuItem>Send Feedback</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center p-8 text-center border rounded-lg">
                <Search className="h-10 w-10 text-muted-foreground mb-2" />
                <h3 className="font-medium">No submissions found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search term
                </p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="graded" className="mt-6">
          <div className="grid gap-4">
            {filterSubmissions(gradedSubmissions).length > 0 ? (
              filterSubmissions(gradedSubmissions).map((submission) => (
                <Card key={submission.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex flex-col sm:flex-row items-start p-4 sm:items-center">
                      <div className="flex items-center flex-grow">
                        <Avatar className="h-10 w-10 mr-4">
                          <AvatarImage src={submission.student.avatar} />
                          <AvatarFallback>
                            {submission.student.name
                              .split(" ")
                              .map((n: string) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="grid gap-0.5">
                          <div className="flex items-center">
                            <p className="font-medium">
                              {submission.student.name}
                            </p>
                            <p className="ml-2 text-sm text-muted-foreground">
                              ({submission.student.id})
                            </p>
                          </div>
                          <p className="text-sm text-muted-foreground truncate">
                            {submission.assignment}
                          </p>
                          <div className="flex items-center mt-1">
                            <p className="text-sm font-medium">
                              Grade: {submission.grade}/{submission.maxGrade}
                            </p>
                            <Progress
                              value={
                                (submission.grade / submission.maxGrade) * 100
                              }
                              className="h-2 w-24 ml-2"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center mt-2 sm:mt-0">
                        <div className="flex flex-col items-end mr-4">
                          {renderStatusBadge(submission.status)}
                          <p className="text-sm text-muted-foreground mt-1">
                            Graded:{" "}
                            {new Date(submission.gradedAt).toLocaleDateString()}
                          </p>
                        </div>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => setSelectedSubmission(submission)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[500px]">
                            <DialogHeader>
                              <DialogTitle>{submission.assignment}</DialogTitle>
                              <DialogDescription>
                                Submission details
                              </DialogDescription>
                            </DialogHeader>
                            {viewSubmissionDialog(submission)}
                          </DialogContent>
                        </Dialog>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit Grade</DropdownMenuItem>
                            <DropdownMenuItem>Download Files</DropdownMenuItem>
                            <DropdownMenuItem>
                              Send Additional Feedback
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center p-8 text-center border rounded-lg">
                <CheckCircle className="h-10 w-10 text-muted-foreground mb-2" />
                <h3 className="font-medium">No graded submissions found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search term
                </p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="late" className="mt-6">
          <div className="grid gap-4">
            {filterSubmissions(lateSubmissions).length > 0 ? (
              filterSubmissions(lateSubmissions).map((submission) => (
                <Card key={submission.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex flex-col sm:flex-row items-start p-4 sm:items-center">
                      <div className="flex items-center flex-grow">
                        <Avatar className="h-10 w-10 mr-4">
                          <AvatarImage src={submission.student.avatar} />
                          <AvatarFallback>
                            {submission.student.name
                              .split(" ")
                              .map((n: string) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="grid gap-0.5">
                          <div className="flex items-center">
                            <p className="font-medium">
                              {submission.student.name}
                            </p>
                            <p className="ml-2 text-sm text-muted-foreground">
                              ({submission.student.id})
                            </p>
                          </div>
                          <p className="text-sm text-muted-foreground truncate">
                            {submission.assignment}
                          </p>
                          <p className="text-sm text-red-500 mt-1">
                            {Math.ceil(
                              (new Date(submission.submittedAt).getTime() -
                                new Date(submission.dueDate).getTime()) /
                                (1000 * 60 * 60 * 24)
                            )}{" "}
                            days late
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center mt-2 sm:mt-0">
                        <div className="flex flex-col items-end mr-4">
                          {renderStatusBadge(submission.status)}
                          <p className="text-sm text-muted-foreground mt-1">
                            {new Date(
                              submission.submittedAt
                            ).toLocaleDateString()}
                          </p>
                        </div>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => setSelectedSubmission(submission)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[500px]">
                            <DialogHeader>
                              <DialogTitle>{submission.assignment}</DialogTitle>
                              <DialogDescription>
                                Submission details
                              </DialogDescription>
                            </DialogHeader>
                            {viewSubmissionDialog(submission)}
                          </DialogContent>
                        </Dialog>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              Grade Submission
                            </DropdownMenuItem>
                            <DropdownMenuItem>Download Files</DropdownMenuItem>
                            <DropdownMenuItem>Mark as Excused</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center p-8 text-center border rounded-lg">
                <Clock className="h-10 w-10 text-muted-foreground mb-2" />
                <h3 className="font-medium">No late submissions found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search term
                </p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
