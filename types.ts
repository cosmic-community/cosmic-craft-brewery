// Comprehensive type definitions for Cosmic CMS objects

// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Beer object type
export interface Beer extends CosmicObject {
  type: 'beers';
  metadata: {
    beer_name: string;
    description: string;
    tasting_notes?: string;
    abv: number;
    ibu: number;
    beer_style: {
      key: string;
      value: string;
    };
    seasonal: boolean;
    available: boolean;
    beer_image?: {
      url: string;
      imgix_url: string;
    };
  };
}

// Event object type
export interface Event extends CosmicObject {
  type: 'events';
  metadata: {
    event_name: string;
    event_date: string;
    start_time: string;
    end_time?: string;
    description: string;
    location?: string;
    event_image?: {
      url: string;
      imgix_url: string;
    };
  };
}

// News Article object type
export interface NewsArticle extends CosmicObject {
  type: 'news-articles';
  metadata: {
    article_title: string;
    content: string;
    publication_date: string;
    author?: string;
    featured_image?: {
      url: string;
      imgix_url: string;
    };
    category?: {
      key: string;
      value: string;
    };
  };
}

// Brewery Info object type (singleton)
export interface BreweryInfo extends CosmicObject {
  type: 'brewery-info';
  metadata: {
    brewery_name: string;
    tagline?: string;
    history: string;
    address: string;
    phone: string;
    email: string;
    hours: string;
    brewery_photos?: Array<{
      url: string;
      imgix_url: string;
    }>;
  };
}

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
}

// Type guards for runtime validation
export function isBeer(obj: CosmicObject): obj is Beer {
  return obj.type === 'beers';
}

export function isEvent(obj: CosmicObject): obj is Event {
  return obj.type === 'events';
}

export function isNewsArticle(obj: CosmicObject): obj is NewsArticle {
  return obj.type === 'news-articles';
}

export function isBreweryInfo(obj: CosmicObject): obj is BreweryInfo {
  return obj.type === 'brewery-info';
}