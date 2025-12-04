// app/events/[slug]/page.tsx
import { getEventBySlug, getEvents } from '@/lib/cosmic'
import { Event } from '@/types'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const events = await getEvents() as Event[]
  return events.map((event) => ({
    slug: event.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const event = await getEventBySlug(slug) as Event | null
  
  if (!event) {
    return {
      title: 'Event Not Found',
    }
  }

  return {
    title: `${event.metadata.event_name} | Cosmic Craft Brewery`,
    description: event.metadata.description,
  }
}

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const event = await getEventBySlug(slug) as Event | null

  if (!event) {
    notFound()
  }

  return (
    <div className="py-16 bg-stone-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link 
          href="/events"
          className="inline-flex items-center text-primary hover:text-primary-dark mb-8 font-semibold"
        >
          ← Back to All Events
        </Link>

        <article className="bg-white rounded-lg shadow-lg overflow-hidden">
          {event.metadata.event_image && (
            <img
              src={`${event.metadata.event_image.imgix_url}?w=1600&h=600&fit=crop&auto=format,compress`}
              alt={event.metadata.event_name}
              className="w-full h-96 object-cover"
              width="800"
              height="300"
            />
          )}
          
          <div className="p-8">
            <h1 className="text-4xl font-bold text-stone-900 mb-6">
              {event.metadata.event_name}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 p-6 bg-stone-50 rounded-lg">
              <div>
                <div className="text-sm text-stone-600 mb-1">Date</div>
                <div className="font-semibold text-stone-900">
                  📅 {new Date(event.metadata.event_date).toLocaleDateString('en-US', { 
                    weekday: 'long',
                    month: 'long', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}
                </div>
              </div>
              <div>
                <div className="text-sm text-stone-600 mb-1">Time</div>
                <div className="font-semibold text-stone-900">
                  🕐 {event.metadata.start_time}
                  {event.metadata.end_time && ` - ${event.metadata.end_time}`}
                </div>
              </div>
              {event.metadata.location && (
                <div className="md:col-span-2">
                  <div className="text-sm text-stone-600 mb-1">Location</div>
                  <div className="font-semibold text-stone-900">
                    📍 {event.metadata.location}
                  </div>
                </div>
              )}
            </div>

            <div 
              className="prose-content"
              dangerouslySetInnerHTML={{ __html: event.metadata.description }}
            />
          </div>
        </article>
      </div>
    </div>
  )
}