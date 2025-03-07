import Footer from "@/components/Footer"
import TitleSection from "@/components/landing-page/titile-section"
import Navbar from "@/components/Navbar"
import { Button } from "@/components/ui/button"

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-background relative">
      {/* Background Overlays */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-48 left-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
      </div>

      <Navbar />

      <main className="pt-16 relative">
        <section className="px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-7xl mx-auto">
            <TitleSection
              pill="Contact Us"
              title="Get in Touch"
              subheading="We'd love to hear from you. Reach out with any inquiries or feedback."
            />
            <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-semibold mb-2 text-gray-700 dark:text-gray-300">
                    Our Office
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    123 Education Lane,
                    <br />
                    City, Country
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-2 text-gray-700 dark:text-gray-300">
                    Email
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    info@edumanage.com
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-2 text-gray-700 dark:text-gray-300">
                    Phone
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    +1 (555) 123-4567
                  </p>
                </div>
              </div>
              {/* Contact Form */}
              <div className="bg-white dark:bg-gray-800 backdrop-blur-lg rounded-2xl border border-primary/10 p-6 hover:border-primary/30 transition-all duration-300 shadow-lg">
                <form>
                  <div className="mb-4">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="mt-1 block w-full rounded-md border border-input bg-transparent px-3 py-2 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Your Name"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="mt-1 block w-full rounded-md border border-input bg-transparent px-3 py-2 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="you@example.com"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className="mt-1 block w-full rounded-md border border-input bg-transparent px-3 py-2 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Your message..."
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90"
                  >
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default ContactPage
