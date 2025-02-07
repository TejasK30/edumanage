"use client"

import { ProgressBarProps } from "@/lib/types"
import React from "react"

export default function ProgressBar({ steps, currentStep }: ProgressBarProps) {
  return (
    <div className="max-w-4xl mx-auto mb-6">
      <div className="flex justify-between items-center">
        {steps.map((s) => (
          <div key={s.number} className="flex-1 px-1">
            <div
              className={`h-2 rounded-full ${
                s.number <= currentStep
                  ? "bg-primary-blue-500"
                  : "bg-gray-300 dark:bg-gray-700"
              }`}
            ></div>
            <p className="text-center text-xs mt-1 text-gray-700 dark:text-gray-300">
              {s.number}. {s.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
