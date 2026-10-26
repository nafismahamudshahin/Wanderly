"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { DestinationCard } from "@/components/destination/destination-card"
import type { Destination, PriceRange, SortOption } from "@/types/types"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const PRICE_RANGES: { value: PriceRange; label: string }[] = [
  { value: "all", label: "Any price" },
  { value: "under-500", label: "Under $500" },
  { value: "500-999", label: "$500 – $999" },
  { value: "1000-1499", label: "$1,000 – $1,499" },
  { value: "1500-plus", label: "$1,500+" },
]

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-low", label: "Price: Low to high" },
  { value: "price-high", label: "Price: High to low" },
  { value: "name", label: "Name: A to Z" },
]

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: string | null
  options: { value: string; label: string }[]
  onChange: (value: string) => void
}) {
  return (
    <Select value={value} onValueChange={(next) => next && onChange(next)}>
      <SelectTrigger
        aria-label={label}
        className="h-11 w-full rounded-none border-0 bg-transparent px-3 text-xs font-normal uppercase tracking-wide shadow-none focus-visible:ring-0 sm:px-4"
      >
        <SelectValue placeholder={label} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

function matchesPrice(price: number, range: PriceRange) {
  switch (range) {
    case "under-500":
      return price < 500
    case "500-999":
      return price >= 500 && price < 1000
    case "1000-1499":
      return price >= 1000 && price < 1500
    case "1500-plus":
      return price >= 1500
    default:
      return true
  }
}

export function DestinationList({ destinations, error, }: { destinations: Destination[], error: string | null }) {
  const router = useRouter()
  const [category, setCategory] = useState<string | null>(null)
  const [priceRange, setPriceRange] = useState<PriceRange | null>(null)
  const [sortBy, setSortBy] = useState<SortOption | null>(null)

  const categories = useMemo(
    () => [...new Set(destinations.map((destination) => destination.category))].sort(),
    [destinations]
  )

  const visibleDestinations = useMemo(() => {
    const filtered = destinations.filter((destination) => {
      const matchesCategory = !category || category === "all" || destination.category === category
      const matchesSelectedPrice = matchesPrice(destination.price, priceRange ?? "all")
      return matchesCategory && matchesSelectedPrice
    })

    switch (sortBy) {
      case "price-low":
        return filtered.sort((a, b) => a.price - b.price)
      case "price-high":
        return filtered.sort((a, b) => b.price - a.price)
      case "name":
        return filtered.sort((a, b) => a.name.localeCompare(b.name))
      default:
        return filtered
    }
  }, [category, destinations, priceRange, sortBy])

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <header>
        <h1 className="font-display text-3xl font-medium tracking-tight sm:text-4xl">
          Explore All Destinations
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Find your perfect travel experience from our curated collection
        </p>
      </header>

      <div className="mt-6 grid grid-cols-1 divide-y divide-border overflow-hidden border border-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        <FilterSelect
          label="Category"
          value={category}
          onChange={setCategory}
          options={[
            { value: "all", label: "All categories" },
            ...categories.map((item) => ({ value: item, label: item })),
          ]}
        />
        <FilterSelect
          label="Price Range"
          value={priceRange}
          onChange={(value) => setPriceRange(value as PriceRange)}
          options={PRICE_RANGES}
        />
        <FilterSelect
          label="Sort By"
          value={sortBy}
          onChange={(value) => setSortBy(value as SortOption)}
          options={SORT_OPTIONS}
        />
      </div>

      <p className="mt-3 text-xs text-muted-foreground" aria-live="polite">
        {`Showing ${visibleDestinations.length} ${visibleDestinations.length === 1 ? "destination" : "destinations"}`}
      </p>

      {error ? (
        <div className="mt-8 rounded-lg border border-destructive/30 bg-destructive/5 p-6 text-center">
          <p className="text-sm text-destructive">Could not load destinations. {error}</p>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.refresh()}
            className="mt-4"
          >
            Try again
          </Button>
        </div>
      ) : visibleDestinations.length === 0 ? (
        <p className="mt-10 text-center text-sm text-muted-foreground">
          No destinations match these filters. Try changing your selection.
        </p>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
          {visibleDestinations.map((destination) => (
            <DestinationCard key={destination._id} destination={destination} />
          ))}
        </div>
      )}
    </section>
  )
}

export function DestinationLoading() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <div className="animate-pulse">
        <div className="h-10 w-80 max-w-full rounded bg-muted" />
        <div className="mt-3 h-4 w-96 max-w-full rounded bg-muted" />
        <div className="mt-6 h-11 w-full rounded border border-border bg-muted/40" />
        <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }, (_, index) => (
            <div key={index}>
              <div className="aspect-video bg-muted" />
              <div className="mt-3 h-3 w-24 rounded bg-muted" />
              <div className="mt-2 h-4 w-3/4 rounded bg-muted" />
              <div className="mt-3 h-3 w-32 rounded bg-muted" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
