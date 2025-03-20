
export interface Location {
  id: string;
  name: string;
  type: 'restaurant' | 'cafe' | 'park' | 'beach' | 'museum';
  address: string;
  city: string;
  region: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  images: string[];
  description: string;
  cleanlinessScore: number;
  ratings: {
    overall: number;
    totalReviews: number;
  };
  amenities: string[];
  openingHours: {
    [key: string]: {
      open: string;
      close: string;
    };
  };
  tags: string[];
  priceLevel: 1 | 2 | 3;
  featured?: boolean;
}

export const locations: Location[] = [
  {
    id: '1',
    name: 'Café Sidi Bou Said',
    type: 'cafe',
    address: 'Rue Habib Thameur',
    city: 'Sidi Bou Said',
    region: 'Tunis',
    coordinates: {
      lat: 36.8711,
      lng: 10.3418
    },
    images: [
      'https://images.unsplash.com/photo-1610194352361-4c81a6a8967e?ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1659221266338-7344960abdbc?ixlib=rb-4.0.3'
    ],
    description: 'Café traditionnel avec une vue imprenable sur la mer Méditerranée. Connu pour son authenticité exemplaire et son service attentif aux valeurs locales.',
    cleanlinessScore: 4.8,
    ratings: {
      overall: 4.7,
      totalReviews: 238
    },
    amenities: ['WiFi gratuit', 'Terrasse', 'Vue sur mer', 'Climatisation'],
    openingHours: {
      monday: { open: '08:00', close: '23:00' },
      tuesday: { open: '08:00', close: '23:00' },
      wednesday: { open: '08:00', close: '23:00' },
      thursday: { open: '08:00', close: '23:00' },
      friday: { open: '08:00', close: '00:00' },
      saturday: { open: '08:00', close: '00:00' },
      sunday: { open: '08:00', close: '23:00' }
    },
    tags: ['Vue panoramique', 'Café traditionnel', 'Authenticité'],
    priceLevel: 2,
    featured: true
  },
  {
    id: '2',
    name: 'Restaurant El Walima',
    type: 'restaurant',
    address: 'Avenue Habib Bourguiba',
    city: 'Tunis',
    region: 'Tunis',
    coordinates: {
      lat: 36.7992,
      lng: 10.1844
    },
    images: [
      'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?ixlib=rb-4.0.3'
    ],
    description: 'Restaurant élégant proposant une cuisine tunisienne raffinée dans un cadre somptueux. Respect rigoureux des traditions culinaires et des valeurs d\'excellence.',
    cleanlinessScore: 4.9,
    ratings: {
      overall: 4.8,
      totalReviews: 352
    },
    amenities: ['Parking', 'Réservation', 'Climatisation', 'Service VIP'],
    openingHours: {
      monday: { open: '12:00', close: '23:00' },
      tuesday: { open: '12:00', close: '23:00' },
      wednesday: { open: '12:00', close: '23:00' },
      thursday: { open: '12:00', close: '23:00' },
      friday: { open: '12:00', close: '00:00' },
      saturday: { open: '12:00', close: '00:00' },
      sunday: { open: '12:00', close: '23:00' }
    },
    tags: ['Cuisine tunisienne', 'Élégant', 'Éthique culinaire'],
    priceLevel: 3,
    featured: true
  },
  {
    id: '3',
    name: 'Plage de Hammamet',
    type: 'beach',
    address: 'Hammamet Sud',
    city: 'Hammamet',
    region: 'Nabeul',
    coordinates: {
      lat: 36.3782,
      lng: 10.5457
    },
    images: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1519046904884-53103b34b206?ixlib=rb-4.0.3'
    ],
    description: 'Plage de sable fin avec des eaux cristallines. Entretenue quotidiennement pour garantir la propreté des lieux.',
    cleanlinessScore: 4.5,
    ratings: {
      overall: 4.6,
      totalReviews: 504
    },
    amenities: ['Douches', 'Toilettes', 'Location de parasols', 'Activités nautiques'],
    openingHours: {
      monday: { open: '06:00', close: '20:00' },
      tuesday: { open: '06:00', close: '20:00' },
      wednesday: { open: '06:00', close: '20:00' },
      thursday: { open: '06:00', close: '20:00' },
      friday: { open: '06:00', close: '20:00' },
      saturday: { open: '06:00', close: '20:00' },
      sunday: { open: '06:00', close: '20:00' }
    },
    tags: ['Sable fin', 'Eau claire', 'Familial'],
    priceLevel: 1,
    featured: true
  },
  {
    id: '4',
    name: 'Parc Habib Thameur',
    type: 'park',
    address: 'Avenue Habib Thameur',
    city: 'Tunis',
    region: 'Tunis',
    coordinates: {
      lat: 36.7977,
      lng: 10.1813
    },
    images: [
      'https://images.unsplash.com/photo-1586531387058-bd3f4f3a9ac7?ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1552779283-ac93d926d625?ixlib=rb-4.0.3'
    ],
    description: 'Espace vert paisible au cœur de Tunis. Un havre de paix parfaitement entretenu pour les promenades et le repos.',
    cleanlinessScore: 4.3,
    ratings: {
      overall: 4.4,
      totalReviews: 187
    },
    amenities: ['Aires de jeux', 'Bancs', 'Fontaines', 'Pistes de jogging'],
    openingHours: {
      monday: { open: '07:00', close: '19:00' },
      tuesday: { open: '07:00', close: '19:00' },
      wednesday: { open: '07:00', close: '19:00' },
      thursday: { open: '07:00', close: '19:00' },
      friday: { open: '07:00', close: '19:00' },
      saturday: { open: '07:00', close: '19:00' },
      sunday: { open: '07:00', close: '19:00' }
    },
    tags: ['Espace vert', 'Paisible', 'Bien entretenu'],
    priceLevel: 1
  },
  {
    id: '5',
    name: 'Musée du Bardo',
    type: 'museum',
    address: 'Avenue Habib Bourguiba',
    city: 'Tunis',
    region: 'Tunis',
    coordinates: {
      lat: 36.8091,
      lng: 10.1345
    },
    images: [
      'https://images.unsplash.com/photo-1605624540925-57b35689d1c0?ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1582034986517-30d163a12cda?ixlib=rb-4.0.3'
    ],
    description: 'Un des plus importants musées du bassin méditerranéen, abritant l\'une des plus belles collections de mosaïques romaines au monde.',
    cleanlinessScore: 4.7,
    ratings: {
      overall: 4.9,
      totalReviews: 723
    },
    amenities: ['Visites guidées', 'Boutique', 'Café', 'Climatisation'],
    openingHours: {
      monday: { open: 'Fermé', close: 'Fermé' },
      tuesday: { open: '09:00', close: '17:00' },
      wednesday: { open: '09:00', close: '17:00' },
      thursday: { open: '09:00', close: '17:00' },
      friday: { open: '09:00', close: '17:00' },
      saturday: { open: '09:00', close: '17:00' },
      sunday: { open: '09:00', close: '17:00' }
    },
    tags: ['Culturel', 'Historique', 'Éducatif'],
    priceLevel: 2
  },
  {
    id: '6',
    name: 'Café Delices',
    type: 'cafe',
    address: 'Rue de la Kasbah',
    city: 'Sousse',
    region: 'Sousse',
    coordinates: {
      lat: 35.8262,
      lng: 10.6345
    },
    images: [
      'https://images.unsplash.com/photo-1599142296733-31bdb2086bb6?ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1521017432531-fbd92d768814?ixlib=rb-4.0.3'
    ],
    description: 'Café moderne avec une ambiance détendue et une décoration soignée. Très attentif à la propreté de l\'espace.',
    cleanlinessScore: 4.6,
    ratings: {
      overall: 4.5,
      totalReviews: 216
    },
    amenities: ['WiFi gratuit', 'Prises électriques', 'Terrasse', 'Pâtisseries'],
    openingHours: {
      monday: { open: '07:30', close: '22:00' },
      tuesday: { open: '07:30', close: '22:00' },
      wednesday: { open: '07:30', close: '22:00' },
      thursday: { open: '07:30', close: '22:00' },
      friday: { open: '07:30', close: '23:30' },
      saturday: { open: '07:30', close: '23:30' },
      sunday: { open: '08:30', close: '22:00' }
    },
    tags: ['Café moderne', 'Pâtisseries', 'Espace travail'],
    priceLevel: 2
  }
];

export const featuredLocations = locations.filter(location => location.featured);

export const getLocationById = (id: string): Location | undefined => {
  return locations.find(location => location.id === id);
};

export const getLocationsByType = (type: Location['type']): Location[] => {
  return locations.filter(location => location.type === type);
};

export const getLocationsByRegion = (region: string): Location[] => {
  return locations.filter(location => location.region === region);
};

export const getLocationsByCleanlinessScore = (minScore: number): Location[] => {
  return locations.filter(location => location.cleanlinessScore >= minScore);
};

export const searchLocations = (query: string): Location[] => {
  const searchTerm = query.toLowerCase();
  
  return locations.filter(location => 
    location.name.toLowerCase().includes(searchTerm) ||
    location.city.toLowerCase().includes(searchTerm) ||
    location.region.toLowerCase().includes(searchTerm) ||
    location.tags.some(tag => tag.toLowerCase().includes(searchTerm))
  );
};
