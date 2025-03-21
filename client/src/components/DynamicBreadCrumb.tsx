"use client"

import React from "react"
import { usePathname } from "next/navigation"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@/components/ui/breadcrumb"
import { AdminNavItems } from "@/constants/adminConstants"
import { StudentNavItems } from "@/constants/studentConstants"
import { TeacherNavItems } from "@/constants/teacherConstants"
import { ChevronRight } from "lucide-react"

interface NavigationItem {
  title: string
  url: string
  icon?: React.ComponentType<any>
  items?: NavigationItem[]
  isActive?: boolean
}

const findBreadcrumbTrail = (
  navItems: NavigationItem[],
  currentPath: string
): NavigationItem[] => {
  for (const item of navItems) {
    // Exact match
    if (currentPath === item.url) {
      return [item]
    }
    // Check if current path starts with this item's URL
    if (currentPath.startsWith(item.url)) {
      if (item.items) {
        const subTrail = findBreadcrumbTrail(item.items, currentPath)
        if (subTrail.length) {
          return [item, ...subTrail]
        }
      }
      return [item]
    }
  }
  return []
}

const DynamicBreadcrumb: React.FC = () => {
  const pathname = usePathname()

  // Determine role based on the pathname prefix
  let role = ""
  if (pathname.startsWith("/admin")) {
    role = "admin"
  } else if (pathname.startsWith("/teacher")) {
    role = "teacher"
  } else if (pathname.startsWith("/student")) {
    role = "student"
  }

  // Select appropriate navigation items based on the role
  let navItems: NavigationItem[] = []
  if (pathname.startsWith("/admin")) {
    navItems = AdminNavItems
  } else if (pathname.startsWith("/teacher")) {
    navItems = TeacherNavItems
  } else if (pathname.startsWith("/student")) {
    navItems = StudentNavItems
  }

  // Generate breadcrumb trail from the navigation items
  const breadcrumbTrail = findBreadcrumbTrail(navItems, pathname)

  return (
    <Breadcrumb className="text-sm font-medium">
      <BreadcrumbItem>
        <BreadcrumbLink
          href={`/${role}`}
          className="text-indigo-600 hover:text-indigo-800"
        >
          Home
        </BreadcrumbLink>
        <ChevronRight className="inline-block text-gray-400 mx-1" size={16} />
      </BreadcrumbItem>
      {breadcrumbTrail.map((item, index) => (
        <BreadcrumbItem key={item.url}>
          <BreadcrumbLink
            href={item.url}
            className={`hover:text-indigo-800 text-indigo-600`}
          >
            {item.title}
          </BreadcrumbLink>
          {index < breadcrumbTrail.length - 1 && (
            <ChevronRight
              className="inline-block text-gray-400 mx-1"
              size={16}
            />
          )}
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  )
}

export default DynamicBreadcrumb
