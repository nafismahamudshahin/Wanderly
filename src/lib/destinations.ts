import { cache } from "react"
import type {
  DestinationResult,
  DestinationsResult,
  Destination,
} from "@/types/types"

const DESTINATIONS_API_URL =
  process.env.DESTINATIONS_API_URL ?? "http://localhost:5000/destination"

/** Fetch a single destination by id. Cached per render pass so page data and metadata share one request. */
export const getDestination = cache(
  async (id: string): Promise<DestinationResult> => {
    try {
      const response = await fetch(`${DESTINATIONS_API_URL}/${id}`, {
        cache: "no-store",
      })
      if (response.status === 404) {
        return { destination: null, error: null }
      }
      if (!response.ok) {
        throw new Error(`Request failed (${response.status})`)
      }

      const data: unknown = await response.json()
      if (
        !data ||
        typeof data !== "object" ||
        !("_id" in data) ||
        !("name" in data)
      ) {
        throw new Error("The destinations API returned an invalid response.")
      }

      return { destination: data as Destination, error: null }
    } catch (fetchError) {
      return {
        destination: null,
        error:
          fetchError instanceof Error
            ? fetchError.message
            : "Could not load the destination.",
      }
    }
  }
)

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
