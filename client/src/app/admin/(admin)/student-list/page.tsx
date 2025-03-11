"use client"
import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { PlusCircle, Filter, Search } from "lucide-react"
import StudentCard from "@/components/student-card"
import { useStudentsStore } from "@/store/student-store"
import DashboardHeader from "@/components/dashboard-components/DashboardHeader"

const StudentList = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState("all")
  const [department, setDepartment] = useState("all")
  const [semester, setSemester] = useState("all")
  const [scholarship, setScholarship] = useState("all")

  // Use zustand store for student data
  const { students, fetchStudents, isLoading, error } = useStudentsStore()

  // Effect to re-fetch students when any filter changes
  useEffect(() => {
    const params = {
      search: searchTerm,
      filter,
      department: department !== "all" ? department : undefined,
      semester: semester !== "all" ? semester : undefined,
      scholarship: scholarship !== "all" ? scholarship : undefined,
    }
    fetchStudents(params)
  }, [searchTerm, filter, department, semester, scholarship, fetchStudents])

  return (
    <div className="w-full bg-background text-foreground transition-none min-h-screen pr-4 py-2">
      {/* Header */}
      <DashboardHeader title="Students" />
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <Button className="flex items-center gap-2 mb-1">
          <PlusCircle className="h-4 w-4" />
          <span>Add Student</span>
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col gap-4">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
          <Input
            placeholder="Search by name, roll number or email..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          {/* Original filter options */}
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Students</SelectItem>
                <SelectItem value="fees-due">Fees Due</SelectItem>
                <SelectItem value="low-attendance">Low Attendance</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Filter by Department */}
          <div className="flex items-center gap-2">
            <Select value={department} onValueChange={setDepartment}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="Computer Science">
                  Computer Science
                </SelectItem>
                <SelectItem value="Electrical">Electrical</SelectItem>
                <SelectItem value="Business">Business</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Filter by Semester */}
          <div className="flex items-center gap-2">
            <Select value={semester} onValueChange={setSemester}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Semester" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Semesters</SelectItem>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4</SelectItem>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="6">6</SelectItem>
                <SelectItem value="7">7</SelectItem>
                <SelectItem value="8">8</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Filter by Scholarship */}
          <div className="flex items-center gap-2">
            <Select value={scholarship} onValueChange={setScholarship}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Scholarship" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="true">Yes</SelectItem>
                <SelectItem value="false">No</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Students List */}
      {isLoading ? (
        <div className="flex justify-center items-center p-8">
          <svg
            className="animate-spin h-8 w-8 text-primary-blue-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      ) : error ? (
        <div className="text-center text-destructive">{error}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {students && students.length > 0 ? (
            students.map((student) => (
              <StudentCard key={student.id} student={student} />
            ))
          ) : (
            <div className="col-span-full flex justify-center items-center p-8 text-gray-500">
              No students found matching your criteria.
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default StudentList
