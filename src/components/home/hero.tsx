import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { SearchBar } from "@/components/home/search-bar"

export function Hero() {
  return (
    <section className="relative">
      <div className="relative min-h-[85vh] w-full overflow-hidden">
        <Image
          src="/images/Banner.png"
          alt="Aerial view of a secluded coastal bay ringed by hills and villas"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Gradient overlay so white text stays readable over the photo */}
        <div
          aria-hidden
          className="absolute inset-0 bg-linear-to-b from-black/55 via-black/35 to-black/65"
        />

        <div className="relative z-10 mx-auto flex min-h-[85vh] max-w-3xl flex-col items-center justify-center px-4 pt-24 pb-40 text-center">
          <h1 className="font-display text-5xl leading-[1.1] font-light text-white sm:text-6xl lg:text-7xl">
            Discover Your
            <br />
            <span className="italic">Next Adventure</span>
          </h1>
          <p className="mt-6 max-w-xl text-base text-white/85 sm:text-lg">
            Explore breathtaking destinations and create unforgettable memories
            with our curated travel experiences.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="#"
              className={buttonVariants({
                variant: "default",
                size: "lg",
                className:
                  "gap-2 bg-brand px-6 text-base text-brand-foreground hover:bg-brand/90",
              })}
            >
              EXPLORE NOW
              <ArrowRight data-icon="inline-end" />
            </Link>
            <Link
              href="#"
              className={buttonVariants({
                variant: "outline",
                size: "lg",
                className:
                  "gap-2 border-white/40 bg-white/10 px-6 text-base text-white backdrop-blur-sm hover:bg-white/20 hover:text-white",
              })}
            >
              VIEW DESTINATION
            </Link>
          </div>
        </div>
      </div>

      <SearchBar />
    </section>
  )
}
