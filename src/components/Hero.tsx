
import { useState, useRef, useEffect } from 'react';
import { MapPin, Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fadeUpVariants, useInView } from '@/utils/animation';

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { threshold: 0.1 });
  
  return (
    <section 
      ref={containerRef}
      className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-burgundy-50 to-transparent" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-burgundy-200 rounded-full blur-3xl opacity-20" />
        <div className="absolute top-40 right-10 w-96 h-96 bg-gold-200 rounded-full blur-3xl opacity-20" />
      </div>

      {/* Floating Decorative Elements */}
      <div className="absolute top-32 right-[10%] w-20 h-20 rounded-xl bg-white/80 backdrop-blur-sm shadow-lg border border-white/10 transform rotate-12 animate-float hidden lg:block" />
      <div className="absolute bottom-20 left-[5%] w-16 h-16 rounded-lg bg-white/80 backdrop-blur-sm shadow-lg border border-white/10 transform -rotate-12 animate-float animation-delay-1000 hidden lg:block" />
      
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className={`transform transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <span className="inline-block px-4 py-1.5 mb-6 rounded-full bg-burgundy-100 text-burgundy-800 text-sm font-medium">
              Découvrez les lieux les plus authentiques de Tunisie
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight text-balance">
              Explorez la Tunisie <span className="text-burgundy-700">autrement</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Trouvez les lieux les plus propres et les mieux entretenus du pays pour des expériences inoubliables.
            </p>
          </div>
          
          <div className={`transform transition-all duration-1000 delay-300 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute inset-0 -z-10 bg-white/50 backdrop-blur-xl rounded-xl transform -rotate-1 scale-105 shadow-lg"></div>
              <div className="flex items-center w-full p-2 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="flex-1 flex items-center px-3">
                  <MapPin className="text-burgundy-700 mr-2" size={20} />
                  <Input
                    type="text"
                    placeholder="Rechercher un lieu ou une ville..."
                    className="flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none py-6"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button size="lg" className="rounded-lg bg-gradient-to-r from-burgundy-700 to-burgundy-800">
                  <Search className="mr-2" size={18} />
                  Rechercher
                </Button>
              </div>
            </div>
          </div>
          
          <div className={`mt-8 flex flex-wrap justify-center gap-3 transform transition-all duration-1000 delay-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <CategoryTag label="Cafés" />
            <CategoryTag label="Restaurants" />
            <CategoryTag label="Plages" />
            <CategoryTag label="Parcs" />
            <CategoryTag label="Musées" />
          </div>
        </div>
      </div>
    </section>
  );
};

interface CategoryTagProps {
  label: string;
}

const CategoryTag = ({ label }: CategoryTagProps) => (
  <div className="px-4 py-2 bg-white/80 backdrop-blur-sm border border-gray-100 rounded-full font-medium shadow-sm hover:shadow-md transition-all cursor-pointer">
    {label}
  </div>
);

export default Hero;
