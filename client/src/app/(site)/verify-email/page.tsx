"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import Logo from "@/components/logo"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"

const FormSchema = z.object({
  otp: z.string().min(6, {
    message: "Your OTP must be exactly 6 digits.",
  }),
})

export default function VerifyEmailPage() {
  const { toast } = useToast()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState<string | null>(null)
  const [remainingTime, setRemainingTime] = useState<number>(0)
  const [canResend, setCanResend] = useState<boolean>(false)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      otp: "",
    },
  })

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail")
    if (!storedEmail) {
      toast({
        title: "Email Not Found",
        description: "Please sign up again to receive a verification code.",
        variant: "destructive",
      })
      router.push("/signup")
    } else {
      setEmail(storedEmail)
      setRemainingTime(900)
    }
  }, [router, toast])

  useEffect(() => {
    if (remainingTime <= 0) {
      setCanResend(true)
      return
    }

    const timer = setTimeout(() => {
      setRemainingTime((prev) => prev - 1)
    }, 1000)

    return () => clearTimeout(timer)
  }, [remainingTime])

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`
  }

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (!email) {
      toast({
        title: "Email Not Found",
        description: "Please sign up again to receive a verification code.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch("/api/verify-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          otp: data.otp,
        }),
      })

      const result = await response.json()

      if (response.ok) {
        toast({
          title: "Verification Successful",
          description:
            "Your email has been verified. Redirecting to dashboard...",
        })

        // Clear email from localStorage after successful verification
        localStorage.removeItem("userEmail")
        router.push("/auth/login")
      } else {
        toast({
          title: "Verification Failed",
          description: result.error || "Invalid verification code.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error(error)
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendOTP = async () => {
    if (!email || !canResend) return

    setIsLoading(true)
    try {
      const response = await fetch("/api/resend-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const result = await response.json()

      if (response.ok) {
        toast({
          title: "OTP Resent",
          description: "A new verification code has been sent to your email.",
        })
        form.reset({ otp: "" })
        setRemainingTime(900)
        setCanResend(false)
      } else {
        toast({
          title: "Failed to Resend",
          description: result.error || "Could not send verification code.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error(error)
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Logo />
        <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 text-center">
            Verify Your Email
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-2">
            Please enter the 6-digit OTP sent to{" "}
            <span className="font-medium text-blue-600 dark:text-blue-400">
              {email || "your email"}
            </span>
          </p>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-6 space-y-6"
            >
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup className="flex gap-2 justify-center">
                          {[...Array(6)].map((_, index) => (
                            <InputOTPSlot
                              key={index}
                              index={index}
                              className="w-12 h-12 text-center border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none transition-colors bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                          ))}
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage className="text-red-500 mt-2 text-center" />
                  </FormItem>
                )}
              />

              {remainingTime > 0 && (
                <p className="text-sm text-center text-gray-500 dark:text-gray-400">
                  Code expires in{" "}
                  <span className="font-medium text-amber-600 dark:text-amber-400">
                    {formatTime(remainingTime)}
                  </span>
                </p>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors disabled:bg-blue-400"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Verifying...
                  </span>
                ) : (
                  "Verify OTP"
                )}
              </Button>

              <div className="flex justify-center">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={handleResendOTP}
                  disabled={!canResend || isLoading}
                  className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 disabled:text-gray-400"
                >
                  {canResend
                    ? "Resend verification code"
                    : "Code not received?"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}
