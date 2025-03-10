"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email"),
})

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>

export default function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
  })

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    setIsLoading(true)
    setError(null)
    setMessage(null)

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      const result = await response.json()
      if (!response.ok) {
        throw new Error(result.error || "Failed to send reset email")
      }
      setMessage("A password reset link has been sent to your email.")
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "An unexpected error occurred")
      } else {
        setError("An unexpected error occurred")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div
      className={cn(
        "flex min-h-screen flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10"
      )}
    >
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Forgot Password</CardTitle>
          <CardDescription>
            Enter your email address to reset your password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-4 text-red-500 text-sm text-center">{error}</div>
          )}
          {message && (
            <div className="mb-4 text-green-500 text-sm text-center">
              {message}
            </div>
          )}
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    aria-invalid={!!errors.email}
                    aria-describedby="email-error"
                  />
                )}
              />
              {errors.email && (
                <p id="email-error" className="text-red-500 text-sm">
                  {errors.email.message}
                </p>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Sending..." : "Send Reset Link"}
            </Button>
          </form>
        </CardContent>
      </Card>
      <div className="text-center text-sm">
        Remembered your password?{" "}
        <Link
          href="/login"
          className="underline underline-offset-4 hover:text-primary"
        >
          Login
        </Link>
      </div>
    </div>
  )
}
