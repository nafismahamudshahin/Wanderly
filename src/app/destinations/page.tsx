import type { Metadata } from "next"
import { Suspense } from "react"
import {
  DestinationList,
  DestinationLoading,
} from "@/components/destination/destination-list"
import { getDestinations } from "@/lib/destinations"

export const metadata: Metadata = {
  title: "Destinations | Wanderly",
  description: "Explore curated travel packages from around the world.",
}

async function DestinationData() {
  const { destinations, error } = await getDestinations()
  return <DestinationList destinations={destinations} error={error} />
}

export default function DestinationsPage() {
  return (
    <main className="flex-1">
      <Suspense fallback={<DestinationLoading />}>
        <DestinationData />
      </Suspense>
    </main>
  )
}
