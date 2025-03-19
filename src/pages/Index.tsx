
import { useRef, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeaturedLocations from '@/components/FeaturedLocations';
import Map from '@/components/Map';
import { ArrowRight, Star, Shield, Users, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useInView } from '@/utils/animation';

const Index = () => {
  const navigate = useNavigate();
  const featuresRef = useRef<HTMLDivElement>(null);
  const featuresInView = useInView(featuresRef, { threshold: 0.1 });
  const ctaRef = useRef<HTMLDivElement>(null);
  const ctaInView = useInView(ctaRef, { threshold: 0.1 });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <Hero />
        
        <FeaturedLocations />
        
        <Map />
        
        {/* Features section */}
        <section ref={featuresRef} className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <span className="px-3 py-1 rounded-full bg-clean-100 text-clean-800 text-sm font-medium">
                Pourquoi Tunisia Clean?
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight">Une expérience unique</h2>
              <p className="mt-2 text-muted-foreground">
                Découvrez ce qui rend notre plateforme spéciale et comment nous vous aidons à trouver les lieux les plus propres
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <FeatureCard 
                icon={<Star className="text-clean-500" size={24} />}
                title="Évaluations fiables"
                description="Des notes de propreté basées sur de vraies expériences utilisateur et vérifiées par IA"
                isInView={featuresInView}
                delay={0}
              />
              <FeatureCard 
                icon={<Shield className="text-clean-500" size={24} />}
                title="Certification Propreté"
                description="Une vérification rigoureuse pour certifier les établissements les plus propres"
                isInView={featuresInView}
                delay={1}
              />
              <FeatureCard 
                icon={<Users className="text-clean-500" size={24} />}
                title="Communauté active"
                description="Rejoignez des milliers d'utilisateurs partageant des avis sur la propreté des lieux"
                isInView={featuresInView}
                delay={2}
              />
              <FeatureCard 
                icon={<MapPin className="text-clean-500" size={24} />}
                title="Découverte facilitée"
                description="Une interface intuitive pour trouver rapidement les lieux propres près de chez vous"
                isInView={featuresInView}
                delay={3}
              />
            </div>
          </div>
        </section>
        
        {/* CTA section */}
        <section ref={ctaRef} className="py-20 bg-gradient-to-tr from-clean-900 to-clean-800 text-white">
          <div className="container mx-auto px-4">
            <div 
              className={`
                max-w-4xl mx-auto text-center transform transition-all duration-1000 
                ${ctaInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
              `}
            >
              <span className="px-3 py-1 rounded-full bg-white/20 text-white text-sm font-medium backdrop-blur-sm">
                Passez à l'action
              </span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">
                Prêt à découvrir les lieux les plus propres de Tunisie?
              </h2>
              <p className="mt-4 text-white/80 max-w-2xl mx-auto">
                Explorez notre plateforme dès maintenant et trouvez votre prochaine destination préférée, où propreté et qualité sont garanties.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button 
                  size="lg" 
                  className="bg-white text-clean-800 hover:bg-white/90 rounded-full px-8"
                  onClick={() => navigate('/search')}
                >
                  Découvrir les lieux
                  <ArrowRight className="ml-2" size={18} />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10 rounded-full px-8"
                >
                  En savoir plus
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Footer */}
        <footer className="bg-white border-t border-gray-100 py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-2 mb-6 md:mb-0">
                <div className="w-10 h-10 rounded-full clean-gradient flex items-center justify-center">
                  <MapPin className="text-white" size={20} />
                </div>
                <span className="font-semibold text-xl tracking-tight">Tunisia Clean</span>
              </div>
              
              <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 mb-6 md:mb-0">
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">À propos</a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Comment ça marche</a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Partenariats</a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Contact</a>
              </div>
              
              <div className="text-sm text-muted-foreground">
                © 2023 Tunisia Clean. Tous droits réservés.
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  isInView: boolean;
  delay: number;
}

const FeatureCard = ({ icon, title, description, isInView, delay }: FeatureCardProps) => (
  <div 
    className={`
      bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300
      transform transition-all duration-1000 delay-${delay * 100}
      ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
    `}
  >
    <div className="w-12 h-12 rounded-full bg-clean-50 flex items-center justify-center mb-4">
      {icon}
    </div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </div>
);

export default Index;
