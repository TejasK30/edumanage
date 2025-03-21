"use client"

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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { BarChart, PlusCircle } from "lucide-react"
import { JSX, useState } from "react"

interface PollOption {
  text: string
  votes: number
}

interface ActivePoll {
  id: string
  title: string
  question: string
  createdAt: string
  endsAt: string
  responses: number
  totalStudents: number
  options: PollOption[]
}

interface PastPoll {
  id: string
  title: string
  question: string
  createdAt: string
  endedAt: string
  responses: number
  totalStudents: number
  options: PollOption[]
}

export default function PollsPage(): JSX.Element {
  const [activePolls, setActivePolls] = useState<ActivePoll[]>([
    {
      id: "poll1",
      title: "Midterm Exam Format",
      question: "What format would you prefer for the midterm exam?",
      createdAt: "2025-03-15T10:30:00Z",
      endsAt: "2025-03-22T10:30:00Z",
      responses: 18,
      totalStudents: 25,
      options: [
        { text: "Multiple choice only", votes: 8 },
        { text: "Short answer questions", votes: 5 },
        { text: "Mix of both formats", votes: 5 },
      ],
    },
    {
      id: "poll2",
      title: "Group Project Preferences",
      question: "How would you prefer to form project groups?",
      createdAt: "2025-03-18T14:20:00Z",
      endsAt: "2025-03-25T14:20:00Z",
      responses: 22,
      totalStudents: 25,
      options: [
        { text: "Self-selected groups", votes: 14 },
        { text: "Instructor assigned groups", votes: 3 },
        { text: "Random assignment", votes: 5 },
      ],
    },
  ])

  const [pastPolls, setPastPolls] = useState<PastPoll[]>([
    {
      id: "poll3",
      title: "Assignment Deadline Extension",
      question: "Should we extend the deadline for the last assignment?",
      createdAt: "2025-03-01T09:15:00Z",
      endedAt: "2025-03-08T09:15:00Z",
      responses: 24,
      totalStudents: 25,
      options: [
        { text: "Yes, by one week", votes: 18 },
        { text: "Yes, by three days", votes: 4 },
        { text: "No extension needed", votes: 2 },
      ],
    },
  ])

  // Calculate percentages for progress bars
  const calculatePercentage = (votes: number, total: number): number => {
    return total > 0 ? Math.round((votes / total) * 100) : 0
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Class Polls</h1>
          <p className="text-muted-foreground">
            Create and manage polls for your students
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Poll
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Create New Poll</DialogTitle>
              <DialogDescription>
                Create a new poll to gather feedback from your students
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="title" className="text-sm font-medium">
                  Poll Title
                </label>
                <Input id="title" placeholder="Enter poll title" />
              </div>
              <div className="grid gap-2">
                <label htmlFor="question" className="text-sm font-medium">
                  Question
                </label>
                <Textarea id="question" placeholder="Enter your question" />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Options</label>
                <div className="space-y-2">
                  <Input placeholder="Option 1" />
                  <Input placeholder="Option 2" />
                  <Input placeholder="Option 3" />
                  <Button variant="outline" size="sm" className="w-full">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Option
                  </Button>
                </div>
              </div>
              <div className="grid gap-2">
                <label htmlFor="endDate" className="text-sm font-medium">
                  End Date
                </label>
                <Input id="endDate" type="date" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Create Poll</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="active">Active Polls</TabsTrigger>
          <TabsTrigger value="past">Past Polls</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            {activePolls.map((poll) => (
              <Card key={poll.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>{poll.title}</CardTitle>
                    <Badge variant="secondary">Active</Badge>
                  </div>
                  <CardDescription>{poll.question}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Responses: {poll.responses}/{poll.totalStudents}
                      </span>
                      <span className="text-muted-foreground">
                        {new Date(poll.endsAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="space-y-3">
                      {poll.options.map((option, index) => (
                        <div key={index} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>{option.text}</span>
                            <span>
                              {option.votes} votes (
                              {calculatePercentage(
                                option.votes,
                                poll.responses
                              )}
                              %)
                            </span>
                          </div>
                          <Progress
                            value={calculatePercentage(
                              option.votes,
                              poll.responses
                            )}
                            className="h-2"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    <BarChart className="mr-2 h-4 w-4" />
                    View Results
                  </Button>
                  <Button variant="secondary" size="sm">
                    End Poll
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="past" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            {pastPolls.map((poll) => (
              <Card key={poll.id} className="opacity-90">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>{poll.title}</CardTitle>
                    <Badge variant="outline">Completed</Badge>
                  </div>
                  <CardDescription>{poll.question}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Responses: {poll.responses}/{poll.totalStudents}
                      </span>
                      <span className="text-muted-foreground">
                        Ended: {new Date(poll.endedAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="space-y-3">
                      {poll.options.map((option, index) => (
                        <div key={index} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>{option.text}</span>
                            <span>
                              {option.votes} votes (
                              {calculatePercentage(
                                option.votes,
                                poll.responses
                              )}
                              %)
                            </span>
                          </div>
                          <Progress
                            value={calculatePercentage(
                              option.votes,
                              poll.responses
                            )}
                            className="h-2"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">
                    <BarChart className="mr-2 h-4 w-4" />
                    View Detailed Results
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
