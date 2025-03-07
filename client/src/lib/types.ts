import { Step1Values } from "@/components/forms/Step1Form"
import { Step2Values } from "@/components/forms/Step2Form"
import { ReactNode } from "react"

export interface Feature {
  title: string
  description: string
  icon: string
  id: string
}

export interface Testimonial {
  id: string
  name: string
  role: string
  message: string
  avatarUrl?: string
}

export interface PricingPlan {
  id: string
  name: string
  price: number
  description: string
  features: string[]
  isPopular?: boolean
  buttonText: string
}

export interface NavigationItem {
  id: string
  label: string
  href: string
  isExternal?: boolean
}

export interface Step {
  number: number
  label: string
}

export interface ProgressBarProps {
  steps: Step[]
  currentStep: number
}

export interface StatCardProps {
  title: string
  value: string | number
  icon: ReactNode
  change: string
}

export interface Step1FormProps {
  defaultValues?: Partial<Step1Values>
  onNext: (data: Step1Values) => void
}

export interface Step2FormProps {
  defaultValues?: Partial<Step2Values>
  onNext: (data: Step2Values) => void
  onBack: () => void
}

export interface PreviewProps {
  step1Data: {
    adminName: string
    adminEmail: string
    adminAddress: string
    collegeName: string
    collegeAddress: string
    collegeRating: number
    collegeType: string
    departments: string[]
    collegeID?: string
  }
  step2Data: {
    principal: {
      fullName: string
      email: string
      address: string
      phone: string
    }
    vicePrincipal: {
      fullName: string
      email: string
      address: string
      phone: string
    }
    teachers: {
      fullName: string
      email: string
      address: string
      phone: string
      department: string
      allocatedSubjects: string
    }[]
  }
  onBack: () => void
  onFinalize: () => void
}

export interface Step4Props {
  signupLink: string
}

export interface TitleSectionProps {
  title: string
  subheading?: string
  pill: string
}

export interface JWTPayload {
  userId: string
  exp: number
  iat: number
}
