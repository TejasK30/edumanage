import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Activity, Settings, Shield, Users } from "lucide-react"
import Link from "next/link"

export default function SystemPage() {
  const stats = [
    {
      title: "Users",
      value: "1,247",
      icon: Users,
      link: "/admin/system/users",
    },
    { title: "Roles", value: "8", icon: Shield, link: "/admin/system/roles" },
    {
      title: "Permissions",
      value: "42",
      icon: Shield,
      link: "/admin/system/permissions",
    },
    {
      title: "Settings",
      value: "System",
      icon: Settings,
      link: "/admin/system/settings",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-Neutrals/neutrals-8">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-primary-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary-purple-700">
                {stat.value}
              </div>
              <Link href={stat.link}>
                <Button
                  variant="ghost"
                  className="px-0 text-sm text-primary-purple-500 hover:text-primary-purple-700"
                >
                  Manage
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-primary-blue-800">
            System Activity
          </CardTitle>
        </CardHeader>
        <CardContent className="h-64 flex items-center justify-center">
          <div className="flex flex-col items-center text-center">
            <Activity className="h-16 w-16 text-washed-purple-500 mb-2" />
            <p className="text-muted-foreground">
              System activity logs displayed here
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
