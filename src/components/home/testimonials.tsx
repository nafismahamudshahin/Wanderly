import Image from "next/image"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

type Testimonial = {
  quote: string
  name: string
  location: string
  /** Portrait path; omit to fall back to an initials avatar. */
  portrait?: string
}

const testimonials: Testimonial[] = [
  {
    quote:
      "\"The Bali Trip Was Absolutely Magical! Every Detail Was Perfectly Planned. The Resorts Were Luxurious And The Cultural Experiences Were Unforgettable.\"",
    name: "Michael Chen",
    location: "Singapore",
    portrait: "/images/person2.png",
  },
  {
    quote:
      "\"Swiss Alps Adventure Exceeded All Expectations. The Mountain Views Were Breathtaking And Our Guide Was Incredibly Knowledgeable. Highly Recommend!\"",
    name: "Sarah Johnson",
    location: "New York, USA",
    portrait: "/images/person1.png",
  },
  {
    quote:
      "\"A Completely Seamless Experience From Start To Finish. The Itinerary Struck The Perfect Balance Between Adventure And Relaxation.\"",
    name: "Priya Patel",
    location: "London, UK",
  },
  {
    quote:
      "\"Everything Was Thoughtfully Organized And The Attention To Detail Was Impressive. We Will Absolutely Book Again Next Year.\"",
    name: "David Kim",
    location: "Sydney, Australia",
  },
]

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()
}

function Avatar({ name, portrait }: { name: string; portrait?: string }) {
  if (portrait) {
    return (
      <Image
        src={portrait}
        alt={name}
        width={176}
        height={176}
        className="size-44 shrink-0 rounded-lg object-cover"
      />
    )
  }
  return (
    <div
      aria-hidden
      className="flex size-44 shrink-0 items-center justify-center rounded-lg bg-brand/10"
    >
      <span className="font-display text-5xl font-medium text-brand">
        {initials(name)}
      </span>
    </div>
  )
}

export function Testimonials() {
  return (
    <section className="bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Carousel
          opts={{ loop: true, align: "start" }}
          className="w-full"
        >
          {/* Header sits inside <Carousel> so the arrows get its context */}
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div>
              <h2 className="font-display text-4xl font-medium text-foreground sm:text-5xl">
                What Travelers Say
              </h2>
              <p className="mt-3 text-muted-foreground">
                Real experiences from our happy travelers
              </p>
            </div>

            <div className="flex items-center gap-3">
              <CarouselPrevious size="icon-lg" className="static" />
              <CarouselNext size="icon-lg" className="static" />
            </div>
          </div>

          <CarouselContent className="mt-10">
            {testimonials.map((testimonial) => (
              <CarouselItem
                key={testimonial.name}
                className="basis-full md:basis-1/2"
              >
                <figure className="flex h-full flex-col justify-between gap-6 rounded-xl bg-card p-6 shadow-[0_2px_14px_rgba(0,0,0,0.06)] ring-1 ring-border/60 sm:flex-row sm:items-start">
                  <div className="flex min-w-0 flex-1 flex-col justify-between gap-6">
                    <blockquote className="font-display text-lg leading-snug text-foreground">
                      {testimonial.quote}
                    </blockquote>
                    <figcaption>
                      <span className="block text-sm font-medium text-brand">
                        — {testimonial.name}
                      </span>
                      <span className="mt-1 block text-xs text-muted-foreground">
                        {testimonial.location}
                      </span>
                    </figcaption>
                  </div>
                  <Avatar
                    name={testimonial.name}
                    portrait={testimonial.portrait}
                  />
                </figure>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  )
}
