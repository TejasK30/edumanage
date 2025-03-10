"use client"

import React, { useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const resetPasswordSchema = z
  .object({
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>

export default function ResetPasswordPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams.get("token") || ""
  const email = searchParams.get("email") || ""
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
  })

  const onSubmit = async (data: ResetPasswordFormValues) => {
    setIsLoading(true)
    setError(null)
    setMessage(null)
    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, token, ...data }),
      })
      const result = await response.json()
      if (!response.ok) {
        throw new Error(result.error || "Failed to reset password")
      }
      setMessage(
        "Your password has been reset successfully. You can now login."
      )
      setTimeout(() => {
        router.push("/login")
      }, 3000)
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
    <div className="flex min-h-screen items-center justify-center bg-muted p-6 md:p-10">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Reset Password</CardTitle>
          <CardDescription>Enter your new password below</CardDescription>
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
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                placeholder="New Password"
                {...register("newPassword")}
              />
              {errors.newPassword && (
                <p className="text-red-500 text-sm">
                  {errors.newPassword.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm New Password"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Resetting..." : "Reset Password"}
            </Button>
          </form>
        </CardContent>
        <div className="p-4 text-center text-sm">
          <Link href="/login" className="underline hover:text-primary">
            Back to Login
          </Link>
        </div>
      </Card>
    </div>
  )
}
