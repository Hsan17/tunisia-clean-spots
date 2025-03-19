
import { useState } from 'react';
import { Search, MapPin, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { searchLocations } from '@/lib/mockData';
import { useNavigate } from 'react-router-dom';

interface SearchBarProps {
  className?: string;
  variant?: 'default' | 'expanded';
}

const SearchBar = ({ className = '', variant = 'default' }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const navigate = useNavigate();
  
  const isExpanded = variant === 'expanded' || isFocused;
  
  const handleSearch = (value: string) => {
    setQuery(value);
    if (value.length >= 2) {
      const results = searchLocations(value);
      setSearchResults(results.slice(0, 5));
    } else {
      setSearchResults([]);
    }
  };
  
  const handleClear = () => {
    setQuery('');
    setSearchResults([]);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };
  
  const handleResultClick = (id: string) => {
    navigate(`/location/${id}`);
  };

  return (
    <div className={`relative ${className}`}>
      <form 
        onSubmit={handleSubmit}
        className={`
          flex items-center w-full transition-all duration-300 shadow-sm
          ${isExpanded 
            ? 'bg-white rounded-t-xl border border-gray-200' 
            : 'bg-white/80 backdrop-blur-sm rounded-full border border-gray-100'
          }
        `}
      >
        <div className="flex-1 flex items-center px-4">
          <MapPin className="text-primary mr-2 flex-shrink-0" size={20} />
          <Input
            type="text"
            placeholder="Rechercher un lieu, une ville, une région..."
            className="flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent shadow-none"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          />
          {query && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={handleClear}
            >
              <X size={16} />
            </Button>
          )}
        </div>
        <Button 
          type="submit"
          className={`rounded-r-xl flex-shrink-0 ${!isExpanded ? 'rounded-l-xl' : ''}`}
        >
          <Search className="mr-2" size={18} />
          Rechercher
        </Button>
      </form>
      
      {/* Search results dropdown */}
      {isFocused && searchResults.length > 0 && (
        <div className="absolute top-full left-0 right-0 z-10 bg-white rounded-b-xl border border-t-0 border-gray-200 shadow-md animate-fade-in">
          <div className="py-2">
            {searchResults.map((result) => (
              <div 
                key={result.id}
                className="px-4 py-2 hover:bg-gray-50 cursor-pointer"
                onClick={() => handleResultClick(result.id)}
              >
                <div className="flex items-center">
                  <MapPin className="text-muted-foreground mr-2" size={16} />
                  <div>
                    <p className="font-medium">{result.name}</p>
                    <p className="text-sm text-muted-foreground">{result.city}, {result.region}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
