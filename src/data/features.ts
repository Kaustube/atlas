// ATLAS Geographical Features Database
// Loaded from ATLAS_DATA folder

export interface AtlasFeature {
  id: string
  name: string
  type: string
  lat: number
  lng: number
  elevation?: number
  description?: string
  pin?: boolean
}

export const KIND_LABEL: Record<string, string> = {
  'mountain_peak': 'Mountain Peak',
  'mountain_range': 'Mountain Range',
  'valley': 'Valley',
  'river': 'River',
  'lake': 'Lake',
  'glacier': 'Glacier',
  'waterfall': 'Waterfall',
  'pass': 'Mountain Pass',
  'settlement': 'Settlement',
  'protected_area': 'Protected Area',
}

// Features are loaded from loadAtlasData.ts
import { getAllFeatures as loadFeatures, getFeatureById as loadFeature } from '../lib/loadAtlasData'

export const FEATURES: AtlasFeature[] = loadFeatures()

export function getFeature(id: string): AtlasFeature {
  return loadFeature(id) || {
    id: 'india-default',
    name: 'India',
    type: 'country',
    lat: 20.5937,
    lng: 78.9629,
    description: 'Republic of India',
    pin: false,
  }
}
