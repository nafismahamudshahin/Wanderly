"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  CalendarDays,
  Check,
  MapPin,
  Star,
} from "lucide-react"

import { cn } from "cn"
import { Button, buttonVariants } from "@/components/ui/button"
import { UpdateDestinationDialog } from "@/components/destination/update-destination-dialog"
import type { Destination } from "@/types/types"
import DeleteDestinationDialog from "./delete-destination-dialog"
import BookingCard from "./booking-card"

/** Sample content until the API provides real highlights. */
const HIGHLIGHTS = [
  "Luxury beachfront accommodation",
  "Visit Uluwatu Temple at sunset",
  "Traditional Balinese spa treatment",
  "Private beach dinner experience",
  "Sunrise trek to Mount Batur",
]

export function DestinationDetail({ destination }: { destination: Destination }) {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/destinations"
          className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          Back to Destinations
        </Link>

        <div className="flex items-center gap-2">
          <UpdateDestinationDialog destination={destination} />
          <DeleteDestinationDialog destination={destination} />
        </div>
      </header>

      <div className="relative mt-5 aspect-2/1 overflow-hidden bg-muted">
        <Image
          src={destination.image}
          alt={destination.name}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 960px"
          className="object-cover"
        />
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-10">
        <div className="min-w-0">
          <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin aria-hidden="true" className="size-4" />
            {destination.country}
          </p>

          <h1 className="mt-1 font-display text-4xl font-medium tracking-tight sm:text-5xl">
            {destination.name}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
            <span className="flex items-center gap-1.5">
              <Star
                aria-hidden="true"
                className="size-4 fill-brand text-brand"
              />
              <span className="font-semibold text-brand">4.9</span>
              <span className="text-muted-foreground">(234 reviews)</span>
            </span>
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <CalendarDays aria-hidden="true" className="size-4" />
              {destination.duration}
            </span>
          </div>

          <h2 className="mt-8 font-display text-2xl font-medium">Overview</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {destination.description}
          </p>

          <h2 className="mt-8 font-display text-2xl font-medium">Highlights</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {destination.description}
          </p>
          <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
            {HIGHLIGHTS.map((highlight) => (
              <li key={highlight} className="flex items-start gap-2 text-sm">
                <Check
                  aria-hidden="true"
                  className="mt-0.5 size-4 shrink-0 text-emerald-600"
                />
                {highlight}
              </li>
            ))}
          </ul>
        </div>
        <BookingCard destination={destination}></BookingCard>
      </div>
    </section>
  )
}

export function DestinationDetailError({ error }: { error: string | null }) {
  const router = useRouter()

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-6 text-center">
        <p className="text-sm text-destructive">
          Could not load this destination. {error}
        </p>
        <div className="mt-4 flex items-center justify-center gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.refresh()}
          >
            Try again
          </Button>
          <Link
            href="/destinations"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "no-underline"
            )}
          >
            Back to Destinations
          </Link>
        </div>
      </div>
    </section>
  )
}

export function DestinationDetailLoading() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <div className="animate-pulse">
        <div className="flex items-center justify-between">
          <div className="h-4 w-40 rounded bg-muted" />
          <div className="flex gap-2">
            <div className="h-8 w-20 rounded-lg bg-muted" />
            <div className="h-8 w-20 rounded-lg bg-muted" />
          </div>
        </div>
        <div className="mt-5 aspect-2/1 rounded-lg bg-muted" />
        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-10">
          <div>
            <div className="h-4 w-28 rounded bg-muted" />
            <div className="mt-3 h-12 w-3/4 rounded bg-muted" />
            <div className="mt-4 h-4 w-48 rounded bg-muted" />
            <div className="mt-8 h-7 w-36 rounded bg-muted" />
            <div className="mt-3 h-4 w-full rounded bg-muted" />
            <div className="mt-2 h-4 w-5/6 rounded bg-muted" />
            <div className="mt-8 h-7 w-32 rounded bg-muted" />
            <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {Array.from({ length: 5 }, (_, index) => (
                <div key={index} className="h-4 w-48 max-w-full rounded bg-muted" />
              ))}
            </div>
          </div>
          <div className="h-72 rounded-xl border border-border bg-muted/40" />
        </div>
      </div>
    </section>
  )
}
