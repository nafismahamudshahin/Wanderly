"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Pencil, Save, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { cn } from "cn"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { Destination } from "@/types/types"

const DESTINATIONS_API_URL = "http://localhost:5000/destination"

const CATEGORIES = ["Beach", "Mountain", "City", "Adventure", "Cultural"]

const controlClassName =
  "h-10 rounded-lg border border-input bg-muted/40 px-3 text-base md:text-sm"

/** Format an API date value (ISO or date-only) as yyyy-mm-dd for <input type="date">. */
function toDateInputValue(value: string) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value.slice(0, 10)
  return date.toISOString().slice(0, 10)
}

export function UpdateDestinationDialog({ destination, }: { destination: Destination }) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [saving, setSaving] = useState(false)

  const categoryOptions = CATEGORIES.includes(destination.category) ? CATEGORIES : [destination.category, ...CATEGORIES]


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    const payload = {
      ...Object.fromEntries(formData.entries()),
      price: Number(formData.get("price")),
    }

    try {
      setSaving(true)

      const res = await fetch(`${DESTINATIONS_API_URL}/${destination._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      )

      if (!res.ok) {
        toast.error("Update failed")
        return
      }

      toast.success("Destination updated")
      setOpen(false)
      router.refresh()
    } catch {
      toast.error("Something went wrong")
    } finally {
      setSaving(false)
    }
  }


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button type="button" variant="outline" />}>
        <Pencil aria-hidden="true" className="size-3.5" />
        Edit
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Update Travel Package</DialogTitle>
          <DialogDescription>
            Make changes to the travel package details below
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="name">Destination Name</Label>
            <Input
              id="name"
              name="name"
              required
              defaultValue={destination.name}
              placeholder="Bali Paradise"
              className={controlClassName}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                name="country"
                required
                defaultValue={destination.country}
                placeholder="Indonesia"
                className={controlClassName}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="category">Category</Label>
              <Select
                defaultValue={destination.category}
                name="category"
              >
                <SelectTrigger id="category" className={cn(controlClassName, "w-full")}>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categoryOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="price">Price (USD)</Label>
              <Input
                id="price"
                name="price"
                type="number"
                min={0}
                required
                defaultValue={destination.price}
                placeholder="e.g., 1299"
                className={controlClassName}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                name="duration"
                required
                defaultValue={destination.duration}
                placeholder="e.g., 7 Days/6 Nights"
                className={controlClassName}
              />
            </div>

            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <Label htmlFor="departureDate">Departure Date</Label>
              <Input
                id="departureDate"
                name="departureDate"
                type="date"
                required
                defaultValue={toDateInputValue(destination.departureDate)}
                className={controlClassName}
              />
            </div>

            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                name="image"
                type="url"
                required
                defaultValue={destination.image}
                placeholder="https://example.com/image.jpg"
                className={controlClassName}
              />
            </div>

            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                required
                rows={6}
                defaultValue={destination.description}
                placeholder="Describe the travel experience..."
                className={cn(controlClassName, "h-auto min-h-32 py-2.5")}
              />
            </div>
          </div>

          <DialogFooter>
            <DialogClose
              render={
                <Button
                  type="button"
                  variant="destructive"
                  className="border border-destructive/30"
                />
              }
            >
              <Trash2 aria-hidden="true" className="size-4" />
              Cancel
            </DialogClose>
            <Button
              type="submit"
              disabled={saving}
              className="gap-2 bg-brand text-brand-foreground hover:bg-brand/90"
            >
              <Save aria-hidden="true" className="size-4" />
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
