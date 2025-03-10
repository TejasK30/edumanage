"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

export interface AttendanceData {
  month: string
  attendance: number
}

interface AttendanceChartProps {
  data: AttendanceData[]
}

export default function AttendanceChart({ data }: AttendanceChartProps) {
  return (
    <Card className="bg-card border-muted hover:shadow-lg my-2">
      <CardHeader>
        <CardTitle>Attendance Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  color: "hsl(var(--foreground))",
                }}
              />
              <Line
                type="monotone"
                dataKey="attendance"
                stroke="#7c3aed"
                strokeWidth={2}
                dot={{ fill: "#7c3aed" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
