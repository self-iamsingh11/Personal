import os
import shutil
import random
from pathlib import Path

SOURCE_DIR = Path("posterized_crawler/downloaded_images")
DEST_DIR = Path("Kritanta/frontend/public/images")

# Ensure destination exists
for subdir in ["hero", "categories", "products", "reviews", "icons"]:
    (DEST_DIR / subdir).mkdir(parents=True, exist_ok=True)

def copy_image(src_path, dest_folder, new_name=None):
    if not src_path.exists():
        return
    if new_name:
        dest_path = DEST_DIR / dest_folder / new_name
    else:
        dest_path = DEST_DIR / dest_folder / src_path.name
    shutil.copy2(src_path, dest_path)
    print(f"Copied {src_path.name} -> {dest_folder}/")

# 1. Hero Images (Wall mocks)
homepage_dir = SOURCE_DIR / "_Homepage"
wall_images = list(homepage_dir.glob("*WALL*.jpg")) + list(homepage_dir.glob("*wall*.jpg"))
# Fallback if no specific WALL images
if not wall_images:
    wall_images = list(homepage_dir.glob("*.jpg"))[:10]

for i, img in enumerate(wall_images[:12]):
    copy_image(img, "hero", f"wall_{i}.jpg")

# 2. Review Images (Carousel)
review_images = list(homepage_dir.glob("*review*.webp")) + list(homepage_dir.glob("*review*.jpg"))
for i, img in enumerate(review_images[:15]):
    copy_image(img, "reviews", f"review_{i}.webp")

# 3. Product Images
# We need to find some good product images from the subfolders
collections = [d for d in SOURCE_DIR.iterdir() if d.is_dir() and d.name != "_Homepage"]
products_collected = 0

for col in collections:
    # Get a few products from each collection
    product_folders = [d for d in col.iterdir() if d.is_dir()]
    for prod in product_folders[:2]: # Take 2 from each collection
        images = list(prod.glob("*.jpg")) + list(prod.glob("*.webp"))
        if images:
            # Main image
            copy_image(images[0], "products", f"{col.name}_{prod.name}_main.jpg")
            products_collected += 1
            if products_collected > 50: break
    if products_collected > 50: break

# 4. Collection/Category Icons
# We'll use the first image of a representative product for the category icon if we can't find specific ones
# Or look for "circle" images in homepage if they exist?
# For now, let's grab random nice images for categories
CATEGORY_NAMES = ["Superhero", "Cars", "Movies", "Music", "Games", "Gym", "Anime", "Sports"]
all_products = []
for col in collections:
    for prod in col.iterdir():
        if prod.is_dir():
            imgs = list(prod.glob("*.jpg"))
            if imgs: all_products.append(imgs[0])

random.shuffle(all_products)
for i, cat in enumerate(CATEGORY_NAMES):
    if i < len(all_products):
        copy_image(all_products[i], "categories", f"{cat.lower()}.jpg")

print("Done organizing images.")
