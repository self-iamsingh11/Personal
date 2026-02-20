import os
from pathlib import Path

PRODUCT_DIR = Path("Kritanta/frontend/public/images/products")

files = sorted([f for f in PRODUCT_DIR.iterdir() if f.is_file() and f.name != ".DS_Store"])

for i, f in enumerate(files):
    new_name = f"product_{i}{f.suffix}"
    f.rename(PRODUCT_DIR / new_name)
    print(f"Renamed {f.name} -> {new_name}")
