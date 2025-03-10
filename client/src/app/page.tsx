import CallToActionSection from "@/components/CallToAction"
import FeaturesSection from "@/components/FeaturesSection"
import Footer from "@/components/Footer"
import HeroSection from "@/components/HeroSection"
import Navbar from "@/components/Navbar"
import TestimonialsSection from "@/components/TestiMonials"
const HomePage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">
        <HeroSection />
        <FeaturesSection />
        <TestimonialsSection />
        <CallToActionSection />
      </main>
      <Footer />
    </div>
  )
}

export default HomePage
