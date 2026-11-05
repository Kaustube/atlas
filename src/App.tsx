import { useState, useMemo } from 'react'
import GlobeScene, { type GlobeLayers } from './components/globe/GlobeScene'
import LeftNav from './components/atlas/LeftNav'
import TopSearch from './components/atlas/TopSearch'
import InfoPanel from './components/atlas/InfoPanel'
import BottomControls from './components/atlas/BottomControls'
import { type AtlasFeature } from './data/features'
import { getFeaturesByType } from './lib/loadAtlasData'

function App() {
  const [selectedFeature, setSelectedFeature] = useState<AtlasFeature | null>(null)
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [style, setStyle] = useState<'terrain' | 'satellite'>('satellite')
  const [layers, setLayers] = useState<GlobeLayers>({
    borders: true,
    elevation: true,
    grid: true,
  })

  // Filter features by active category
  const showMarkers = activeCategory !== 'none'

  // Default view - Start with a nice angle showing India/Himalayas
  const defaultView: AtlasFeature = {
    id: 'india-default',
    name: 'India & Himalayas',
    type: 'region',
    lat: 30.0,
    lng: 85.0,
    description: 'Explore the majestic Himalayas and Indian subcontinent',
    pin: false,
  }

  const displayFeature = selectedFeature || defaultView

  const handleSelect = (f: AtlasFeature) => {
    setSelectedFeature(f)
    setActiveCategory('all') // Show all markers when a feature is selected
  }

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category)
    setSelectedFeature(null) // Clear selection when changing categories
  }

  return (
    <div className="relative h-screen w-screen select-none overflow-hidden bg-background font-sans text-foreground">
      {/* Globe - shows markers based on active category */}
      <GlobeScene 
        selected={displayFeature} 
        onSelect={handleSelect} 
        layers={layers} 
        style={style}
        showMarkers={showMarkers}
      />

      {/* Soft vignette */}
      <div className="atlas-vignette pointer-events-none absolute inset-0 z-[1]" aria-hidden />

      {/* Interface */}
      <TopSearch onSelect={handleSelect} />
      <LeftNav 
        onNavigate={handleSelect} 
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />
      {selectedFeature && <InfoPanel feature={selectedFeature} onSelect={handleSelect} />}
      <BottomControls
        style={style}
        onStyle={setStyle}
        layers={layers}
        onToggle={(key) => setLayers((prev) => ({ ...prev, [key]: !prev[key] }))}
      />

      {/* Corner registration ticks */}
      <CornerTick className="left-[272px] top-4 border-l border-t" />
      <CornerTick className="right-4 top-4 border-r border-t" />
      <CornerTick className="bottom-4 left-[272px] border-b border-l" />
      <CornerTick className="bottom-4 right-4 border-b border-r" />
    </div>
  )
}

function CornerTick({ className }: { className: string }) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute z-10 h-3 w-3 border-border/60 ${className}`}
    />
  )
}

export default App
