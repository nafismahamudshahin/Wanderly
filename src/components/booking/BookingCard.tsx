"use client"

import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  CalendarDays,
  CircleCheck,
  Clock3,
  MapPin,
  Plane,
  Ticket,
  XCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Booking, Destination } from "@/types/types"

export type TripStatus = "upcoming" | "completed"

export interface BookingRow {
  booking: Booking
  destination?: Destination
  status: TripStatus
}

/** Formats an ISO date without timezone drift (YYYY-MM-DD is read as UTC). */
function formatDate(value: string) {
  const day = /^\d{4}-\d{2}-\d{2}/.exec(value)?.[0]
  const date = day ? new Date(`${day}T00:00:00Z`) : new Date(value)
  if (Number.isNaN(date.getTime())) return value

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    ...(day ? { timeZone: "UTC" } : {}),
  })
}

// Full class strings are literals so Tailwind's scanner picks them up.
const STATUS_STYLES: Record<TripStatus, string> = {
  upcoming:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-500",
  completed: "bg-muted text-muted-foreground",
}

const STATUS_LABEL: Record<TripStatus, string> = {
  upcoming: "Upcoming",
  completed: "Completed",
}

/** Presentation-only card for a single booking. Actions are not wired up yet. */
export function BookingCard({ row }: { row: BookingRow }) {
  const { booking, destination, status } = row

  return (
    <article className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="grid gap-4 p-4 sm:grid-cols-[200px_minmax(0,1fr)] sm:p-5">
        {/* Trip thumbnail */}
        <div className="relative aspect-video overflow-hidden bg-muted sm:aspect-square">
          {destination ? (
            <Image
              src={destination.image}
              alt={destination.name}
              fill
              sizes="(max-width: 640px) 100vw, 200px"
              className="object-cover"
            />
          ) : (
            <span className="flex h-full items-center justify-center text-muted-foreground">
              <Plane aria-hidden="true" className="size-8" />
            </span>
          )}
        </div>

        <div className="flex min-w-0 flex-col">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin aria-hidden="true" className="size-3.5 shrink-0" />
                {destination?.country ?? "Travel package"}
              </p>
              <h2 className="mt-1 truncate font-display text-xl font-medium text-foreground">
                {destination?.name ?? "Reserved trip"}
              </h2>
            </div>

            <span
              className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_STYLES[status]}`}
            >
              {status === "upcoming" ? (
                <Clock3 aria-hidden="true" className="size-3" />
              ) : (
                <CircleCheck aria-hidden="true" className="size-3" />
              )}
              {STATUS_LABEL[status]}
            </span>
          </div>

          <dl className="mt-4 grid gap-x-6 gap-y-2.5 text-sm sm:grid-cols-2">
            <div className="flex items-center gap-2">
              <dt className="sr-only">Departure date</dt>
              <CalendarDays
                aria-hidden="true"
                className="size-4 shrink-0 text-muted-foreground"
              />
              <dd>
                <span className="text-muted-foreground">Departs </span>
                {formatDate(booking.departureDate)}
              </dd>
            </div>
            <div className="flex items-center gap-2">
              <dt className="sr-only">Booking date</dt>
              <Ticket
                aria-hidden="true"
                className="size-4 shrink-0 text-muted-foreground"
              />
              <dd>
                <span className="text-muted-foreground">Booked </span>
                {formatDate(booking.bookingDate)}
              </dd>
            </div>
            {destination?.duration && (
              <div className="flex items-center gap-2">
                <dt className="sr-only">Duration</dt>
                <Clock3
                  aria-hidden="true"
                  className="size-4 shrink-0 text-muted-foreground"
                />
                <dd>{destination.duration}</dd>
              </div>
            )}
            <div className="flex items-center gap-2">
              <dt className="sr-only">Reference</dt>
              <span className="text-muted-foreground">Ref</span>
              <dd className="font-medium">
                #{booking._id.slice(-6).toUpperCase()}
              </dd>
            </div>
          </dl>

          <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
            <p className="text-sm">
              {destination ? (
                <>
                  <span className="font-display text-lg font-medium text-brand">
                    ${destination.price.toLocaleString()}
                  </span>
                  <span className="text-muted-foreground"> / person</span>
                </>
              ) : (
                <span className="text-muted-foreground">Price unavailable</span>
              )}
            </p>

            {/* Visual only — no handlers wired up yet. */}
            <div className="flex items-center gap-2">
              {destination && (
                <Link href={`/destinations/${destination._id}`}>
                  <Button type="button" variant="outline" size="sm">
                    View trip
                    <ArrowRight aria-hidden="true" />
                  </Button>
                </Link>
              )}

              {status === "upcoming" && (
                <Button type="button" variant="destructive" size="sm">
                  <XCircle aria-hidden="true" />
                  Cancel
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
