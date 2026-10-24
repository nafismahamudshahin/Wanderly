import { Hero } from "@/components/home/hero"
import { Features } from "@/components/home/features"
import { Testimonials } from "@/components/home/testimonials"
import { TravelCTA } from "@/components/home/TravelCTA"

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <Features />
      <Testimonials />
      <TravelCTA />
    </main>
  )
}
