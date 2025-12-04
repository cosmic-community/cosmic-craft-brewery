import { getEvents } from '@/lib/cosmic'
import { Event } from '@/types'
import Link from 'next/link'

export const metadata = {
  title: 'Events | Cosmic Craft Brewery',
  description: 'Join us for live music, brewing workshops, beer releases, and special events at Cosmic Craft Brewery.',
}

export default async function EventsPage() {
  const events = await getEvents() as Event[]

  return (
    <div className="py-16 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-stone-900 mb-4">Upcoming Events</h1>
          <p className="text-xl text-stone-600">
            Join us for great beer, good times, and community
          </p>
        </div>

        {events.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-stone-600">No upcoming events at the moment. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {events.map((event) => (
              <Link 
                key={event.id}
                href={`/events/${event.slug}`}
                className="group"
              >
                <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow h-full">
                  {event.metadata.event_image && (
                    <img
                      src={`${event.metadata.event_image.imgix_url}?w=1200&h=500&fit=crop&auto=format,compress`}
                      alt={event.metadata.event_name}
                      className="w-full h-56 object-cover group-hover:scale-105 transition-transform"
                      width="600"
                      height="250"
                    />
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-3 text-sm text-stone-600">
                      <span className="flex items-center gap-1">
                        📅 {new Date(event.metadata.event_date).toLocaleDateString('en-US', { 
                          weekday: 'long',
                          month: 'long', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 mb-4 text-sm text-stone-600">
                      <span className="flex items-center gap-1">
                        🕐 {event.metadata.start_time}
                        {event.metadata.end_time && ` - ${event.metadata.end_time}`}
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold text-stone-900 mb-3 group-hover:text-primary transition-colors">
                      {event.metadata.event_name}
                    </h2>
                    {event.metadata.location && (
                      <p className="text-stone-600 mb-3 flex items-center gap-1">
                        📍 {event.metadata.location}
                      </p>
                    )}
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