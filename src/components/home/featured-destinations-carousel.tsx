"use client"

import Link from "next/link"
import { useCallback, useEffect, useState } from "react"
import { ArrowRight } from "lucide-react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import { buttonVariants } from "@/components/ui/button"
import { DestinationCard } from "@/components/destination/destination-card"
import type { Destination } from "@/types/types"

export function FeaturedDestinationsCarousel({
  destinations,
  error,
}: {
  destinations: Destination[]
  error: string | null
}) {
  const [api, setApi] = useState<CarouselApi>()
  const [currentPage, setCurrentPage] = useState(1)
  const pageCount = Math.max(1, Math.ceil(destinations.length / 2))

  const updateCurrentPage = useCallback((carouselApi: CarouselApi | undefined) => {
    if (!carouselApi) return
    setCurrentPage(carouselApi.selectedScrollSnap() + 1)
  }, [])

  useEffect(() => {
    if (!api) return

    const handleSelect = () => updateCurrentPage(api)
    handleSelect()
    api.on("select", handleSelect)
    api.on("reInit", handleSelect)

    return () => {
      api.off("select", handleSelect)
      api.off("reInit", handleSelect)
    }
  }, [api, updateCurrentPage])

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <header className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-display text-3xl font-medium tracking-tight sm:text-4xl">
            Featured Destinations
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Handpicked travel experiences for the adventure seekers
          </p>
        </div>
        <Link
          href="/destinations"
          className={buttonVariants({
            variant: "outline",
            size: "sm",
            className:
              "hidden h-9 shrink-0 gap-2 rounded-none border-brand/50 px-4 text-xs font-normal uppercase tracking-wide text-brand sm:inline-flex",
          })}
        >
          All Destinations <ArrowRight aria-hidden="true" />
        </Link>
      </header>

      {error || destinations.length === 0 ? (
        <p className="mt-6 text-sm text-muted-foreground" role="status">
          {error
            ? "Featured destinations are temporarily unavailable."
            : "No featured destinations are available yet."}
        </p>
      ) : (
        <>
          <Carousel
            setApi={setApi}
            opts={{ align: "start", slidesToScroll: 2 }}
            className="mt-6"
          >
            <CarouselContent>
              {destinations.map((destination) => (
                <CarouselItem
                  key={destination._id}
                  className="basis-[47%] pl-4"
                >
                  <DestinationCard destination={destination} />
                </CarouselItem>
              ))}
            </CarouselContent>

          <div className="mt-6 flex items-center justify-between border-b border-border pb-1">
            <p className="text-sm font-medium" aria-live="polite">
              {Math.min(currentPage, pageCount)}/{pageCount}
            </p>
            <div className="flex items-center gap-2">
              <CarouselPrevious
                aria-label="Previous featured destinations"
                className="static size-9 translate-y-0"
              />
              <CarouselNext
                aria-label="Next featured destinations"
                className="static size-9 translate-y-0"
              />
            </div>
          </div>
          </Carousel>
        </>
      )}
    </section>
  )
}
