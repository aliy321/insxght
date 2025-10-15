# Quick Reference Guide

This guide provides quick access to common SEO testing procedures and breadcrumb implementation examples.

## 📋 Table of Contents

1. [Quick SEO Testing](#quick-seo-testing)
2. [Breadcrumb Implementation](#breadcrumb-implementation)
3. [Common Commands](#common-commands)

---

## Quick SEO Testing

### Browser Inspection Testing

#### 1. Check Structured Data (JSON-LD)

1. **Open your website** in Chrome/Firefox
2. **Right-click → "Inspect Element"** (or press F12)
3. **Go to the `<head>` section**
4. **Look for `<script type="application/ld+json">` tags**

**What you should see:**

```html
<script id="structured-data-graph" type="application/ld+json" data-nscript="afterInteractive">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Smooth Groove Consultancy",
        "url": "http://localhost:3000",
        "logo": "http://localhost:3000/whitelabel/logo.svg",
        "description": "Helping startups and SMEs get back in groove...",
        "sameAs": ["https://twitter.com/smooth_groove_consultancy"],
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": ["customer service", "sales"],
          "email": "contact@smoothgrooveconsultancy.com"
        },
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "SG"
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Smooth Groove Consultancy",
        "url": "http://localhost:3000",
        "description": "Helping startups and SMEs get back in groove...",
        "publisher": {
          "@type": "Organization",
          "name": "Smooth Groove Consultancy"
        }
      }
    ]
  }
</script>
```

**Quick Test:**

- ✅ **Organization schema** on all pages (via layout)
- ✅ **Website schema** on all pages (via layout)
- ✅ **Article schema** on blog posts (page-specific)
- ✅ **Breadcrumb schema** on content pages (page-specific)
- ✅ **FAQ schema** on FAQ pages (page-specific)

#### 2. Check Meta Tags

**In the same `<head>` section, look for:**

##### Title Tag

```html
<title>Hyperfuse Studio | Where Renaissance meets Innovation</title>
```

##### Meta Description

```html
<meta
  name="description"
  content="Where the spirit of the Renaissance meets modern innovation. We craft digital solutions with the precision of master artisans and the vision of true pioneers."
/>
```

##### Canonical URL

```html
<link rel="canonical" href="https://yourdomain.com/" />
```

##### Open Graph Tags

```html
<meta property="og:title" content="Hyperfuse Studio" />
<meta
  property="og:description"
  content="Where the spirit of the Renaissance meets modern innovation..."
/>
<meta property="og:image" content="https://yourdomain.com/website-template-OG.webp" />
<meta property="og:url" content="https://yourdomain.com/" />
<meta property="og:type" content="website" />
```

##### Twitter Card Tags

```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Hyperfuse Studio" />
<meta
  name="twitter:description"
  content="Where the spirit of the Renaissance meets modern innovation..."
/>
<meta name="twitter:image" content="https://yourdomain.com/website-template-OG.webp" />
<meta name="twitter:creator" content="@hyperfuse_studio" />
```

#### 3. Quick Console Test

**Open browser console (F12 → Console tab) and run:**

```javascript
// Test structured data
const structuredData = document.querySelectorAll('script[type="application/ld+json"]')
console.log('Structured Data Found:', structuredData.length)
structuredData.forEach((script, i) => {
  try {
    const data = JSON.parse(script.textContent)
    console.log(`Script ${i + 1}:`, data['@type'])
  } catch (e) {
    console.log(`Script ${i + 1}: Invalid JSON`)
  }
})

// Test meta tags
const metaTest = {
  title: document.title,
  description: document.querySelector('meta[name="description"]')?.content,
  canonical: document.querySelector('link[rel="canonical"]')?.href,
  ogTitle: document.querySelector('meta[property="og:title"]')?.content,
  ogDescription: document.querySelector('meta[property="og:description"]')?.content,
  ogImage: document.querySelector('meta[property="og:image"]')?.content,
  twitterCard: document.querySelector('meta[name="twitter:card"]')?.content,
}
console.log('Meta Tags Test:', metaTest)
```

#### 4. Test Different Pages

**Check these pages specifically:**

##### Homepage (`/`)

- ✅ Organization schema
- ✅ Website schema
- ✅ Homepage-specific meta tags

##### Blog Post (`/posts/your-post-slug`)

- ✅ Article/BlogPosting schema
- ✅ Author information
- ✅ Publication date
- ✅ Categories

##### Project Page (`/projects/your-project-slug`)

- ✅ Project schema
- ✅ Category information
- ✅ Technology stack
- ✅ Project details

#### 5. Visual Indicators

**Look for these in the page source:**

##### ✅ Good Signs:

- Multiple `<script type="application/ld+json">` tags
- Complete Open Graph tags
- Twitter Card tags
- Canonical URLs
- Proper meta descriptions

##### ❌ Warning Signs:

- Missing structured data
- Generic meta descriptions
- Missing Open Graph tags
- No canonical URLs
- Duplicate content

#### 6. Quick Checklist

**For each page, verify:**

- [ ] **Title tag** is present and unique
- [ ] **Meta description** is present and descriptive
- [ ] **Canonical URL** is present
- [ ] **Open Graph tags** are complete
- [ ] **Twitter Card tags** are present
- [ ] **Structured data** is present (JSON-LD)
- [ ] **No duplicate content** issues

#### 7. Test URLs

**Test these specific URLs:**

```bash
# Development
http://localhost:3000/
http://localhost:3000/posts/your-post
http://localhost:3000/projects/your-project

# Production
https://yourdomain.com/
https://yourdomain.com/posts/your-post
https://yourdomain.com/projects/your-project
```

#### 8. Expected Results

**You should see:**

##### Homepage:

```html
<!-- Organization Schema (Type-Safe) -->
<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Your Brand Name",
    "url": "https://yourdomain.com",
    "logo": "https://yourdomain.com/logo.png",
    "description": "Your brand description",
    "sameAs": ["https://twitter.com/yourbrand"],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": ["customer service", "sales"],
      "email": "contact@yourdomain.com"
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US"
    }
  }
</script>

<!-- Website Schema -->
<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Your Brand Name",
    "url": "https://yourdomain.com",
    "description": "Your brand description",
    "publisher": {
      "@type": "Organization",
      "name": "Your Brand Name"
    }
  }
</script>
```

##### Blog Post:

```html
<!-- Article Schema (Type-Safe) -->
<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "Post Title",
    "description": "Post description",
    "author": {
      "@type": "Person",
      "name": "Author Name"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Your Brand Name",
      "logo": {
        "@type": "ImageObject",
        "url": "https://yourdomain.com/logo.png"
      }
    },
    "datePublished": "2024-01-01T00:00:00Z",
    "dateModified": "2024-01-01T00:00:00Z",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://yourdomain.com/posts/post-slug"
    }
  }
</script>
```

##### Project Page:

```html
<!-- Project Schema (Type-Safe) -->
<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Project",
    "name": "Project Title",
    "description": "Project description",
    "url": "https://yourdomain.com/projects/project-slug",
    "creator": {
      "@type": "Organization",
      "name": "Your Brand Name"
    },
    "dateCreated": "2024-01-01",
    "keywords": ["web development", "react", "typescript"]
  }
</script>
```

#### 9. Common Issues to Check

##### ❌ Missing Structured Data

- Check if `StructuredData` component is imported
- Verify the component is rendered in the page

##### ❌ Generic Meta Tags

- Check if `getPageSEO` is being called
- Verify Payload admin has SEO data configured

##### ❌ Missing Images

- Check if Open Graph images are set
- Verify image URLs are accessible

##### ❌ Invalid JSON-LD

- Check browser console for JSON errors
- Validate structured data syntax

#### 10. Quick Fix Commands

**If tests fail:**

```bash
# Rebuild the site
npm run build

# Restart development server
npm run dev

# Check for TypeScript errors
npm run type-check

# Lint the code
npm run lint
```

---

## Breadcrumb Implementation

### How to Add Breadcrumbs to Project Pages

#### Example: Project Page Breadcrumbs

```tsx
// In src/app/(frontend)/(pages)/projects/[slug]/page.tsx

import { Breadcrumbs } from '@/components/Breadcrumbs'

export default async function Projects({ params: paramsPromise }: Args) {
  const { slug = '' } = await paramsPromise
  const project = await queryProjectBySlug({ slug })

  if (!project) return <PayloadRedirects url={url} />

  // Create breadcrumb items
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Projects', href: '/projects' },
    { label: project.title, href: `/projects/${project.slug}`, isCurrent: true },
  ]

  return (
    <article className="pt-16">
      <StructuredData type="project" data={project} />

      {/* Add breadcrumbs */}
      <div className="container mb-8">
        <Breadcrumbs items={breadcrumbItems} />
      </div>

      <div className="max-md:p-5 p-10 space-y-20 !pb-24">{/* Rest of your project content */}</div>
    </article>
  )
}
```

#### Example: Blog Post Breadcrumbs

```tsx
// In src/app/(frontend)/(pages)/posts/[slug]/page.tsx

import { Breadcrumbs } from '@/components/Breadcrumbs'

export default async function Post({ params: paramsPromise }: Args) {
  const { slug = '' } = await paramsPromise
  const post = await queryPostBySlug({ slug })

  if (!post) return <PayloadRedirects url={url} />

  // Create breadcrumb items
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/posts' },
    { label: post.title, href: `/posts/${post.slug}`, isCurrent: true },
  ]

  return (
    <article className="pt-16 pb-16">
      <StructuredData type="article" data={post} />

      {/* Add breadcrumbs */}
      <div className="container mb-8">
        <Breadcrumbs items={breadcrumbItems} />
      </div>

      <PostHero post={post} />
      {/* Rest of your blog content */}
    </article>
  )
}
```

### SEO Benefits

#### 1. Rich Snippets in Search Results

Google can show breadcrumbs in search results:

```
Hyperfuse Studio > Projects > E-commerce Platform
hyperfuse.com/projects/ecommerce-platform
```

#### 2. Better Site Structure

Search engines understand your site hierarchy:

```
Home
├── About
├── Projects
│   ├── Web Development
│   └── Mobile Apps
├── Blog
│   ├── Technology
│   └── Design
└── Contact
```

#### 3. Improved User Experience

- Users can easily navigate back
- Clear indication of current location
- Reduced bounce rate

### When to Use Breadcrumbs

#### ✅ Use Breadcrumbs On:

- Project detail pages
- Blog post pages
- Category pages
- Any page 2+ levels deep
- E-commerce product pages

#### ❌ Don't Use Breadcrumbs On:

- Homepage
- Main navigation pages (About, Contact)
- Single-level pages

## Type-Safe Structured Data with schema-dts

### Overview

Our structured data implementation now uses the `schema-dts` package for full TypeScript support, ensuring type safety and better developer experience.

### Quick Setup

#### 1. Install Package

```bash
pnpm add schema-dts
```

#### 2. Basic Usage

```typescript
import type { Organization, WithContext } from 'schema-dts'
import { createStructuredData } from '@/utilities/structuredData'

// Create type-safe structured data
const orgData: WithContext<Organization> = createStructuredData<Organization>({
  '@type': 'Organization',
  name: 'Your Brand Name',
  url: 'https://yourdomain.com',
  // ... other properties with full TypeScript support
})
```

#### 3. Pre-built Functions

```typescript
// Use pre-built generators
const orgData = generateOrganizationData()
const websiteData = generateWebsiteData()
const articleData = generateArticleData(post)
const breadcrumbData = generateBreadcrumbData(breadcrumbs)
const faqData = generateFAQData(faqs)
```

#### 4. Multiple Schemas

```typescript
// Combine multiple schemas in one document
const graph = createStructuredDataGraph([
  generateOrganizationData(),
  generateWebsiteData(),
  articleData,
])
```

### Benefits

#### ✅ Type Safety

- Full TypeScript support for all schema.org types
- IntelliSense autocomplete for properties
- Compile-time error checking

#### ✅ Developer Experience

- Better IDE support
- Easier refactoring
- Self-documenting code

#### ✅ Maintainability

- Centralized configuration in whitelabel
- Reusable functions
- Consistent structure across the site

### Testing Breadcrumbs

#### Visual Test:

1. Navigate to a project page
2. Look for breadcrumb navigation
3. Click through breadcrumb links
4. Verify they work correctly

#### Structured Data Test:

```javascript
// In browser console
const breadcrumbScript = document.querySelector('script[type="application/ld+json"]')
if (breadcrumbScript) {
  const data = JSON.parse(breadcrumbScript.textContent)
  if (data['@type'] === 'BreadcrumbList') {
    console.log('✅ Breadcrumb structured data found:', data)
  }
}
```

### Testing Type-Safe Structured Data

#### 1. TypeScript Compilation Test:

```bash
# Run type check to ensure no TypeScript errors
pnpm type-check
```

#### 2. Runtime Validation:

```javascript
// Test all structured data on a page
const structuredDataScripts = document.querySelectorAll('script[type="application/ld+json"]')
console.log(`Found ${structuredDataScripts.length} structured data scripts`)

structuredDataScripts.forEach((script, index) => {
  try {
    const data = JSON.parse(script.textContent)
    console.log(`✅ Script ${index + 1}:`, data['@type'], data)
  } catch (error) {
    console.error(`❌ Script ${index + 1} has invalid JSON:`, error)
  }
})
```

#### 3. Schema.org Validation:

1. Visit [Schema.org Validator](https://validator.schema.org/)
2. Enter your URL or paste JSON-LD code
3. Verify all structured data is valid

#### 4. Google Rich Results Test:

1. Visit [Google Rich Results Test](https://search.google.com/test/rich-results)
2. Enter your URL
3. Check for any errors or warnings

### Styling Options

#### Default Style:

```tsx
<Breadcrumbs items={breadcrumbItems} />
```

#### Custom Styling:

```tsx
<Breadcrumbs items={breadcrumbItems} className="text-sm text-gray-600 mb-4" />
```

#### With Icons:

```tsx
<Breadcrumbs items={breadcrumbItems} className="flex items-center space-x-2 text-sm" />
```

---

## Common Commands

### Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Type checking
npm run typecheck

# Lint code
npm run lint

# Test specific pages
curl http://localhost:3000/
curl http://localhost:3000/posts/your-post
curl http://localhost:3000/projects/your-project
```

### Production Commands

```bash
# Test production URLs
curl https://yourdomain.com/
curl https://yourdomain.com/sitemap.xml
curl https://yourdomain.com/robots.txt

# Validate structured data
curl https://yourdomain.com/ | grep -o '<script[^>]*application/ld+json[^>]*>.*</script>'
```

### SEO Testing Commands

```bash
# Check sitemaps
curl https://yourdomain.com/sitemap.xml
curl https://yourdomain.com/blogs-sitemap.xml
curl https://yourdomain.com/projects-sitemap.xml

# Check robots.txt
curl https://yourdomain.com/robots.txt
```

This quick reference guide provides immediate access to the most commonly used SEO testing procedures and breadcrumb implementation examples!
