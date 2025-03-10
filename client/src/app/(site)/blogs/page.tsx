import Footer from "@/components/Footer"
import TitleSection from "@/components/landing-page/titile-section"
import Navbar from "@/components/Navbar"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const dummyBlogs = [
  {
    id: 1,
    title: "The Future of Education: Embracing AI",
    excerpt:
      "Discover how AI is reshaping the educational landscape and what it means for institutions worldwide.",
    date: "2025-03-01",
    href: "/blogs/the-future-of-education",
  },
  {
    id: 2,
    title: "Streamlining Administration with Smart Tools",
    excerpt:
      "Learn how modern tools can optimize administrative tasks and improve efficiency.",
    date: "2025-02-25",
    href: "/blogs/streamlining-administration",
  },
  {
    id: 3,
    title: "Enhancing Student Engagement in Digital Classrooms",
    excerpt:
      "Explore strategies to keep students engaged in remote and hybrid learning environments.",
    date: "2025-02-20",
    href: "/blogs/enhancing-student-engagement",
  },
]

const BlogsPage = () => {
  return (
    <div className="min-h-screen bg-background relative">
      {/* Background Overlays */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-48 left-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
      </div>

      <Navbar />

      <main className="pt-20 relative">
        <section className="px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-7xl mx-auto">
            <TitleSection
              pill="Blogs"
              title="Insights & Stories"
              subheading="Stay updated with the latest trends and news in education."
            />
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {dummyBlogs.map((blog) => (
                <div
                  key={blog.id}
                  className="bg-white dark:bg-gray-800 backdrop-blur-lg rounded-2xl border border-primary/10 p-6 hover:border-primary/30 transition-all duration-300 shadow-lg"
                >
                  <h2 className="text-2xl font-semibold mb-2 text-gray-700 dark:text-gray-300">
                    {blog.title}
                  </h2>
                  <p className="text-sm mb-4 text-gray-700 dark:text-gray-300">
                    {blog.excerpt}
                  </p>
                  <div className="text-sm mb-4 text-gray-700 dark:text-gray-300">
                    {blog.date}
                  </div>
                  <Link href={blog.href}>
                    <Button className="bg-primary hover:bg-primary/90">
                      Read More
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default BlogsPage
