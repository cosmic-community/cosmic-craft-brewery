// app/news/[slug]/page.tsx
import { getArticleBySlug, getNewsArticles } from '@/lib/cosmic'
import { NewsArticle } from '@/types'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const articles = await getNewsArticles() as NewsArticle[]
  return articles.map((article) => ({
    slug: article.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = await getArticleBySlug(slug) as NewsArticle | null
  
  if (!article) {
    return {
      title: 'Article Not Found',
    }
  }

  return {
    title: `${article.metadata.article_title} | Cosmic Craft Brewery`,
    description: article.metadata.content.substring(0, 160),
  }
}

export default async function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = await getArticleBySlug(slug) as NewsArticle | null

  if (!article) {
    notFound()
  }

  return (
    <div className="py-16 bg-stone-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link 
          href="/news"
          className="inline-flex items-center text-primary hover:text-primary-dark mb-8 font-semibold"
        >
          ← Back to All Articles
        </Link>

        <article className="bg-white rounded-lg shadow-lg overflow-hidden">
          {article.metadata.featured_image && (
            <img
              src={`${article.metadata.featured_image.imgix_url}?w=1600&h=600&fit=crop&auto=format,compress`}
              alt={article.metadata.article_title}
              className="w-full h-96 object-cover"
              width="800"
              height="300"
            />
          )}
          
          <div className="p-8">
            <div className="flex items-center gap-3 mb-4">
              {article.metadata.category && (
                <span className="bg-primary text-white text-sm px-4 py-1 rounded-full">
                  {article.metadata.category.value}
                </span>
              )}
              <span className="text-stone-600">
                {new Date(article.metadata.publication_date).toLocaleDateString('en-US', { 
                  month: 'long', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}
              </span>
            </div>

            <h1 className="text-4xl font-bold text-stone-900 mb-4">
              {article.metadata.article_title}
            </h1>

            {article.metadata.author && (
              <p className="text-stone-600 mb-8">
                By {article.metadata.author}
              </p>
            )}

            <div 
              className="prose-content"
              dangerouslySetInnerHTML={{ __html: article.metadata.content }}
            />
          </div>
        </article>
      </div>
    </div>
  )
}