"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { ArrowRight, CircleCheck, Plane, Ticket } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSession } from "@/lib/auth-client"
import { fetchBookings, fetchDestinationIndex } from "@/lib/bookings"
import {
  BookingCard,
  type BookingRow,
  type TripStatus,
} from "@/components/booking/BookingCard"
import type { Booking, Destination } from "@/types/types"

function StatCard({
  label,
  value,
  icon: Icon,
  chip,
}: {
  label: string
  value: string | number
  icon: typeof Plane
  chip: string
}) {
  return (
    <div className="rounded-xl border border-border p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="mt-1 font-display text-2xl font-medium text-foreground">
            {value}
          </p>
        </div>
        <span
          aria-hidden
          className={`inline-flex size-9 shrink-0 items-center justify-center rounded-lg ${chip}`}
        >
          <Icon className="size-4" />
        </span>
      </div>
    </div>
  )
}

function BookingsSkeleton() {
  return (
    <div className="animate-pulse space-y-4" aria-hidden>
      {Array.from({ length: 3 }, (_, index) => (
        <div
          key={index}
          className="rounded-xl border border-border p-4 sm:p-5"
        >
          <div className="grid gap-4 sm:grid-cols-[200px_minmax(0,1fr)]">
            <div className="aspect-video bg-muted sm:aspect-square" />
            <div className="space-y-3">
              <div className="h-3 w-24 rounded bg-muted" />
              <div className="h-6 w-56 max-w-full rounded bg-muted" />
              <div className="h-4 w-72 max-w-full rounded bg-muted" />
              <div className="h-4 w-48 max-w-full rounded bg-muted" />
              <div className="h-9 w-40 rounded bg-muted" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

interface BookingsState {
  /** Email the loaded data belongs to, so another account's list is never shown. */
  email: string | null
  status: "loading" | "error" | "ready"
  errorMessage: string | null
  /** Today (YYYY-MM-DD) captured when the list loaded, used for trip status. */
  today: string
  bookings: Booking[]
  destinations: Map<string, Destination>
}

const INITIAL_STATE: BookingsState = {
  email: null,
  status: "loading",
  errorMessage: null,
  today: "",
  bookings: [],
  destinations: new Map<string, Destination>(),
}

function toErrorMessage(fetchError: unknown) {
  return fetchError instanceof Error
    ? fetchError.message
    : "Could not load your bookings."
}

export function BookingList() {
  const { data: session, isPending } = useSession()
  const user = session?.user
  const email = user?.email ?? null

  const [state, setState] = useState<BookingsState>(INITIAL_STATE)

  useEffect(() => {
    if (isPending || !email) return

    let active = true

    fetchBookings(email)
      .then(async (loadedBookings) => {
        // Trip details are optional — keep the list usable without them.
        const destinations = await fetchDestinationIndex().catch(
          () => new Map<string, Destination>()
        )
        if (active) {
          setState({
            email,
            status: "ready",
            errorMessage: null,
            today: new Date().toISOString().slice(0, 10),
            bookings: loadedBookings,
            destinations,
          })
        }
      })
      .catch((fetchError: unknown) => {
        if (active) {
          setState({
            email,
            status: "error",
            errorMessage: toErrorMessage(fetchError),
            today: "",
            bookings: [],
            destinations: new Map<string, Destination>(),
          })
        }
      })

    return () => {
      active = false
    }
  }, [isPending, email])

  // Only trust data that belongs to the signed-in account.
  const loadedHere = state.email === email
  const bookings = loadedHere ? state.bookings : INITIAL_STATE.bookings
  const destinations = loadedHere
    ? state.destinations
    : INITIAL_STATE.destinations
  const today = loadedHere ? state.today : INITIAL_STATE.today
  const loading = !loadedHere || state.status === "loading"
  const error = state.status === "error" ? state.errorMessage : null

  const rows = useMemo<BookingRow[]>(() => {
    return bookings
      .map((booking) => ({
        booking,
        destination: destinations.get(booking.destinationId),
        status:
          booking.departureDate >= today
            ? ("upcoming" as TripStatus)
            : ("completed" as TripStatus),
      }))
      .sort((a, b) => {
        if (a.status !== b.status) {
          return a.status === "upcoming" ? -1 : 1
        }
        return a.status === "upcoming"
          ? a.booking.departureDate.localeCompare(b.booking.departureDate)
          : b.booking.departureDate.localeCompare(a.booking.departureDate)
      })
  }, [bookings, destinations, today])

  // Still resolving the session — nothing to decide yet.
  if (isPending) {
    return <BookingsSkeleton />
  }

  // Signed out.
  if (!user) {
    return (
      <div className="rounded-xl border border-border p-10 text-center">
        <Plane aria-hidden="true" className="mx-auto size-8 text-brand" />
        <h2 className="mt-4 font-display text-xl font-medium text-foreground">
          Sign in to view your bookings
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
          Your upcoming trips and past reservations will show up here once you
          sign in to your Wanderly account.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          <Link href="/login">
            <Button
              type="button"
              className="bg-brand text-brand-foreground hover:bg-brand/90"
            >
              Sign In
            </Button>
          </Link>
          <Link href="/signup">
            <Button type="button" variant="outline">
              Create Account
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  if (loading) {
    return <BookingsSkeleton />
  }

  if (error) {
    return (
      <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-10 text-center">
        <p className="text-sm text-destructive">
          Could not load your bookings. {error}
        </p>
      </div>
    )
  }

  if (rows.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border p-10 text-center">
        <Ticket
          aria-hidden="true"
          className="mx-auto size-8 text-muted-foreground"
        />
        <h2 className="mt-4 font-display text-xl font-medium text-foreground">
          No bookings yet
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
          When you book a trip it will appear here with all of your travel
          details.
        </p>
        <Link href="/destinations">
          <Button
            type="button"
            className="mt-5 bg-brand text-brand-foreground hover:bg-brand/90"
          >
            Explore destinations
            <ArrowRight aria-hidden="true" />
          </Button>
        </Link>
      </div>
    )
  }

  const upcomingCount = rows.filter((row) => row.status === "upcoming").length

  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-3">
        <StatCard
          label="Total bookings"
          value={rows.length}
          icon={Ticket}
          chip="bg-sky-100 text-sky-600"
        />
        <StatCard
          label="Upcoming trips"
          value={upcomingCount}
          icon={Plane}
          chip="bg-emerald-100 text-emerald-600"
        />
        <StatCard
          label="Completed trips"
          value={rows.length - upcomingCount}
          icon={CircleCheck}
          chip="bg-orange-100 text-orange-600"
        />
      </div>

      <p className="mt-6 text-xs text-muted-foreground" aria-live="polite">
        {`Showing ${rows.length} ${rows.length === 1 ? "booking" : "bookings"}`}
      </p>

      <div className="mt-3 space-y-4">
        {rows.map((row) => (
          <BookingCard key={row.booking._id} row={row} />
        ))}
      </div>
    </div>
  )
}
