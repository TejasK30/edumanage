"use client"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import TitleSection from "@/components/landing-page/titile-section"
import { Menu, ArrowRight, Star, Monitor, Users, BarChart } from "lucide-react"
import {
  FEATURES,
  TESTIMONIALS,
  NAVIGATION,
  FOOTER_LINKS,
} from "@/lib/constants"

const HomePage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      <div className="min-h-screen">
        <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md z-50">
          <div className="absolute bottom-0 h-[1px] w-full bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex-shrink-0 flex items-center">
                <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center mr-2">
                  <span className="text-lg font-bold text-white">E</span>
                </div>
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50">
                  EduManage
                </span>
              </div>

              <div className="hidden md:flex items-center space-x-8">
                {NAVIGATION.map((item) => (
                  <Link
                    key={item.id}
                    href={item.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    Log in
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button size="sm" className="bg-primary hover:bg-primary/90">
                    Sign up
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>

              <div className="md:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </div>
            </div>
          </div>

          <div
            className={`
              md:hidden 
              bg-background 
              border-t 
              overflow-hidden
              transition-all 
              duration-300 
              ease-in-out
              ${mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
            `}
          >
            <div
              className={`
              px-2 pt-2 pb-3 space-y-1
              transform transition-transform duration-300
              ${mobileMenuOpen ? "translate-y-0" : "-translate-y-4"}
            `}
            >
              {NAVIGATION.map((item, index) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`
                    block px-3 py-2 text-base hover:bg-muted rounded-lg
                    transform transition-all duration-300 delay-[${
                      index * 50
                    }ms]
                    ${
                      mobileMenuOpen
                        ? "translate-x-0 opacity-100"
                        : "translate-x-4 opacity-0"
                    }
                  `}
                >
                  {item.label}
                </Link>
              ))}
              <div
                className={`
                px-3 py-2 space-y-2
                transform transition-all duration-300 delay-[${
                  NAVIGATION.length * 50
                }ms]
                ${
                  mobileMenuOpen
                    ? "translate-x-0 opacity-100"
                    : "translate-x-4 opacity-0"
                }
              `}
              >
                <Link href="/login" className="block">
                  <Button variant="outline" className="w-full">
                    Log in
                  </Button>
                </Link>
                <Link href="/signup" className="block">
                  <Button className="w-full">Sign up</Button>
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <main className="pt-16">
          <section className="relative overflow-hidden px-4 sm:px-6 lg:px-8 py-24 md:py-32">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-48 left-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
              <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
            </div>

            <div className="relative max-w-7xl mx-auto">
              <div className="text-center">
                <TitleSection
                  pill="✨ New: AI-Powered Analytics Dashboard"
                  title={""}
                />
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-8">
                  Transform Your Institution with{" "}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-primaryBlue to-brand-primaryPurple">
                    Smart Education Management
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
                  Empower your institution with AI-driven insights, streamlined
                  administration, and enhanced learning experiences for students
                  and faculty alike.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Link href="/signup">
                    <Button
                      size="lg"
                      className="text-lg px-8 bg-primary hover:bg-primary/90"
                    >
                      Get Started
                      <ArrowRight className="ml-2" />
                    </Button>
                  </Link>
                  <Link href="/demo">
                    <Button
                      size="lg"
                      variant="outline"
                      className="text-lg px-8"
                    >
                      Watch Demo
                      <Monitor className="ml-2" />
                    </Button>
                  </Link>
                </div>

                <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8">
                  <div className="flex flex-col items-center p-6 bg-background/50 backdrop-blur-lg rounded-2xl border border-primary/10">
                    <Users className="h-8 w-8 text-primary mb-4" />
                    <div className="text-3xl font-bold mb-2">10,000+</div>
                    <div className="text-muted-foreground">Active Students</div>
                  </div>
                  <div className="flex flex-col items-center p-6 bg-background/50 backdrop-blur-lg rounded-2xl border border-primary/10">
                    <BarChart className="h-8 w-8 text-primary mb-4" />
                    <div className="text-3xl font-bold mb-2">95%</div>
                    <div className="text-muted-foreground">Success Rate</div>
                  </div>
                  <div className="flex flex-col items-center p-6 bg-background/50 backdrop-blur-lg rounded-2xl border border-primary/10">
                    <Star className="h-8 w-8 text-primary mb-4" />
                    <div className="text-3xl font-bold mb-2">4.9/5</div>
                    <div className="text-muted-foreground">User Rating</div>
                  </div>
                </div>
              </div>

              <div className="mt-20 relative">
                <div className="relative rounded-2xl overflow-hidden border border-primary/10 shadow-2xl">
                  <Image
                    src="/dashboard.png"
                    alt="Dashboard Preview"
                    width={1920}
                    height={1080}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="px-4 sm:px-6 lg:px-8 py-24 bg-muted/50">
            <div className="max-w-7xl mx-auto">
              <TitleSection
                pill="Features"
                title="Comprehensive Education Management"
                subheading="Everything you need to run your institution efficiently"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
                {FEATURES.map((feature) => (
                  <div
                    key={feature.id}
                    className="group relative bg-background/50 backdrop-blur-lg rounded-2xl border border-primary/10 p-6 hover:border-primary/30 transition-all duration-300 hover:shadow-lg"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                        <span className="text-2xl">{feature.icon}</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-muted-foreground">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center text-primary">
                      <span className="text-sm font-medium">Learn more</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="px-4 sm:px-6 lg:px-8 py-24">
            <div className="max-w-7xl mx-auto">
              <TitleSection
                pill="Testimonials"
                title="Trusted by Leading Institutions"
                subheading="See what educators and students say about our platform"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
                {TESTIMONIALS.map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="bg-background/50 backdrop-blur-lg rounded-2xl border border-primary/10 p-6 hover:border-primary/30 transition-all duration-300"
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={testimonial.avatarUrl} />
                        <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{testimonial.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                    <div className="relative">
                      <span className="absolute top-0 left-0 text-6xl text-primary/10"></span>
                      <p className="text-muted-foreground pl-8 relative z-10">
                        {testimonial.message}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="px-4 sm:px-6 lg:px-8 py-24 relative overflow-hidden">
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 backdrop-blur-3xl" />
            </div>
            <div className="relative max-w-7xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Transform Your Institution?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join hundreds of institutions using our platform to deliver
                exceptional educational experiences powered by AI.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="text-lg px-8">
                  Get Started Today
                  <ArrowRight className="ml-2" />
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8">
                  Contact Sales
                </Button>
              </div>
            </div>
          </section>

          <footer className="bg-muted/50 border-t border-primary/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {Object.entries(FOOTER_LINKS).map(([category, links]) => (
                  <div key={category}>
                    <h3 className="text-sm font-semibold mb-4 capitalize">
                      {category}
                    </h3>
                    <ul className="space-y-2">
                      {links.map((link) => (
                        <li key={link.id}>
                          <Link
                            href={link.href}
                            className="text-sm text-muted-foreground hover:text-primary transition-colors"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-8 border-t border-primary/10 text-center">
                <div className="text-sm text-muted-foreground">
                  © {new Date().getFullYear()} EduManage. All rights reserved.
                </div>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </>
  )
}

export default HomePage
