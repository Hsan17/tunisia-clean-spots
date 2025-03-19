
import { useEffect, useRef, useState } from 'react';
import { Search, Filter, X, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { locations } from '@/lib/mockData';
import CleanlinessScore from './CleanlinessScore';
import { useNavigate } from 'react-router-dom';

const Map = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activePin, setActivePin] = useState<string | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // This would be replaced with actual map initialization
    // For now, we'll create a simple interactive mockup
    if (mapRef.current) {
      // Map initialization would happen here
    }
  }, []);

  const handlePinClick = (id: string) => {
    setActivePin(id === activePin ? null : id);
  };

  const handleLocationSelect = (id: string) => {
    navigate(`/location/${id}`);
  };

  return (
    <section className="relative py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <span className="px-3 py-1 rounded-full bg-clean-100 text-clean-800 text-sm font-medium">
            Explorez la carte
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight">Découvrez les lieux propres</h2>
          <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
            Naviguez sur la carte pour trouver les lieux les plus propres de Tunisie
          </p>
        </div>

        <div className="relative md:flex md:items-start md:gap-6">
          {/* Search and filter sidebar */}
          <div className="w-full md:w-80 mb-6 md:mb-0">
            <div className="sticky top-24 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-4">
                <div className="relative mb-4">
                  <Input
                    type="text"
                    placeholder="Rechercher..."
                    className="pl-10 pr-4 py-6"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full flex items-center justify-between"
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                >
                  <div className="flex items-center">
                    <Filter size={18} className="mr-2" />
                    Filtres
                  </div>
                  {isFilterOpen ? <X size={16} /> : <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">3</span>}
                </Button>
                
                {isFilterOpen && (
                  <div className="mt-4 space-y-4 animate-fade-in">
                    <div>
                      <label className="text-sm font-medium">Type de lieu</label>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <FilterChip label="Tous" active />
                        <FilterChip label="Restaurants" />
                        <FilterChip label="Cafés" />
                        <FilterChip label="Plages" />
                        <FilterChip label="Parcs" />
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">Score minimum de propreté</label>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <FilterChip label="3+" />
                        <FilterChip label="4+" active />
                        <FilterChip label="4.5+" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="border-t border-gray-100 max-h-[350px] overflow-y-auto">
                {locations.map((location) => (
                  <div
                    key={location.id}
                    className={`
                      p-4 border-b border-gray-100 cursor-pointer transition-colors 
                      ${location.id === activePin ? 'bg-clean-50' : 'hover:bg-gray-50'}
                    `}
                    onClick={() => handleLocationSelect(location.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <img 
                          src={location.images[0]} 
                          alt={location.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium line-clamp-1">{location.name}</h4>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {location.city}, {location.region}
                        </p>
                        <div className="mt-1 flex items-center gap-2">
                          <span className="text-xs px-2 py-0.5 bg-secondary rounded-full">
                            {location.type}
                          </span>
                        </div>
                      </div>
                      <CleanlinessScore score={location.cleanlinessScore} size="sm" showText={false} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="flex-1 h-[600px] rounded-xl border border-gray-200 shadow-sm overflow-hidden relative bg-clean-50">
            <div ref={mapRef} className="w-full h-full">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3')] bg-cover bg-center opacity-10"></div>
              
              {/* Map pins */}
              {locations.map((location) => {
                // Calculate position (in a real implementation, this would use actual coordinates)
                const left = Math.random() * 80 + 10; // 10% to 90%
                const top = Math.random() * 80 + 10;  // 10% to 90%
                
                return (
                  <div 
                    key={location.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer transition-all duration-300"
                    style={{ left: `${left}%`, top: `${top}%` }}
                    onClick={() => handlePinClick(location.id)}
                  >
                    <div className={`
                      w-10 h-10 flex items-center justify-center rounded-full 
                      ${location.id === activePin 
                        ? 'bg-primary text-white scale-125' 
                        : 'bg-white shadow-md hover:scale-110'}
                      transition-all duration-300
                    `}>
                      <MapPin size={18} className={location.id === activePin ? 'text-white' : 'text-primary'} />
                    </div>
                    
                    {/* Info popup when active */}
                    {location.id === activePin && (
                      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 w-60 bg-white rounded-lg shadow-lg p-3 border border-gray-100 animate-fade-in z-20">
                        <div className="flex items-start gap-3">
                          <div className="w-12 h-12 rounded-lg overflow-hidden">
                            <img 
                              src={location.images[0]} 
                              alt={location.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm line-clamp-1">{location.name}</h4>
                            <p className="text-xs text-muted-foreground">
                              {location.city}
                            </p>
                            <Button 
                              variant="link" 
                              className="p-0 h-auto text-xs"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleLocationSelect(location.id);
                              }}
                            >
                              Voir détails
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface FilterChipProps {
  label: string;
  active?: boolean;
}

const FilterChip = ({ label, active = false }: FilterChipProps) => (
  <button
    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
      active 
        ? 'bg-primary text-white' 
        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
    }`}
  >
    {label}
  </button>
);

export default Map;
