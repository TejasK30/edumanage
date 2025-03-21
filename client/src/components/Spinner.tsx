import * as React from "react"

interface SpinnerProps extends React.SVGProps<SVGSVGElement> {}

export default function Spinner({ className = "", ...props }: SpinnerProps) {
  return (
    <svg
      className={`animate-spin h-6 w-6 text-current ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  )
}
