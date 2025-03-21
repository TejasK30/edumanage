import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { JSX } from "react"

interface Deadline {
  title: string
  detail: string
  icon: JSX.Element
  bg: string
}

interface UpcomingDeadlinesProps {
  upcomingDeadlines: Deadline[]
}

const UpcomingDeadlines: React.FC<UpcomingDeadlinesProps> = ({
  upcomingDeadlines,
}) => {
  return (
    <div className="mt-6">
      <Card className="bg-card border-muted transition hover:shadow-lg">
        <CardHeader>
          <CardTitle>Upcoming Deadlines</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingDeadlines.map(({ title, detail, icon, bg }, index) => (
              <div
                key={index}
                className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 cursor-pointer bg-muted hover:bg-opacity-90 hover:shadow-md dark:hover:bg-muted/30`}
              >
                <div className={`p-2 ${bg} rounded-full`}>{icon}</div>
                <div>
                  <p className="text-sm sm:text-base font-medium">{title}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default UpcomingDeadlines
