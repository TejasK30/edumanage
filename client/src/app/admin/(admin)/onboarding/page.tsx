"use client"

import React, { useState } from "react"
import ProgressBar from "@/components/ProgressBar"
import Step1Form, { Step1Values } from "@/components/forms/Step1Form"
import Step2Form, { Step2Values } from "@/components/forms/Step2Form"
import Step3Preview from "@/components/forms/Step3Form"
import Step4Success from "@/components/forms/Step4Form"
import { Step } from "@/types"

export type ProcessedStep1Values = Omit<
  Step1Values,
  "departments" | "collegeRating"
> & {
  collegeRating: string
  departments: string[]
  collegeID?: string
}

export type OnboardingData = {
  step1: ProcessedStep1Values
  step2: Step2Values
}

export default function OnboardingWizard() {
  const [step, setStep] = useState<number>(1)
  const [data, setData] = useState<Partial<OnboardingData>>({})
  const [signupLink, setSignupLink] = useState<string>("")

  const steps: Step[] = [
    { number: 1, label: "College & Admin Details" },
    { number: 2, label: "Role Assignment" },
    { number: 3, label: "Preview" },
    { number: 4, label: "Success" },
  ]

  const handleNextStep1 = (step1Data: Step1Values) => {
    const processed: ProcessedStep1Values = {
      ...step1Data,
      collegeRating: step1Data.collegeRating,
      departments: step1Data.departments
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s !== ""),
    }
    setData((prev) => ({ ...prev, step1: processed }))
    setStep(2)
  }

  const handleNextStep2 = (step2Data: Step2Values) => {
    setData((prev) => ({ ...prev, step2: step2Data }))
    setStep(3)
  }

  const handleBack = () => {
    setStep((prev) => (prev > 1 ? prev - 1 : prev))
  }

  const finalizeOnboarding = async () => {
    if (!data.step1 || !data.step2) {
      alert("Missing onboarding data. Please complete all steps.")
      return
    }

    const payload = {
      ...data.step1,
      ...data.step2,
      collegeID: data.step1.collegeID,
    }

    try {
      const res = await fetch("/api/admin/finalize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.error || "Finalization failed")
      }

      const result = await res.json()
      setSignupLink(result.signupLink)
      setStep(4)
    } catch (error: any) {
      alert(error.message || "An error occurred during finalization")
    }
  }

  return (
    <div className="min-h-screen bg-muted text-white p-4">
      <ProgressBar steps={steps} currentStep={step} />
      <div className="max-w-4xl mx-auto p-6  bg-background rounded-md shadow-lg">
        {step === 1 && (
          <Step1Form
            defaultValues={
              data.step1
                ? {
                    ...data.step1,
                    departments: data.step1.departments.join(", "),
                  }
                : undefined
            }
            onNext={handleNextStep1}
          />
        )}
        {step === 2 && (
          <Step2Form
            defaultValues={data.step2}
            onNext={handleNextStep2}
            onBack={handleBack}
          />
        )}
        {step === 3 && data.step1 && data.step2 && (
          <Step3Preview
            step1Data={data.step1}
            step2Data={data.step2}
            onBack={handleBack}
            onFinalize={finalizeOnboarding}
          />
        )}
        {step === 4 && <Step4Success signupLink={signupLink} />}
      </div>
    </div>
  )
}
