export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-secondary-dark text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-amber-300">Cosmic Craft Brewery</h3>
            <p className="text-stone-300 leading-relaxed">
              Where Tradition Meets Innovation. Crafting exceptional beers since 2020.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4 text-amber-300">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/beers" className="text-stone-300 hover:text-amber-300 transition-colors">
                  Our Beers
                </a>
              </li>
              <li>
                <a href="/events" className="text-stone-300 hover:text-amber-300 transition-colors">
                  Events
                </a>
              </li>
              <li>
                <a href="/news" className="text-stone-300 hover:text-amber-300 transition-colors">
                  News & Articles
                </a>
              </li>
              <li>
                <a href="/about" className="text-stone-300 hover:text-amber-300 transition-colors">
                  About Us
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 text-amber-300">Visit Us</h3>
            <div className="text-stone-300 space-y-2">
              <p>123 Brewery Lane</p>
              <p>Craftville, CA 90210</p>
              <p className="mt-4">
                <a href="tel:5551234567" className="hover:text-amber-300 transition-colors">
                  (555) 123-4567
                </a>
              </p>
              <p>
                <a href="mailto:hello@cosmicbrewery.com" className="hover:text-amber-300 transition-colors">
                  hello@cosmicbrewery.com
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-stone-700 pt-8 text-center text-stone-400">
          <p>&copy; {currentYear} Cosmic Craft Brewery. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}