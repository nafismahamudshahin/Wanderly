import { Suspense } from "react"
import { headers } from "next/headers"
import Link from "next/link"
import { CircleCheck, Plane, Ticket } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { BookingCard, type BookingRow, type TripStatus, } from "@/components/booking/BookingCard"
import BookingsSkeleton from "@/components/booking/BookingsSkeleton"
import { auth } from "@/lib/auth"
import { fetchBookings, fetchDestinationIndex } from "@/lib/bookings"
import type { Booking } from "@/types/types"

/** A trip counts as upcoming until its departure day. */
function tripStatus(booking: Booking): TripStatus {
  const today = new Date()
  const todayIso = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-")

  return booking.departureDate.slice(0, 10) >= todayIso
    ? "upcoming"
    : "completed"
}

function BookingStats({ rows }: { rows: BookingRow[] }) {
  const stats = [
    {
      title: "Total bookings",
      value: rows.length,
      icon: Ticket,
      color: "bg-sky-100 text-sky-500",
    },
    {
      title: "Upcoming trips",
      value: rows.filter((row) => row.status === "upcoming").length,
      icon: Plane,
      color: "bg-emerald-100 text-emerald-600",
    },
    {
      title: "Completed trips",
      value: rows.filter((row) => row.status === "completed").length,
      icon: CircleCheck,
      color: "bg-orange-100 text-orange-500",
    },
  ]

  return (
    <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat) => {
        const Icon = stat.icon

        return (
          <Card
            key={stat.title}
            className="rounded-2xl border-border shadow-none"
          >
            <CardContent className="flex items-start justify-between p-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <p className="font-serif text-2xl leading-none text-foreground">
                  {stat.value}
                </p>
              </div>

              <div
                className={`flex size-9 items-center justify-center rounded-xl ${stat.color}`}
              >
                <Icon className="size-4" strokeWidth={2} />
              </div>
            </CardContent>
          </Card>
        )
      })}
    </section>
  )
}

function NoticeCard({ children }: { children: React.ReactNode }) {
  return (
    <Card className="rounded-2xl border-border shadow-none">
      <CardContent className="p-6 text-sm text-muted-foreground">
        {children}
      </CardContent>
    </Card>
  )
}

/** Loads the signed-in traveler's bookings and renders stats plus booking cards. */
async function LoadMyBookingDestinations() {
  const session = await auth.api.getSession({ headers: await headers() })
  const email = session?.user?.email as string

  let rows: BookingRow[]
  try {
    const [bookings, destinations] = await Promise.all([
      fetchBookings(email),
      fetchDestinationIndex(),
    ])

    rows = bookings.map((booking) => ({
      booking,
      destination: destinations.get(booking.destinationId),
      status: tripStatus(booking),
    }))
  } catch {
    return <NoticeCard>Could not load your bookings. Please try again later.</NoticeCard>
  }

  return (
    <div className="space-y-6">
      <BookingStats rows={rows} />

      <section className="space-y-3">
        <p className="text-xs text-muted-foreground">
          Showing {rows.length} booking{rows.length === 1 ? "" : "s"}
        </p>

        {rows.length === 0 ? (
          <NoticeCard>
            No bookings yet — explore{" "}
            <Link
              href="/destinations"
              className="font-medium text-brand underline"
            >
              destinations
            </Link>{" "}
            to plan your first trip.
          </NoticeCard>
        ) : (
          <div className="space-y-4">
            {rows.map((row) => (
              <BookingCard key={row.booking._id} row={row} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default function MyBookings() {
  return (
    <Suspense fallback={<BookingsSkeleton />}>
      <LoadMyBookingDestinations />
    </Suspense>
  )
}
