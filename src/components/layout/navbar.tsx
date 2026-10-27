import Link from "next/link"
import { User } from "lucide-react"
import { Button, buttonVariants } from "@/components/ui/button"
import { MobileNav } from "@/components/layout/mobile-nav"
import { cn } from "cn"

const navLinks = [
  { label: "Home", href: "/", active: true },
  { label: "Destinations", href: "/destinations" },
  { label: "My Bookings", href: "#" },
  { label: "Admin", href: "#" },
]

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/7">
      <div className="mx-auto grid h-16 max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 sm:px-6 lg:px-8">
        {/* Left — desktop links / mobile menu */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                link.active
                  ? "text-brand"
                  : "text-foreground/70 hover:text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center md:hidden">
          <MobileNav links={navLinks} />
        </div>

        {/* Center — logo */}
        <Link href="/" className="justify-self-center">
          <span className="font-heading text-2xl font-bold tracking-tight text-brand">
            Wanderly
          </span>
        </Link>

        {/* Right — account actions */}
        <div className="hidden items-center justify-end gap-2 md:flex">
          <Link
            href="/profile"
            className={buttonVariants({
              variant: "ghost",
              size: "sm",
              className: "gap-1.5 text-foreground/70 hover:text-foreground",
            })}
          >
            <User data-icon="inline-start" />
            Profile
          </Link>
          <Link href="/login">
            <Button
              variant="ghost"
              size="sm"
              className="text-foreground/70 hover:text-foreground"
            >
              Login
            </Button>
          </Link>
          <Link href="/signup">
            <Button
              size="sm"
              className="bg-brand text-brand-foreground hover:bg-brand/90"
            >
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
