import { getBreweryInfo } from '@/lib/cosmic'
import { BreweryInfo } from '@/types'

export const metadata = {
  title: 'About Us | Cosmic Craft Brewery',
  description: 'Learn about Cosmic Craft Brewery\'s history, brewing philosophy, and commitment to exceptional craft beer.',
}

export default async function AboutPage() {
  const breweryInfo = await getBreweryInfo() as BreweryInfo | null

  if (!breweryInfo) {
    return (
      <div className="py-16 bg-stone-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xl text-stone-600 text-center">
            Brewery information is currently unavailable.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="py-16 bg-stone-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-stone-900 mb-4">
            {breweryInfo.metadata.brewery_name}
          </h1>
          {breweryInfo.metadata.tagline && (
            <p className="text-2xl text-primary font-semibold">
              {breweryInfo.metadata.tagline}
            </p>
          )}
        </div>

        {/* Brewery Photos */}
        {breweryInfo.metadata.brewery_photos && breweryInfo.metadata.brewery_photos.length > 0 && (
          <div className="mb-12 grid grid-cols-1 md:grid-cols-3 gap-4">
            {breweryInfo.metadata.brewery_photos.map((photo, index) => (
              <img
                key={index}
                src={`${photo.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
                alt={`${breweryInfo.metadata.brewery_name} - Photo ${index + 1}`}
                className="w-full h-64 object-cover rounded-lg shadow-md"
                width="400"
                height="300"
              />
            ))}
          </div>
        )}

        {/* History Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div 
            className="prose-content"
            dangerouslySetInnerHTML={{ __html: breweryInfo.metadata.history }}
          />
        </div>

        {/* Contact & Hours Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-stone-900 mb-6">Visit Us</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-stone-900 mb-2">Address</h3>
                <p className="text-stone-700 whitespace-pre-line">
                  {breweryInfo.metadata.address}
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-stone-900 mb-2">Phone</h3>
                <a 
                  href={`tel:${breweryInfo.metadata.phone}`}
                  className="text-primary hover:text-primary-dark"
                >
                  {breweryInfo.metadata.phone}
                </a>
              </div>

              <div>
                <h3 className="font-semibold text-stone-900 mb-2">Email</h3>
                <a 
                  href={`mailto:${breweryInfo.metadata.email}`}
                  className="text-primary hover:text-primary-dark"
                >
                  {breweryInfo.metadata.email}
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-stone-900 mb-6">Hours of Operation</h2>
            <p className="text-stone-700 whitespace-pre-line leading-relaxed">
              {breweryInfo.metadata.hours}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}