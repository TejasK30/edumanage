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
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import usePasswordVisibility from "@/hooks/usePasswordVisibility"
import { Eye, EyeOff } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import "dotenv/config"

const signupSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
    phone: z.object({
      countryCode: z.string().min(1, "Country code is required"),
      number: z
        .string()
        .min(10, "Phone number must be at least 10 digits")
        .regex(/^\d+$/, "Phone number must contain only digits"),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  })

type SignupFormValues = z.infer<typeof signupSchema>

export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [signupType, setSignupType] = useState("student")

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  })

  const {
    passwordVisible,
    confirmPasswordVisible,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
  } = usePasswordVisibility()

  const onSubmit = async (data: SignupFormValues) => {
    setIsLoading(true)
    setError(null)
    try {
      console.log(process.env.NEXT_PUBLIC_API_URL)

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            password: data.password,
            phone: {
              countryCode: data.phone.countryCode,
              number: data.phone.number,
            },
            role: signupType,
          }),
        }
      )

      const result = await response.json()
      console.log(response)

      if (!response.ok) {
        throw new Error(result.error || "Signup failed")
      }
      router.push("/verify-email")
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
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardHeader className="text-center">
          <Tabs
            defaultValue="student"
            onValueChange={(value) => setSignupType(value)}
          >
            <TabsList className="mb-4">
              <TabsTrigger value="student">Student</TabsTrigger>
              <TabsTrigger value="admin">Admin</TabsTrigger>
            </TabsList>
          </Tabs>
          <CardTitle className="text-xl">Create an account</CardTitle>
          <CardDescription>Sign up with your Google account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-6">
              <div className="flex flex-col gap-4">
                <Button variant="outline" className="w-full">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  Sign up with Google
                </Button>
              </div>
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    {...register("name")}
                  />
                  {errors.name && (
                    <p className="text-red-600">{errors.name.message}</p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="user@example.com"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-red-600">{errors.email.message}</p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="flex">
                    <select
                      {...register("phone.countryCode")}
                      defaultValue="+91"
                      className="border border-gray-300 rounded-l"
                    >
                      <option value="+91">+91 (India)</option>
                      <option value="+1">+1 (USA)</option>
                      <option value="+44">+44 (UK)</option>
                    </select>
                    <Input
                      id="phone"
                      type="text"
                      placeholder="1234567890"
                      {...register("phone.number")}
                      className="rounded-r-md"
                    />
                  </div>
                  {errors.phone?.number && (
                    <p className="text-red-600">
                      {errors.phone.number.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-2 relative">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type={passwordVisible ? "text" : "password"}
                    placeholder="Create a strong password"
                    {...register("password")}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute top-1/2 right-2 flex items-center text-gray-600"
                    tabIndex={-1}
                  >
                    {passwordVisible ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                  {errors.password && (
                    <p className="text-red-600">{errors.password.message}</p>
                  )}
                </div>
                <div className="grid gap-2 relative">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type={confirmPasswordVisible ? "text" : "password"}
                    placeholder="Confirm your password"
                    {...register("confirmPassword")}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={toggleConfirmPasswordVisibility}
                    className="absolute top-1/2 right-2 flex items-center text-gray-600"
                    tabIndex={-1}
                  >
                    {confirmPasswordVisible ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                  {errors.confirmPassword && (
                    <p className="text-red-600">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
                {error && <p className="text-red-600 text-center">{error}</p>}
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? "Creating Account..." : "Create Account"}
                </Button>
              </div>
              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link href="/login" className="underline underline-offset-4">
                  Login
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
        By clicking create account, you agree to our{" "}
        <Link href="/terms">Terms of Service</Link> and{" "}
        <Link href="/privacy">Privacy Policy</Link>.
      </div>
    </div>
  )
}
