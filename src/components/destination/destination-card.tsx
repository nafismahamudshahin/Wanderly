"use client"

import Image from "next/image"
import { ArrowUpRight, CalendarDays, MapPin } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import type { Destination } from "@/types/types"
import Link from "next/link"

export function DestinationCard({ destination, }: { destination: Destination }) {
  return (
    <Link href={`/destinations/${destination._id}`}>
      <article className="min-w-0">
        <div className="relative aspect-video overflow-hidden bg-muted">
          <Image
            src={destination.image}
            alt={destination.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>

        <div className="pt-2">
          <p className="flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin aria-hidden="true" className="size-3.5" />
            {destination.country}
          </p>

          <div className="mt-1 flex items-start justify-between gap-2">
            <h2 className="min-w-0 truncate text-base font-medium leading-tight">
              {destination.name}
            </h2>
            <p className="shrink-0 text-sm font-semibold leading-tight">
              ${destination.price.toLocaleString()}
              <span className="text-xs font-normal text-muted-foreground">
                /Person
              </span>
            </p>
          </div>

          <p className="mt-1.5 flex items-center gap-1 text-xs text-muted-foreground">
            <CalendarDays aria-hidden="true" className="size-3.5" />
            {destination.duration}
          </p>

          <Button
            type="button"
            variant="link"
            onClick={() => toast.info("Booking flow coming soon")}
            className="mt-1 h-auto p-0 text-xs font-medium text-brand"
          >
            BOOK NOW <ArrowUpRight aria-hidden="true" className="size-3.5" />
          </Button>
        </div>
      </article>
    </Link>
  )
}
