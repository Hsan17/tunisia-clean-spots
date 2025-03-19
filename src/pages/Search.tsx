
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import SearchBar from '@/components/SearchBar';
import Filters from '@/components/Filters';
import LocationCard from '@/components/LocationCard';
import { locations, searchLocations } from '@/lib/mockData';
import { GridIcon, LayoutList, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Search = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialQuery = queryParams.get('q') || '';
  
  const [query, setQuery] = useState(initialQuery);
  const [searchResults, setSearchResults] = useState(initialQuery ? searchLocations(initialQuery) : locations);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  useEffect(() => {
    if (initialQuery) {
      setSearchResults(searchLocations(initialQuery));
    }
  }, [initialQuery]);
  
  const handleFilterChange = (filters: any) => {
    console.log('Filters changed:', filters);
    // In a real implementation, this would filter the results based on the selected filters
    // For now, we'll just log the filters
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
