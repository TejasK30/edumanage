"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Menu, ArrowRight } from "lucide-react"
import { NAVIGATION } from "@/lib/site-constants"
import ThemeToggle from "./theme-toggle"
import { useAuthStore } from "@/store/auth-store"

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user } = useAuthStore()

  return (
    <nav className="fixed top-0 left-0 w-full bg-background/80 backdrop-blur-md z-50">
      <div className="flex justify-between items-center h-16 px-4">
        <Link href="/" className="flex items-center cursor-pointer">
          <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center mr-2">
            <span className="text-lg font-bold text-white">E</span>
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50">
            EduManage
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {NAVIGATION.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <Link href="/login">
            <Button variant="ghost" size="sm">
              Log in
            </Button>
          </Link>
          <Link href="/signup">
            <Button size="sm" className="bg-primary hover:bg-primary/90">
              Sign up
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <ThemeToggle />
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`md:hidden bg-background border-t overflow-hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div
          className={`px-2 pt-2 pb-3 space-y-1 transform transition-transform duration-300 ${
            mobileMenuOpen ? "translate-y-0" : "-translate-y-4"
          }`}
        >
          {NAVIGATION.map((item, index) => {
            const delayClass = `delay-${(index + 1) * 100}`
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`block px-3 py-2 text-base hover:bg-muted rounded-lg transform transition-all duration-300 ${delayClass} ${
                  mobileMenuOpen
                    ? "translate-x-0 opacity-100"
                    : "translate-x-4 opacity-0"
                }`}
              >
                {item.label}
              </Link>
            )
          })}
          <div
            className={`px-3 py-2 space-y-2 transform transition-all duration-300 delay-500 ${
              mobileMenuOpen
                ? "translate-x-0 opacity-100"
                : "translate-x-4 opacity-0"
            }`}
          >
            {user ? (
              <Link href="/dashboard" className="block">
                <Button variant="outline" className="w-full">
                  Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/login" className="block">
                  <Button variant="outline" className="w-full">
                    Log in
                  </Button>
                </Link>
                <Link href="/signup" className="block">
                  <Button className="w-full">Sign up</Button>
                </Link>
              </>
            )}
          </div>
          <div className="px-3 py-2">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
