import { createBucketClient } from '@cosmicjs/sdk'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
})

// Simple error helper for Cosmic SDK
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Fetch all beers
export async function getBeers() {
  try {
    const response = await cosmic.objects
      .find({ type: 'beers' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch beers');
  }
}

// Fetch single beer by slug
export async function getBeerBySlug(slug: string) {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'beers', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.object;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch beer');
  }
}

// Fetch all events
export async function getEvents() {
  try {
    const response = await cosmic.objects
      .find({ type: 'events' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    // Sort events by date (newest first)
    return response.objects.sort((a: any, b: any) => {
      const dateA = new Date(a.metadata?.event_date || '').getTime();
      const dateB = new Date(b.metadata?.event_date || '').getTime();
      return dateB - dateA;
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch events');
  }
}

// Fetch single event by slug
export async function getEventBySlug(slug: string) {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'events', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.object;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch event');
  }
}

// Fetch all news articles
export async function getNewsArticles() {
  try {
    const response = await cosmic.objects
      .find({ type: 'news-articles' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    // Sort articles by publication date (newest first)
    return response.objects.sort((a: any, b: any) => {
      const dateA = new Date(a.metadata?.publication_date || '').getTime();
      const dateB = new Date(b.metadata?.publication_date || '').getTime();
      return dateB - dateA;
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch news articles');
  }
}

// Fetch single article by slug
export async function getArticleBySlug(slug: string) {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'news-articles', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.object;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch article');
  }
}

// Fetch brewery info (singleton)
export async function getBreweryInfo() {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'brewery-info' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.object;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch brewery info');
  }
}