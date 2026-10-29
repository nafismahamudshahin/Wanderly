import type { DestinationsResult, Destination, } from "@/types/types"

const DESTINATIONS_API_URL = `${process.env.API_URL}/destination`

/** Fetch a single destination by id. Cached per render pass so page data and metadata share one request. */
export async function getDestination(id: string) {
  try {
    const response = await fetch(
      `${DESTINATIONS_API_URL}/${id}`,
      { cache: "no-store" }
    )

    if (!response.ok) {
      return { destination: null, error: "Destination not found" }
    }

    const destination = await response.json()

    return { destination, error: null }
  } catch {
    return {
      destination: null,
      error: "Something went wrong",
    }
  }
}

export async function getDestinations(): Promise<DestinationsResult> {
  try {
    const response = await fetch(DESTINATIONS_API_URL, { cache: "no-store" })
    if (!response.ok) {
      throw new Error(`Request failed (${response.status})`)
    }

    const data: unknown = await response.json()
    if (!Array.isArray(data)) {
      throw new Error("The destinations API returned an invalid response.")
    }

    return { destinations: data as Destination[], error: null }
  } catch (fetchError) {
    return {
      destinations: [],
      error:
        fetchError instanceof Error
          ? fetchError.message
          : "Could not load destinations.",
    }
  }
}
