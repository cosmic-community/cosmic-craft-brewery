import { getNewsArticles } from '@/lib/cosmic'
import { NewsArticle } from '@/types'
import Link from 'next/link'

export const metadata = {
  title: 'News & Articles | Cosmic Craft Brewery',
  description: 'Read the latest brewing news, techniques, beer releases, and stories from Cosmic Craft Brewery.',
}

export default async function NewsPage() {
  const articles = await getNewsArticles() as NewsArticle[]

  return (
    <div className="py-16 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-stone-900 mb-4">News & Articles</h1>
          <p className="text-xl text-stone-600">
            Stories from the brewery and insights into our craft
          </p>
        </div>

        {articles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-stone-600">No articles available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <Link 
                key={article.id}
                href={`/news/${article.slug}`}
                className="group"
              >
                <article className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow h-full flex flex-col">
                  {article.metadata.featured_image && (
                    <img
                      src={`${article.metadata.featured_image.imgix_url}?w=800&h=500&fit=crop&auto=format,compress`}
                      alt={article.metadata.article_title}
                      className="w-full h-56 object-cover group-hover:scale-105 transition-transform"
                      width="400"
                      height="250"
                    />
                  )}
                  <div className="p-6 flex flex-col flex-grow">
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
                    <h2 className="text-xl font-bold text-stone-900 mb-3 group-hover:text-primary transition-colors flex-grow">
                      {article.metadata.article_title}
                    </h2>
                    {article.metadata.author && (
                      <p className="text-sm text-stone-600 mt-auto">
                        By {article.metadata.author}
                      </p>
                    )}
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}