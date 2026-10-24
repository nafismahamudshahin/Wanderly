import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"

export function TravelCTA() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Decorative full-bleed backdrop */}
      <Image
        src="/images/CTA.png"
        alt=""
        aria-hidden
        fill
        sizes="100vw"
        className="object-cover"
      />
      {/* Overlay keeps white copy legible over the bright water */}
      <div aria-hidden className="absolute inset-0 bg-black/45" />

      <div className="relative z-10 mx-auto max-w-3xl px-4 py-28 text-center sm:py-32">
        <h2 className="font-display text-4xl font-medium text-white sm:text-5xl">
          Ready To Start Your Journey?
        </h2>
        <p className="mt-4 text-base text-white/85 sm:text-lg">
          Join thousands of travelers who have discovered the world with us
        </p>

        <Link
          href="#"
          className={buttonVariants({
            variant: "outline",
            size: "lg",
            className:
              "mt-8 gap-3 border-0 bg-white px-7 text-base font-semibold tracking-wide text-foreground uppercase shadow-lg hover:bg-white/90 hover:text-foreground",
          })}
        >
          Book Your Trip Today
          <ArrowRight data-icon="inline-end" />
        </Link>
      </div>
    </section>
  )
}
