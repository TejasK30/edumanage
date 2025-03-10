"use client"

import { ProgressBarProps } from "@/types"
import React from "react"

export default function ProgressBar({ steps, currentStep }: ProgressBarProps) {
  return (
    <div className="max-w-4xl mx-auto mb-6 px-4">
      <div className="relative">
        <div className="flex justify-between items-center mb-2">
          {steps.map((s) => (
            <div key={s.number} className="flex-1 relative">
              <div
                className={`h-2 rounded-full ${
                  s.number <= currentStep
                    ? "bg-primary-blue-500"
                    : "bg-gray-300 dark:bg-gray-700"
                }`}
              ></div>

              <div
                className={`absolute -top-2 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                  s.number <= currentStep
                    ? "bg-primary-blue-500 text-white"
                    : "bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                }`}
              >
                {s.number}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-start mt-4">
          {steps.map((s) => (
            <div key={s.number} className="flex-1 px-1">
              <p className="text-center text-xs break-words min-w-0 text-gray-700 dark:text-gray-300">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
