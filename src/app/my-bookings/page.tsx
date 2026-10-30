
import MyBookings from "@/components/booking/BookingList"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "My Bookings — Wanderly",
  description: "View and manage your upcoming and past trips.",
}

export default function MyBookingsPage() {
  return (
    <main className="flex-1">
      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <h1 className="font-display text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
          My Bookings
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Keep track of your upcoming adventures and past trips
        </p>

        <div className="mt-8">
          <MyBookings />
        </div>
      </div>
    </main>
  )
}
