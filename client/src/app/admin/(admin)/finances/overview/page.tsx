import PageHeader from "@/components/dashboard-components/page-header"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Award,
  Calendar,
  CreditCard,
  DollarSign,
  Download,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"

export default function FinancesPage() {
  // Finance modules
  const modules = [
    {
      title: "Fees",
      description: "Manage student fee structure",
      icon: DollarSign,
      href: "/admin/finances/fees",
      stats: "Updated for 2025",
    },
    {
      title: "Payments",
      description: "Track student payments",
      icon: CreditCard,
      href: "/admin/finances/payments",
      stats: "98% collection rate",
    },
    {
      title: "Scholarships",
      description: "Manage financial aid",
      icon: Award,
      href: "/admin/finances/scholarships",
      stats: "680 recipients",
    },
    {
      title: "Reports",
      description: "Financial reports and analysis",
      icon: TrendingUp,
      href: "/admin/finances/reports",
      stats: "Real-time analytics",
    },
  ]

  // Recent transactions
  const recentTransactions = [
    {
      id: "TXN-3842",
      type: "Tuition Payment",
      amount: "$9,500.00",
      student: "Sarah Johnson",
      date: "Mar 10, 2025",
      status: "Completed",
    },
    {
      id: "TXN-3841",
      type: "Scholarship Award",
      amount: "$3,000.00",
      student: "Michael Chen",
      date: "Mar 8, 2025",
      status: "Processed",
    },
    {
      id: "TXN-3840",
      type: "Dormitory Fee",
      amount: "$2,800.00",
      student: "David Lee",
      date: "Mar 7, 2025",
      status: "Completed",
    },
    {
      id: "TXN-3839",
      type: "Lab Fee Refund",
      amount: "$180.00",
      student: "Emily Wilson",
      date: "Mar 5, 2025",
      status: "Processed",
    },
  ]

  return (
    <div className="space-y-6">
      <PageHeader
        title="Finance Management"
        description="Manage university finances, fees, and payments"
        icon={DollarSign}
      >
        <div className="flex space-x-2">
          <Select defaultValue="2025">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2025">2025</SelectItem>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Calendar className="mr-2 h-4 w-4" /> Semester View
          </Button>
        </div>
      </PageHeader>

      {/* Summary Statistics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$32.4M</div>
            <p className="text-xs text-muted-foreground">+8% from last year</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Outstanding Fees
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1.2M</div>
            <p className="text-xs text-muted-foreground">2% of annual budget</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Scholarships Awarded
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$4.8M</div>
            <p className="text-xs text-muted-foreground">680 students</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Collection Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98%</div>
            <p className="text-xs text-muted-foreground">
              +2% from last semester
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Financial Modules */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {modules.map((module, index) => {
          const Icon = module.icon
          return (
            <Card key={index} className="flex flex-col">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Icon className="h-5 w-5 text-primary-blue-500" />
                  <CardTitle>{module.title}</CardTitle>
                </div>
                <CardDescription>{module.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground">{module.stats}</p>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href={module.href}>Manage {module.title}</Link>
                </Button>
              </CardFooter>
            </Card>
          )
        })}
      </div>

      {/* Recent Transactions */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Latest financial activities</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" /> Export
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0"
              >
                <div>
                  <p className="font-medium">{transaction.type}</p>
                  <p className="text-sm text-muted-foreground">
                    {transaction.student} • {transaction.id}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{transaction.amount}</p>
                  <div className="flex items-center justify-end space-x-2">
                    <p className="text-sm text-muted-foreground">
                      {transaction.date}
                    </p>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs ${
                        transaction.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {transaction.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button asChild variant="outline" className="w-full">
            <Link href="/admin/finances/payments">View All Transactions</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
