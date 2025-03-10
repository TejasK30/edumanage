import { z } from "zod"

export const signupSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.object({
      countryCode: z.string().min(1, "Country code is required"),
      number: z
        .string()
        .min(10, "Phone number must be at least 10 digits")
        .regex(/^\d+$/, "Phone number must contain only digits"),
    }),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
    role: z.string().min(1, "Role is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  })

export const loginSchema = z.object({
  identifier: z.string().min(1, "Identifier is required"),
  password: z.string().min(1, "Password is required"),
})
