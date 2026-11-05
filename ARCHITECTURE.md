# ATLAS — Technical Architecture Blueprint

## 1. UNDERSTANDING ATLAS

ATLAS is **NOT**:
- A simple 3D globe viewer
- A travel booking platform
- A generic map application
- Just another geospatial dashboard

ATLAS **IS**:
- An immersive geographical exploration engine (like Google Earth but focused)
- A travel intelligence system (plan journeys, discover routes, explore along the way)
- An educational platform (learn geology, geography, ecosystems through interaction)
- A scientifically grounded geographical database (real datasets, proper attribution)
- A connected geographical knowledge graph (understand how features relate)

### Primary User Journeys

**Journey 1: Geographical Explorer**
- Search "Manali" → explore on 3D globe → discover mountains, valleys, rivers, lakes → view real photos → learn about geology and history → explore nearby features

**Journey 2: Travel Planner**
- Plan journey from Manali to Leh → see route on 3D terrain → explore elevation profile → discover attractions along route → view pass-by-pass details → save itinerary

**Journey 3: Learner**
- "How do mountains form?" → interactive animation → explore real Himalayan examples → understand tectonic plates → see geological timeline

**Journey 4: AI Explorer**
- Ask "Which river systems connect to Gangotri Glacier?" → AI retrieves verified data → shows map → explains watershed → cites sources

---

## 2. RECOMMENDED TECHNICAL STACK

### Frontend
- **React 18** + **TypeScript** - Component architecture, type safety
- **Vite** - Fast dev server, optimized builds
- **Tailwind CSS** - Utility-first styling, dark cartographic theme
- **Zustand** - Lightweight state management (better than Redux for this)

### 3D Globe & Terrain
- **CesiumJS** - PRIMARY 3D globe engine
  - World terrain support
  - Satellite imagery integration
  - Camera controls and animations
  - 3D tiles support
  - Elevation profiles
  - Terrain exaggeration
- **Three.js** - ONLY for specialized visualizations (geological animations, etc.)

### Backend & Database
- **Supabase** - Managed platform
  - PostgreSQL 15+ with **PostGIS 3.x**
  - Row Level Security
  - Realtime subscriptions
  - Storage for media/datasets
  - Edge Functions for server logic
- **PostgreSQL + PostGIS** - Core geospatial database
  - Spatial types (Point, LineString, Polygon, MultiPolygon)
  - Spatial indexes (GIST)
  - Spatial queries (ST_Distance, ST_Contains, ST_Intersects)
  - Raster support for elevation

### Routing Engine
**Primary Choice: OSRM (Open Source Routing Machine)**
- Self-hosted or use public instance
- OpenStreetMap road network
- Good India/Nepal coverage
- Free and open source
- Elevation-aware routing possible

**Alternatives:**
- GraphHopper (more features, requires setup)
- Valhalla (complex but powerful)
- Mapbox Directions API (paid, excellent quality)

**Decision: Start with OSRM, evaluate Mapbox for production**

### Map Tiles & Imagery
- **Mapbox** - Base map tiles (paid but high quality)
- **Maptiler** - Alternative tiles provider
- **OpenStreetMap tiles** - Free fallback
- **Copernicus/Sentinel** - Satellite imagery (free, open)

### AI Assistant
**Provider-Agnostic Architecture:**
```typescript
interface AIProvider {
  generateEmbedding(text: string): Promise<number[]>
  generateResponse(prompt: string, context: string): Promise<string>
}
```

**Options:**
- OpenAI (GPT-4, embeddings)
- Anthropic Claude (better reasoning)
- Local LLM via Ollama (privacy, cost)

**RAG Architecture:**
- Generate embeddings for all verified geographical records
- Store in PostgreSQL with pgvector extension
- Retrieve relevant context via vector similarity
- Pass to LLM with strict system prompt
- Cite sources, never hallucinate

### Storage & CDN
- **Supabase Storage** - Media assets, processed datasets
- **Cloudflare R2** - Large terrain tiles, imagery (cheaper than S3)
- **Vercel** - Frontend deployment with edge functions

### External APIs & Services
- **CesiumJS Ion** - Terrain and imagery (paid tiers)
- **NASA Earthdata** - Free satellite data (requires account)
- **OpenWeatherMap** - Weather data (freemium)
- **YouTube API** - Embed educational videos

---

## 3. DATABASE ARCHITECTURE

### Core Entities

```sql
-- Countries & Admin Regions
countries (id, name, iso_code, geometry MULTIPOLYGON)
admin_regions (id, name, type, country_id, parent_id, geometry MULTIPOLYGON)
districts (id, name, admin_region_id, geometry MULTIPOLYGON)

-- Places (Universal)
places (
  id UUID,
  name TEXT,
  alternative_names TEXT[],
  type TEXT, -- mountain_peak, river, lake, valley, etc.
  location GEOGRAPHY(POINT),
  elevation FLOAT,
  area GEOGRAPHY(POLYGON), -- for areal features
  parent_region_id UUID,
  description TEXT,
  metadata JSONB,
  verification_status TEXT,
  created_at, updated_at
)

-- Mountains
mountain_ranges (id, name, geometry GEOGRAPHY(MULTILINESTRING), highest_peak_id)
peaks (id, place_id, range_id, elevation, prominence, first_ascent_year, difficulty)

-- Rivers & Hydrology
rivers (id, name, geometry GEOGRAPHY(LINESTRING), source_id, mouth_id, length_km, discharge)
river_segments (id, river_id, geometry, segment_order, elevation_start, elevation_end)
watersheds (id, name, geometry GEOGRAPHY(POLYGON), area_km2, outlet_id)

-- Lakes
lakes (id, place_id, geometry GEOGRAPHY(POLYGON), surface_area_km2, max_depth, type)

-- Waterfalls
waterfalls (id, place_id, river_id, height_m, coordinates, flow_type)

-- Glaciers
glaciers (id, name, geometry GEOGRAPHY(POLYGON), area_km2, length_km, elevation_range, type, retreat_rate)

-- Geology
geological_features (id, name, type, geometry, age_million_years, rock_types)
tectonic_plates (id, name, geometry GEOGRAPHY(MULTIPOLYGON), plate_type, movement_rate)

-- Ecosystems & Biodiversity
ecosystems (id, name, type, geometry GEOGRAPHY(POLYGON), climate_zone)
protected_areas (id, name, type, geometry, established_year, iucn_category, unesco_site)
species_observations (id, scientific_name, common_name, location, observed_at, source)

-- Travel & Routes
routes (id, origin_id, destination_id, geometry GEOGRAPHY(LINESTRING), distance_km, duration_mins, mode)
route_stops (id, route_id, place_id, stop_order, distance_from_start)
itineraries (id, user_id, name, route_ids, created_at)

-- Tourism
tourist_attractions (id, place_id, category, rating, visit_duration, season)
viewpoints (id, place_id, direction, elevation_m, visibility_km)

-- Media
media_assets (id, place_id, type, url, caption, credit, license, is_ai_generated, verified)

-- Sources & Attribution
sources (id, name, url, license, attribution, description, access_date)
place_sources (place_id, source_id, confidence, notes)

-- Relationships (Critical!)
place_relationships (
  from_place_id, 
  to_place_id, 
  relationship_type TEXT, -- 'nearby', 'part_of', 'flows_into', 'visible_from', etc.
  distance_km FLOAT,
  metadata JSONB
)

-- Datasets & Provenance
datasets (id, name, source_id, version, import_date, status)
dataset_imports (id, dataset_id, records_imported, records_verified, status, notes)

-- AI Embeddings
place_embeddings (place_id, embedding VECTOR(1536)) -- For RAG
```

### Spatial Indexes
```sql
CREATE INDEX idx_places_location ON places USING GIST(location);
CREATE INDEX idx_rivers_geometry ON rivers USING GIST(geometry);
CREATE INDEX idx_glaciers_geometry ON glaciers USING GIST(geometry);
CREATE INDEX idx_watersheds_geometry ON watersheds USING GIST(geometry);
```

### Key Relationships

**Many-to-Many:**
- Place ←→ Sources (attribution)
- Place ←→ Places (relationships)
- Route ←→ Places (stops)
- Ecosystem ←→ Species

**Hierarchical:**
- Country → Admin Region → District
- Mountain Range → Peaks
- River → Segments → Source/Mouth

**Spatial:**
- "Which lakes are within 50km of Manali?"
- "What mountain ranges does this route pass through?"
- "Which glaciers feed this river?"

---

## 4. ROUTING ARCHITECTURE (Manali → Leh Example)

### Pipeline

1. **User Input**
   - Origin: Manali
   - Destination: Leh
   - Mode: Car
   - Preferences: Scenic route

2. **Geocoding**
   - Query places table for "Manali" → get coordinates
   - Query places table for "Leh" → get coordinates

3. **Route Calculation** (OSRM)
   ```
   GET http://router.project-osrm.org/route/v1/driving/77.1892,32.2396;77.5771,34.1526?overview=full&geometries=geojson&steps=true
   ```
   Returns: Route geometry, distance, duration, turn-by-turn

4. **Elevation Profile**
   - Sample points along route geometry
   - Query Copernicus DEM via PostGIS raster
   - Generate elevation chart

5. **Geographical Context Discovery**
   ```sql
   -- Find mountain passes along route
   SELECT p.* FROM places p
   WHERE p.type = 'mountain_pass'
   AND ST_DWithin(p.location, route_linestring, 5000) -- 5km buffer
   ORDER BY ST_Distance(p.location, ST_StartPoint(route_linestring));
   
   -- Find valleys crossed
   SELECT * FROM places WHERE type = 'valley' 
   AND ST_Intersects(area, route_linestring);
   
   -- Find nearby attractions
   SELECT * FROM tourist_attractions ta
   JOIN places p ON ta.place_id = p.id
   WHERE ST_DWithin(p.location, route_linestring, 20000) -- 20km
   ORDER BY ST_Distance(p.location, route_linestring);
   ```

6. **Route Segmentation**
   - Manali → Atal Tunnel → Keylong
   - Keylong → Baralacha La → Sarchu
   - Sarchu → Tanglang La → Leh
   
   For each segment:
   - Calculate distance/elevation
   - Find nearby features
   - Attach photos/videos
   - Add road info

7. **Frontend Rendering**
   - Display route on CesiumJS globe
   - Show elevation profile chart
   - List segments with expand/collapse
   - Pin attractions on map
   - Enable fly-to for any point

---

## 5. DATA ACQUISITION STRATEGY

### Priority 1: Base Geography (Start Here)

| Dataset | Provider | Coverage | License | Priority | Status |
|---------|----------|----------|---------|----------|--------|
| **Natural Earth** | naturalearthdata.com | Global admin boundaries | Public Domain | CRITICAL | ✅ Ready |
| **OpenStreetMap** | geofabrik.de/asia | India/Nepal detailed | ODbL | CRITICAL | ✅ Ready |
| **SRTM 30m DEM** | NASA Earthdata | Global elevation | Public Domain | CRITICAL | ⚠️ Need account |
| **Copernicus DEM** | Copernicus | Global 30m elevation | Free & Open | CRITICAL | ✅ Ready |

### Priority 2: Hydrology

| Dataset | Provider | License | Notes |
|---------|----------|---------|-------|
| **HydroSHEDS** | hydrosheds.org | Free for non-commercial | River networks, basins |
| **HydroRIVERS** | hydrosheds.org | Free for non-commercial | Detailed river segments |
| **HydroLAKES** | hydrosheds.org | Free for non-commercial | Lake polygons |

### Priority 3: Glaciers

| Dataset | Provider | License | Notes |
|---------|----------|---------|-------|
| **GLIMS** | glims.org | Free | Glacier outlines, multi-temporal |
| **RGI** | Randolph Glacier Inventory | Free | Standardized glacier data |

### Priority 4: Protected Areas

| Dataset | Provider | License |
|---------|----------|---------|
| **WDPA** | protectedplanet.net | Free for non-commercial |

### Priority 5: Satellite Imagery

| Source | Provider | Resolution | License | Cost |
|--------|----------|------------|---------|------|
| **Sentinel-2** | Copernicus | 10m | Free & Open | Free |
| **Landsat 8** | USGS | 30m | Public Domain | Free |
| **Mapbox Satellite** | Mapbox | High-res | Paid | $0.50/1000 requests |

### Priority 6: Roads & Routing

| Dataset | Provider | License | Notes |
|---------|----------|---------|-------|
| **OSM Roads** | OpenStreetMap | ODbL | Excellent India/Nepal coverage |

### Priority 7: Tourism Data

| Source | Notes |
|--------|-------|
| **OSM POIs** | Tourist attractions, viewpoints |
| **India Tourism** | Official state tourism boards |
| **Nepal Tourism Board** | Official Nepal data |
| **Wikivoyage** | CC-BY-SA licensed travel info |

### Licensing Matrix

✅ **Safe to use commercially:**
- Natural Earth (Public Domain)
- SRTM/Copernicus DEM (Public Domain / Free)
- Sentinel/Landsat (Open)
- OSM (ODbL - attribution required, share-alike for derived data)

⚠️ **Check carefully:**
- HydroSHEDS (Non-commercial by default, contact for commercial)
- GBIF biodiversity (individual record licenses vary)
- User-contributed photos (need explicit licensing)

❌ **Cannot use without permission:**
- Google Maps data
- Copyrighted photographs without license
- Proprietary datasets without commercial rights

---

## 6. USER INTERFACE ARCHITECTURE

### Main Screen Layout

```
┌─────────────────────────────────────────────────────────────┐
│  [ATLAS]  [Search: mountains, routes, places...]  [@Avatar]│
├────────┬────────────────────────────────────────────────────┤
│        │                                                     │
│ DISC   │                                                     │
│ ▼Expl  │                                                     │
│  Dest  │                                                     │
│  Tour  │           3D CESIUM GLOBE                           │
│  Natu  │           (Main canvas)                             │
│        │                                                     │
│ TRAV   │                                                     │
│ ▼Plan  │                                                     │
│  Rout  │                                                     │
│  Road  │                                                     │
│        │                                                     │
│ NATUR  │                                                     │
│ ▼Mount │                                                     │
│  Valle │                                                     │
│  River │                                                     │
│  Lakes │                                                     │
│  Water │                                                     │
│  Glaci │                                                     │
│        │                                                     │
│ [...]  │                                                     │
│        │                                                     │
└────────┴─────────────────────────────────────────────────────┘
```

**Left Sidebar** (Collapsible sections):
- DISCOVER (Explore, Destinations, Tourist Places, Hidden Places)
- TRAVEL (Plan Journey, Route Explorer, Road Trips, Itineraries)
- NATURE & GEOGRAPHY (Mountains, Valleys, Rivers, Lakes, Waterfalls, Glaciers, etc.)
- LEARN (Geography, Geology, Climate, Ecosystems, Videos)
- MAP LAYERS (Terrain, Satellite, Elevation, Rivers, Roads, Protected Areas)
- MY ATLAS (Saved Places, Routes, Recently Explored)

**Top Bar:**
- Logo
- Universal search with autocomplete
- User menu

**Context Panel** (Slides from right when feature selected):
- Adapts to feature type
- Tabs: Overview, 3D View, Photos, Videos, Geography, Geology, History, Nearby

---

## 7. VISUAL DESIGN DIRECTION

### Dark Cartographic Theme (Primary)

**Colors:**
- Background: `#0a0e1a` (deep space blue-black)
- Surface: `#1a1f2e` (charcoal)
- Text: `#e4e6eb` (off-white)
- Accent: `#4a9eff` (sky blue for water)
- Mountain: `#8b7355` (earth brown)
- Glacier: `#a8d8ea` (ice blue)
- Forest: `#4a7c59` (forest green)

**Typography:**
- Headings: Inter Bold
- Body: Inter Regular
- Mono: JetBrains Mono (for coordinates, elevation)

**Components:**
- Subtle borders, no heavy shadows
- Translucent panels (backdrop-blur)
- Smooth transitions
- Topographic pattern backgrounds
- Contour line accents

### Light Cartographic Theme (Secondary)

For reading-heavy content, switch to cream background with dark text.

---

## 8. PERFORMANCE STRATEGY

### Frontend
- Lazy load components
- Virtual scrolling for large lists
- Debounce search inputs
- Progressive image loading
- Code splitting by route

### 3D Globe
- Level-of-detail terrain rendering
- Frustum culling
- Lazy load 3D tiles
- Reduce terrain resolution on zoom out
- Cache tiles in IndexedDB

### Database
- Spatial indexes on ALL geometry columns
- Materialized views for common queries
- Query result caching (Redis)
- Viewport-based spatial filtering
- Limit results (don't load all mountains at once)

### Media
- Image CDN (Cloudflare)
- Responsive images (srcset)
- Video thumbnail generation
- Lazy load offscreen images

---

## 9. DEVELOPMENT PHASES

### Phase 0: Architecture (CURRENT)
- ✅ Understand product vision
- ✅ Design technical architecture
- ✅ Research datasets
- ✅ Design database schema
- ⏳ Create development plan
- ⏳ Get founder approval

### Phase 1: Foundation (Week 1-2)
- Setup Vite + React + TypeScript
- Configure Tailwind with custom theme
- Setup Supabase project
- Enable PostGIS extension
- Create core database tables
- Setup authentication
- Design system components (Button, Input, Card, etc.)

### Phase 2: 3D Globe (Week 2-3)
- Integrate CesiumJS
- Configure CesiumJS Ion token
- Load world terrain
- Add camera controls
- Fly-to India/Nepal region
- Add basic map layers
- Test performance

### Phase 3: Geographical Database Foundation (Week 3-4)
- Import Natural Earth boundaries
- Import OpenStreetMap India/Nepal data
- Load Copernicus DEM
- Create places table with major features
- Import major mountain ranges
- Import major rivers
- Build universal search

### Phase 4: Location Detail Pages (Week 4-5)
- Build Manali as first complete example
- Location detail page layout
- 3D exploration view
- Photo gallery
- Video integration
- Nearby features discovery
- Source attribution UI

### Phase 5: Route Planning (Week 5-7)
- Integrate OSRM
- Build route planner UI
- Calculate Manali→Leh route
- Display route on globe
- Generate elevation profile
- Discover attractions along route
- Route segmentation
- Itinerary builder

### Phase 6: Educational Content (Week 7-8)
- Learning module structure
- Mountain formation animation
- River system visualization
- Geological timeline
- Video library integration

### Phase 7: AI Assistant (Week 8-9)
- Setup pgvector
- Generate embeddings for all places
- Build RAG pipeline
- OpenAI/Claude integration
- Chat UI
- Source citation

### Phase 8: Expansion & Polish (Week 9-12)
- More mountains, valleys, rivers, lakes
- More routes
- Performance optimization
- Mobile responsiveness
- User testing
- Bug fixes
- Production deployment

---

## 10. FIRST 30 DAYS - ACTIONABLE PLAN

### Days 1-3: Setup
- [x] Initialize Vite project ✅
- [ ] Configure Tailwind with custom theme
- [ ] Setup Supabase project
- [ ] Enable PostGIS + pgvector
- [ ] Create initial database schema
- [ ] Setup GitHub repository structure
- [ ] Configure ESLint + Prettier

### Days 4-7: Globe Foundation
- [ ] Integrate CesiumJS
- [ ] Load world terrain
- [ ] Fly to India/Nepal
- [ ] Add basic camera controls
- [ ] Test on different devices
- [ ] Add map layer switcher

### Days 8-12: Data Pipeline
- [ ] Download Natural Earth admin boundaries
- [ ] Download Copernicus DEM for Himalayas
- [ ] Download OSM India/Nepal extract
- [ ] Write data import scripts
- [ ] Load into PostGIS
- [ ] Create spatial indexes
- [ ] Verify data quality

### Days 13-17: Manali Example
- [ ] Create Manali place record
- [ ] Add surrounding mountains
- [ ] Add nearby rivers/valleys
- [ ] Collect verified photos (Wikimedia Commons)
- [ ] Build location detail page
- [ ] 3D exploration view
- [ ] Nearby features widget

### Days 18-23: Manali→Leh Route
- [ ] Setup OSRM (or use public instance)
- [ ] Calculate route
- [ ] Display on globe
- [ ] Generate elevation profile
- [ ] Identify route segments
- [ ] Find attractions along route
- [ ] Build route detail page

### Days 24-30: Polish & Test
- [ ] Universal search with autocomplete
- [ ] Sidebar navigation
- [ ] Dark theme refinement
- [ ] Mobile responsive
- [ ] Performance optimization
- [ ] User testing with 5 people
- [ ] Fix critical bugs

---

## 11. CRITICAL RISKS & MITIGATIONS

| Risk | Impact | Mitigation |
|------|--------|------------|
| **Dataset licensing unclear** | HIGH | Research thoroughly BEFORE importing |
| **Routing quality poor in mountains** | HIGH | Test OSRM vs Mapbox, may need paid API |
| **CesiumJS Ion costs at scale** | MEDIUM | Self-host terrain tiles if needed |
| **Database performance with large datasets** | MEDIUM | Proper indexes, query optimization, caching |
| **AI hallucination of facts** | HIGH | Strict RAG, cite sources, mark confidence |
| **Scope creep** | CRITICAL | Focus on Manali + Manali→Leh first |
| **Media licensing for photos** | MEDIUM | Use only verified open-license sources |

---

## 12. OPEN QUESTIONS FOR FOUNDER

### Product Decisions
1. **Target audience**: Tourists planning trips? Students learning geography? Both?
2. **Monetization**: Free forever? Freemium? Subscription for advanced features?
3. **User accounts**: Required or optional? What to save?
4. **Mobile app**: Web-only first or native mobile later?
5. **Content moderation**: Allow user-contributed photos? If yes, how to verify?

### Technical Decisions
6. **Routing API**: Worth paying for Mapbox quality or start with free OSRM?
7. **AI provider**: OpenAI (expensive, reliable) or Anthropic (cheaper, good) or both?
8. **Scale target**: How many concurrent users in year 1?
9. **Budget**: What's acceptable monthly infra cost for MVP? (estimate: $50-200)

### Geographical Scope
10. **Beyond India/Nepal**: Timeline for expanding to other Himalayan regions?
11. **Detail level**: Focus on popular destinations first or comprehensive coverage?
12. **Languages**: English only or Hindi/Nepali support needed early?

---

## 13. SUCCESS CRITERIA FOR MVP

### Must Have
✅ 3D globe with India/Nepal focus  
✅ Manali fully detailed (photos, geography, geology, nearby)  
✅ Manali→Leh route with elevation and attractions  
✅ Universal search (places, features)  
✅ At least 50 verified places (mountains, valleys, rivers, lakes)  
✅ Source attribution on all data  
✅ Mobile responsive  
✅ Fast (<3s load time)  

### Should Have
⚠️ AI assistant with basic Q&A  
⚠️ 500+ geographical features  
⚠️ 5 complete travel routes  
⚠️ Video integration  
⚠️ User accounts and saved places  

### Nice to Have
➕ Educational animations  
➕ Historical timelines  
➕ Climate/weather data  
➕ Biodiversity observations  
➕ Offline mode  

---

**Next Step: Founder approval required before implementation begins. Any changes to scope, priorities, or architecture?**
