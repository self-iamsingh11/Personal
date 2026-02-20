#!/usr/bin/env python3
"""
Posterized.in Full Image Crawler
=================================
Crawls all pages on posterized.in and downloads every product image,
organized into folders by collection/category.

Strategy:
1. Discover all collection URLs from the sitemap + homepage.
2. For each collection, use Shopify's JSON API to get all products with pagination.
3. For each product, also visit the product page to grab ALL gallery images.
4. Save images into: downloaded_images/<Collection>/<ProductName>/<image>.jpg
"""

import os
import re
import sys
import json
import time
import hashlib
import logging
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse, unquote

# ─── Configuration ───────────────────────────────────────────────────────────
BASE_URL = "https://www.posterized.in"
SAVE_DIR = "downloaded_images"
REQUEST_DELAY = 0.3          # seconds between requests (be polite)
MAX_PAGES_PER_COLLECTION = 50  # safety limit for pagination
TIMEOUT = 15                  # request timeout in seconds

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
                  "AppleWebKit/537.36 (KHTML, like Gecko) "
                  "Chrome/120.0.0.0 Safari/537.36"
}

# Skip tiny icons, logos, SVGs, payment badges etc.
SKIP_PATTERNS = [
    "logo", "icon", "favicon", "badge", "payment",
    "svg", "spinner", "loading", "placeholder",
    "1x1", "data:image", "shopify-assets",
]

# ─── Logging ─────────────────────────────────────────────────────────────────
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s │ %(levelname)-5s │ %(message)s",
    datefmt="%H:%M:%S",
)
log = logging.getLogger("crawler")


# ─── Helpers ─────────────────────────────────────────────────────────────────
def clean_name(name: str) -> str:
    """Make a filesystem-safe folder/file name."""
    name = unquote(name)
    name = re.sub(r'[\\/*?:"<>|]', "", name)
    name = name.strip(". ")
    # Collapse multiple spaces
    name = re.sub(r'\s+', ' ', name)
    return name[:120]  # limit length


def should_skip_image(url: str) -> bool:
    """Return True if the URL looks like a non-product image."""
    url_lower = url.lower()
    for pattern in SKIP_PATTERNS:
        if pattern in url_lower:
            return True
    return False


def get_best_image_url(url: str) -> str:
    """
    Shopify CDN images often have size suffixes like _300x300.
    Strip them to get the highest-resolution version.
    Also ensure the URL starts with https://.
    """
    if url.startswith("//"):
        url = "https:" + url
    elif url.startswith("/"):
        url = BASE_URL + url

    # Remove Shopify size parameters to get full resolution
    # Pattern: _WIDTHxHEIGHT or _WIDTHx or _xHEIGHT before the extension
    url = re.sub(r'_((?:\d+x\d+|\d+x|x\d+))(\.(jpg|jpeg|png|webp|gif))', r'\2', url, flags=re.IGNORECASE)
    
    # Remove query string parameters that reduce quality but keep the version param
    parsed = urlparse(url)
    if parsed.query:
        # Keep only ?v= parameter
        import urllib.parse
        params = urllib.parse.parse_qs(parsed.query)
        keep_params = {k: v[0] for k, v in params.items() if k == 'v'}
        if keep_params:
            new_query = urllib.parse.urlencode(keep_params)
            url = f"{parsed.scheme}://{parsed.netloc}{parsed.path}?{new_query}"
        else:
            url = f"{parsed.scheme}://{parsed.netloc}{parsed.path}"

    return url


def fetch(url: str, is_json=False):
    """Fetch a URL with retries and polite delay."""
    time.sleep(REQUEST_DELAY)
    for attempt in range(3):
        try:
            resp = requests.get(url, headers=HEADERS, timeout=TIMEOUT)
            resp.raise_for_status()
            if is_json:
                return resp.json()
            return resp
        except requests.exceptions.HTTPError as e:
            if resp.status_code == 429:
                wait = 5 * (attempt + 1)
                log.warning(f"Rate limited. Waiting {wait}s...")
                time.sleep(wait)
                continue
            log.error(f"HTTP {resp.status_code} for {url}")
            return None
        except Exception as e:
            log.error(f"Request failed ({attempt+1}/3) for {url}: {e}")
            time.sleep(2)
    return None


def download_image(img_url: str, folder_path: str):
    """Download a single image to the specified folder."""
    if not img_url or should_skip_image(img_url):
        return False

    img_url = get_best_image_url(img_url)

    parsed = urlparse(img_url)
    filename = os.path.basename(parsed.path)
    if not filename or '.' not in filename:
        ext = ".jpg"
        filename = hashlib.md5(img_url.encode()).hexdigest()[:12] + ext

    os.makedirs(folder_path, exist_ok=True)
    file_path = os.path.join(folder_path, filename)

    if os.path.exists(file_path):
        return False  # already downloaded

    resp = fetch(img_url)
    if not resp:
        return False

    # Verify it's actually an image (check content-type)
    content_type = resp.headers.get("Content-Type", "")
    if "image" not in content_type and "octet-stream" not in content_type:
        return False

    with open(file_path, 'wb') as f:
        for chunk in resp.iter_content(8192):
            f.write(chunk)

    size_kb = os.path.getsize(file_path) / 1024
    if size_kb < 1:  # skip tiny files (probably broken)
        os.remove(file_path)
        return False

    log.info(f"  ✓ {filename} ({size_kb:.0f} KB) → {os.path.basename(folder_path)}")
    return True


# ─── Discovery ───────────────────────────────────────────────────────────────
def discover_collections() -> list[dict]:
    """
    Discover all collection URLs by:
    1. Parsing the collections sitemap
    2. Scraping the homepage navigation
    """
    collections = {}

    # --- Method 1: Collections Sitemap ---
    log.info("Discovering collections from sitemap...")
    sitemap_index = fetch(f"{BASE_URL}/sitemap.xml")
    if sitemap_index:
        soup = BeautifulSoup(sitemap_index.content, 'xml')
        for sm in soup.find_all('sitemap'):
            loc = sm.find('loc').text
            if 'collections' in loc:
                log.info(f"  Found collections sitemap: {loc}")
                col_sitemap = fetch(loc)
                if col_sitemap:
                    col_soup = BeautifulSoup(col_sitemap.content, 'xml')
                    for url_tag in col_soup.find_all('url'):
                        url = url_tag.find('loc').text
                        slug = url.rstrip('/').split('/')[-1]
                        if slug and slug != 'all':
                            collections[slug] = {
                                'url': url,
                                'name': slug.replace('-', ' ').title()
                            }

    # --- Method 2: Homepage nav links ---
    log.info("Discovering collections from homepage navigation...")
    homepage = fetch(BASE_URL)
    if homepage:
        soup = BeautifulSoup(homepage.content, 'html.parser')
        for link in soup.find_all('a', href=True):
            href = link.get('href', '')
            if '/collections/' in href:
                full_url = urljoin(BASE_URL, href)
                slug = full_url.rstrip('/').split('/')[-1]
                # Skip query strings and anchors
                if '?' in slug or '#' in slug:
                    slug = slug.split('?')[0].split('#')[0]
                if slug and slug not in collections and slug != 'all':
                    name = link.get_text(strip=True) or slug.replace('-', ' ').title()
                    collections[slug] = {
                        'url': f"{BASE_URL}/collections/{slug}",
                        'name': clean_name(name)
                    }

    result = list(collections.values())
    log.info(f"Discovered {len(result)} collections total.")
    return result


# ─── Crawling ────────────────────────────────────────────────────────────────
def crawl_collection_via_json(collection_slug: str, collection_name: str):
    """
    Use Shopify's products.json endpoint to get all products in a collection.
    Then visit each product page to grab ALL images (including gallery).
    """
    page = 1
    total_images = 0
    product_urls_seen = set()

    while page <= MAX_PAGES_PER_COLLECTION:
        url = f"{BASE_URL}/collections/{collection_slug}/products.json?limit=250&page={page}"
        data = fetch(url, is_json=True)

        if not data or 'products' not in data or len(data['products']) == 0:
            break

        products = data['products']
        log.info(f"  Page {page}: {len(products)} products")

        for product in products:
            title = clean_name(product.get('title', 'Unknown'))
            handle = product.get('handle', '')
            product_url = f"{BASE_URL}/products/{handle}"

            if product_url in product_urls_seen:
                continue
            product_urls_seen.add(product_url)

            folder_path = os.path.join(SAVE_DIR, clean_name(collection_name), title)

            # Get images from JSON first (these are the official product images)
            images = product.get('images', [])
            for img in images:
                src = img.get('src', '')
                if src and download_image(src, folder_path):
                    total_images += 1

            # Also crawl the actual product page for any extra images
            extra = crawl_product_page(product_url, folder_path)
            total_images += extra

        page += 1

    return total_images


def crawl_product_page(product_url: str, folder_path: str) -> int:
    """
    Visit a product page directly and extract all images from the gallery.
    This catches images that might not be in the JSON API.
    """
    resp = fetch(product_url)
    if not resp:
        return 0

    soup = BeautifulSoup(resp.content, 'html.parser')
    count = 0

    # Look for product images in various Shopify selectors
    selectors = [
        '.product__media img',
        '.product__media-list img',
        '.product-single__media img',
        '.product__main-photos img',
        '.product-gallery img',
        'img[data-zoom]',
    ]

    found_imgs = set()
    for selector in selectors:
        for img in soup.select(selector):
            src = img.get('src') or img.get('data-src') or img.get('data-zoom') or ''
            srcset = img.get('srcset', '')
            
            # Try to get highest res from srcset
            if srcset:
                parts = srcset.split(',')
                best = parts[-1].strip().split(' ')[0]
                if best:
                    src = best

            if src and src not in found_imgs:
                found_imgs.add(src)
                if download_image(src, folder_path):
                    count += 1

    return count


def crawl_homepage_images():
    """
    Crawl the homepage for hero banners, promotional images, etc.
    """
    log.info("Crawling homepage images...")
    resp = fetch(BASE_URL)
    if not resp:
        return

    soup = BeautifulSoup(resp.content, 'html.parser')
    folder_path = os.path.join(SAVE_DIR, "_Homepage")
    count = 0

    for img in soup.find_all('img'):
        src = img.get('src') or img.get('data-src') or ''
        srcset = img.get('srcset', '')

        if srcset:
            parts = srcset.split(',')
            best = parts[-1].strip().split(' ')[0]
            if best:
                src = best

        if src and download_image(src, folder_path):
            count += 1

    # Also look for background images in style attributes
    for elem in soup.find_all(style=True):
        style = elem.get('style', '')
        urls = re.findall(r'url\(["\']?(.*?)["\']?\)', style)
        for url in urls:
            if download_image(url, folder_path):
                count += 1

    log.info(f"Homepage: {count} images downloaded.")


def crawl_all_pages():
    """
    Discover and crawl all non-collection pages 
    (like /pages/about, /pages/bulk, etc.) for images.
    """
    log.info("Discovering additional pages from sitemap...")
    sitemap_index = fetch(f"{BASE_URL}/sitemap.xml")
    if not sitemap_index:
        return

    soup = BeautifulSoup(sitemap_index.content, 'xml')
    for sm in soup.find_all('sitemap'):
        loc = sm.find('loc').text
        if 'pages' in loc:
            log.info(f"  Found pages sitemap: {loc}")
            pages_sitemap = fetch(loc)
            if pages_sitemap:
                pages_soup = BeautifulSoup(pages_sitemap.content, 'xml')
                for url_tag in pages_soup.find_all('url'):
                    page_url = url_tag.find('loc').text
                    page_slug = page_url.rstrip('/').split('/')[-1]
                    
                    log.info(f"  Crawling page: {page_slug}")
                    resp = fetch(page_url)
                    if not resp:
                        continue

                    page_soup = BeautifulSoup(resp.content, 'html.parser')
                    folder_path = os.path.join(SAVE_DIR, "_Pages", clean_name(page_slug))
                    count = 0

                    for img in page_soup.find_all('img'):
                        src = img.get('src') or img.get('data-src') or ''
                        if src and download_image(src, folder_path):
                            count += 1

                    if count > 0:
                        log.info(f"  Page '{page_slug}': {count} images")


# ─── Main ────────────────────────────────────────────────────────────────────
def main():
    os.makedirs(SAVE_DIR, exist_ok=True)

    log.info("=" * 60)
    log.info("  Posterized.in Full Image Crawler")
    log.info("=" * 60)

    # Step 1: Crawl homepage images
    crawl_homepage_images()

    # Step 2: Discover all collections
    collections = discover_collections()

    # Step 3: Crawl each collection
    grand_total = 0
    for i, col in enumerate(collections, 1):
        log.info(f"\n{'─' * 50}")
        log.info(f"[{i}/{len(collections)}] Collection: {col['name']}")
        log.info(f"  URL: {col['url']}")
        log.info(f"{'─' * 50}")

        slug = col['url'].rstrip('/').split('/')[-1]
        count = crawl_collection_via_json(slug, col['name'])
        grand_total += count
        log.info(f"  Collection '{col['name']}': {count} images")

    # Step 4: Crawl other pages
    crawl_all_pages()

    # Summary
    log.info(f"\n{'=' * 60}")
    log.info(f"  DONE! Total images downloaded: {grand_total}")
    log.info(f"  Saved to: {os.path.abspath(SAVE_DIR)}")
    log.info(f"{'=' * 60}")

    # Print folder summary
    for root, dirs, files in os.walk(SAVE_DIR):
        depth = root.replace(SAVE_DIR, '').count(os.sep)
        indent = '  ' * depth
        folder_name = os.path.basename(root)
        file_count = len([f for f in files if not f.startswith('.')])
        if file_count > 0:
            log.info(f"  {indent}{folder_name}: {file_count} images")


if __name__ == "__main__":
    main()
