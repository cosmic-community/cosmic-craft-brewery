import { getBeers, getEvents, getNewsArticles, getBreweryInfo } from '@/lib/cosmic'
import { Beer, Event, NewsArticle, BreweryInfo } from '@/types'
import Link from 'next/link'

export default async function HomePage() {
  const [beers, events, articles, breweryInfo] = await Promise.all([
    getBeers(),
    getEvents(),
    getNewsArticles(),
    getBreweryInfo(),
  ])

  const featuredBeers = (beers as Beer[]).slice(0, 3)
  const upcomingEvents = (events as Event[]).slice(0, 2)
  const recentArticles = (articles as NewsArticle[]).slice(0, 2)
  const info = breweryInfo as BreweryInfo

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-dark via-primary to-primary-light text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              {info?.metadata?.brewery_name || 'Cosmic Craft Brewery'}
            </h1>
            <p className="text-2xl mb-8 text-amber-100">
              {info?.metadata?.tagline || 'Where Tradition Meets Innovation'}
            </p>
            <div className="flex gap-4 justify-center">
              <Link 
                href="/beers"
                className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-amber-50 transition-colors"
              >
                Explore Our Beers
              </Link>
              <Link 
                href="/about"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors"
              >
                Our Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Beers Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-stone-900 mb-4">Featured Beers</h2>
            <p className="text-xl text-stone-600">Discover our most popular craft beers</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredBeers.map((beer) => (
              <Link 
                key={beer.id} 
                href={`/beers/${beer.slug}`}
                className="group"
              >
                <div className="bg-stone-50 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
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
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-primary text-white text-xs px-3 py-1 rounded-full">
                        {beer.metadata.beer_style.value}
                      </span>
                      {beer.metadata.seasonal && (
                        <span className="bg-accent-dark text-white text-xs px-3 py-1 rounded-full">
                          Seasonal
                        </span>
                      )}
                    </div>
                    <h3 className="text-2xl font-bold text-stone-900 mb-2 group-hover:text-primary transition-colors">
                      {beer.metadata.beer_name}
                    </h3>
                    <p className="text-stone-600 mb-4 line-clamp-2">
                      {beer.metadata.description}
                    </p>
                    <div className="flex gap-4 text-sm text-stone-700">
                      <span className="font-semibold">ABV: {beer.metadata.abv}%</span>
                      <span className="font-semibold">IBU: {beer.metadata.ibu}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link 
              href="/beers"
              className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors"
            >
              View All Beers
            </Link>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      {upcomingEvents.length > 0 && (
        <section className="py-16 bg-stone-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-stone-900 mb-4">Upcoming Events</h2>
              <p className="text-xl text-stone-600">Join us for great beer and good times</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {upcomingEvents.map((event) => (
                <Link 
                  key={event.id}
                  href={`/events/${event.slug}`}
                  className="group"
                >
                  <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                    {event.metadata.event_image && (
                      <img
                        src={`${event.metadata.event_image.imgix_url}?w=1200&h=400&fit=crop&auto=format,compress`}
                        alt={event.metadata.event_name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
                        width="600"
                        height="200"
                      />
                    )}
                    <div className="p-6">
                      <div className="flex items-center gap-4 mb-3 text-sm text-stone-600">
                        <span className="flex items-center gap-1">
                          📅 {new Date(event.metadata.event_date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric', 
                            year: 'numeric' 
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          🕐 {event.metadata.start_time}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-stone-900 mb-3 group-hover:text-primary transition-colors">
                        {event.metadata.event_name}
                      </h3>
                      {event.metadata.location && (
                        <p className="text-stone-600 mb-2">
                          📍 {event.metadata.location}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link 
                href="/events"
                className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors"
              >
                View All Events
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Recent Articles Section */}
      {recentArticles.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-stone-900 mb-4">Latest from the Brewery</h2>
              <p className="text-xl text-stone-600">Read about our brewing process and news</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {recentArticles.map((article) => (
                <Link 
                  key={article.id}
                  href={`/news/${article.slug}`}
                  className="group"
                >
                  <div className="bg-stone-50 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                    {article.metadata.featured_image && (
                      <img
                        src={`${article.metadata.featured_image.imgix_url}?w=1200&h=400&fit=crop&auto=format,compress`}
                        alt={article.metadata.article_title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
                        width="600"
                        height="200"
                      />
                    )}
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        {article.metadata.category && (
                          <span className="bg-primary text-white text-xs px-3 py-1 rounded-full">
                            {article.metadata.category.value}
                          </span>
                        )}
                        <span className="text-sm text-stone-600">
                          {new Date(article.metadata.publication_date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric', 
                            year: 'numeric' 
                          })}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-stone-900 mb-3 group-hover:text-primary transition-colors">
                        {article.metadata.article_title}
                      </h3>
                      {article.metadata.author && (
                        <p className="text-sm text-stone-600">By {article.metadata.author}</p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link 
                href="/news"
                className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors"
              >
                View All Articles
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}