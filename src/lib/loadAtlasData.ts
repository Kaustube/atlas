// ATLAS Data Loader - Loads all geographical data from ATLAS_DATA folder
// This will be replaced with actual CSV parsing when needed

import type { AtlasFeature } from '../data/features'

// For now, we'll manually add key features from ATLAS_DATA
// TODO: Build CSV parser to load all data dynamically

export const ATLAS_FEATURES: AtlasFeature[] = [
  // Major Himalayan Peaks
  {
    id: 'mount-everest',
    name: 'Mount Everest',
    type: 'mountain_peak',
    lat: 27.9881,
    lng: 86.9250,
    elevation: 8848.86,
    description: 'Highest mountain on Earth. Nepal-China border.',
    pin: true,
  },
  {
    id: 'kanchenjunga',
    name: 'Kanchenjunga',
    type: 'mountain_peak',
    lat: 27.7025,
    lng: 88.1475,
    elevation: 8586,
    description: 'Third highest mountain, sacred peak. Nepal-India (Sikkim) border.',
    pin: true,
  },
  {
    id: 'k2',
    name: 'K2',
    type: 'mountain_peak',
    lat: 35.8825,
    lng: 76.5133,
    elevation: 8611,
    description: 'Second highest mountain. India (Jammu & Kashmir), Karakoram range.',
    pin: true,
  },
  {
    id: 'nanda-devi',
    name: 'Nanda Devi',
    type: 'mountain_peak',
    lat: 30.3747,
    lng: 79.9739,
    elevation: 7816,
    description: 'Highest peak entirely within India. Uttarakhand, Garhwal Himalaya.',
    pin: true,
  },
  {
    id: 'mount-kailash',
    name: 'Mount Kailash',
    type: 'mountain_peak',
    lat: 31.0688,
    lng: 81.3108,
    elevation: 6638,
    description: 'Sacred mountain in Hinduism, Buddhism, Jainism, and Bon. Tibet.',
    pin: true,
  },
  {
    id: 'nanga-parbat',
    name: 'Nanga Parbat',
    type: 'mountain_peak',
    lat: 35.2375,
    lng: 74.5894,
    elevation: 8126,
    description: 'Ninth highest mountain, western anchor of Himalayas. India (J&K).',
    pin: true,
  },
  
  // Major Indian Cities
  {
    id: 'new-delhi',
    name: 'New Delhi',
    type: 'settlement',
    lat: 28.6139,
    lng: 77.2090,
    description: 'Capital of India',
    pin: true,
  },
  {
    id: 'manali',
    name: 'Manali',
    type: 'settlement',
    lat: 32.2396,
    lng: 77.1892,
    elevation: 2050,
    description: 'Himalayan town in Kullu Valley, Himachal Pradesh. Gateway to mountains.',
    pin: true,
  },
  {
    id: 'leh',
    name: 'Leh',
    type: 'settlement',
    lat: 34.1526,
    lng: 77.5771,
    elevation: 3500,
    description: 'Capital of Ladakh Union Territory. High-altitude desert town.',
    pin: true,
  },
  {
    id: 'kathmandu',
    name: 'Kathmandu',
    type: 'settlement',
    lat: 27.7172,
    lng: 85.3240,
    elevation: 1400,
    description: 'Capital of Nepal',
    pin: true,
  },
  {
    id: 'srinagar',
    name: 'Srinagar',
    type: 'settlement',
    lat: 34.0837,
    lng: 74.7973,
    elevation: 1585,
    description: 'Summer capital of Jammu and Kashmir. Famous for Dal Lake.',
    pin: true,
  },
  
  // Major Rivers
  {
    id: 'ganges',
    name: 'Ganges (Ganga)',
    type: 'river',
    lat: 25.4358,
    lng: 81.8463,
    description: 'Sacred river of India, 2525 km long. Source: Gangotri Glacier.',
    pin: true,
  },
  {
    id: 'brahmaputra',
    name: 'Brahmaputra',
    type: 'river',
    lat: 26.2006,
    lng: 92.9376,
    description: 'Major river flowing through Tibet, India (Assam), Bangladesh. 2900 km.',
    pin: true,
  },
  {
    id: 'indus',
    name: 'Indus (Sindhu)',
    type: 'river',
    lat: 34.1526,
    lng: 77.5771,
    description: 'Ancient river, flows through Ladakh and J&K. Source near Mount Kailash.',
    pin: true,
  },
]

export function getAllFeatures(): AtlasFeature[] {
  return ATLAS_FEATURES
}

export function getFeatureById(id: string): AtlasFeature | undefined {
  return ATLAS_FEATURES.find(f => f.id === id)
}

export function getFeaturesByType(type: string): AtlasFeature[] {
  return ATLAS_FEATURES.filter(f => f.type === type)
}
