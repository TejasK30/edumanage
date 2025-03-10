import React, { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"

const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme()

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="flex items-center justify-center p-2 rounded bg-gray-200 dark:bg-gray-800"
      aria-label="Toggle Dark Mode"
    >
      {theme === "dark" ? (
        <Sun className="w-5 h-5 text-yellow-500" />
      ) : (
        <Moon className="w-5 h-5 text-gray-800" />
      )}
    </button>
  )
}

export default ThemeToggle
