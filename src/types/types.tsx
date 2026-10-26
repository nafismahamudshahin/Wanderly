export interface Destination {
  _id: string
  name: string
  country: string
  category: string
  price: number
  duration: string
  departureDate: string
  image: string
  description: string
}

export interface DestinationsResult {
  destinations: Destination[]
  error: string | null
}

export interface DestinationResult {
  destination: Destination | null
  error: string | null
}

export type PriceRange =
  | "all"
  | "under-500"
  | "500-999"
  | "1000-1499"
  | "1500-plus"

export type SortOption = "featured" | "price-low" | "price-high" | "name"

export interface DestinationFormField {
  name: string
  label: string
  placeholder?: string
  type?: string
  full?: boolean
  control?: "input" | "textarea"
}

export interface Testimonial {
  quote: string
  name: string
  location: string
  /** Portrait path; omit to fall back to an initials avatar. */
  portrait?: string
}

export interface NavLink {
  label: string
  href: string
  active?: boolean
}
