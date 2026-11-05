import { useState } from 'react'
import GlobeScene, { type GlobeLayers } from './components/globe/GlobeScene'
import LeftNav from './components/atlas/LeftNav'
import TopSearch from './components/atlas/TopSearch'
import InfoPanel from './components/atlas/InfoPanel'
import BottomControls from './components/atlas/BottomControls'
import { type AtlasFeature } from './data/features'

function App() {
  const [selectedFeature, setSelectedFeature] = useState<AtlasFeature | null>(null)
  const [style, setStyle] = useState<'terrain' | 'satellite'>('terrain')
  const [layers, setLayers] = useState<GlobeLayers>({
    borders: false,
    elevation: false,
    grid: true,
  })

  // Default view - India/Nepal region, no feature selected
  const defaultView: AtlasFeature = {
    id: 'india-default',
    name: 'India & Nepal',
    type: 'region',
    lat: 28.0,
    lng: 80.0,
    description: 'Explore geographical features across India and Nepal',
    pin: false,
  }

  const displayFeature = selectedFeature || defaultView

  const handleSelect = (f: AtlasFeature) => {
    setSelectedFeature(f)
  }

  return (
    <div className="relative h-screen w-screen select-none overflow-hidden bg-background font-sans text-foreground">
      {/* Globe - shows markers ONLY when feature selected */}
      <GlobeScene 
        selected={displayFeature} 
        onSelect={handleSelect} 
        layers={layers} 
        style={style}
        showMarkers={selectedFeature !== null}
      />

      {/* Soft vignette */}
      <div className="atlas-vignette pointer-events-none absolute inset-0 z-[1]" aria-hidden />

      {/* Interface */}
      <TopSearch onSelect={handleSelect} />
      <LeftNav onNavigate={handleSelect} />
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
