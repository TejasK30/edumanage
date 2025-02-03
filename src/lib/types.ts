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
