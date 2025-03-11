"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import ThemeToggle from "../theme-toggle"

export type Role =
  | "admin"
  | "teacher"
  | "student"
  | "principal"
  | "staff"
  | "other"

interface NavBarProps {
  role: Role
}

const RoleNavBar: React.FC<NavBarProps> = ({ role }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMenu = () => setMobileMenuOpen((prev) => !prev)

  let navLinks: { label: string; href: string }[] = []

  switch (role) {
    case "admin":
      navLinks = [
        { label: "Dashboard", href: "/admin/dashboard" },
        { label: "Manage Colleges", href: "/admin/colleges" },
        { label: "Upload Students", href: "/admin/upload-students" },
        { label: "User Management", href: "/admin/users" },
      ]
      break
    case "teacher":
      navLinks = [
        { label: "Dashboard", href: "/teacher/dashboard" },
        { label: "My Classes", href: "/teacher/classes" },
        { label: "Resources", href: "/teacher/resources" },
      ]
      break
    case "student":
      navLinks = [
        { label: "Dashboard", href: "/student/dashboard" },
        { label: "Courses", href: "/student/courses" },
        { label: "Performance", href: "/student/performance" },
      ]
      break
    case "principal":
      navLinks = [
        { label: "Dashboard", href: "/principal/dashboard" },
        { label: "Reports", href: "/principal/reports" },
        { label: "Manage Staff", href: "/principal/staff" },
      ]
      break
    default:
      navLinks = [{ label: "Home", href: "/" }]
  }

  return (
    <nav className="fixed top-0 right-0 bg-background/80 backdrop-blur-md z-50">
      <div className="flex justify-between items-center h-16 px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center mr-2">
            <span className="text-lg font-bold text-white">E</span>
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50">
            EduManage
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <ThemeToggle />
        </div>

        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={toggleMenu}>
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

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
          {navLinks.map((link, index) => {
            const delay = `${(index + 1) * 100}`
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base hover:bg-muted transition-all duration-300 delay-[${delay}ms] ${
                  mobileMenuOpen
                    ? "translate-x-0 opacity-100"
                    : "translate-x-4 opacity-0"
                }`}
              >
                {link.label}
              </Link>
            )
          })}
          <div className="px-3 py-2">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default RoleNavBar
