import { DollarSign, Globe, Plane, TrendingUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

// Full class strings are literals so Tailwind's scanner picks them up.
const stats = [
  {
    label: "Total Bookings",
    value: "12",
    icon: Plane,
    chip: "bg-sky-100 text-sky-600",
  },
  {
    label: "Countries Visited",
    value: "18",
    icon: Globe,
    chip: "bg-emerald-100 text-emerald-600",
  },
  {
    label: "Upcoming Trips",
    value: "2",
    icon: TrendingUp,
    chip: "bg-orange-100 text-orange-600",
  },
  {
    label: "Total Spent",
    value: "$15,750",
    icon: DollarSign,
    chip: "bg-pink-100 text-pink-600",
  },
]

export function TravelStats() {
  return (
    <section>
      <h2 className="font-display text-2xl font-medium text-foreground">
        Travel Statistics
      </h2>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {stats.map(({ label, value, icon: Icon, chip }) => (
          <Card key={label}>
            <CardContent className="flex items-start justify-between gap-4 p-5">
              <div>
                <p className="text-sm text-muted-foreground">{label}</p>
                <p className="mt-2 font-display text-3xl font-medium text-foreground">
                  {value}
                </p>
              </div>
              <span
                aria-hidden
                className={`inline-flex size-10 shrink-0 items-center justify-center rounded-lg ${chip}`}
              >
                <Icon className="size-5" />
              </span>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
