"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, CalendarDays, Check } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { useSession } from "@/lib/auth-client"
import type { Destination } from "@/types/types"

const GUARANTEES = [
  "Free cancellation up to 7 days",
  "Travel insurance included",
  "24/7 customer support",
]



function toDateInputValue(value: string) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value.slice(0, 10)
  return date.toISOString().slice(0, 10)
}

const BookingCard = ({ destination }: { destination: Destination }) => {
  const router = useRouter()
  const { data: session, isPending } = useSession()
  const user = session?.user
  const [submitting, setSubmitting] = useState(false)

  const handleBookingSubmitted = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!user) {
      toast.error("Please sign in before booking.")
      router.push("/login")
      return
    }

    const form = e.currentTarget
    const departureDate = (
      form.elements.namedItem("departureDate") as HTMLInputElement
    ).value

    const bookingData = {
      userName: user.name,
      email: user.email,
      destinationId: destination._id,
      departureDate,
      bookingDate: new Date().toISOString(),
    }

    setSubmitting(true)
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      if (!apiUrl) {
        throw new Error("Api url not configured.")
      }
      const res = await fetch(`${apiUrl}/booking`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(bookingData),
      })
      const response: unknown = await res.json()
      const succeeded =
        res.ok &&
        typeof response === "object" &&
        response !== null &&
        "success" in response &&
        response.success

      if (succeeded) {
        toast.success("Congratulations! Your booking is confirmed.")
        form.reset()
      } else {
        toast.error("Booking failed. Please try again.")
      }
    } catch {
      toast.error("Could not reach the booking service. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <aside className="lg:sticky lg:top-24 lg:self-start">
      <div className="rounded-xl border border-border p-6">
        <p className="text-sm text-muted-foreground">Starting from</p>
        <p className="mt-1 text-4xl font-semibold text-brand">
          ${destination.price.toLocaleString()}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">per person</p>

        <form onSubmit={handleBookingSubmitted}>
          <div className="mt-4 flex items-center gap-2 rounded-lg bg-muted px-3 py-2.5 text-sm text-muted-foreground">
            <CalendarDays aria-hidden="true" className="size-4 shrink-0" />
            <input
              type="date"
              name="departureDate"
              required
              defaultValue={toDateInputValue(destination.departureDate)}
              className="w-full bg-transparent text-sm text-foreground outline-none"
            />
          </div>

          <Button
            type="submit"
            disabled={submitting || isPending}
            className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-sm bg-brand px-4 py-2 text-brand-foreground hover:bg-brand/90"
          >
            <span>{submitting ? "Booking..." : "Book Now"}</span>
            <ArrowRight aria-hidden="true" className="size-4" />
          </Button>
        </form>

        <ul className="mt-5 space-y-2 text-sm text-emerald-700 dark:text-emerald-500">
          {GUARANTEES.map((guarantee) => (
            <li key={guarantee} className="flex items-start gap-2">
              <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
              {guarantee}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}

export default BookingCard
