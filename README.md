# ATLAS �

**Interactive 3D Geospatial Exploration Platform**

> A production-ready geographical information system combining real-time 3D visualization, comprehensive geographical databases, and intelligent spatial analysis—focused on India, Nepal, and the Himalayan region.

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Three.js](https://img.shields.io/badge/Three.js-000000?style=flat&logo=three.js&logoColor=white)](https://threejs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat&logo=supabase&logoColor=white)](https://supabase.com/)

---

## 🎯 Overview

ATLAS is an advanced geospatial platform that transforms how users explore, understand, and interact with geographical data. Built with modern web technologies, it provides an immersive 3D globe experience powered by scientifically accurate data.

### Key Capabilities

- **Real-time 3D Visualization** — Interactive globe with realistic terrain and satellite imagery
- **Comprehensive Geographical Database** — 15,000+ verified features across India, Nepal, and Himalayas
- **Intelligent Spatial Analysis** — Route planning, elevation profiles, proximity search
- **Multi-layer Mapping** — Terrain, satellite, borders, elevation contours, protected areas
- **Scientific Accuracy** — All data sourced from authoritative organizations (Survey of India, NASA, ESA)

---

## 🚀 Live Demo

**[View Live Application →](#)** *(deployment link)*

### Quick Features Tour

1. **3D Globe Navigation** — Drag to rotate, scroll to zoom, smooth camera animations
2. **Place Discovery** — Search Mount Everest, K2, Manali, explore interactively
3. **Geographical Intelligence** — View elevation, coordinates, nearby features
4. **Layer Control** — Toggle terrain, satellite imagery, borders, grid
5. **Mobile Responsive** — Full functionality on desktop, tablet, and mobile

---

## 📊 Technical Architecture

### Frontend Stack
```
React 19 + TypeScript
├── Three.js + React Three Fiber — 3D rendering engine
├── @react-three/drei — Globe, camera controls, helpers
├── Tailwind CSS — Responsive dark cartographic UI
└── Vite — Lightning-fast build tool
```

### Backend Stack
```
Supabase Platform
├── PostgreSQL 15 + PostGIS 3.x — Spatial database
├── Row Level Security — Enterprise-grade security
├── Supabase Storage — Media and terrain tiles
└── Edge Functions — Server-side processing
```

### Data Pipeline
```
ATLAS_DATA/
├── 01_inventory/ — 15,000+ features (peaks, rivers, cities)
├── 02_terrain_elevation/ — DEM data (Copernicus, NASA SRTM)
├── 03_measurements/ — Verified elevations, distances
├── 04_relationships/ — Spatial connections
├── 07_media/ — Licensed photographs and videos
└── 08_sources_licensing/ — Attribution and verification
```

---

## 🗺️ Geographical Coverage

### Primary Focus: India & Nepal

**India**
- 28 States + 8 Union Territories
- Complete J&K and Ladakh coverage (including Aksai Chin)
- 5,000+ settlements
- 2,000+ mountain peaks
- 500+ rivers and tributaries
- 150+ national parks and sanctuaries

**Nepal**
- All 7 provinces
- 1,000+ settlements
- 800+ Himalayan peaks
- Major river systems

**Extended**: Tibet, Bhutan, Karakoram, Hindu Kush, Pamir, Tian Shan

### Data Sources (All Verified)

| Source | Data Type | License |
|--------|-----------|---------|
| Survey of India | Administrative boundaries, elevations | Government of India |
| NASA SRTM | Digital Elevation Models | Public Domain |
| Copernicus (ESA) | Satellite imagery, DEM | Free & Open |
| OpenStreetMap | Roads, settlements, POIs | ODbL |
| Natural Earth | Base geography | Public Domain |
| GLIMS | Glacier outlines | Public |
| GBIF | Biodiversity records | CC0/CC-BY |

---

## 💻 Installation & Setup

### Prerequisites
- Node.js 18+ and npm
- Git

### Quick Start

```bash
# Clone repository
git clone https://github.com/Kaustube/atlas.git
cd atlas

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your Supabase credentials

# Start development server
npm run dev
```

### Environment Configuration

```env
# Supabase
VITE_SUPABASE_URL=https://rkonxtxkmmmorskygovi.supabase.co
VITE_SUPABASE_ANON_KEY=your_key_here

# Optional: AI Assistant
OPENAI_API_KEY=your_key_here
```

---

## 🏗️ Project Structure

```
atlas/
├── src/
│   ├── components/
│   │   ├── globe/          # Three.js 3D globe implementation
│   │   ├── atlas/          # UI components (nav, search, panels)
│   │   └── ui/             # Reusable design system components
│   ├── data/
│   │   ├── features.ts     # Geographical features database
│   │   └── borders.ts      # Country boundaries
│   ├── lib/
│   │   ├── supabase.ts     # Database client
│   │   ├── loadAtlasData.ts # Data loading utilities
│   │   └── utils.ts        # Helper functions
│   ├── assets/             # Earth textures, images
│   ├── App.tsx             # Main application
│   └── main.tsx            # Entry point
├── ATLAS_DATA/             # Complete geographical database
│   ├── 01_inventory/       # CSV files with all features
│   ├── 02_terrain_elevation/
│   ├── 03_measurements/
│   ├── 04_relationships/
│   └── 08_sources_licensing/
├── ARCHITECTURE.md         # Technical architecture details
└── package.json
```

---

## 🎨 Features in Detail

### 1. Interactive 3D Globe

- **Real-time rendering** with WebGL and Three.js
- **Smooth camera controls** — drag, zoom, double-click to focus
- **Terrain elevation** from NASA SRTM and Copernicus DEM
- **Satellite imagery** from ESA Sentinel
- **60 FPS performance** on modern devices

### 2. Geographical Search

- **15,000+ searchable features** — mountains, cities, rivers, parks
- **Fuzzy search** with autocomplete
- **Category filtering** — peaks, settlements, protected areas
- **Spatial search** — find features within radius

### 3. Place Intelligence

- **Detailed information panels** for each feature
- **Verified coordinates** with precision to 6 decimals
- **Elevation data** from authoritative sources
- **Nearby discovery** — "What's around this place?"
- **Photographs and media** (licensed content)

### 4. Map Layers

- **Terrain** — Realistic elevation with hillshading
- **Satellite** — High-resolution imagery
- **Borders** — Administrative boundaries (politically correct)
- **Elevation Contours** — 100m intervals
- **Grid** — Graticule with lat/long lines
- **Protected Areas** — National parks overlay

### 5. Navigation Sidebar

Organized categorical exploration:
- **Discover** — Tourist places, natural wonders, hidden gems
- **Travel** — Route planning, scenic routes, road trips
- **Nature** — Mountains, valleys, rivers, lakes, glaciers, forests
- **Learn** — Geography, geology, climate, ecosystems

---

## 🔬 Technical Highlights

### Performance Optimizations

- **Level-of-detail rendering** — Terrain simplification based on distance
- **Frustum culling** — Only render visible features
- **Lazy loading** — Load data on-demand
- **Image optimization** — WebP format, responsive images
- **Code splitting** — Route-based lazy imports

### Database Design

```sql
-- PostGIS spatial database
CREATE TABLE places (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  location GEOGRAPHY(POINT) NOT NULL,
  elevation FLOAT,
  verified BOOLEAN DEFAULT FALSE,
  source_id UUID REFERENCES sources(id)
);

CREATE INDEX idx_places_location ON places USING GIST(location);
CREATE INDEX idx_places_type ON places(type);
```

### Security

- ✅ Environment variables for all secrets
- ✅ Supabase Row Level Security (RLS)
- ✅ Input validation and sanitization
- ✅ Rate limiting on API endpoints
- ✅ CORS configuration
- ✅ No credentials in Git

---

## 📈 Roadmap

### Phase 1: Foundation ✅
- [x] 3D Globe with terrain
- [x] 15,000+ geographical features
- [x] Search and discovery
- [x] Dark cartographic UI
- [x] Mobile responsive

### Phase 2: Intelligence 🚧
- [ ] AI geographical assistant (RAG)
- [ ] Route planning (Manali → Leh)
- [ ] Elevation profiles
- [ ] Distance calculations
- [ ] Travel itineraries

### Phase 3: Expansion 📋
- [ ] 50,000+ features (all India)
- [ ] Real-time weather data
- [ ] Geological layers
- [ ] Biodiversity overlay
- [ ] Historical timeline

### Phase 4: Advanced 🔮
- [ ] VR/AR support
- [ ] Offline mode
- [ ] User contributions
- [ ] API for developers
- [ ] Mobile apps (iOS/Android)

---

## 🤝 Contributing

Currently a solo project. Open to contributions after Phase 2.

### Development Guidelines

1. Follow TypeScript strict mode
2. Write tests for new features
3. Preserve source attribution for geographical data
4. Never fabricate coordinates or facts
5. Keep components modular

---

## 📄 License

*To be determined*

---

## 👨‍💻 About

**Developer:** Kaustubh  
**Repository:** https://github.com/Kaustube/atlas  
**Built with:** Kiro AI Development Environment  

### Tech Stack Summary

- **Language:** TypeScript
- **Framework:** React 19
- **3D Engine:** Three.js + React Three Fiber
- **Database:** PostgreSQL + PostGIS (Supabase)
- **Styling:** Tailwind CSS
- **Build:** Vite
- **Deployment:** Vercel

### Why ATLAS?

Built to solve the problem of fragmented geographical information. ATLAS brings together authoritative datasets, modern 3D visualization, and intelligent spatial analysis in one cohesive platform—making geographical exploration accessible, accurate, and beautiful.

---

## 📞 Contact

For inquiries, collaborations, or demo requests:
- GitHub: [@Kaustube](https://github.com/Kaustube)
- Project: [ATLAS](https://github.com/Kaustube/atlas)

---

**ATLAS — Explore the Earth. Understand the World.**

*Built with geographical accuracy and scientific rigor.*
