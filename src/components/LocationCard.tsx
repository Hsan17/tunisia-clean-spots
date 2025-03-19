
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star } from 'lucide-react';
import { Location } from '@/lib/mockData';
import CleanlinessScore from './CleanlinessScore';

interface LocationCardProps {
  location: Location;
  variant?: 'default' | 'featured';
}

const LocationCard = ({ location, variant = 'default' }: LocationCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const isFeatured = variant === 'featured';
  const { id, name, type, city, region, images, ratings, cleanlinessScore } = location;
  
  const getTypeLabel = (type: Location['type']) => {
    switch (type) {
      case 'restaurant': return 'Restaurant';
      case 'cafe': return 'Café';
      case 'park': return 'Parc';
      case 'beach': return 'Plage';
      case 'museum': return 'Musée';
      default: return type;
    }
  };

  return (
    <Link 
      to={`/location/${id}`}
      className={`relative flex flex-col overflow-hidden rounded-xl border border-gray-100 ${
        isFeatured ? 'lg:flex-row' : ''
      } bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image */}
      <div 
        className={`relative overflow-hidden ${isFeatured ? 'lg:w-[40%] lg:max-w-[350px]' : 'h-48'}`}
      >
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out"
          style={{ 
            backgroundImage: `url(${images[0]})`,
            transform: isHovered ? 'scale(1.05)' : 'scale(1)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        
        {/* Type badge */}
        <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs font-medium">
          {getTypeLabel(type)}
        </div>
        
        {/* Cleanliness score (absolute positioned on image) */}
        <div className="absolute bottom-3 left-3">
          <CleanlinessScore score={cleanlinessScore} size="sm" />
        </div>
        
        {/* Rating (absolute positioned on image) */}
        <div className="absolute bottom-3 right-3 flex items-center px-2 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs font-medium">
          <Star size={14} className="mr-1 text-yellow-500 fill-yellow-500" />
          {ratings.overall}
          <span className="ml-1 text-muted-foreground">({ratings.totalReviews})</span>
        </div>
      </div>
      
      {/* Content */}
      <div className={`flex flex-col p-4 ${isFeatured ? 'lg:flex-1' : ''}`}>
        <h3 className="font-semibold text-lg line-clamp-1">{name}</h3>
        
        <div className="flex items-center mt-2 text-sm text-muted-foreground">
          <MapPin size={16} className="mr-1" />
          <span>{city}, {region}</span>
        </div>
        
        {isFeatured && (
          <p className="mt-3 text-muted-foreground line-clamp-2 text-sm">
            {location.description}
          </p>
        )}
        
        {/* Tags */}
        {isFeatured && (
          <div className="mt-3 flex flex-wrap gap-2">
            {location.tags.slice(0, 3).map((tag, index) => (
              <span 
                key={index} 
                className="px-2 py-0.5 bg-secondary rounded-full text-xs font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
};

export default LocationCard;
