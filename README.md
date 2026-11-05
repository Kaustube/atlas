# ATLAS - Interactive 3D Geospatial Explorer

> **A production-ready 3D web application for exploring geographical features across India, Nepal, and the Himalayan region**

![React](https://img.shields.io/badge/React-19-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue) ![Three.js](https://img.shields.io/badge/Three.js-3D-green) ![License](https://img.shields.io/badge/License-MIT-yellow)

---

## 🎯 Why ATLAS?

### The Problem
Traditional maps are 2D and lack immersive exploration. Educational resources about Himalayan geography are scattered, text-heavy, and don't engage modern learners who expect interactive experiences.

### The Solution
ATLAS brings geographical education into the 3D web era. It combines:
- **Realistic 3D globe rendering** with actual Earth textures
- **Interactive exploration** - rotate, zoom, click
- **Curated geographical data** - mountains, rivers, cities
- **Instant information** - click any marker for detailed data
- **Category filtering** - focus on specific feature types

### Real-World Applications
- **Education**: Schools teaching Indian geography
- **Tourism**: Trip planning for Himalayan expeditions
- **Research**: Quick reference for geographical coordinates and elevations
- **General Interest**: Anyone curious about India/Nepal's geographical features

---

## 👥 Who Is This For?

### Primary Users
1. **Students & Teachers** - Interactive geography lessons
2. **Trekkers & Mountaineers** - Planning expeditions to Himalayan peaks
3. **Researchers** - Quick reference for geographical data
4. **Travelers** - Exploring destinations visually before visiting

### Use Cases
- **"I want to see where K2 is relative to Mount Everest"** → Click Mountains category, explore peaks
- **"Which rivers flow through India?"** → Click Rivers category, see all major river systems
- **"What's the elevation of Leh?"** → Search "Leh", see detailed info panel
- **"Show me all protected areas"** → Click Protected Areas category

---

## 🚀 Key Features

### ✨ Interactive 3D Globe
- Real satellite imagery from NASA Blue Marble
- Smooth camera controls (drag to rotate, scroll to zoom)
- Atmospheric glow and star field for realism
- High-resolution terrain bump mapping

### 🗺️ Geographical Database
Current features include:
- **Mountains**: Everest, K2, Kanchenjunga, Nanda Devi, Kailash, Nanga Parbat
- **Rivers**: Ganges, Brahmaputra, Indus
- **Cities**: Delhi, Kathmandu, Leh, Manali, Srinagar
- *(Expandable to 15,000+ features from ATLAS_DATA)*

### 🔍 Smart Search
- Instant search across all features
- Type-ahead filtering
- Keyboard shortcuts (⌘K / Ctrl+K)

### 📂 Category Filtering
- **All Places** - Show everything
- **Mountains** - Peaks and summits only
- **Rivers** - Major river systems
- **Cities & Towns** - Urban centers
- **Glaciers** - Ice formations
- **Protected Areas** - National parks

### 📊 Detailed Information Panels
Each feature shows:
- Elevation (for mountains)
- Precise coordinates
- Type classification
- Descriptive information
- Related features

---

## 🛠️ Tech Stack

### Frontend
- **React 19** - Latest features, concurrent rendering
- **TypeScript** - Type safety throughout
- **Vite** - Lightning-fast dev server and builds
- **Tailwind CSS** - Modern utility-first styling

### 3D Graphics
- **Three.js** - WebGL rendering engine
- **React Three Fiber** - React renderer for Three.js
- **@react-three/drei** - Useful Three.js helpers

### Backend (Planned)
- **Supabase** - PostgreSQL + PostGIS for spatial data
- **PostGIS** - Spatial database extensions
- **REST API** - Feature querying and filtering

### Architecture Decisions
1. **Why Three.js over CesiumJS?**
   - Lighter bundle size (1.5MB vs 3MB+)
   - Better React integration
   - Sufficient for our use case
   
2. **Why Supabase?**
   - Built-in PostGIS support
   - Real-time capabilities for future features
   - Generous free tier

3. **Why TypeScript?**
   - Catch geographical data errors at compile time
   - Better IDE autocomplete for coordinates
   - Safer refactoring

---

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Quick Start

```bash
# Clone the repository
git clone https://github.com/Kaustube/atlas.git
cd atlas

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Environment Setup
Copy `.env.example` to `.env` and configure:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

---

## 🎮 How to Use

### Basic Navigation
1. **Rotate Globe**: Click and drag
2. **Zoom**: Scroll wheel
3. **Search**: Click search bar or press `⌘K` (Mac) / `Ctrl+K` (Windows)
4. **Category Filter**: Click sidebar items (Mountains, Rivers, etc.)
5. **View Details**: Click any marker on the globe

### Keyboard Shortcuts
- `⌘K` / `Ctrl+K` - Focus search
- `Escape` - Close search/panels
- `Enter` - Select first search result

### Tips
- **Start with a category** - Click "Mountains" to see all peaks
- **Search for specific features** - Type "Everest" or "Ganges"
- **Use the layers toggle** - Show/hide borders, elevation, grid
- **Switch view modes** - Toggle between terrain and satellite

---

## 📁 Project Structure

```
atlas/
├── src/
│   ├── components/
│   │   ├── atlas/              # UI components
│   │   │   ├── LeftNav.tsx     # Category sidebar
│   │   │   ├── TopSearch.tsx   # Search bar
│   │   │   ├── InfoPanel.tsx   # Feature details
│   │   │   └── BottomControls.tsx
│   │   ├── globe/              # 3D rendering
│   │   │   ├── GlobeScene.tsx  # Main Three.js scene
│   │   │   └── geo.ts          # Coordinate utilities
│   │   └── ui/                 # Reusable UI components
│   ├── data/
│   │   ├── features.ts         # Type definitions
│   │   └── borders.ts          # Country border data
│   ├── lib/
│   │   ├── loadAtlasData.ts    # Data loader
│   │   └── supabase.ts         # DB client
│   └── assets/
│       ├── earth-blue-marble.jpg   # Satellite texture
│       └── earth-topology.png       # Elevation data
├── ATLAS_DATA/                 # Source geographical data
└── README.md
```

---

## 🗺️ Data Sources & Attribution

All geographical data is properly sourced:

- **NASA Blue Marble** - Earth satellite imagery (Public Domain)
- **Natural Earth** - Country borders and geographical features
- **SRTM** - Elevation data for terrain rendering
- **OpenStreetMap** - Settlement and infrastructure data

See `ATLAS_DATA/08_sources_licensing/source_registry.csv` for complete attribution.

---

## 🎨 Design Philosophy

### Visual Principles
- **Cinematic lighting** - Multiple light sources for depth
- **Atmospheric realism** - Blue glow around Earth
- **Smooth animations** - 60fps camera movements
- **Dark UI** - Focus attention on the globe
- **Clean typography** - Inter font for readability

### UX Principles
- **Progressive disclosure** - Show details on demand
- **Keyboard-first** - Power users can navigate without mouse
- **Mobile-friendly** - Responsive design (planned)
- **Accessible** - ARIA labels, keyboard navigation

---

## 🚦 Roadmap

### Phase 1 - Core Experience ✅
- [x] 3D globe rendering
- [x] Basic feature markers
- [x] Search functionality
- [x] Category filtering
- [x] Info panels

### Phase 2 - Data Expansion 🔄
- [ ] Load all 15,000+ features from CSV
- [ ] Dynamic data loading from Supabase
- [ ] Real-time data updates
- [ ] User-contributed features

### Phase 3 - Advanced Features 📋
- [ ] 3D terrain visualization
- [ ] Weather data overlay
- [ ] Historical imagery timeline
- [ ] Route planning between features
- [ ] Virtual tours (auto-fly through regions)

### Phase 4 - Social & AI 🤖
- [ ] Share feature links
- [ ] AI-powered geographical Q&A
- [ ] Community photos for features
- [ ] Personalized exploration recommendations

---

## 🤝 Contributing

Contributions welcome! Areas that need help:

1. **Data Curation** - Verify geographical coordinates
2. **Performance** - Optimize rendering for mobile
3. **Features** - Add new categories (waterfalls, passes, etc.)
4. **Testing** - Write E2E tests
5. **Documentation** - Improve guides

See `CONTRIBUTING.md` for guidelines.

---

## 📄 License

MIT License - feel free to use this in your own projects!

---

## 💬 Interview Talking Points

### Technical Depth
- "I implemented custom Three.js shaders for atmospheric scattering"
- "Used React 19's concurrent features for smooth animations"
- "Optimized bundle size - 1.5MB gzipped despite 3D rendering"

### Product Thinking
- "Identified gap in geographical education tools"
- "Focused on India/Nepal because it's my domain expertise"
- "Designed for multiple user personas - students, trekkers, researchers"

### Scalability
- "Architecture supports 15,000+ features"
- "PostGIS backend can handle spatial queries"
- "Lazy loading planned for performance"

### Real-World Impact
- "Could be used by schools teaching Indian geography"
- "Useful for trek planners researching Himalayan routes"
- "Serves as portfolio piece demonstrating 3D web capabilities"

---

## 🔗 Links

- **Live Demo**: [Coming soon]
- **GitHub**: https://github.com/Kaustube/atlas
- **Portfolio**: [Your portfolio]
- **LinkedIn**: [Your LinkedIn]

---

**Built with ❤️ by Kaustubh | November 2026**
