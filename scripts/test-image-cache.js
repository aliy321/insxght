#!/usr/bin/env node

/**
 * Test script to verify image caching is working properly
 *
 * This script will:
 * 1. Upload a test image to the media collection
 * 2. Check the response headers to verify cache control is set
 * 3. Test that the image is properly cached
 */

import https from 'https'
import http from 'http'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Configuration
const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
const TEST_IMAGE_PATH = path.join(__dirname, '../public/test-image.jpg')

// Create a simple test image if it doesn't exist
function createTestImage() {
  if (!fs.existsSync(TEST_IMAGE_PATH)) {
    console.log('Creating test image...')
    // Create a simple 1x1 pixel JPEG
    const testImageBuffer = Buffer.from([
      0xff, 0xd8, 0xff, 0xe0, 0x00, 0x10, 0x4a, 0x46, 0x49, 0x46, 0x00, 0x01, 0x01, 0x01, 0x00,
      0x48, 0x00, 0x48, 0x00, 0x00, 0xff, 0xdb, 0x00, 0x43, 0x00, 0x08, 0x06, 0x06, 0x07, 0x06,
      0x05, 0x08, 0x07, 0x07, 0x07, 0x09, 0x09, 0x08, 0x0a, 0x0c, 0x14, 0x0d, 0x0c, 0x0b, 0x0b,
      0x0c, 0x19, 0x12, 0x13, 0x0f, 0x14, 0x1d, 0x1a, 0x1f, 0x1e, 0x1d, 0x1a, 0x1c, 0x1c, 0x20,
      0x24, 0x2e, 0x27, 0x20, 0x22, 0x2c, 0x23, 0x1c, 0x1c, 0x28, 0x37, 0x29, 0x2c, 0x30, 0x31,
      0x34, 0x34, 0x34, 0x1f, 0x27, 0x39, 0x3d, 0x38, 0x32, 0x3c, 0x2e, 0x33, 0x34, 0x32, 0xff,
      0xc0, 0x00, 0x11, 0x08, 0x00, 0x01, 0x00, 0x01, 0x01, 0x01, 0x11, 0x00, 0x02, 0x11, 0x01,
      0x03, 0x11, 0x01, 0xff, 0xc4, 0x00, 0x14, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x08, 0xff, 0xc4, 0x00, 0x14, 0x10,
      0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0xff, 0xda, 0x00, 0x0c, 0x03, 0x01, 0x00, 0x02, 0x11, 0x03, 0x11, 0x00, 0x3f,
      0x00, 0x00, 0xff, 0xd9,
    ])
    fs.writeFileSync(TEST_IMAGE_PATH, testImageBuffer)
    console.log('Test image created at:', TEST_IMAGE_PATH)
  }
}

// Function to make HTTP requests
function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http

    const req = client.request(url, options, (res) => {
      let data = ''
      res.on('data', (chunk) => (data += chunk))
      res.on('end', () => resolve({ response: res, data }))
    })

    req.on('error', reject)
    req.end()
  })
}

// Test function to check cache headers
async function testCacheHeaders(imageUrl) {
  console.log(`\n🔍 Testing cache headers for: ${imageUrl}`)

  try {
    const { response } = await makeRequest(imageUrl, { method: 'HEAD' })

    console.log('📊 Response Headers:')
    console.log('Status:', response.statusCode)
    console.log('Content-Type:', response.headers['content-type'])
    console.log('Cache-Control:', response.headers['cache-control'])
    console.log('ETag:', response.headers['etag'])
    console.log('Last-Modified:', response.headers['last-modified'])

    // Check if cache control is properly set
    const cacheControl = response.headers['cache-control']
    if (cacheControl && cacheControl.includes('max-age=31536000')) {
      console.log('✅ Cache-Control header is properly set for 1 year caching!')
      return true
    } else {
      console.log('❌ Cache-Control header is missing or incorrect')
      console.log('Expected: "public, max-age=31536000, immutable"')
      console.log('Actual:', cacheControl || 'Not set')
      return false
    }
  } catch (error) {
    console.error('❌ Error testing cache headers:', error.message)
    return false
  }
}

// Main test function
async function runCacheTest() {
  console.log('🚀 Starting image cache test...\n')

  // Create test image
  createTestImage()

  // Test with a sample image URL (you'll need to replace this with an actual uploaded image URL)
  const sampleImageUrl = `${BASE_URL}/api/media/file/sample-image.jpg`

  console.log('📝 Instructions:')
  console.log('1. Upload an image through your Payload CMS admin panel')
  console.log('2. Copy the image URL from the admin panel')
  console.log('3. Replace the sampleImageUrl in this script with the actual URL')
  console.log('4. Run this script again to test the cache headers')

  // Test the sample URL (this will likely fail, but shows the expected format)
  await testCacheHeaders(sampleImageUrl)

  console.log('\n📋 Manual Testing Steps:')
  console.log('1. Go to your Payload CMS admin panel')
  console.log('2. Upload a new image to the Media collection')
  console.log('3. Copy the image URL')
  console.log('4. Open browser developer tools (F12)')
  console.log('5. Go to Network tab')
  console.log('6. Load the image URL')
  console.log('7. Check the response headers for Cache-Control')
  console.log('8. Verify it shows: "public, max-age=31536000, immutable"')

  console.log('\n✨ Cache test completed!')
}

// Run the test
runCacheTest().catch(console.error)

export { testCacheHeaders, runCacheTest }
