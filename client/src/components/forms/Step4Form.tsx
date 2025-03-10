"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Step4Props } from "@/types"

export default function Step4Success({ signupLink }: Step4Props) {
  return (
    <div className="text-center space-y-4">
      <h2 className="text-2xl font-bold text-primary">Success!</h2>
      <p className="text-lg text-secondary">Your onboarding is complete.</p>
      <p className="text-sm text-gray-700 dark:text-gray-300">
        The unique signup link for students is:
      </p>
      <div className="bg-primary-light p-4 rounded font-mono break-all">
        {signupLink}
      </div>
      <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
        When a student visits this link, the college’s unique ID will be
        auto-filled.
      </p>
      <Button
        onClick={() => (window.location.href = "/admin/dashboard")}
        className="bg-primary hover:bg-primary-dark"
      >
        Go to Dashboard
      </Button>
    </div>
  )
}
