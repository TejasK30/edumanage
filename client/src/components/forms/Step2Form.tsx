"use client"

import React from "react"
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CardHeader, CardTitle } from "../ui/card"
import { Step2FormProps } from "@/types"

export const step2Schema = z.object({
  principal: z.object({
    fullName: z.string().min(2, "Required"),
    email: z.string().email("Invalid email"),
    address: z.string().min(5, "Required"),
    phone: z.string().min(7, "Required"),
  }),
  vicePrincipal: z.object({
    fullName: z.string().min(2, "Required"),
    email: z.string().email("Invalid email"),
    address: z.string().min(5, "Required"),
    phone: z.string().min(7, "Required"),
  }),
  teachers: z.array(
    z.object({
      fullName: z.string().min(2, "Required"),
      email: z.string().email("Invalid email"),
      address: z.string().min(5, "Required"),
      phone: z.string().min(7, "Required"),
      department: z.string().min(2, "Required"),
      allocatedSubjects: z.string().min(1, "Required"),
    })
  ),
})

export type Step2Values = z.infer<typeof step2Schema>

export default function Step2Form({
  defaultValues,
  onNext,
  onBack,
}: Step2FormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Step2Values>({
    resolver: zodResolver(step2Schema),
    defaultValues: defaultValues || { teachers: [] },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "teachers",
  })

  const onSubmit: SubmitHandler<Step2Values> = (data) => {
    onNext(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
      <CardHeader className="text-center">
        <CardTitle className="text-xl tracking-normal">
          Role Assignemnt
        </CardTitle>
      </CardHeader>
      {/* Principal Section */}
      <div className="p-6 border rounded-lg shadow-sm">
        <h2 className="text-lg font-bold mb-4">Principal (1)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="principal.fullName">Full Name</Label>
            <Input
              id="principal.fullName"
              placeholder="Principal Name"
              {...register("principal.fullName")}
            />
            {errors.principal?.fullName && (
              <p className="text-red-600 text-sm">
                {errors.principal.fullName.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="principal.email">Email</Label>
            <Input
              id="principal.email"
              placeholder="principal@example.com"
              {...register("principal.email")}
            />
            {errors.principal?.email && (
              <p className="text-red-600 text-sm">
                {errors.principal.email.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="principal.address">Address</Label>
            <Input
              id="principal.address"
              placeholder="Address"
              {...register("principal.address")}
            />
            {errors.principal?.address && (
              <p className="text-red-600 text-sm">
                {errors.principal.address.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="principal.phone">Phone</Label>
            <Input
              id="principal.phone"
              placeholder="Phone Number"
              {...register("principal.phone")}
            />
            {errors.principal?.phone && (
              <p className="text-red-600 text-sm">
                {errors.principal.phone.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Vice Principal Section */}
      <div className="p-6 border rounded-lg shadow-sm">
        <h2 className="text-lg font-bold mb-4">Vice Principal (1)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="vicePrincipal.fullName">Full Name</Label>
            <Input
              id="vicePrincipal.fullName"
              placeholder="Vice Principal Name"
              {...register("vicePrincipal.fullName")}
            />
            {errors.vicePrincipal?.fullName && (
              <p className="text-red-600 text-sm">
                {errors.vicePrincipal.fullName.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="vicePrincipal.email">Email</Label>
            <Input
              id="vicePrincipal.email"
              placeholder="viceprincipal@example.com"
              {...register("vicePrincipal.email")}
            />
            {errors.vicePrincipal?.email && (
              <p className="text-red-600 text-sm">
                {errors.vicePrincipal.email.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="vicePrincipal.address">Address</Label>
            <Input
              id="vicePrincipal.address"
              placeholder="Address"
              {...register("vicePrincipal.address")}
            />
            {errors.vicePrincipal?.address && (
              <p className="text-red-600 text-sm">
                {errors.vicePrincipal.address.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="vicePrincipal.phone">Phone</Label>
            <Input
              id="vicePrincipal.phone"
              placeholder="Phone Number"
              {...register("vicePrincipal.phone")}
            />
            {errors.vicePrincipal?.phone && (
              <p className="text-red-600 text-sm">
                {errors.vicePrincipal.phone.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Teachers Section */}
      <div className="p-6 border rounded-lg shadow-sm ">
        <h2 className="text-lg font-bold mb-4">Teachers</h2>
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="p-4 border-2 border-gray-700 rounded-lg shadow-sm mb-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`teachers.${index}.fullName`}>Full Name</Label>
                <Input
                  id={`teachers.${index}.fullName`}
                  placeholder="Teacher Name"
                  {...register(`teachers.${index}.fullName` as const)}
                />
                {errors.teachers?.[index]?.fullName && (
                  <p className="text-red-600 text-sm">
                    {errors.teachers[index]?.fullName?.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor={`teachers.${index}.email`}>Email</Label>
                <Input
                  id={`teachers.${index}.email`}
                  placeholder="teacher@example.com"
                  {...register(`teachers.${index}.email` as const)}
                />
                {errors.teachers?.[index]?.email && (
                  <p className="text-red-600 text-sm">
                    {errors.teachers[index]?.email?.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor={`teachers.${index}.address`}>Address</Label>
                <Input
                  id={`teachers.${index}.address`}
                  placeholder="Address"
                  {...register(`teachers.${index}.address` as const)}
                />
                {errors.teachers?.[index]?.address && (
                  <p className="text-red-600 text-sm">
                    {errors.teachers[index]?.address?.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor={`teachers.${index}.phone`}>Phone</Label>
                <Input
                  id={`teachers.${index}.phone`}
                  placeholder="Phone Number"
                  {...register(`teachers.${index}.phone` as const)}
                />
                {errors.teachers?.[index]?.phone && (
                  <p className="text-red-600 text-sm">
                    {errors.teachers[index]?.phone?.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor={`teachers.${index}.department`}>
                  Department
                </Label>
                <Input
                  id={`teachers.${index}.department`}
                  placeholder="Department"
                  {...register(`teachers.${index}.department` as const)}
                />
                {errors.teachers?.[index]?.department && (
                  <p className="text-red-600 text-sm">
                    {errors.teachers[index]?.department?.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor={`teachers.${index}.allocatedSubjects`}>
                  Allocated Subjects
                </Label>
                <Input
                  id={`teachers.${index}.allocatedSubjects`}
                  placeholder="Subjects (comma-separated)"
                  {...register(`teachers.${index}.allocatedSubjects` as const)}
                />
                {errors.teachers?.[index]?.allocatedSubjects && (
                  <p className="text-red-600 text-sm">
                    {errors.teachers[index]?.allocatedSubjects?.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex justify-end mt-2">
              <Button variant="destructive" onClick={() => remove(index)}>
                Remove Teacher
              </Button>
            </div>
          </div>
        ))}
        <Button
          onClick={() =>
            append({
              fullName: "",
              email: "",
              address: "",
              phone: "",
              department: "",
              allocatedSubjects: "",
            })
          }
          className="bg-primary text-white hover:bg-primary-dark"
        >
          Add Teacher
        </Button>
      </div>

      <div className="flex justify-between pt-4">
        <Button
          onClick={onBack}
          className="w-32 border-primary bg-primary text-white hover:bg-primary-dark"
        >
          Back
        </Button>
        <Button type="submit" className="w-32 bg-primary hover:bg-primary-dark">
          Next
        </Button>
      </div>
    </form>
  )
}
