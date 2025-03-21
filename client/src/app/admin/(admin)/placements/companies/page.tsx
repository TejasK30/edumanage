import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Plus } from "lucide-react"

export default function CompaniesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Partner Companies</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Company
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Companies List</CardTitle>
            <Input className="max-w-xs" placeholder="Search companies..." />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company</TableHead>
                <TableHead>Industry</TableHead>
                <TableHead>Contact Person</TableHead>
                <TableHead>Jobs Posted</TableHead>
                <TableHead>Students Hired</TableHead>
                <TableHead>Partnership Since</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                {
                  company: "TechCorp",
                  industry: "Software",
                  contact: "John Smith",
                  jobsPosted: 12,
                  studentsHired: 45,
                  since: "2018",
                },
                {
                  company: "DataViz Inc.",
                  industry: "Data Analytics",
                  contact: "Emily Johnson",
                  jobsPosted: 8,
                  studentsHired: 27,
                  since: "2020",
                },
                {
                  company: "CreativeStudios",
                  industry: "Design",
                  contact: "Michael Chen",
                  jobsPosted: 15,
                  studentsHired: 32,
                  since: "2019",
                },
                {
                  company: "BrandGrowth",
                  industry: "Marketing",
                  contact: "Sarah Williams",
                  jobsPosted: 6,
                  studentsHired: 18,
                  since: "2021",
                },
              ].map((company, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">
                    {company.company}
                  </TableCell>
                  <TableCell>{company.industry}</TableCell>
                  <TableCell>{company.contact}</TableCell>
                  <TableCell>{company.jobsPosted}</TableCell>
                  <TableCell>{company.studentsHired}</TableCell>
                  <TableCell>{company.since}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
