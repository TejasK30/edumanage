import { PageHeader } from "@/components/dashboard-components/page-header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check, Download, FileText, Filter, Search } from "lucide-react"

export default function ResultsPage() {
  // Sample data
  const results = [
    {
      id: "CS301",
      title: "Data Structures",
      semester: "Fall 2023",
      published: true,
      students: 86,
      average: "B+",
    },
    {
      id: "MATH202",
      title: "Calculus II",
      semester: "Fall 2023",
      published: true,
      students: 124,
      average: "B",
    },
    {
      id: "PHY101",
      title: "Physics I",
      semester: "Fall 2023",
      published: false,
      students: 96,
      average: "B-",
    },
    {
      id: "ENG205",
      title: "Technical Writing",
      semester: "Fall 2023",
      published: true,
      students: 45,
      average: "A-",
    },
    {
      id: "BUS301",
      title: "Business Ethics",
      semester: "Fall 2023",
      published: false,
      students: 72,
      average: "B",
    },
  ]

  return (
    <div className="space-y-6">
      <PageHeader
        title="Results"
        description="Manage and publish exam results and grades"
        icon={FileText}
      >
        <div className="flex space-x-2">
          <Button>
            <Check className="mr-2 h-4 w-4" />
            Publish Selected
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </PageHeader>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
            <div className="flex w-full items-center space-x-2 md:w-2/3">
              <Input
                placeholder="Search by course code or title..."
                className="w-full"
                prefix={<Search className="h-4 w-4" />}
              />
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <Select defaultValue="fall-2023">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Semester" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fall-2023">Fall 2023</SelectItem>
                  <SelectItem value="spring-2023">Spring 2023</SelectItem>
                  <SelectItem value="fall-2022">Fall 2022</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Courses</TabsTrigger>
          <TabsTrigger value="published">Published</TabsTrigger>
          <TabsTrigger value="unpublished">Unpublished</TabsTrigger>
        </TabsList>

        <Card>
          <CardContent className="pt-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">
                    <input type="checkbox" className="h-4 w-4" />
                  </TableHead>
                  <TableHead>Course Code</TableHead>
                  <TableHead>Course Title</TableHead>
                  <TableHead>Students</TableHead>
                  <TableHead>Average Grade</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {results.map((result) => (
                  <TableRow key={result.id}>
                    <TableCell>
                      <input type="checkbox" className="h-4 w-4" />
                    </TableCell>
                    <TableCell className="font-medium">{result.id}</TableCell>
                    <TableCell>{result.title}</TableCell>
                    <TableCell>{result.students}</TableCell>
                    <TableCell>{result.average}</TableCell>
                    <TableCell>
                      {result.published ? (
                        <Badge className="bg-green-500">Published</Badge>
                      ) : (
                        <Badge variant="outline">Draft</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        {!result.published && (
                          <Button variant="default" size="sm">
                            Publish
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </Tabs>
    </div>
  )
}
