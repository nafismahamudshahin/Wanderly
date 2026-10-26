"use client"

import { toast } from "sonner"
import { Save, Trash2 } from "lucide-react"
import { cn } from "cn"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
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
import type { DestinationFormField } from "@/types/types"

const CATEGORIES = ["Beach", "Mountain", "City", "Adventure", "Cultural"]

const fields: DestinationFormField[] = [
  {
    name: "name",
    label: "Destination Name",
    placeholder: "Bali Paradise",
    full: true,
  },
  { name: "country", label: "Country", placeholder: "Indonesia" },
  { name: "category", label: "Category", control: "input", full: false },
  {
    name: "price",
    label: "Price (USD)",
    placeholder: "e.g., 1299",
    type: "number",
  },
  { name: "duration", label: "Duration", placeholder: "e.g., 7 Days/6 Nights" },
  {
    name: "departureDate",
    label: "Departure Date",
    type: "date",
    full: true,
  },
  {
    name: "image",
    label: "Image URL",
    placeholder: "https://example.com/image.jpg",
    full: true,
  },
  {
    name: "description",
    label: "Description",
    placeholder: "Describe the travel experience...",
    control: "textarea",
    full: true,
  },
]

const controlClassName =
  "h-10 rounded-lg border border-input bg-muted/40 px-3 text-base md:text-sm"

function SubmitButton() {
  return (
    <Button
      type="submit"
      className="h-10 gap-2 bg-brand px-5 text-brand-foreground hover:bg-brand/90"
    >
      <Save data-icon="inline-start" />
      Add Travel Package
    </Button>
  )
}

export function AddDestinationForm({ className }: { className?: string }) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    const destination = Object.fromEntries(formData.entries())

    const res = await fetch("http://localhost:5000/destination", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(destination),
    })
    const response = await res.json()
    if (response.success) {
      toast.success("Destination details collected")
    }
    console.log("Destination form data:", destination)
    form.reset()
  }

  return (
    <Card className={cn("mt-8 w-full max-w-2xl", className)}>
      <CardContent className="px-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {fields.map((field) => {
              if (field.name === "category") {
                return (
                  <div key={field.name} className="flex flex-col gap-1.5">
                    <Label htmlFor={field.name}>{field.label}</Label>
                    <Select
                      name={field.name}
                    >
                      <SelectTrigger
                        id={field.name}
                        className={cn(controlClassName, "w-full")}
                      >
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {CATEGORIES.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )
              }

              if (field.control === "textarea") {
                return (
                  <div
                    key={field.name}
                    className="flex flex-col gap-1.5 sm:col-span-2"
                  >
                    <Label htmlFor={field.name}>{field.label}</Label>
                    <Textarea
                      id={field.name}
                      name={field.name}
                      required
                      rows={6}
                      placeholder={field.placeholder}
                      className={cn(controlClassName, "h-auto min-h-32 py-2.5")}
                    />
                  </div>
                )
              }

              return (
                <div
                  key={field.name}
                  className={cn(
                    "flex flex-col gap-1.5",
                    field.full && "sm:col-span-2"
                  )}
                >
                  <Label htmlFor={field.name}>{field.label}</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    type={field.type ?? "text"}
                    required
                    min={field.type === "number" ? 0 : undefined}
                    placeholder={field.placeholder}
                    className={controlClassName}
                  />
                </div>
              )
            })}
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="reset"
              variant="destructive"
              className="h-10 gap-2 border border-destructive/30 px-5"
            >
              <Trash2 data-icon="inline-start" />
              Cancel
            </Button>
            <SubmitButton />
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
