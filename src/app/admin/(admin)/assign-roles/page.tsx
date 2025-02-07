"use client"

import { useState } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const rolesSchema = z.object({
  principal: z.object({
    fullName: z.string().min(2, "Required"),
    email: z.string().email("Invalid email"),
    address: z.string().min(5, "Required"),
    phone: z.string().min(7, "Required"),
    uniqueId: z.string().min(1, "Required"),
  }),
  vicePrincipal: z.object({
    fullName: z.string().min(2, "Required"),
    email: z.string().email("Invalid email"),
    address: z.string().min(5, "Required"),
    phone: z.string().min(7, "Required"),
    uniqueId: z.string().min(1, "Required"),
  }),
  teachers: z.array(
    z.object({
      fullName: z.string().min(2, "Required"),
      email: z.string().email("Invalid email"),
      address: z.string().min(5, "Required"),
      phone: z.string().min(7, "Required"),
      uniqueId: z.string().min(1, "Required"),
      department: z.string().min(2, "Required"),
      departmentId: z.string().min(1, "Required"),
      allocatedSubjects: z.string().min(1, "Required"),
    })
  ),
})

type RolesFormValues = z.infer<typeof rolesSchema>

export default function AssignRoles() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RolesFormValues>({
    resolver: zodResolver(rolesSchema),
    defaultValues: { teachers: [] },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "teachers",
  })

  const onSubmit = async (data: RolesFormValues) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/admin/assign-roles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!response.ok) throw new Error("Failed to assign roles")

      alert("Roles assigned successfully!")
      router.push("/admin/dashboard")
    } catch (error) {
      console.error(error)
      alert("Error assigning roles.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-2xl mx-auto mb-6">
        <div className="w-full bg-gray-300 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: "100%" }}
          />
        </div>
        <p className="text-center mt-2 text-sm font-medium text-gray-200">
          Step 2 of 2: Role Assignment
        </p>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl">
            Assign Roles to College Personnel
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Principal */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Principal (1)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="principalFullName">Full Name</Label>
                  <Input
                    id="principalFullName"
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
                  <Label htmlFor="principalEmail">Email</Label>
                  <Input
                    id="principalEmail"
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
                  <Label htmlFor="principalAddress">Address</Label>
                  <Input
                    id="principalAddress"
                    placeholder="Principal Address"
                    {...register("principal.address")}
                  />
                  {errors.principal?.address && (
                    <p className="text-red-600 text-sm">
                      {errors.principal.address.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="principalPhone">Phone Number</Label>
                  <Input
                    id="principalPhone"
                    placeholder="Phone Number"
                    {...register("principal.phone")}
                  />
                  {errors.principal?.phone && (
                    <p className="text-red-600 text-sm">
                      {errors.principal.phone.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="principalUniqueId">Unique ID</Label>
                  <Input
                    id="principalUniqueId"
                    placeholder="Unique ID"
                    {...register("principal.uniqueId")}
                  />
                  {errors.principal?.uniqueId && (
                    <p className="text-red-600 text-sm">
                      {errors.principal.uniqueId.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Vice Principal */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Vice Principal (1)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="vicePrincipalFullName">Full Name</Label>
                  <Input
                    id="vicePrincipalFullName"
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
                  <Label htmlFor="vicePrincipalEmail">Email</Label>
                  <Input
                    id="vicePrincipalEmail"
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
                  <Label htmlFor="vicePrincipalAddress">Address</Label>
                  <Input
                    id="vicePrincipalAddress"
                    placeholder="Vice Principal Address"
                    {...register("vicePrincipal.address")}
                  />
                  {errors.vicePrincipal?.address && (
                    <p className="text-red-600 text-sm">
                      {errors.vicePrincipal.address.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="vicePrincipalPhone">Phone Number</Label>
                  <Input
                    id="vicePrincipalPhone"
                    placeholder="Phone Number"
                    {...register("vicePrincipal.phone")}
                  />
                  {errors.vicePrincipal?.phone && (
                    <p className="text-red-600 text-sm">
                      {errors.vicePrincipal.phone.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="vicePrincipalUniqueId">Unique ID</Label>
                  <Input
                    id="vicePrincipalUniqueId"
                    placeholder="Unique ID"
                    {...register("vicePrincipal.uniqueId")}
                  />
                  {errors.vicePrincipal?.uniqueId && (
                    <p className="text-red-600 text-sm">
                      {errors.vicePrincipal.uniqueId.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Teachers */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Teachers</h3>
              {fields.map((field, index) => (
                <div key={field.id} className="border p-4 rounded mb-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`teachers.${index}.fullName`}>
                        Full Name
                      </Label>
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
                      <Label htmlFor={`teachers.${index}.address`}>
                        Address
                      </Label>
                      <Input
                        id={`teachers.${index}.address`}
                        placeholder="Teacher Address"
                        {...register(`teachers.${index}.address` as const)}
                      />
                      {errors.teachers?.[index]?.address && (
                        <p className="text-red-600 text-sm">
                          {errors.teachers[index]?.address?.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor={`teachers.${index}.phone`}>
                        Phone Number
                      </Label>
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
                      <Label htmlFor={`teachers.${index}.uniqueId`}>
                        Unique ID
                      </Label>
                      <Input
                        id={`teachers.${index}.uniqueId`}
                        placeholder="Unique ID"
                        {...register(`teachers.${index}.uniqueId` as const)}
                      />
                      {errors.teachers?.[index]?.uniqueId && (
                        <p className="text-red-600 text-sm">
                          {errors.teachers[index]?.uniqueId?.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor={`teachers.${index}.department`}>
                        Department
                      </Label>
                      <Input
                        id={`teachers.${index}.department`}
                        placeholder="Department Name"
                        {...register(`teachers.${index}.department` as const)}
                      />
                      {errors.teachers?.[index]?.department && (
                        <p className="text-red-600 text-sm">
                          {errors.teachers[index]?.department?.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor={`teachers.${index}.departmentId`}>
                        Department ID
                      </Label>
                      <Input
                        id={`teachers.${index}.departmentId`}
                        placeholder="Dept. ID"
                        {...register(`teachers.${index}.departmentId` as const)}
                      />
                      {errors.teachers?.[index]?.departmentId && (
                        <p className="text-red-600 text-sm">
                          {errors.teachers[index]?.departmentId?.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor={`teachers.${index}.allocatedSubjects`}>
                        Allocated Subjects
                      </Label>
                      <Input
                        id={`teachers.${index}.allocatedSubjects`}
                        placeholder="Comma-separated subjects"
                        {...register(
                          `teachers.${index}.allocatedSubjects` as const
                        )}
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
                    uniqueId: "",
                    department: "",
                    departmentId: "",
                    allocatedSubjects: "",
                  })
                }
              >
                Add Teacher
              </Button>
            </div>

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? "Assigning Roles..." : "Submit Roles"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
