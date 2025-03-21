"use client"

import { ChangeEvent, FC, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import {
  ArrowLeft,
  ExternalLink,
  FileText,
  MoreVertical,
  Plus,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { useFetchTeacherData } from "@/hooks/useT"

interface ModuleData {
  id: string
  title: string
  class: string
  description: string
  published: boolean
}

type MaterialType = "document" | "link"

interface Material {
  id: string
  title: string
  type: MaterialType
  // For PDF content, format is "pdf". For links, we can use the URL as a string.
  format: string
  size?: string
  uploadedOn: string
  views: number
}

const MaterialsPage: FC = () => {
  const searchParams = useSearchParams()
  const moduleId = searchParams.get("moduleId")
  const [searchTerm, setSearchTerm] = useState<string>("")

  const { data: moduleData } = useFetchTeacherData<ModuleData>(
    ["teacherModule", moduleId],
    moduleId ? `/teacher/modules/${moduleId}` : "",
    { enabled: !!moduleId }
  )

  const { data: materialsData } = useFetchTeacherData<Material[]>(
    ["teacherMaterials", moduleId],
    moduleId ? `/teacher/modules/${moduleId}/materials` : "",
    { enabled: !!moduleId }
  )

  // Use mock data if nothing is fetched
  const module: ModuleData = moduleData || {
    id: "m1",
    title: "LMS",
    class: "Mathematics - Grade 10",
    description: "This module is for PDF documents and external links only.",
    published: true,
  }

  const materials: Material[] = materialsData || [
    {
      id: "mat1",
      title: "Algebraic Expressions Explained",
      type: "document",
      format: "pdf",
      size: "1.2 MB",
      uploadedOn: "2025-02-15T10:30:00Z",
      views: 42,
    },
    {
      id: "mat2",
      title: "More Algebra Resources",
      type: "link",
      format: "https://example.com/algebra-resources",
      uploadedOn: "2025-02-14T14:20:00Z",
      views: 38,
    },
  ]

  const getFileIcon = (type: MaterialType) => {
    if (type === "document") {
      return <FileText className="h-8 w-8 text-blue-500" />
    }
    if (type === "link") {
      return <ExternalLink className="h-8 w-8 text-blue-500" />
    }
    return <FileText className="h-8 w-8 text-gray-500" />
  }

  const filteredMaterials = materials.filter((material) =>
    searchTerm
      ? material.title.toLowerCase().includes(searchTerm.toLowerCase())
      : true
  )

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) =>
    setSearchTerm(e.target.value)

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button variant="ghost" size="sm" asChild className="mr-2">
          <Link href="/teacher/lms-modules">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Modules
          </Link>
        </Button>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{module.title}</h1>
          <p className="text-muted-foreground mt-1">{module.class}</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Material
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Material</DialogTitle>
              <DialogDescription>
                Post a new PDF document or external link for this module.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="material-title"
                >
                  Title
                </label>
                <Input id="material-title" placeholder="Enter material title" />
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="material-type"
                >
                  Material Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    className="flex flex-col h-24 justify-center"
                  >
                    {getFileIcon("document")}
                    <span className="mt-1">Upload PDF</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="flex flex-col h-24 justify-center"
                  >
                    {getFileIcon("link")}
                    <span className="mt-1">External Link</span>
                  </Button>
                </div>
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="material-description"
                >
                  Description
                </label>
                <textarea
                  id="material-description"
                  className="w-full min-h-[100px] p-2 border rounded-md"
                  placeholder="Enter material description"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Add Material</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Input
            placeholder="Search materials..."
            className="pl-8"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Materials ({materials.length})</CardTitle>
          <CardDescription>
            PDF documents and external links for this module
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {filteredMaterials.map((material) => (
              <div
                key={material.id}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center">
                  {getFileIcon(material.type)}
                  <div className="ml-4">
                    <h3 className="text-base font-medium">{material.title}</h3>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <Badge variant="outline" className="mr-2">
                        {material.type === "document" ? "PDF" : "Link"}
                      </Badge>
                      {material.size && (
                        <>
                          <span className="mr-2">
                            {material.format.toUpperCase()}
                          </span>
                          <span className="mr-2">•</span>
                          <span>{material.size}</span>
                        </>
                      )}
                      {!material.size && (
                        <span className="mr-2">{material.format}</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="text-sm text-muted-foreground">
                    {new Date(material.uploadedOn).toLocaleDateString()} •{" "}
                    {material.views} views
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View</DropdownMenuItem>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}

            {filteredMaterials.length === 0 && (
              <div className="text-center py-6">
                <p className="text-muted-foreground">
                  No materials found matching your search.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default MaterialsPage
