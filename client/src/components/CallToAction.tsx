import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const CallToActionSection = () => {
  return (
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
  )
}

export default CallToActionSection
