import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Calendar } from "@/components/ui/calendar"
import { Plus } from "lucide-react"

export default function EventsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Academic Events</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Event
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Upcoming Events</CardTitle>
                <Input className="max-w-xs" placeholder="Search events..." />
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Event</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Organizer</TableHead>
                    <TableHead>Type</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    {
                      event: "Career Fair",
                      date: "Mar 25, 2025",
                      time: "10:00 AM - 4:00 PM",
                      location: "Student Center",
                      organizer: "Career Services",
                      type: "Career",
                    },
                    {
                      event: "Guest Lecture: AI Trends",
                      date: "Mar 30, 2025",
                      time: "2:00 PM - 4:00 PM",
                      location: "Tech Auditorium",
                      organizer: "CS Department",
                      type: "Academic",
                    },
                    {
                      event: "Spring Festival",
                      date: "Apr 5, 2025",
                      time: "12:00 PM - 8:00 PM",
                      location: "Campus Quad",
                      organizer: "Student Council",
                      type: "Social",
                    },
                    {
                      event: "Research Symposium",
                      date: "Apr 12, 2025",
                      time: "9:00 AM - 5:00 PM",
                      location: "Research Center",
                      organizer: "Graduate School",
                      type: "Academic",
                    },
                    {
                      event: "Alumni Networking",
                      date: "Apr 18, 2025",
                      time: "6:00 PM - 9:00 PM",
                      location: "Alumni Hall",
                      organizer: "Alumni Relations",
                      type: "Career",
                    },
                  ].map((event, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">
                        {event.event}
                      </TableCell>
                      <TableCell>{event.date}</TableCell>
                      <TableCell>{event.time}</TableCell>
                      <TableCell>{event.location}</TableCell>
                      <TableCell>{event.organizer}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            event.type === "Academic"
                              ? "default"
                              : event.type === "Career"
                              ? "secondary"
                              : "outline"
                          }
                        >
                          {event.type}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Event Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar mode="single" className="rounded-md border" />
              <div className="mt-4 space-y-2">
                <h3 className="font-medium">Upcoming Events</h3>
                <div className="text-sm space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary-blue-500"></div>
                    <span>Mar 25: Career Fair</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary-blue-500"></div>
                    <span>Mar 30: Guest Lecture</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary-blue-500"></div>
                    <span>Apr 5: Spring Festival</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
