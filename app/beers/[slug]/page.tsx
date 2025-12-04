// app/beers/[slug]/page.tsx
import { getBeerBySlug, getBeers } from '@/lib/cosmic'
import { Beer } from '@/types'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const beers = await getBeers() as Beer[]
  return beers.map((beer) => ({
    slug: beer.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const beer = await getBeerBySlug(slug) as Beer | null
  
  if (!beer) {
    return {
      title: 'Beer Not Found',
    }
  }

  return {
    title: `${beer.metadata.beer_name} | Cosmic Craft Brewery`,
    description: beer.metadata.description,
  }
}

export default async function BeerDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const beer = await getBeerBySlug(slug) as Beer | null

  if (!beer) {
    notFound()
  }

  return (
    <div className="py-16 bg-stone-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link 
          href="/beers"
          className="inline-flex items-center text-primary hover:text-primary-dark mb-8 font-semibold"
        >
          ← Back to All Beers
        </Link>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {beer.metadata.beer_image && (
              <div className="h-96 md:h-auto">
                <img
                  src={`${beer.metadata.beer_image.imgix_url}?w=1200&h=1200&fit=crop&auto=format,compress`}
                  alt={beer.metadata.beer_name}
                  className="w-full h-full object-cover"
                  width="600"
                  height="600"
                />
              </div>
            )}
            
            <div className="p-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-primary text-white text-sm px-4 py-1 rounded-full">
                  {beer.metadata.beer_style.value}
                </span>
                {beer.metadata.seasonal && (
                  <span className="bg-accent-dark text-white text-sm px-4 py-1 rounded-full">
                    Seasonal
                  </span>
                )}
                {beer.metadata.available ? (
                  <span className="bg-green-600 text-white text-sm px-4 py-1 rounded-full">
                    Available Now
                  </span>
                ) : (
                  <span className="bg-stone-400 text-white text-sm px-4 py-1 rounded-full">
                    Currently Unavailable
                  </span>
                )}
              </div>

              <h1 className="text-4xl font-bold text-stone-900 mb-4">
                {beer.metadata.beer_name}
              </h1>

              <div className="flex gap-6 mb-6 text-lg">
                <div className="text-center">
                  <div className="font-bold text-2xl text-primary">{beer.metadata.abv}%</div>
                  <div className="text-sm text-stone-600">ABV</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-2xl text-primary">{beer.metadata.ibu}</div>
                  <div className="text-sm text-stone-600">IBU</div>
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-bold text-stone-900 mb-2">Description</h2>
                <p className="text-stone-700 leading-relaxed">
                  {beer.metadata.description}
                </p>
              </div>

              {beer.metadata.tasting_notes && (
                <div>
                  <h2 className="text-xl font-bold text-stone-900 mb-2">Tasting Notes</h2>
                  <p className="text-stone-700 leading-relaxed">
                    {beer.metadata.tasting_notes}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}