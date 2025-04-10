
import { useState } from 'react';
import { Filter, Star, CheckCircle2, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

interface FiltersProps {
  className?: string;
  onFilterChange?: (filters: FilterState) => void;
}

interface FilterState {
  types: string[];
  cleanlinessScore: number | null;
  amenities: string[];
  distance: number | null;
}

const Filters = ({ className = '', onFilterChange }: FiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    types: [],
    cleanlinessScore: null,
    amenities: [],
    distance: null
  });
  
  const locationTypes = [
    { id: 'restaurant', label: 'Restaurants' },
    { id: 'cafe', label: 'Cafés' },
    { id: 'beach', label: 'Plages' },
    { id: 'park', label: 'Parcs' },
    { id: 'museum', label: 'Musées' }
  ];
  
  const cleanlinessScores = [
    { value: 3, label: '3+' },
    { value: 4, label: '4+' },
    { value: 4.5, label: '4.5+' }
  ];
  
  const amenitiesList = [
    { id: 'wifi', label: 'WiFi gratuit' },
    { id: 'parking', label: 'Parking' },
    { id: 'terrace', label: 'Terrasse' },
    { id: 'ac', label: 'Climatisation' }
  ];

  const distanceOptions = [
    { value: 1, label: '1 km' },
    { value: 5, label: '5 km' },
    { value: 10, label: '10 km' },
    { value: 20, label: '20 km' },
    { value: 50, label: '50 km' }
  ];
  
  const toggleType = (typeId: string) => {
    let newTypes;
    if (filters.types.includes(typeId)) {
      newTypes = filters.types.filter(id => id !== typeId);
    } else {
      newTypes = [...filters.types, typeId];
    }
    
    updateFilters({ ...filters, types: newTypes });
  };
  
  const setCleanlinessScore = (score: number) => {
    updateFilters({ ...filters, cleanlinessScore: filters.cleanlinessScore === score ? null : score });
  };
  
  const toggleAmenity = (amenityId: string) => {
    let newAmenities;
    if (filters.amenities.includes(amenityId)) {
      newAmenities = filters.amenities.filter(id => id !== amenityId);
    } else {
      newAmenities = [...filters.amenities, amenityId];
    }
    
    updateFilters({ ...filters, amenities: newAmenities });
  };

  const setDistance = (distance: number) => {
    updateFilters({ ...filters, distance: filters.distance === distance ? null : distance });
  };

  const handleDistanceSliderChange = (value: number[]) => {
    updateFilters({ ...filters, distance: value[0] });
  };
  
  const updateFilters = (newFilters: FilterState) => {
    setFilters(newFilters);
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };
  
  const clearFilters = () => {
    const resetFilters = {
      types: [],
      cleanlinessScore: null,
      amenities: [],
      distance: null
    };
    updateFilters(resetFilters);
  };
  
  const activeFilterCount = 
    (filters.types.length > 0 ? 1 : 0) + 
    (filters.cleanlinessScore ? 1 : 0) + 
    (filters.amenities.length > 0 ? 1 : 0) +
    (filters.distance ? 1 : 0);

  return (
    <div className={className}>
      <div className="flex items-center justify-between">
        <Button 
          variant={isOpen ? "secondary" : "outline"} 
          className="flex items-center gap-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Filter size={18} />
          Filtres
          {activeFilterCount > 0 && (
            <span className="ml-1 w-5 h-5 flex items-center justify-center bg-primary text-primary-foreground text-xs rounded-full">
              {activeFilterCount}
            </span>
          )}
        </Button>
        
        {activeFilterCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground"
            onClick={clearFilters}
          >
            Réinitialiser
          </Button>
        )}
      </div>
      
      {isOpen && (
        <div className="mt-4 p-5 bg-white rounded-xl border border-gray-100 shadow-sm animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Location types */}
            <div>
              <h3 className="font-medium mb-3 flex items-center">
                <CheckCircle2 size={16} className="mr-2 text-primary" />
                Type de lieu
              </h3>
              <div className="space-y-2">
                {locationTypes.map((type) => (
                  <label 
                    key={type.id} 
                    className="flex items-center cursor-pointer group"
                  >
                    <div 
                      className={`
                        w-5 h-5 rounded border transition-colors mr-2 flex items-center justify-center
                        ${filters.types.includes(type.id) 
                          ? 'bg-primary border-primary text-white' 
                          : 'border-gray-300 group-hover:border-primary'}
                      `}
                    >
                      {filters.types.includes(type.id) && (
                        <CheckCircle2 size={14} />
                      )}
                    </div>
                    <span>{type.label}</span>
                  </label>
                ))}
              </div>
            </div>
            
            {/* Integrity score */}
            <div>
              <h3 className="font-medium mb-3 flex items-center">
                <Star size={16} className="mr-2 text-primary" />
                Score d'intégrité
              </h3>
              <div className="flex flex-wrap gap-2">
                {cleanlinessScores.map((score) => (
                  <button
                    key={score.value}
                    className={`
                      px-3 py-1 rounded-full text-sm
                      ${filters.cleanlinessScore === score.value 
                        ? 'bg-primary text-white' 
                        : 'bg-gray-100 hover:bg-gray-200'}
                    `}
                    onClick={() => setCleanlinessScore(score.value)}
                  >
                    {score.label}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Distance */}
            <div>
              <h3 className="font-medium mb-3 flex items-center">
                <MapPin size={16} className="mr-2 text-primary" />
                Distance (km)
              </h3>
              <div className="space-y-6">
                <div className="flex flex-wrap gap-2">
                  {distanceOptions.map((option) => (
                    <button
                      key={option.value}
                      className={`
                        px-3 py-1 rounded-full text-sm
                        ${filters.distance === option.value 
                          ? 'bg-primary text-white' 
                          : 'bg-gray-100 hover:bg-gray-200'}
                      `}
                      onClick={() => setDistance(option.value)}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
                
                <div className="px-2">
                  <Slider
                    defaultValue={[filters.distance || 10]}
                    max={50}
                    step={1}
                    onValueChange={handleDistanceSliderChange}
                    className="my-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>1 km</span>
                    <span>25 km</span>
                    <span>50 km</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Amenities */}
            <div>
              <h3 className="font-medium mb-3">Équipements</h3>
              <div className="space-y-2">
                {amenitiesList.map((amenity) => (
                  <label 
                    key={amenity.id} 
                    className="flex items-center cursor-pointer group"
                  >
                    <div 
                      className={`
                        w-5 h-5 rounded border transition-colors mr-2 flex items-center justify-center
                        ${filters.amenities.includes(amenity.id) 
                          ? 'bg-primary border-primary text-white' 
                          : 'border-gray-300 group-hover:border-primary'}
                      `}
                    >
                      {filters.amenities.includes(amenity.id) && (
                        <CheckCircle2 size={14} />
                      )}
                    </div>
                    <span>{amenity.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filters;
