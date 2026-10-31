"use client";
import Link from "next/link"
import { LogOut, User } from "lucide-react"
import { Button, buttonVariants } from "@/components/ui/button"
import { MobileNav } from "@/components/layout/mobile-nav"
import { cn } from "cn"
import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "../ui/avatar"
import { signOut, useSession } from "@/lib/auth-client"
import { Popover, PopoverContent, PopoverDescription, PopoverHeader, PopoverTitle, PopoverTrigger } from "../ui/popover";
import { redirect } from "next/navigation";



export function Navbar() {
  const navLinks = [
    { label: "Home", href: "/", active: true },
    { label: "Destinations", href: "/destinations" },
  ]
  const { data: session } = useSession();
  const user = session?.user;
  if (user) {
    navLinks.push({ label: "Add Destination", href: "/add-destination" }, { label: "My Bookings", href: "/my-bookings" },);
  }
  const haldleLogout = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          redirect("/login");
        },
      },
    });
  }
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


          {
            user ?
              <div className="flex gap-6">
                <Popover>
                  <PopoverTrigger
                    render={
                      <button
                        type="button"
                        className="flex items-center gap-3 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        aria-label="Open user menu"
                      >
                        <Avatar>
                          <AvatarImage
                            src={user?.image ?? ""}
                            alt={user?.name ?? "User"}
                          />
                          <AvatarFallback>
                            {user?.name
                              ?.split(" ")
                              .map((part) => part[0])
                              .join("")
                              .slice(0, 2)
                              .toUpperCase() || "U"}
                          </AvatarFallback>
                          <AvatarBadge className="bg-green-600 dark:bg-green-800" />
                        </Avatar>
                      </button>
                    }
                  />

                  <PopoverContent align="end" className="w-56">
                    <PopoverHeader>
                      <PopoverTitle>
                        {(user?.name ?? "User").length > 13
                          ? `${user?.name?.slice(0, 13)}...`
                          : user?.name ?? "User"}
                      </PopoverTitle>

                      <PopoverDescription>
                        {(user?.email ?? "").length > 22
                          ? `${user?.email?.slice(0, 22)}...`
                          : user?.email ?? ""}
                      </PopoverDescription>
                    </PopoverHeader>

                    <Link
                      href="/profile"
                      className={buttonVariants({
                        variant: "ghost",
                        size: "sm",
                        className: "w-full justify-start gap-1.5 text-foreground/70 hover:text-foreground",
                      })}
                    >
                      <User data-icon="inline-start" />
                      Profile
                    </Link>
                    <button
                      type="button"
                      onClick={() => haldleLogout()}
                      className={buttonVariants({
                        variant: "ghost",
                        size: "sm",
                        className:
                          "w-full justify-start gap-2 text-red-600 hover:text-red-700",
                      })}
                    >
                      <LogOut className="size-4" />
                      Logout
                    </button>

                  </PopoverContent>
                </Popover>
              </div>
              :
              <>
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
              </>
          }
        </div>
      </div>
    </header>
  )
}
