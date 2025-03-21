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
import { Plus } from "lucide-react"

export default function JobsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Job Listings</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Job
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Available Jobs</CardTitle>
            <Input className="max-w-xs" placeholder="Search jobs..." />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Position</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Salary</TableHead>
                <TableHead>Applications</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                {
                  position: "Software Engineer",
                  company: "TechCorp",
                  location: "New York, NY",
                  salary: "$85,000 - $105,000",
                  applications: 28,
                  status: "Open",
                },
                {
                  position: "Data Analyst",
                  company: "DataViz Inc.",
                  location: "Remote",
                  salary: "$70,000 - $90,000",
                  applications: 15,
                  status: "Open",
                },
                {
                  position: "UX Designer",
                  company: "CreativeStudios",
                  location: "San Francisco, CA",
                  salary: "$95,000 - $120,000",
                  applications: 23,
                  status: "Open",
                },
                {
                  position: "Marketing Specialist",
                  company: "BrandGrowth",
                  location: "Chicago, IL",
                  salary: "$65,000 - $85,000",
                  applications: 19,
                  status: "Closed",
                },
              ].map((job, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">{job.position}</TableCell>
                  <TableCell>{job.company}</TableCell>
                  <TableCell>{job.location}</TableCell>
                  <TableCell>{job.salary}</TableCell>
                  <TableCell>{job.applications}</TableCell>
                  <TableCell>
                    <Badge
                      variant={job.status === "Open" ? "default" : "secondary"}
                    >
                      {job.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
