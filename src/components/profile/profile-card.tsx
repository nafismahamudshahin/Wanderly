import { Camera, MapPin, Pencil } from "lucide-react"
import { Avatar, AvatarBadge, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const profile = {
  name: "Sarah Mitchell",
  initials: "SM",
  location: "San Francisco, CA",
  memberSince: "Mar 2024",
  nationality: "United States",
}

const meta = [
  { label: "Member since", value: profile.memberSince },
  { label: "Nationality", value: profile.nationality },
]

export function ProfileCard() {
  return (
    <Card>
      <CardContent className="flex flex-col items-center gap-4 p-6 text-center">
        {/* No portrait exists yet, so the avatar falls back to initials */}
        <Avatar size="lg" className="size-40 shadow-lg">
          <AvatarFallback className="font-display text-5xl font-medium text-brand bg-brand/10">
            {profile.initials}
          </AvatarFallback>
          <AvatarBadge
            aria-hidden
            className="size-9 bg-brand text-brand-foreground [&>svg]:size-5"
          >
            <Camera />
          </AvatarBadge>
        </Avatar>

        <div>
          <h1 className="text-2xl font-medium text-foreground">
            {profile.name}
          </h1>
          <p className="mt-1.5 flex items-center justify-center gap-1.5 text-sm text-muted-foreground">
            <MapPin aria-hidden className="size-4" />
            {profile.location}
          </p>
        </div>

        <dl className="w-full divide-y divide-border border-t border-border text-sm">
          {meta.map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between gap-4 py-2.5"
            >
              <dt className="text-muted-foreground">{row.label}</dt>
              <dd className="font-medium text-foreground">{row.value}</dd>
            </div>
          ))}
        </dl>

        {/* Static control: no profile form exists yet */}
        <Button
          type="button"
          size="lg"
          className="mt-1 w-full gap-2 bg-brand text-base text-brand-foreground hover:bg-brand/90"
        >
          <Pencil data-icon="inline-start" />
          Edit Profile
        </Button>
      </CardContent>
    </Card>
  )
}
