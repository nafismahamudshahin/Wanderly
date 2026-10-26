import type { DestinationsResult, Destination } from "@/types/types"

const DESTINATIONS_API_URL =
  process.env.DESTINATIONS_API_URL ?? "http://localhost:5000/destination"

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
