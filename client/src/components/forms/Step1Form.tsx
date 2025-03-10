"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
import { CardHeader, CardTitle } from "../ui/card"
import { Step1FormProps } from "@/types"

export const step1Schema = z.object({
  collegeName: z.string().min(3, "Required"),
  collegeAddress: z.string().min(5, "Required"),
  collegeRating: z
    .string()
    .regex(
      /^[A-Za-z]+(\+)*$/,
      "Rating must consist of letters and optionally plus sign(s)"
    ),
  collegeType: z.enum([
    "Engineering",
    "Business",
    "MBA",
    "Masters",
    "11th-12th",
  ]),
  departments: z.string().min(3, "Enter at least one department"),
})

export type Step1Values = z.infer<typeof step1Schema>

export default function Step1Form({ defaultValues, onNext }: Step1FormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Step1Values>({
    resolver: zodResolver(step1Schema),
    defaultValues,
  })

  const onSubmit: SubmitHandler<Step1Values> = (data) => {
    onNext(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
      <div>
        <CardHeader className="text-center">
          <CardTitle className="text-xl tracking-normal">
            College Details
          </CardTitle>
        </CardHeader>
      </div>
      <div>
        <Label htmlFor="collegeName">College Name</Label>
        <Input
          id="collegeName"
          placeholder="ABC College"
          {...register("collegeName")}
        />
        {errors.collegeName && (
          <p className="text-red-600 text-sm">{errors.collegeName.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor="collegeAddress">College Address</Label>
        <Input
          id="collegeAddress"
          placeholder="456 College Ave"
          {...register("collegeAddress")}
        />
        {errors.collegeAddress && (
          <p className="text-red-600 text-sm">
            {errors.collegeAddress.message}
          </p>
        )}
      </div>
      <div>
        <Label htmlFor="collegeRating">
          College Rating (letters with optional plus sign(s))
        </Label>
        <Input
          id="collegeRating"
          type="text"
          placeholder="e.g. A, B+, or C++"
          {...register("collegeRating")}
        />
        {errors.collegeRating && (
          <p className="text-red-600 text-sm">{errors.collegeRating.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor="collegeType">College Type</Label>
        <Select
          onValueChange={(value) => {
            setValue("collegeType", value as Step1Values["collegeType"])
          }}
          defaultValue={defaultValues?.collegeType}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Engineering">Engineering</SelectItem>
            <SelectItem value="Business">Business</SelectItem>
            <SelectItem value="MBA">MBA</SelectItem>
            <SelectItem value="Masters">Masters</SelectItem>
            <SelectItem value="11th-12th">11th-12th</SelectItem>
          </SelectContent>
        </Select>
        {errors.collegeType && (
          <p className="text-red-600 text-sm">{errors.collegeType.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor="departments">Departments (comma-separated)</Label>
        <Input
          id="departments"
          placeholder="e.g. Computer Science, Mechanical"
          {...register("departments")}
        />
        {errors.departments && (
          <p className="text-red-600 text-sm">{errors.departments.message}</p>
        )}
      </div>
      <div className="flex justify-end">
        <Button type="submit" className="w-32">
          Next
        </Button>
      </div>
    </form>
  )
}
