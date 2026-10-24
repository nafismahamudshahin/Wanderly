import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const fields = [
  { name: "location", label: "Location", placeholder: "Address, City Or Zip" },
  { name: "date", label: "Date/Duration", placeholder: "Anytime / 3 Days" },
  { name: "budget", label: "Budget", placeholder: "$0 - $3000" },
  { name: "people", label: "People", placeholder: "5 - 10" },
]

export function SearchBar() {
  return (
    <div className="relative z-20 mx-auto -mt-16 w-full max-w-6xl px-4 sm:px-6 lg:px-8">
      <form
        action="#"
        className="grid grid-cols-1 gap-4 rounded-xl border border-border bg-background/95 p-5 shadow-2xl supports-[backdrop-filter]:bg-background/85 supports-[backdrop-filter]:backdrop-blur sm:grid-cols-2 lg:grid-cols-[repeat(4,minmax(0,1fr))_auto] lg:items-end"
      >
        {fields.map((field) => (
          <div key={field.name} className="flex flex-col gap-1.5">
            <label
              htmlFor={field.name}
              className="text-sm font-semibold text-foreground"
            >
              {field.label}
            </label>
            <Input
              id={field.name}
              name={field.name}
              placeholder={field.placeholder}
              className="h-10"
            />
          </div>
        ))}
        <Button
          type="submit"
          className="h-10 gap-2 bg-brand px-6 text-brand-foreground hover:bg-brand/90 lg:w-auto"
        >
          <Search data-icon="inline-start" />
          Search
        </Button>
      </form>
    </div>
  )
}
