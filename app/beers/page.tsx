import { getBeers } from '@/lib/cosmic'
import { Beer } from '@/types'
import Link from 'next/link'

export const metadata = {
  title: 'Our Beers | Cosmic Craft Brewery',
  description: 'Explore our full collection of craft beers including IPAs, stouts, lagers, and seasonal offerings.',
}

export default async function BeersPage() {
  const beers = await getBeers() as Beer[]

  return (
    <div className="py-16 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-stone-900 mb-4">Our Beer Collection</h1>
          <p className="text-xl text-stone-600">
            Explore our carefully crafted selection of beers
          </p>
        </div>

        {beers.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-stone-600">No beers available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {beers.map((beer) => (
              <Link 
                key={beer.id}
                href={`/beers/${beer.slug}`}
                className="group"
              >
                <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow h-full">
                  {beer.metadata.beer_image && (
                    <img
                      src={`${beer.metadata.beer_image.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
                      alt={beer.metadata.beer_name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform"
                      width="400"
                      height="300"
                    />
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="bg-primary text-white text-xs px-3 py-1 rounded-full">
                        {beer.metadata.beer_style.value}
                      </span>
                      {beer.metadata.seasonal && (
                        <span className="bg-accent-dark text-white text-xs px-3 py-1 rounded-full">
                          Seasonal
                        </span>
                      )}
                      {!beer.metadata.available && (
                        <span className="bg-stone-400 text-white text-xs px-3 py-1 rounded-full">
                          Not Available
                        </span>
                      )}
                    </div>
                    <h2 className="text-2xl font-bold text-stone-900 mb-2 group-hover:text-primary transition-colors">
                      {beer.metadata.beer_name}
                    </h2>
                    <p className="text-stone-600 mb-4 line-clamp-3">
                      {beer.metadata.description}
                    </p>
                    <div className="flex gap-4 text-sm">
                      <span className="font-semibold text-stone-700">
                        ABV: {beer.metadata.abv}%
                      </span>
                      <span className="font-semibold text-stone-700">
                        IBU: {beer.metadata.ibu}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}