
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import SearchBar from '@/components/SearchBar';
import Filters from '@/components/Filters';
import LocationCard from '@/components/LocationCard';
import { locations, searchLocations } from '@/lib/mockData';
import { GridIcon, LayoutList, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FilterState {
  types: string[];
  cleanlinessScore: number | null;
  amenities: string[];
  distance: number | null;
}

const Search = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialQuery = queryParams.get('q') || '';
  
  const [query, setQuery] = useState(initialQuery);
  const [searchResults, setSearchResults] = useState(initialQuery ? searchLocations(initialQuery) : locations);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState<FilterState>({
    types: [],
    cleanlinessScore: null,
    amenities: [],
    distance: null
  });
  
  useEffect(() => {
    if (initialQuery) {
      setSearchResults(searchLocations(initialQuery));
    }
  }, [initialQuery]);
  
  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    
    // Apply filters to results
    let filteredResults = initialQuery ? searchLocations(initialQuery) : locations;
    
    // Filter by type
    if (newFilters.types.length > 0) {
      filteredResults = filteredResults.filter(item => 
        newFilters.types.includes(item.type)
      );
    }
    
    // Filter by cleanliness score
    if (newFilters.cleanlinessScore) {
      filteredResults = filteredResults.filter(item => 
        item.cleanlinessScore >= newFilters.cleanlinessScore!
      );
    }
    
    // Filter by amenities
    if (newFilters.amenities.length > 0) {
      filteredResults = filteredResults.filter(item => 
        newFilters.amenities.every(amenity => 
          item.amenities && item.amenities.includes(amenity)
        )
      );
    }
    
    // Filter by distance (mocked for now)
    if (newFilters.distance) {
      console.log(`Filtering by distance: ${newFilters.distance} km`);
      // In a real app, we would use the user's location and calculate actual distances
      // For now, we'll just log it and not filter the results
    }
    
    setSearchResults(filteredResults);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-8">
            <SearchBar variant="expanded" />
          </div>
          
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold">
                {query ? `Résultats pour "${query}"` : 'Tous les lieux'}
              </h1>
              <p className="text-muted-foreground">
                {searchResults.length} {searchResults.length > 1 ? 'lieux trouvés' : 'lieu trouvé'}
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <Filters onFilterChange={handleFilterChange} />
              
              <div className="flex border rounded-lg shadow-sm overflow-hidden">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="icon"
                  className="rounded-none"
                  onClick={() => setViewMode('grid')}
                >
                  <GridIcon size={20} />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="icon"
                  className="rounded-none"
                  onClick={() => setViewMode('list')}
                >
                  <LayoutList size={20} />
                </Button>
              </div>
            </div>
          </div>
          
          {searchResults.length > 0 ? (
            <div className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                : 'space-y-4'
            }>
              {searchResults.map((location) => (
                <LocationCard 
                  key={location.id} 
                  location={location}
                  variant={viewMode === 'list' ? 'featured' : 'default'}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <MapPin className="text-primary" size={24} />
              </div>
              <h2 className="text-xl font-semibold mb-2">Aucun résultat trouvé</h2>
              <p className="text-muted-foreground mb-6">
                Nous n'avons pas trouvé de lieu correspondant à votre recherche.
              </p>
              <Button 
                variant="outline"
                onClick={() => {
                  setQuery('');
                  setSearchResults(locations);
                  setFilters({
                    types: [],
                    cleanlinessScore: null,
                    amenities: [],
                    distance: null
                  });
                }}
              >
                Voir tous les lieux
              </Button>
            </div>
          )}
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
          © 2023 Tunisia Clean. Tous droits réservés.
        </div>
      </footer>
    </div>
  );
};

export default Search;
