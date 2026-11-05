# ATLAS Geographic Data Pack

## What this pack contains
This is the initial data-acquisition repository for ATLAS. It contains:
- A master inventory of geographic feature classes.
- CSV templates for places, roads, terrain measurements, relationships and media.
- A starter source registry.
- A data dictionary and acquisition workflow.
- A script to download India and Nepal OpenStreetMap PBF extracts.

**Important:** This is not a complete populated global geographic database. The CSVs are structured import templates. The OSM downloader retrieves source extracts when run; it does not silently claim that every real-world feature is mapped. Specialist datasets must be acquired separately and their licences checked.

## Initial geographic coverage
India + Nepal, designed to expand globally.

## Folder structure
- `01_inventory/`: geographic entities.
- `02_terrain_elevation/`: elevation samples and DEM metadata.
- `03_measurements/`: lengths, areas, distances and other measurements.
- `04_relationships/`: feature links, routes and watersheds.
- `05_environment_science/`: reserved for climate, geology, biodiversity and land-cover datasets.
- `06_history_culture/`: reserved for heritage and historical records.
- `07_media/`: media metadata and licensing.
- `08_sources_licensing/`: source registry and data quality logs.
- `09_scripts/`: acquisition helpers.

## First acquisition: OpenStreetMap
Run:
```bash
python 09_scripts/download_osm_extracts.py
```
This downloads:
- India: https://download.geofabrik.de/asia/india-latest.osm.pbf
- Nepal: https://download.geofabrik.de/asia/nepal-latest.osm.pbf

Files are saved under `data/raw/osm/` (created by the script). These are large files. Ensure you have sufficient disk space and a stable connection.

To inspect PBF files, install Osmium Tool: https://osmcode.org/osmium-tool/
Example:
```bash
osmium fileinfo data/raw/osm/india-latest.osm.pbf
osmium tags-filter data/raw/osm/india-latest.osm.pbf nwr/natural=peak -o data/raw/osm/india-peaks.osm.pbf
```
Use a proper OSM import pipeline (e.g. osm2pgsql into PostGIS) for full-scale processing. Preserve OSM attribution and comply with ODbL.

## Elevation
Recommended candidates:
- Copernicus DEM GLO-30 / GLO-90: https://dataspace.copernicus.eu/
- NASA SRTM: https://earthdata.nasa.gov/
Check product-specific access, vertical datum, coverage, resolution and licence before use. A DEM may be a surface model, not bare-earth terrain.

## Data rules
1. Never invent missing coordinates, elevations, lengths, areas or depths.
2. Keep original source IDs and dataset versions.
3. Store observation date separately from download date.
4. Store geometry in a suitable spatial format (GeoPackage, GeoJSON or PostGIS), not only as text.
5. Use metres for elevation and lengths internally; store area in square metres internally, with display conversions.
6. Store geometry in WGS84 (EPSG:4326) for interchange, and use appropriate projected/geodesic methods for measurement.
7. Distinguish measured, calculated, estimated and unknown values.
8. Keep raw source data immutable; process into separate staging and published layers.
9. Check licences before redistributing data or derived databases.
10. Do not expose sensitive species locations or restricted cultural/heritage locations.

## Suggested statuses
`identified`, `licence_checked`, `access_verified`, `acquired`, `processed`, `validated`, `published`, `needs_review`.

## Suggested verification values
`unverified`, `source_checked`, `cross_checked`, `approved`, `rejected`, `unknown`.

## Next engineering step
Build an ETL pipeline that:
- imports OSM PBF into staging,
- extracts and classifies entities,
- deduplicates records across sources,
- enriches records with specialist datasets,
- samples DEM elevation,
- calculates geometry measurements,
- preserves provenance,
- publishes validated records into PostGIS.
