import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import { Button } from "@/components/ui/button"

const PricingPage = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-48 left-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
        </div>
        {/* Main Content */}
        <main className="pt-20 relative">
          <section className="px-4 sm:px-6 lg:px-8 py-24">
            <div className="max-w-7xl mx-auto relative">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-8 text-center">
                Pricing Plans
              </h1>
              <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-12 text-center">
                Choose the plan that best fits your institution’s needs.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Basic Plan */}
                <div className="bg-white dark:bg-gray-800 backdrop-blur-lg rounded-2xl border border-primary/10 p-6 hover:border-primary/30 transition-all duration-300 shadow-lg">
                  <h2 className="text-2xl font-semibold mb-4">Basic</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-6">
                    Essential features for small institutions.
                  </p>
                  <div className="text-4xl font-bold mb-4">
                    $29<span className="text-xl font-normal">/mo</span>
                  </div>
                  <ul className="mb-6 space-y-2">
                    <li className="text-gray-700 dark:text-gray-300">
                      Feature A
                    </li>
                    <li className="text-gray-700 dark:text-gray-300">
                      Feature B
                    </li>
                    <li className="text-gray-700 dark:text-gray-300">
                      Feature C
                    </li>
                  </ul>
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    Select Plan
                  </Button>
                </div>
                {/* Standard Plan */}
                <div className="bg-white dark:bg-gray-800 backdrop-blur-lg rounded-2xl border border-primary/10 p-6 hover:border-primary/30 transition-all duration-300 shadow-lg">
                  <h2 className="text-2xl font-semibold mb-4">Standard</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-6">
                    Advanced features for growing institutions.
                  </p>
                  <div className="text-4xl font-bold mb-4">
                    $59<span className="text-xl font-normal">/mo</span>
                  </div>
                  <ul className="mb-6 space-y-2">
                    <li className="text-gray-700 dark:text-gray-300">
                      Everything in Basic
                    </li>
                    <li className="text-gray-700 dark:text-gray-300">
                      Feature D
                    </li>
                    <li className="text-gray-700 dark:text-gray-300">
                      Feature E
                    </li>
                  </ul>
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    Select Plan
                  </Button>
                </div>
                {/* Premium Plan */}
                <div className="bg-white dark:bg-gray-800 backdrop-blur-lg rounded-2xl border border-primary/10 p-6 hover:border-primary/30 transition-all duration-300 shadow-lg">
                  <h2 className="text-2xl font-semibold mb-4">Premium</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-6">
                    Full-featured solution for large institutions.
                  </p>
                  <div className="text-4xl font-bold mb-4">
                    $99<span className="text-xl font-normal">/mo</span>
                  </div>
                  <ul className="mb-6 space-y-2">
                    <li className="text-gray-700 dark:text-gray-300">
                      Everything in Standard
                    </li>
                    <li className="text-gray-700 dark:text-gray-300">
                      Feature F
                    </li>
                    <li className="text-gray-700 dark:text-gray-300">
                      Feature G
                    </li>
                  </ul>
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    Select Plan
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  )
}

export default PricingPage
