#!/usr/bin/env python3
"""Download current Geofabrik OSM PBF extracts for India and Nepal."""
from pathlib import Path
from urllib.request import urlretrieve
from urllib.error import URLError
import sys

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "data" / "raw" / "osm"
OUT.mkdir(parents=True, exist_ok=True)

SOURCES = {
    "india-latest.osm.pbf": "https://download.geofabrik.de/asia/india-latest.osm.pbf",
    "nepal-latest.osm.pbf": "https://download.geofabrik.de/asia/nepal-latest.osm.pbf",
}

for filename, url in SOURCES.items():
    destination = OUT / filename
    if destination.exists():
        print(f"Already exists, skipping: {destination}")
        continue
    print(f"Downloading {url}")
    try:
        urlretrieve(url, destination)
        print(f"Saved: {destination} ({destination.stat().st_size:,} bytes)")
    except (URLError, OSError) as exc:
        print(f"Download failed for {filename}: {exc}", file=sys.stderr)
        if destination.exists():
            destination.unlink()
        sys.exit(1)

print("Downloads complete. Check Geofabrik/OSM update dates and ODbL obligations before use.")
