import { ThemeProvider } from "@/lib/providers/next-theme-provider"
import { QueryClient } from "@tanstack/react-query"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { twMerge } from "tailwind-merge"
import { ReactQueryProvider } from "@/lib/providers/react-query-provider"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400"],
})

export const metadata: Metadata = {
  title: "Edumanage - Education Management System",
  description: "A comprehensive education management system",
}

const queryClient = new QueryClient()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={twMerge(`bg-background ${inter.variable} antialiased`)}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
