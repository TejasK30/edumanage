"use client"

import { Menu, X } from "lucide-react"
import Link from "next/link"
import React, { useState } from "react"

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

const NavBar: React.FC<NavBarProps> = ({ role }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen((prev) => !prev)

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
    <nav className="bg-primary-blue-700 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <span className="text-xl font-bold text-white">EduManage</span>
            </Link>
          </div>
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white hover:text-gray-200 transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white hover:text-gray-200 focus:outline-none transition-colors duration-200"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden animate-fadeIn">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-primary-blue-600 transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}

export default NavBar
