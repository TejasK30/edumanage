"use client"

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
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"

const FormSchema = z.object({
  otp: z.string().min(6, {
    message: "Your OTP must be exactly 6 digits.",
  }),
})

export default function VerifyEmailPage() {
  const { toast } = useToast()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      otp: "",
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true)
    try {
      const response = await fetch("/api/verify-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: localStorage.getItem("userEmail"),
          otp: data.otp,
        }),
      })

      console.log(response)

      const result = await response.json()

      if (response.ok) {
        toast({
          title: "Verification Successful",
          description:
            "Your email has been verified. Redirecting to dashboard...",
        })
        router.push("/")
      } else {
        toast({
          title: "Verification Failed",
          description: result.message,
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
            Please enter the 6-digit OTP sent to your email.
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

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors disabled:bg-gray-300"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="loader animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                    Verifying...
                  </span>
                ) : (
                  "Verify OTP"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}
