"use client"
import { Button } from "@/components/ui/button"
import { Bell } from "lucide-react"

interface DashboardHeaderProps {
  title: string
}

export default function DashboardHeader({ title }: DashboardHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-8 gap-4">
      <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
      <Button
        variant="secondary"
        className="flex items-center gap-2 hover:bg-opacity-90 hover:shadow-md dark:hover:bg-muted/50"
      >
        <Bell size={18} />
      </Button>
    </div>
  )
}
