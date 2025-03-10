import { StatCardProps } from "@/types"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, change }) => (
  <Card className="w-full bg-washed-purple-50 border-washed-purple-200 shadow-lg hover:shadow-xl transition-shadow dark:bg-card dark:border-muted">
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium text-Neutrals/neutrals-10 dark:text-foreground">
        {title}
      </CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold text-Neutrals/neutrals-13 dark:text-white">
        {value}
      </div>
      <p className="text-xs text-green-900 dark:text-green-400">{change}</p>
    </CardContent>
  </Card>
)

export default StatCard
