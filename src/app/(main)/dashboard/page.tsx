"use client"

import React from "react"
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
import {
  Users,
  GraduationCap,
  BookOpen,
  Calendar,
  Library,
  Bell,
  Clock,
  TrendingUp,
} from "lucide-react"

const attendanceData = [
  { month: "Jan", attendance: 92 },
  { month: "Feb", attendance: 88 },
  { month: "Mar", attendance: 95 },
  { month: "Apr", attendance: 90 },
  { month: "May", attendance: 87 },
  { month: "Jun", attendance: 89 },
]

export default function DashboardPage() {
  return (
    <>
      <div className="flex flex-col gap-6 p-6 bg-background min-h-screen">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-Neutrals/neutrals-13">
            College Dashboard
          </h1>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary-purple-500 text-white rounded-lg hover:bg-primary-purple-600 transition-colors">
            <Bell size={18} />
            <span>Notifications</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-washed-purple-50 border-washed-purple-200 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-Neutrals/neutrals-10">
                Total Students
              </CardTitle>
              <Users className="h-4 w-4 text-primary-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-Neutrals/neutrals-13">
                2,845
              </div>
              <p className="text-xs text-green-900">+12% from last semester</p>
            </CardContent>
          </Card>

          <Card className="bg-washed-blue-50 border-washed-blue-200 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-Neutrals/neutrals-10">
                Faculty Members
              </CardTitle>
              <GraduationCap className="h-4 w-4 text-primary-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-Neutrals/neutrals-13">
                127
              </div>
              <p className="text-xs text-green-900">+3 new this month</p>
            </CardContent>
          </Card>

          <Card className="bg-primary-purple-50 border-primary-purple-200 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-Neutrals/neutrals-10">
                Active Courses
              </CardTitle>
              <BookOpen className="h-4 w-4 text-primary-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-Neutrals/neutrals-13">
                89
              </div>
              <p className="text-xs text-green-900">Current semester</p>
            </CardContent>
          </Card>

          <Card className="bg-primary-blue-50 border-primary-blue-200 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-Neutrals/neutrals-10">
                Attendance Rate
              </CardTitle>
              <Clock className="h-4 w-4 text-primary-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-Neutrals/neutrals-13">
                92%
              </div>
              <p className="text-xs text-green-900">Last 30 days</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg text-Neutrals/neutrals-7">
                Attendance Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={attendanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f1" />
                    <XAxis dataKey="month" stroke="#8d8c95" />
                    <YAxis stroke="#8d8c95" />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="attendance"
                      stroke="#7000ff"
                      strokeWidth={2}
                      dot={{ fill: "#7000ff" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg text-Neutrals/neutrals-7">
                Recent Activities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3 bg-Neutrals/neutrals-2 rounded-lg hover:bg-Neutrals/neutrals-3 transition-colors">
                  <div className="p-2 bg-primary-purple-100 rounded-full">
                    <Calendar className="h-4 w-4 text-primary-purple-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-Neutrals/neutrals-13">
                      Mid-term Examinations
                    </p>
                    <p className="text-xs text-Neutrals/neutrals-7">
                      Starting next week
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3 bg-Neutrals/neutrals-2 rounded-lg hover:bg-Neutrals/neutrals-3 transition-colors">
                  <div className="p-2 bg-primary-blue-100 rounded-full">
                    <Library className="h-4 w-4 text-primary-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-Neutrals/neutrals-13">
                      Library Updates
                    </p>
                    <p className="text-xs text-Neutrals/neutrals-7">
                      25 new books added
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3 bg-Neutrals/neutrals-2 rounded-lg hover:bg-Neutrals/neutrals-3 transition-colors">
                  <div className="p-2 bg-washed-purple-100 rounded-full">
                    <TrendingUp className="h-4 w-4 text-washed-purple-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-Neutrals/neutrals-13">
                      Performance Report
                    </p>
                    <p className="text-xs text-Neutrals/neutrals-7">
                      Monthly report generated
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
