import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs"
import { DownloadIcon } from "lucide-react"

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Financial Reports</h1>
        <Button variant="outline">
          <DownloadIcon className="mr-2 h-4 w-4" />
          Export Reports
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,284,500</div>
            <p className="text-xs text-muted-foreground">
              +12.5% from last year
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Outstanding Payments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$125,840</div>
            <p className="text-xs text-muted-foreground">
              9.8% of total revenue
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Scholarships Awarded
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$342,750</div>
            <p className="text-xs text-muted-foreground">
              187 students benefited
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="monthly">
        <TabsList>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
          <TabsTrigger value="quarterly">Quarterly</TabsTrigger>
          <TabsTrigger value="annual">Annual</TabsTrigger>
        </TabsList>
        <TabsContent value="monthly" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Revenue Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Month</TableHead>
                    <TableHead>Tuition</TableHead>
                    <TableHead>Fees</TableHead>
                    <TableHead>Accommodation</TableHead>
                    <TableHead>Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    {
                      month: "January",
                      tuition: "$98,450",
                      fees: "$12,350",
                      accommodation: "$34,200",
                      total: "$145,000",
                    },
                    {
                      month: "February",
                      tuition: "$102,300",
                      fees: "$14,500",
                      accommodation: "$33,900",
                      total: "$150,700",
                    },
                    {
                      month: "March",
                      tuition: "$95,780",
                      fees: "$11,890",
                      accommodation: "$32,450",
                      total: "$140,120",
                    },
                  ].map((row, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{row.month}</TableCell>
                      <TableCell>{row.tuition}</TableCell>
                      <TableCell>{row.fees}</TableCell>
                      <TableCell>{row.accommodation}</TableCell>
                      <TableCell className="font-bold">{row.total}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="quarterly" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Quarterly Revenue Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Quarter</TableHead>
                    <TableHead>Tuition</TableHead>
                    <TableHead>Fees</TableHead>
                    <TableHead>Accommodation</TableHead>
                    <TableHead>Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    {
                      quarter: "Q1 2025",
                      tuition: "$296,530",
                      fees: "$38,740",
                      accommodation: "$100,550",
                      total: "$435,820",
                    },
                    {
                      quarter: "Q2 2025",
                      tuition: "$310,450",
                      fees: "$41,280",
                      accommodation: "$94,350",
                      total: "$446,080",
                    },
                  ].map((row, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">
                        {row.quarter}
                      </TableCell>
                      <TableCell>{row.tuition}</TableCell>
                      <TableCell>{row.fees}</TableCell>
                      <TableCell>{row.accommodation}</TableCell>
                      <TableCell className="font-bold">{row.total}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="annual" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Annual Revenue Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Year</TableHead>
                    <TableHead>Tuition</TableHead>
                    <TableHead>Fees</TableHead>
                    <TableHead>Accommodation</TableHead>
                    <TableHead>Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    {
                      year: "2024",
                      tuition: "$876,300",
                      fees: "$154,200",
                      accommodation: "$378,500",
                      total: "$1,409,000",
                    },
                    {
                      year: "2025 (YTD)",
                      tuition: "$606,980",
                      fees: "$80,020",
                      accommodation: "$194,900",
                      total: "$881,900",
                    },
                  ].map((row, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{row.year}</TableCell>
                      <TableCell>{row.tuition}</TableCell>
                      <TableCell>{row.fees}</TableCell>
                      <TableCell>{row.accommodation}</TableCell>
                      <TableCell className="font-bold">{row.total}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
