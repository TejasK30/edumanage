"use client"
import StatCard from "@/components/stat-card"

interface StatItem {
  title: string
  value: string
  icon: React.ReactNode
  change: string
}

interface StatsGridProps {
  stats: StatItem[]
}

export default function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  )
}
