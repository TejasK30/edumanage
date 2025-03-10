"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Activity {
  title: string
  detail: string
  icon: React.ReactNode
  bg: string
}

interface RecentActivitiesProps {
  activities: Activity[]
}

export default function RecentActivities({
  activities,
}: RecentActivitiesProps) {
  return (
    <Card className="bg-card border-muted hover:shadow-lg">
      <CardHeader>
        <CardTitle>Recent Activities</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-3 rounded-lg duration-300 cursor-pointer bg-muted hover:bg-opacity-90 hover:shadow-md dark:hover:bg-muted/30"
            >
              <div className={`p-2 ${activity.bg} rounded-full`}>
                {activity.icon}
              </div>
              <div>
                <p className="text-sm font-medium">{activity.title}</p>
                <p className="text-xs text-muted-foreground">
                  {activity.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
