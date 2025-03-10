"use client"

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
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"

const feedbackSchema = z.object({
  teacherFeedback: z.object({
    clarity: z.number().min(1, "Select a rating").max(5, "Max rating is 5"),
    expertise: z.number().min(1).max(5),
    engagement: z.number().min(1).max(5),
    punctuality: z.number().min(1).max(5),
    assessment: z.number().min(1).max(5),
    subjectContent: z.number().min(1).max(5),
    overallTeacher: z.number().min(1).max(5),
    teacherComment: z.string().optional(),
  }),
  collegeFeedback: z.object({
    facilities: z.number().min(1).max(5),
    campusLife: z.number().min(1).max(5),
    administration: z.number().min(1).max(5),
    academicEnvironment: z.number().min(1).max(5),
    overallCollege: z.number().min(1).max(5),
    collegeComment: z.string().optional(),
  }),
})

type FeedbackFormValues = z.infer<typeof feedbackSchema>

export default function FeedbackPage() {
  const { control, handleSubmit, reset } = useForm<FeedbackFormValues>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      teacherFeedback: {
        clarity: 3,
        expertise: 3,
        engagement: 3,
        punctuality: 3,
        assessment: 3,
        subjectContent: 3,
        overallTeacher: 3,
        teacherComment: "",
      },
      collegeFeedback: {
        facilities: 3,
        campusLife: 3,
        administration: 3,
        academicEnvironment: 3,
        overallCollege: 3,
        collegeComment: "",
      },
    },
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  const onSubmit = async (data: FeedbackFormValues) => {
    setIsSubmitting(true)
    setError(null)
    setMessage(null)

    const payload = {
      studentId: "student-uuid", // Replace with real student id
      teacherId: "teacher-uuid", // Replace with real teacher id (if applicable for teacher feedback)
      ...data,
    }

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const result = await res.json()
      if (!res.ok) {
        throw new Error(result.error || "Submission failed")
      }
      setMessage("Feedback submitted successfully!")
      reset()
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={cn("min-h-screen p-4 md:p-6 text-foreground")}>
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Student Feedback</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Please rate each aspect on a scale of 1 (poor) to 5 (excellent) and
            provide additional comments where necessary.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {error && (
            <div className="p-4 rounded bg-destructive/10 text-destructive text-center">
              {error}
            </div>
          )}
          {message && (
            <div className="p-4 rounded bg-primary-blue-50 text-primary-blue-800 text-center">
              {message}
            </div>
          )}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">
                Teacher & Subject Feedback
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-1">
                  <Label htmlFor="clarity">Clarity & Communication</Label>
                  <Controller
                    name="teacherFeedback.clarity"
                    control={control}
                    render={({ field }) => (
                      <Input type="number" min={1} max={5} {...field} />
                    )}
                  />
                </div>
                <div className="grid gap-1">
                  <Label htmlFor="expertise">Knowledge & Expertise</Label>
                  <Controller
                    name="teacherFeedback.expertise"
                    control={control}
                    render={({ field }) => (
                      <Input type="number" min={1} max={5} {...field} />
                    )}
                  />
                </div>
                <div className="grid gap-1">
                  <Label htmlFor="engagement">Engagement & Interaction</Label>
                  <Controller
                    name="teacherFeedback.engagement"
                    control={control}
                    render={({ field }) => (
                      <Input type="number" min={1} max={5} {...field} />
                    )}
                  />
                </div>
                <div className="grid gap-1">
                  <Label htmlFor="punctuality">
                    Punctuality & Organization
                  </Label>
                  <Controller
                    name="teacherFeedback.punctuality"
                    control={control}
                    render={({ field }) => (
                      <Input type="number" min={1} max={5} {...field} />
                    )}
                  />
                </div>
                <div className="grid gap-1">
                  <Label htmlFor="assessment">Assessment & Feedback</Label>
                  <Controller
                    name="teacherFeedback.assessment"
                    control={control}
                    render={({ field }) => (
                      <Input type="number" min={1} max={5} {...field} />
                    )}
                  />
                </div>
                <div className="grid gap-1">
                  <Label htmlFor="subjectContent">Subject Content</Label>
                  <Controller
                    name="teacherFeedback.subjectContent"
                    control={control}
                    render={({ field }) => (
                      <Input type="number" min={1} max={5} {...field} />
                    )}
                  />
                </div>
                <div className="grid gap-1">
                  <Label htmlFor="overallTeacher">Overall Teacher Rating</Label>
                  <Controller
                    name="teacherFeedback.overallTeacher"
                    control={control}
                    render={({ field }) => (
                      <Input type="number" min={1} max={5} {...field} />
                    )}
                  />
                </div>
              </div>
              <div className="mt-2">
                <Label htmlFor="teacherComment">
                  Comments about Teacher/Subject
                </Label>
                <Controller
                  name="teacherFeedback.teacherComment"
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      id="teacherComment"
                      placeholder="Additional comments..."
                      {...field}
                    />
                  )}
                />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">
                College/Institution Feedback
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-1">
                  <Label htmlFor="facilities">
                    Facilities & Infrastructure
                  </Label>
                  <Controller
                    name="collegeFeedback.facilities"
                    control={control}
                    render={({ field }) => (
                      <Input type="number" min={1} max={5} {...field} />
                    )}
                  />
                </div>
                <div className="grid gap-1">
                  <Label htmlFor="campusLife">
                    Campus Life & Extracurriculars
                  </Label>
                  <Controller
                    name="collegeFeedback.campusLife"
                    control={control}
                    render={({ field }) => (
                      <Input type="number" min={1} max={5} {...field} />
                    )}
                  />
                </div>
                <div className="grid gap-1">
                  <Label htmlFor="administration">
                    Administration & Support
                  </Label>
                  <Controller
                    name="collegeFeedback.administration"
                    control={control}
                    render={({ field }) => (
                      <Input type="number" min={1} max={5} {...field} />
                    )}
                  />
                </div>
                <div className="grid gap-1">
                  <Label htmlFor="academicEnvironment">
                    Academic Environment
                  </Label>
                  <Controller
                    name="collegeFeedback.academicEnvironment"
                    control={control}
                    render={({ field }) => (
                      <Input type="number" min={1} max={5} {...field} />
                    )}
                  />
                </div>
                <div className="grid gap-1">
                  <Label htmlFor="overallCollege">Overall College Rating</Label>
                  <Controller
                    name="collegeFeedback.overallCollege"
                    control={control}
                    render={({ field }) => (
                      <Input type="number" min={1} max={5} {...field} />
                    )}
                  />
                </div>
              </div>
              <div className="mt-2">
                <Label htmlFor="collegeComment">
                  Comments about College/Institution
                </Label>
                <Controller
                  name="collegeFeedback.collegeComment"
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      id="collegeComment"
                      placeholder="Additional comments..."
                      {...field}
                    />
                  )}
                />
              </div>
            </div>
            <CardFooter className="flex justify-end">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Feedback"}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
