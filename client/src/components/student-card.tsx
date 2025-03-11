import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CheckCircle2, XCircle } from "lucide-react"
import Link from "next/link"

type StudentCardProps = {
  student: {
    id: string
    name: string
    rollNumber: string
    class: string
    section: string
    attendancePercentage: number
    imageUrl?: string
    hasPendingFees: boolean
  }
}

const StudentCard = ({ student }: StudentCardProps) => {
  const getAttendanceColor = (percentage: number) => {
    if (percentage >= 90) return "bg-green-500"
    if (percentage >= 75) return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <Link href={`/students/${student.id}`}>
      <Card className="hover:shadow-md transition-shadow cursor-pointer">
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={student.imageUrl} alt={student.name} />
              <AvatarFallback className="bg-primary/10">
                {student.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                {student.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Roll: {student.rollNumber}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Class: {student.class} {student.section}
              </p>
            </div>

            <div className="flex flex-col items-end">
              <Badge
                className={`${getAttendanceColor(
                  student.attendancePercentage
                )} text-white`}
              >
                {student.attendancePercentage}% Att
              </Badge>

              <div className="mt-1 flex items-center text-xs">
                {student.hasPendingFees ? (
                  <div className="flex items-center text-red-500">
                    <XCircle className="h-3 w-3 mr-1" />
                    <span>Fees Due</span>
                  </div>
                ) : (
                  <div className="flex items-center text-green-500">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    <span>Fees Clear</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

export default StudentCard
