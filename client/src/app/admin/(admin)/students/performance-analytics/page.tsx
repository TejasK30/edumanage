import {
  BarChart,
  Search,
  Download,
  Filter,
  LineChart,
  PieChart,
} from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import PageHeader from "@/components/dashboard-components/page-header"

export default function StudentPerformanceAnalyticsPage() {
  // Sample data
  const performanceMetrics = [
    { title: "Average GPA", value: "3.42", change: "+0.08" },
    { title: "Students on Dean's List", value: "524", change: "+32" },
    { title: "Students on Probation", value: "87", change: "-12" },
    { title: "Students At Risk", value: "156", change: "-8" },
  ]

  return (
    <div className="space-y-6">
      <PageHeader
        title="Performance Analytics"
        description="Track and analyze student academic performance"
        icon={BarChart}
      >
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </PageHeader>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {performanceMetrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                {metric.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-muted-foreground">
                {metric.change.startsWith("+") ? "↑" : "↓"}{" "}
                {metric.change.replace("+", "").replace("-", "")}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
            <div className="flex w-full items-center space-x-2 md:w-2/3">
              <Input
                placeholder="Search by department, course, or program..."
                className="w-full"
                prefix={<Search className="h-4 w-4" />}
              />
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <Select defaultValue="current">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="current">Current Semester</SelectItem>
                  <SelectItem value="previous">Previous Semester</SelectItem>
                  <SelectItem value="year">Academic Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Analysis Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="department">By Department</TabsTrigger>
          <TabsTrigger value="year">By Year</TabsTrigger>
          <TabsTrigger value="course">By Course</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>GPA Distribution</CardTitle>
                <CardDescription>
                  Distribution of student GPAs across all programs
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <div className="flex h-full items-center justify-center text-muted-foreground">
                  <BarChart className="h-16 w-16" />
                  <span className="ml-2">GPA Distribution Chart</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Trends</CardTitle>
                <CardDescription>
                  GPA trends over the last 3 years
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <div className="flex h-full items-center justify-center text-muted-foreground">
                  <LineChart className="h-16 w-16" />
                  <span className="ml-2">Performance Trend Chart</span>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Academic Standing</CardTitle>
                <CardDescription>
                  Student distribution by academic standing
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <div className="flex h-full items-center justify-center text-muted-foreground">
                  <PieChart className="h-16 w-16" />
                  <span className="ml-2">Academic Standing Chart</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Other tab contents would follow a similar pattern */}
      </Tabs>
    </div>
  )
}
