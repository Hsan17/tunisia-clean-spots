
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import LocationCard from './LocationCard';
import { featuredLocations } from '@/lib/mockData';
import { useInView } from '@/utils/animation';

const FeaturedLocations = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { threshold: 0.1 });
  const navigate = useNavigate();
  
  return (
    <section ref={containerRef} className="py-20 bg-gradient-to-b from-white to-clean-50/50">
      <div className="container mx-auto px-4">
        <div className={`transition-all duration-700 transform ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="flex items-center justify-between mb-10">
            <div>
              <span className="px-3 py-1 rounded-full bg-clean-100 text-clean-800 text-sm font-medium">
                Sélection spéciale
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight">Les lieux les plus propres</h2>
              <p className="mt-2 text-muted-foreground">Découvrez les endroits les mieux entretenus et notés de Tunisie</p>
            </div>
            <Button 
              variant="ghost" 
              className="hidden md:flex items-center gap-2"
              onClick={() => navigate('/search')}
            >
              Voir tous les lieux
              <ArrowRight size={16} />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {featuredLocations.map((location, index) => (
            <div
              key={location.id}
              className={`transition-all duration-700 delay-${index * 100} transform ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <LocationCard location={location} variant="featured" />
            </div>
          ))}
        </div>
        
        <div className="mt-10 flex justify-center md:hidden">
          <Button 
            className="flex items-center gap-2 rounded-full"
            onClick={() => navigate('/search')}
          >
            Voir tous les lieux
            <ArrowRight size={16} />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedLocations;
