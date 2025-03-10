"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { CardHeader, CardTitle } from "../ui/card"
import { PreviewProps } from "@/types"

export default function Step3Preview({
  step1Data,
  step2Data,
  onBack,
  onFinalize,
}: PreviewProps) {
  return (
    <div className="space-y-6">
      <CardHeader className="text-center">
        <CardTitle className="text-xl tracking-normal">
          Preview Details
        </CardTitle>
      </CardHeader>
      <div className="border p-4 rounded">
        <h3 className="font-semibold mb-2 text-primary">
          Admin & College Details
        </h3>
        <p>
          <strong>College Name:</strong> {step1Data.collegeName}
        </p>
        <p>
          <strong>College Address:</strong> {step1Data.collegeAddress}
        </p>
        <p>
          <strong>Rating:</strong> {step1Data.collegeRating}
        </p>
        <p>
          <strong>College Type:</strong> {step1Data.collegeType}
        </p>
        <p>
          <strong>Departments:</strong>{" "}
          {(step1Data.departments || []).join(", ")}
        </p>
      </div>
      <div className="border p-4 rounded">
        <h3 className="font-semibold mb-2 text-primary">Role Assignment</h3>
        <p>
          <strong>Principal:</strong> {step2Data.principal.fullName} (
          {step2Data.principal.email})
        </p>
        <p>
          <strong>Vice Principal:</strong> {step2Data.vicePrincipal.fullName} (
          {step2Data.vicePrincipal.email})
        </p>
        <div>
          <strong>Teachers:</strong>
          <ul className="list-disc ml-5">
            {step2Data.teachers.map((t, idx) => (
              <li key={idx}>
                {t.fullName} – {t.department} (Subjects: {t.allocatedSubjects})
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex justify-between">
        <Button
          onClick={onBack}
          variant="outline"
          className="w-32 border-primary text-primary bg-primary text-white"
        >
          Back
        </Button>
        <Button
          onClick={onFinalize}
          className="w-32 bg-primary hover:bg-primary-dark"
        >
          Finalize
        </Button>
      </div>
    </div>
  )
}
