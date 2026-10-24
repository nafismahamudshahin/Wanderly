import type { ReactNode } from "react"
import type { Metadata } from "next"
import { Josefin_Sans, Playfair_Display } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"

const JosefinSans = Josefin_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
})

const PlayfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
})

export const metadata: Metadata = {
  title: "Wanderly — Discover Your Next Adventure",
  description:
    "Explore breathtaking destinations and create unforgettable memories with our curated travel experiences.",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${JosefinSans.variable} ${PlayfairDisplay.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
