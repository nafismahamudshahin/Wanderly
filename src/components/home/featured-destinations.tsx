import { Suspense } from "react"
import { getDestinations } from "@/lib/destinations"
import { FeaturedDestinationsCarousel } from "@/components/home/featured-destinations-carousel"

async function FeaturedDestinationsData() {
  const { destinations, error } = await getDestinations()
  return (
    <FeaturedDestinationsCarousel destinations={destinations} error={error} />
  )
}

function FeaturedDestinationsSkeleton() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="h-9 w-72 max-w-full animate-pulse rounded bg-muted" />
          <div className="mt-2 h-4 w-80 max-w-full animate-pulse rounded bg-muted" />
        </div>
        <div className="hidden h-9 w-36 animate-pulse rounded border border-border sm:block" />
      </div>
      <div className="mt-6 grid grid-cols-2 gap-4 overflow-hidden">
        {[0, 1].map((item) => (
          <div key={item} className="animate-pulse">
            <div className="aspect-video bg-muted" />
            <div className="mt-3 h-3 w-24 rounded bg-muted" />
            <div className="mt-2 h-4 w-3/4 rounded bg-muted" />
          </div>
        ))}
      </div>
    </section>
  )
}

export function FeaturedDestinations() {
  return (
    <Suspense fallback={<FeaturedDestinationsSkeleton />}>
      <FeaturedDestinationsData />
    </Suspense>
  )
}
