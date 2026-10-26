import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Suspense } from "react"
import {
  DestinationDetail,
  DestinationDetailError,
  DestinationDetailLoading,
} from "@/components/destination/destination-detail"
import { getDestination } from "@/lib/destinations"

type PageProps = { params: Promise<{ id: string }> }

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params
  const { destination } = await getDestination(id)
  if (!destination) {
    return { title: "Destination | Wanderly" }
  }
  return {
    title: `${destination.name} | Wanderly`,
    description: destination.description,
  }
}

async function DestinationData({ params }: PageProps) {
  const { id } = await params
  const { destination, error } = await getDestination(id)

  if (!destination && !error) {
    notFound()
  }
  if (!destination) {
    return <DestinationDetailError error={error} />
  }

  return <DestinationDetail destination={destination} />
}

export default function DestinationsDetailsPage({ params }: PageProps) {
  return (
    <main className="flex-1">
      <Suspense fallback={<DestinationDetailLoading />}>
        <DestinationData params={params} />
      </Suspense>
    </main>
  )
}
