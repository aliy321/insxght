#!/bin/bash

# Image Cache Test Script
# Usage: ./scripts/test-cache-curl.sh [IMAGE_URL]

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🖼️  Image Cache Test Script${NC}"
echo "=================================="

# Check if URL is provided
if [ -z "$1" ]; then
    echo -e "${YELLOW}📝 Usage: $0 [IMAGE_URL]${NC}"
    echo ""
    echo "Example:"
    echo "  $0 http://localhost:3000/api/media/file/your-image.jpg"
    echo "  $0 https://your-domain.com/api/media/file/your-image.jpg"
    echo ""
    echo "To get an image URL:"
    echo "1. Go to your Payload CMS admin panel"
    echo "2. Upload an image to the Media collection"
    echo "3. Copy the image URL from the admin panel"
    echo "4. Run this script with the URL"
    exit 1
fi

IMAGE_URL="$1"
echo -e "${BLUE}🔍 Testing: $IMAGE_URL${NC}"
echo ""

# Test the image URL
echo -e "${YELLOW}📊 Response Headers:${NC}"
echo "----------------------------------------"

# Use curl to get headers
HEADERS=$(curl -I -s "$IMAGE_URL" 2>/dev/null)

if [ $? -eq 0 ]; then
    echo "$HEADERS"
    echo ""
    
    # Check for cache control header
    CACHE_CONTROL=$(echo "$HEADERS" | grep -i "cache-control:" | cut -d' ' -f2-)
    
    if [ -n "$CACHE_CONTROL" ]; then
        echo -e "${YELLOW}🎯 Cache-Control Analysis:${NC}"
        echo "Found: $CACHE_CONTROL"
        
        if echo "$CACHE_CONTROL" | grep -q "max-age=31536000"; then
            echo -e "${GREEN}✅ SUCCESS: Cache is set for 1 year (31,536,000 seconds)${NC}"
        else
            echo -e "${RED}❌ WARNING: Cache duration is not 1 year${NC}"
        fi
        
        if echo "$CACHE_CONTROL" | grep -q "public"; then
            echo -e "${GREEN}✅ SUCCESS: Cache is public (can be cached by any cache)${NC}"
        else
            echo -e "${RED}❌ WARNING: Cache is not public${NC}"
        fi
        
        if echo "$CACHE_CONTROL" | grep -q "immutable"; then
            echo -e "${GREEN}✅ SUCCESS: Cache is immutable (content won't change)${NC}"
        else
            echo -e "${YELLOW}⚠️  INFO: Cache is not immutable (this is optional but recommended)${NC}"
        fi
        
        echo ""
        echo -e "${GREEN}🎉 Cache headers are working!${NC}"
        
    else
        echo -e "${RED}❌ ERROR: No Cache-Control header found${NC}"
        echo "This means caching is not configured properly."
    fi
    
else
    echo -e "${RED}❌ ERROR: Failed to fetch image${NC}"
    echo "Please check:"
    echo "1. The URL is correct"
    echo "2. The development server is running"
    echo "3. The image exists"
fi

echo ""
echo -e "${BLUE}💡 Tips:${NC}"
echo "- Run this test after uploading a new image"
echo "- Check the browser's Network tab for more detailed headers"
echo "- Use the test page at /test-cache.html for interactive testing"
