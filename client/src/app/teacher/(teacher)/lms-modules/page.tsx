"use client"

import React, { useState, ChangeEvent } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { FileText, Folder, Plus, Search, BookOpen } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useTeacherClasses } from "@/hooks/useT"
import { useFetchTeacherData } from "@/hooks/useT"
import Link from "next/link"

interface Module {
  id: string
  title: string
  class: string
  type: string
  materials: number
  assignments: number
  lastUpdated: string
  published: boolean
}

interface Class {
  id: string
  name: string
  section: string
}

export default function LMSModulesPage() {
  const [selectedClass, setSelectedClass] = useState<string>("")
  const [searchTerm, setSearchTerm] = useState<string>("")

  const { data: classesData } = useTeacherClasses()
  const { data: modulesData } = useFetchTeacherData<Module[]>(
    ["teacherModules", selectedClass],
    selectedClass
      ? `/teacher/modules?classId=${selectedClass}`
      : "/teacher/modules",
    { enabled: !!selectedClass }
  )

  // Use mock data if nothing is fetched
  const modules: Module[] = modulesData || [
    {
      id: "m1",
      title: "Introduction to Algebra",
      class: "Mathematics - Grade 10",
      type: "unit",
      materials: 4,
      assignments: 2,
      lastUpdated: "2025-02-15T12:30:00Z",
      published: true,
    },
    {
      id: "m2",
      title: "Linear Equations",
      class: "Mathematics - Grade 10",
      type: "unit",
      materials: 3,
      assignments: 1,
      lastUpdated: "2025-02-10T10:15:00Z",
      published: true,
    },
    {
      id: "m3",
      title: "Quadratic Equations",
      class: "Mathematics - Grade 10",
      type: "unit",
      materials: 5,
      assignments: 2,
      lastUpdated: "2025-02-05T14:45:00Z",
      published: false,
    },
    {
      id: "m4",
      title: "Forces and Motion",
      class: "Physics - Grade 11",
      type: "unit",
      materials: 6,
      assignments: 3,
      lastUpdated: "2025-02-01T09:20:00Z",
      published: true,
    },
    {
      id: "m5",
      title: "Energy and Work",
      class: "Physics - Grade 11",
      type: "unit",
      materials: 4,
      assignments: 2,
      lastUpdated: "2025-01-28T11:10:00Z",
      published: false,
    },
  ]

  const classes: Class[] = (classesData as Class[]) || [
    { id: "c1", name: "Mathematics - Grade 10", section: "A" },
    { id: "c2", name: "Physics - Grade 11", section: "B" },
    { id: "c3", name: "Chemistry - Grade 10", section: "A" },
    { id: "c4", name: "Biology - Grade 11", section: "C" },
    { id: "c5", name: "Computer Science - Grade 12", section: "A" },
  ]

  const filteredModules = modules.filter((module) => {
    const matchesClass = selectedClass
      ? module.class.includes(selectedClass)
      : true
    const matchesSearch = searchTerm
      ? module.title.toLowerCase().includes(searchTerm.toLowerCase())
      : true
    return matchesClass && matchesSearch
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">LMS Modules</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Create Module
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create New Module</DialogTitle>
              <DialogDescription>
                Create a new learning module for your students.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="module-title"
                >
                  Module Title
                </label>
                <Input id="module-title" placeholder="Enter module title" />
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="class-select"
                >
                  Class
                </label>
                <Select>
                  <SelectTrigger id="class-select">
                    <SelectValue placeholder="Select a class" />
                  </SelectTrigger>
                  <SelectContent>
                    {classes.map((cls) => (
                      <SelectItem key={cls.id} value={cls.id}>
                        {cls.name} - {cls.section}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="module-description"
                >
                  Description
                </label>
                <textarea
                  id="module-description"
                  className="w-full min-h-[100px] p-2 border rounded-md"
                  placeholder="Enter module description"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Create Module</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search modules..."
            className="pl-8"
            value={searchTerm}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearchTerm(e.target.value)
            }
          />
        </div>
        <Select value={selectedClass} onValueChange={setSelectedClass}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="All Classes" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Classes</SelectItem>
            {classes.map((cls) => (
              <SelectItem key={cls.id} value={cls.name}>
                {cls.name} - {cls.section}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Modules</TabsTrigger>
          <TabsTrigger value="published">Published</TabsTrigger>
          <TabsTrigger value="draft">Draft</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredModules.map((module) => (
              <Card key={module.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="flex items-center text-xl">
                      <Folder className="h-5 w-5 mr-2 text-blue-500" />
                      {module.title}
                    </CardTitle>
                    <Badge variant={module.published ? "default" : "secondary"}>
                      {module.published ? "Published" : "Draft"}
                    </Badge>
                  </div>
                  <CardDescription className="mt-2">
                    {module.class}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-1" />
                      <span>{module.materials} materials</span>
                    </div>
                    <div className="flex items-center">
                      <BookOpen className="h-4 w-4 mr-1" />
                      <span>{module.assignments} assignments</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-3">
                  <Button variant="outline" size="sm" asChild>
                    <Link
                      href={`/teacher/lms-modules/materials?moduleId=${module.id}`}
                    >
                      View Materials
                    </Link>
                  </Button>
                  <Button size="sm">Edit Module</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="published" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredModules
              .filter((m) => m.published)
              .map((module) => (
                <Card key={module.id} className="overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <CardTitle className="flex items-center text-xl">
                        <Folder className="h-5 w-5 mr-2 text-blue-500" />
                        {module.title}
                      </CardTitle>
                      <Badge>Published</Badge>
                    </div>
                    <CardDescription className="mt-2">
                      {module.class}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-1" />
                        <span>{module.materials} materials</span>
                      </div>
                      <div className="flex items-center">
                        <BookOpen className="h-4 w-4 mr-1" />
                        <span>{module.assignments} assignments</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t pt-3">
                    <Button variant="outline" size="sm" asChild>
                      <Link
                        href={`/teacher/lms-modules/materials?moduleId=${module.id}`}
                      >
                        View Materials
                      </Link>
                    </Button>
                    <Button size="sm">Edit Module</Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="draft" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredModules
              .filter((m) => !m.published)
              .map((module) => (
                <Card key={module.id} className="overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <CardTitle className="flex items-center text-xl">
                        <Folder className="h-5 w-5 mr-2 text-blue-500" />
                        {module.title}
                      </CardTitle>
                      <Badge variant="secondary">Draft</Badge>
                    </div>
                    <CardDescription className="mt-2">
                      {module.class}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-1" />
                        <span>{module.materials} materials</span>
                      </div>
                      <div className="flex items-center">
                        <BookOpen className="h-4 w-4 mr-1" />
                        <span>{module.assignments} assignments</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t pt-3">
                    <Button variant="outline" size="sm" asChild>
                      <Link
                        href={`/teacher/lms-modules/materials?moduleId=${module.id}`}
                      >
                        View Materials
                      </Link>
                    </Button>
                    <Button size="sm">Edit Module</Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
