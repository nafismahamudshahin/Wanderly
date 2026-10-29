import type { Booking, Destination } from "@/types/types"

const API_URL = process.env.NEXT_PUBLIC_API_URL

function requireApiUrl() {
  if (!API_URL) {
    throw new Error("Api url not configured.")
  }
  return API_URL
}

/** Loads every booking placed by the signed-in traveler. */
export async function fetchBookings(email: string): Promise<Booking[]> {
  const response = await fetch(
    `${requireApiUrl()}/booking/${encodeURIComponent(email)}`,
    { cache: "no-store" }
  )

  if (!response.ok) {
    throw new Error(`Request failed (${response.status})`)
  }

  const data: unknown = await response.json()
  if (!Array.isArray(data)) {
    throw new Error("The bookings API returned an invalid response.")
  }

  return data as Booking[]
}

/**
 * Bookings only store a destination id, so we load the catalogue once and look
 * up each booking's trip details from it.
 */
export async function fetchDestinationIndex(): Promise<
  Map<string, Destination>
> {
  const response = await fetch(`${requireApiUrl()}/destination`, {
    cache: "no-store",
  })

  if (!response.ok) {
    throw new Error(`Request failed (${response.status})`)
  }

  const data: unknown = await response.json()
  if (!Array.isArray(data)) {
    throw new Error("The destinations API returned an invalid response.")
  }

  return new Map(
    (data as Destination[]).map((destination) => [
      destination._id,
      destination,
    ])
  )
}
