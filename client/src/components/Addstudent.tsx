"use client"

import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface AddStudentFormValues {
  fullName: string
  email: string
  phoneNumber: string
  department: string
  className: string
  admissionYear: number
  scholarship: string // "true" or "false"
}

const AddStudent = () => {
  const { register, handleSubmit, reset } = useForm<AddStudentFormValues>()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit = async (data: AddStudentFormValues) => {
    setIsSubmitting(true)
    try {
      // API call to add student can go here
      console.log("Adding student:", data)
      // Example: await api.post('/students', data)
      reset()
    } catch (error) {
      console.error("Error adding student", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Add New Student</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="fullName" className="block mb-1">
            Full Name
          </Label>
          <Input
            id="fullName"
            placeholder="John Doe"
            {...register("fullName", { required: true })}
          />
        </div>
        <div>
          <Label htmlFor="email" className="block mb-1">
            Email
          </Label>
          <Input
            id="email"
            placeholder="john@example.com"
            type="email"
            {...register("email", { required: true })}
          />
        </div>
        <div>
          <Label htmlFor="phoneNumber" className="block mb-1">
            Phone Number
          </Label>
          <Input
            id="phoneNumber"
            placeholder="1234567890"
            {...register("phoneNumber", { required: true })}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="department" className="block mb-1">
              Department
            </Label>
            <Input
              id="department"
              placeholder="Computer Science"
              {...register("department", { required: true })}
            />
          </div>
          <div>
            <Label htmlFor="className" className="block mb-1">
              Class
            </Label>
            <Input
              id="className"
              placeholder="10"
              {...register("className", { required: true })}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="admissionYear" className="block mb-1">
              Admission Year
            </Label>
            <Input
              id="admissionYear"
              placeholder="2023"
              type="number"
              {...register("admissionYear", {
                required: true,
                valueAsNumber: true,
              })}
            />
          </div>
          <div>
            <Label htmlFor="scholarship" className="block mb-1">
              Scholarship
            </Label>
            <select
              id="scholarship"
              {...register("scholarship", { required: true })}
              className="input"
            >
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </div>
        </div>
        <div className="pt-4">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Add Student"}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default AddStudent
