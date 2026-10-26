import { Hero } from "@/components/home/hero"
import { FeaturedDestinations } from "@/components/home/featured-destinations"
import { Features } from "@/components/home/features"
import { Testimonials } from "@/components/home/testimonials"
import { TravelCTA } from "@/components/home/TravelCTA"

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <FeaturedDestinations />
      <Features />
      <Testimonials />
      <TravelCTA />
    </main>
  )
}
