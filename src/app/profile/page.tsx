import type { Metadata } from "next"
import { ProfileCard } from "@/components/profile/profile-card"
import { TravelStats } from "@/components/profile/travel-stats"

export const metadata: Metadata = {
  title: "My Profile — Wanderly",
  description: "Manage your account settings and travel preferences.",
}

export default function ProfilePage() {
  return (
    <main className="flex-1">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <h1 className="font-display text-4xl font-medium text-foreground sm:text-5xl">
          My Profile
        </h1>
        <p className="mt-3 text-muted-foreground">
          Manage your account settings and travel preferences
        </p>

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,380px)_1fr]">
          <ProfileCard />
          <TravelStats />
        </div>
      </div>
    </main>
  )
}
