# ATLAS Data Dictionary

## Common conventions
- `atlas_id`: stable ATLAS UUID or deterministic internal identifier.
- `source_id`: identifier from `source_registry.csv`.
- `source_id` in feature tables should ideally be paired with the original provider's feature identifier in an added `source_feature_id` field during implementation.
- `geometry_wkt`: interchange placeholder only. Prefer GeoPackage/GeoJSON/PostGIS geometry for production.
- Coordinates: latitude/longitude in WGS84 (EPSG:4326).
- Elevation: metres above a stated vertical datum.
- Length: kilometres in the CSV templates; preserve source units in raw metadata.
- Area: square kilometres in the CSV templates; convert carefully from source units.
- Dates: ISO 8601 (`YYYY-MM-DD` or timestamp with timezone).

## Measurement provenance
Each measurement should record:
- value and unit,
- measurement type,
- source or calculation method,
- observation/measurement date,
- uncertainty or known limitation,
- verification status.

## Geometry types
- Point: summit, waterfall, pass, settlement.
- LineString/MultiLineString: river, road, trail, route.
- Polygon/MultiPolygon: lake, glacier, protected area, forest, administrative region.
- Multi-dimensional or 3D geometry only when the source supports it and the application needs it.

## Relationship types
Recommended controlled vocabulary:
`part_of`, `tributary_of`, `flows_through`, `crosses`, `connects`, `near`, `within`, `drains_to`, `located_in`, `feeds`, `adjacent_to`, `source_of`, `mouth_of`.

## Quality checks
- Coordinate range and geometry validity.
- Duplicate names and near-duplicate geometries.
- Country/administrative containment.
- Elevation plausibility and vertical datum.
- Geometry length/area plausibility.
- Source licence and attribution completeness.
- Temporal freshness for changing features.
