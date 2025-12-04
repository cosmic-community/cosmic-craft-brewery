'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-secondary-dark text-white shadow-lg sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="text-3xl">🍺</div>
            <div>
              <div className="text-xl font-bold">Cosmic Craft Brewery</div>
              <div className="text-xs text-amber-300">Where Tradition Meets Innovation</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link 
              href="/beers"
              className="text-white hover:text-amber-300 font-semibold transition-colors"
            >
              Our Beers
            </Link>
            <Link 
              href="/events"
              className="text-white hover:text-amber-300 font-semibold transition-colors"
            >
              Events
            </Link>
            <Link 
              href="/news"
              className="text-white hover:text-amber-300 font-semibold transition-colors"
            >
              News
            </Link>
            <Link 
              href="/about"
              className="text-white hover:text-amber-300 font-semibold transition-colors"
            >
              About
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col gap-4">
              <Link 
                href="/beers"
                className="text-white hover:text-amber-300 font-semibold transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Our Beers
              </Link>
              <Link 
                href="/events"
                className="text-white hover:text-amber-300 font-semibold transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Events
              </Link>
              <Link 
                href="/news"
                className="text-white hover:text-amber-300 font-semibold transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                News
              </Link>
              <Link 
                href="/about"
                className="text-white hover:text-amber-300 font-semibold transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}