"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Event {
  title: string
  detail: string
  icon: React.ReactNode
  bg: string
}

interface UpcomingEventsProps {
  events: Event[]
}

export default function UpcomingEvents({ events }: UpcomingEventsProps) {
  return (
    <Card className="bg-card border-muted hover:shadow-lg">
      <CardHeader>
        <CardTitle>Upcoming Events</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.map((event, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-3 rounded-lg duration-300 cursor-pointer bg-muted hover:bg-opacity-90 hover:shadow-md dark:hover:bg-muted/30"
            >
              <div className={`p-2 ${event.bg} rounded-full`}>{event.icon}</div>
              <div>
                <p className="text-sm font-medium">{event.title}</p>
                <p className="text-xs text-muted-foreground">{event.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
