# Environment & Deployment Guide

This comprehensive guide covers environment setup, configuration, and deployment procedures including URL management and cleanup.

## 📋 Table of Contents

1. [Environment Variables Setup](#environment-variables-setup)
2. [Production Deployment](#production-deployment)
3. [URL Management & Cleanup](#url-management--cleanup)
4. [Monitoring & Maintenance](#monitoring--maintenance)

---

## Environment Variables Setup

### Environment Files

Next.js automatically loads environment variables based on the current environment:

- **`.env.local`** - Always loaded, ignored by git (for local development)
- **`.env.production`** - Only loaded when `NODE_ENV=production`
- **`.env.development`** - Only loaded when `NODE_ENV=development`
- **`.env`** - Always loaded (fallback)

### Required Environment Variables

#### Database Configuration

```
DATABASE_URI=your_database_connection_string
DATABASE_AUTH=your_database_auth_token
```

#### Email Configuration

```
EMAIL_FROM=your_email@domain.com
EMAIL_FROM_NAME=Your Name
RESEND_API_KEY=your_resend_api_key
```

#### Payload CMS

```
PAYLOAD_SECRET=your_payload_secret_key
```

#### Preview Functionality

```
PREVIEW_SECRET=your_preview_secret
```

#### S3 Storage Configuration

```
S3_UPLOAD_BUCKET=your_s3_bucket_name
S3_UPLOAD_REGION=your_s3_region
S3_UPLOAD_KEY=your_s3_access_key
S3_UPLOAD_SECRET=your_s3_secret_key
S3_ROOT=your_s3_root_path
S3_CUSTOM_DOMAIN=your_custom_domain
```

#### Server URL (for production)

```
NEXT_PUBLIC_SERVER_URL=https://your-domain.com
```

#### Cron Jobs (optional)

```
CRON_SECRET=your_cron_secret
```

#### Vercel (auto-provided in production)

```
VERCEL_PROJECT_PRODUCTION_URL=your-vercel-project.vercel.app
```

### Local Development Setup

1. Copy your existing `.env.local` file
2. Update values as needed for local development
3. Never commit this file to version control

### Security Best Practices

- ✅ Never commit `.env.local` or `.env.production` to git
- ✅ Use different secrets for development and production
- ✅ Rotate secrets regularly
- ✅ Use platform-specific environment variable management when possible
- ❌ Don't hardcode secrets in your code
- ❌ Don't share environment files in chat or email

### Structured Data Dependencies

#### schema-dts Package

The project now includes the `schema-dts` package for type-safe structured data:

```bash
# Install schema-dts for TypeScript support
pnpm add schema-dts
```

#### Whitelabel Configuration

Structured data settings are configurable in `src/config/whitelabel.ts`:

```typescript
export const whitelabel = {
  // ... other config
  structuredData: {
    addressCountry: 'US', // Update to your country
    contactType: ['customer service', 'sales'],
    socialMedia: {
      twitter: 'https://twitter.com/yourbrand',
      linkedin: 'https://linkedin.com/company/yourbrand',
      // Add more social media URLs as needed
    },
  },
}
```

#### Type Safety

The structured data implementation provides:

- Full TypeScript support for all schema.org types
- IntelliSense autocomplete for properties
- Compile-time error checking
- Type-safe JSON-LD generation

---

## Production Deployment

### Option 1: Platform Environment Variables (Recommended)

For production deployments on platforms like Vercel, Railway, or Netlify:

1. **Keep `.env.local` for local development only**
2. **Set environment variables directly in your hosting platform's dashboard**
3. **Never commit production secrets to your repository**

### Option 2: Using .env.production

If you need a `.env.production` file:

1. **Create `.env.production` with production-specific values**
2. **The file is already in `.gitignore`**
3. **Use different values than your local development**

### Production Database Setup

Your production database can be created by branching from your development database using the Turso CLI:

#### Database Branching Command

```bash
# Replace the names as needed
# Syntax:
turso db create my-new-database-branch --from-db my-existing-database

# For this project:
turso db create hyperfuse-website-prod-v1 --from-db hyperfuse-website-dev-v3
```

#### Database Details

- **Name**: `hyperfuse-website-prod-v1`
- **URL**: `libsql://hyperfuse-website-prod-v1-aliy321.aws-ap-northeast-1.turso.io`
- **Parent**: `hyperfuse-website-dev-v3` (branched from development)

#### Production Environment Variables

For production, use these database connection details:

```
DATABASE_URI=libsql://hyperfuse-website-prod-v1-aliy321.aws-ap-northeast-1.turso.io
DATABASE_AUTH=your_production_database_auth_token
```

#### Database Management Commands

```bash
# View production database info
turso db show hyperfuse-website-prod-v1

# Create new auth token (if needed)
turso db tokens create hyperfuse-website-prod-v1

# Access SQL shell
turso db shell hyperfuse-website-prod-v1
```

---

## URL Management & Cleanup

### The Problem

When you update your website structure, Google still indexes old URLs that no longer exist. This creates 404 errors and poor user experience.

### Solutions to Remove Old URLs

#### 1. Submit Updated Sitemap to Google Search Console

##### Step 1: Access Google Search Console

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add your property: `https://hyperfuse.studio`
3. Verify ownership (usually via DNS or HTML file)

##### Step 2: Submit Your Sitemap

1. In Search Console, go to **Sitemaps**
2. Submit your sitemap: `https://hyperfuse.studio/sitemap.xml`
3. Also submit individual sitemaps:
   - `https://hyperfuse.studio/blogs-sitemap.xml`
   - `https://hyperfuse.studio/projects-sitemap.xml`
   - `https://hyperfuse.studio/posts-sitemap.xml`

##### Step 3: Request Indexing

1. Go to **URL Inspection** in Search Console
2. Enter your main URLs (homepage, about, etc.)
3. Click **Request Indexing**

#### 2. Create 301 Redirects for Old URLs

If you have old URLs that should redirect to new ones, create redirects:

```typescript
// In your redirects.js or next.config.js
const redirects = [
  {
    source: '/old-blog-post',
    destination: '/posts/new-blog-post',
    permanent: true, // 301 redirect
  },
  {
    source: '/old-project',
    destination: '/projects/new-project',
    permanent: true,
  },
]
```

#### 3. Update robots.txt

Make sure your robots.txt is properly configured:

```txt
User-agent: *
Disallow: /admin/
Allow: /

Sitemap: https://hyperfuse.studio/sitemap.xml
Sitemap: https://hyperfuse.studio/blogs-sitemap.xml
Sitemap: https://hyperfuse.studio/projects-sitemap.xml
Sitemap: https://hyperfuse.studio/posts-sitemap.xml
```

#### 4. Use Google's URL Removal Tool

##### Temporary Removal (6 months)

1. In Search Console, go to **Removals**
2. Click **New Request**
3. Enter the old URL you want removed
4. Select **Temporarily hide**
5. Submit the request

##### Permanent Removal

1. Add `noindex` meta tag to old pages
2. Or return 404 status for non-existent pages
3. Submit removal request in Search Console

#### 5. Monitor 404 Errors

##### Check Your 404 Logs

```bash
# Check your server logs for 404 errors
# Common old URLs that might be causing issues:
# - /old-blog-posts/*
# - /old-projects/*
# - /old-pages/*
```

##### Create Custom 404 Page

```tsx
// pages/404.tsx or app/not-found.tsx
export default function Custom404() {
  return (
    <div>
      <h1>Page Not Found</h1>
      <p>
        This page doesn't exist. <a href="/">Go home</a>
      </p>
    </div>
  )
}
```

### Step-by-Step Process

#### Week 1: Immediate Actions

1. ✅ **Submit sitemap** to Google Search Console
2. ✅ **Request indexing** of main pages
3. ✅ **Check for 404 errors** in your logs
4. ✅ **Update robots.txt** if needed

#### Week 2: Redirects and Monitoring

1. ✅ **Create 301 redirects** for old URLs
2. ✅ **Monitor Search Console** for crawl errors
3. ✅ **Submit removal requests** for old URLs
4. ✅ **Check indexing status** of new pages

#### Week 3: Optimization

1. ✅ **Monitor search performance**
2. ✅ **Check Core Web Vitals**
3. ✅ **Verify structured data**
4. ✅ **Test breadcrumb functionality**

### Quick Commands

#### Rebuild and Deploy

```bash
# Rebuild your site with updated sitemap
npm run build
npm run postbuild

# Deploy to production
git add .
git commit -m "Update sitemap and remove old URLs"
git push
```

#### Check Sitemap

```bash
# Test your sitemap
curl https://hyperfuse.studio/sitemap.xml
curl https://hyperfuse.studio/blogs-sitemap.xml
curl https://hyperfuse.studio/projects-sitemap.xml
```

#### Check robots.txt

```bash
curl https://hyperfuse.studio/robots.txt
```

---

## Monitoring & Maintenance

### Google Search Console Metrics to Watch

- **Coverage**: Pages indexed vs. errors
- **Performance**: Click-through rates
- **Core Web Vitals**: Page speed metrics
- **Mobile Usability**: Mobile-friendly issues

### Expected Timeline

- **1-2 weeks**: Google starts re-crawling
- **2-4 weeks**: Old URLs start disappearing
- **4-8 weeks**: New URLs fully indexed
- **8-12 weeks**: Complete transition

### Common Issues and Solutions

#### Issue: Old URLs still showing

**Solution**:

- Submit removal request in Search Console
- Add `noindex` meta tags
- Create 301 redirects

#### Issue: New URLs not indexed

**Solution**:

- Submit sitemap to Search Console
- Request indexing manually
- Check for crawl errors

#### Issue: 404 errors

**Solution**:

- Create custom 404 page
- Set up 301 redirects
- Monitor server logs

### Success Checklist

- [ ] Sitemap submitted to Google Search Console
- [ ] Main pages requested for indexing
- [ ] 301 redirects created for old URLs
- [ ] robots.txt updated
- [ ] 404 errors monitored
- [ ] Removal requests submitted for old URLs
- [ ] New pages indexed and ranking

This comprehensive guide will help you manage your environment setup and maintain clean URLs for optimal SEO performance.
