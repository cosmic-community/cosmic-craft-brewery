# Cosmic Craft Brewery

![App Preview](https://imgix.cosmicjs.com/73155040-d0b5-11f0-b20e-1d251587b0cd-photo-1559526324-593bc073d938-1764813817946.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A beautiful, modern craft brewery website built with Next.js 16 and powered by Cosmic CMS. This application showcases brewery beers, events, articles, and brewery information with a responsive design optimized for all devices.

## Features

- 🍺 **Beer Catalog** - Browse all available beers with detailed information including ABV, IBU, style, and tasting notes
- 📅 **Events Calendar** - View upcoming brewery events with dates, times, and descriptions
- 📰 **News & Articles** - Read blog posts about brewing techniques, beer releases, and brewery news
- 🏭 **Brewery Information** - Learn about the brewery's story, hours, location, and contact details
- 📱 **Fully Responsive** - Optimized for desktop, tablet, and mobile viewing
- ⚡ **Server-Side Rendering** - Fast page loads with Next.js App Router
- 🎨 **Modern Design** - Clean interface with beautiful typography and imagery

## Clone this Project

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6930eb603584465d0a2f67b6&clone_repository=6930ed123584465d0a2f67da)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create a craft brewery website with content models for beers, brewery information, events, and news articles. Include fields for beer names, descriptions, ABV, IBU, beer styles, brewery history, upcoming events, and blog posts about brewing."

### Code Generation Prompt

> "Based on the content model I created for 'Create a craft brewery website with content models for beers, brewery information, events, and news articles. Include fields for beer names, descriptions, ABV, IBU, beer styles, brewery history, upcoming events, and blog posts about brewing.', now build a complete web application that showcases this content. Include a modern, responsive design with proper navigation, content display, and user-friendly interface."

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Cosmic CMS** - Headless CMS for content management
- **React** - UI component library

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account with the craft brewery bucket

### Installation

1. Clone the repository
2. Install dependencies:

```bash
bun install
```

3. Create a `.env.local` file with your Cosmic credentials:

```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
```

4. Run the development server:

```bash
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Cosmic SDK Examples

### Fetching Beers

```typescript
import { cosmic } from '@/lib/cosmic'

const { objects: beers } = await cosmic.objects
  .find({ type: 'beers' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching Events

```typescript
const { objects: events } = await cosmic.objects
  .find({ type: 'events' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching Articles

```typescript
const { objects: articles } = await cosmic.objects
  .find({ type: 'news-articles' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

## Cosmic CMS Integration

This application uses Cosmic CMS for all content management. The content is structured into four main types:

- **Beers** - Beer catalog with specifications and tasting notes
- **Events** - Upcoming brewery events and workshops
- **News Articles** - Blog posts categorized by topic
- **Brewery Info** - Singleton with brewery details and contact information

All content can be easily managed through the Cosmic dashboard without touching code.

## Deployment

### Deploy to Vercel

The easiest way to deploy this application is using Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone)

Make sure to add your environment variables in the Vercel dashboard:
- `COSMIC_BUCKET_SLUG`
- `COSMIC_READ_KEY`

### Deploy to Netlify

You can also deploy to Netlify:

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy)

Configure the same environment variables in Netlify's dashboard.

<!-- README_END -->