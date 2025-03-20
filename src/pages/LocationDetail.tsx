
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import CleanlinessScore from '@/components/CleanlinessScore';
import { getLocationById, Location } from '@/lib/mockData';
import { MapPin, Clock, Star, ArrowLeft, Heart, Share2, ThumbsUp, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LocationCard from '@/components/LocationCard';

const LocationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [location, setLocation] = useState<Location | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  useEffect(() => {
    if (id) {
      const locationData = getLocationById(id);
      setLocation(locationData || null);
      setIsLoading(false);
    }
  }, [id]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  if (!location) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-24 pb-16 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Lieu non trouvé</h1>
            <Link to="/search" className="text-primary hover:underline">
              Retour à la recherche
            </Link>
          </div>
        </main>
      </div>
    );
  }
  
  const { name, type, address, city, region, images, description, cleanlinessScore, ratings, amenities, openingHours, tags, priceLevel } = location;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Back button */}
          <div className="mb-6">
            <Link to="/search" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft size={18} className="mr-2" />
              Retour aux résultats
            </Link>
          </div>
          
          {/* Location header */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-medium">
                    {type === 'restaurant' ? 'Restaurant' : 
                     type === 'cafe' ? 'Café' : 
                     type === 'park' ? 'Parc' : 
                     type === 'beach' ? 'Plage' : 'Musée'}
                  </span>
                  <div className="flex items-center text-muted-foreground">
                    <Star size={16} className="mr-1 text-yellow-500 fill-yellow-500" />
                    <span>{ratings.overall}</span>
                    <span className="mx-1">•</span>
                    <span>{ratings.totalReviews} avis</span>
                  </div>
                </div>
                <h1 className="text-3xl font-bold">{name}</h1>
                <div className="flex items-center mt-2 text-muted-foreground">
                  <MapPin size={16} className="mr-1" />
                  <span>{address}, {city}, {region}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Button variant="outline" size="icon" className="rounded-full">
                  <Heart size={18} />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Share2 size={18} />
                </Button>
                <Button className="rounded-full clean-gradient text-white">
                  Contacter
                </Button>
              </div>
            </div>
            
            {/* Gallery */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-8 h-[400px]">
              <div className="lg:col-span-8 overflow-hidden rounded-xl relative">
                <img 
                  src={images[activeImageIndex]} 
                  alt={name} 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute bottom-4 left-4">
                  <CleanlinessScore score={cleanlinessScore} size="md" />
                </div>
              </div>
              <div className="hidden lg:grid lg:col-span-4 grid-rows-2 gap-4">
                {images.slice(0, 2).map((image, index) => (
                  <div 
                    key={index}
                    className="overflow-hidden rounded-xl cursor-pointer"
                    onClick={() => setActiveImageIndex(index)}
                  >
                    <img 
                      src={image} 
                      alt={`${name} ${index + 1}`} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Content tabs */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Tabs defaultValue="about">
                <TabsList className="grid grid-cols-3 w-full mb-6">
                  <TabsTrigger value="about">À propos</TabsTrigger>
                  <TabsTrigger value="cleanliness">Intégrité</TabsTrigger>
                  <TabsTrigger value="reviews">Avis</TabsTrigger>
                </TabsList>
                
                <TabsContent value="about" className="animate-fade-in">
                  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-4">À propos</h2>
                    <p className="text-muted-foreground mb-6">{description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Tags */}
                      <div>
                        <h3 className="font-medium mb-3">Tags</h3>
                        <div className="flex flex-wrap gap-2">
                          {tags.map((tag, index) => (
                            <span 
                              key={index} 
                              className="px-3 py-1 bg-secondary rounded-full text-sm"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      {/* Price level */}
                      <div>
                        <h3 className="font-medium mb-3">Niveau de prix</h3>
                        <div className="flex items-center">
                          {Array.from({ length: 3 }).map((_, index) => (
                            <span 
                              key={index} 
                              className={`text-lg mr-1 ${index < priceLevel ? 'text-primary' : 'text-muted-foreground/30'}`}
                            >
                              €
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Amenities */}
                  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-4">Équipements</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {amenities.map((amenity, index) => (
                        <div key={index} className="flex items-center">
                          <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                          <span>{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Opening hours */}
                  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                    <h2 className="text-xl font-semibold mb-4">Horaires d'ouverture</h2>
                    <div className="space-y-3">
                      {Object.entries(openingHours).map(([day, hours]) => (
                        <div key={day} className="flex justify-between">
                          <span className="capitalize">{formatDayName(day)}</span>
                          <span className="font-medium">{hours.open === 'Fermé' ? 'Fermé' : `${hours.open} - ${hours.close}`}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="cleanliness" className="animate-fade-in">
                  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-6">
                      <CleanlinessScore score={cleanlinessScore} size="lg" />
                      <div className="flex-1">
                        <h2 className="text-xl font-semibold mb-2">Évaluation de l'intégrité</h2>
                        <p className="text-muted-foreground">
                          Ce score reflète les valeurs éthiques, le respect des principes et l'engagement du lieu envers des pratiques responsables et authentiques.
                        </p>
                        
                        <div className="mt-4 space-y-3">
                          <ScoreBar label="Respect des valeurs" value={cleanlinessScore * 0.9} />
                          <ScoreBar label="Éthique" value={cleanlinessScore * 1.1 > 5 ? 5 : cleanlinessScore * 1.1} />
                          <ScoreBar label="Authenticité" value={cleanlinessScore * 0.95} />
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-clean-50 rounded-lg">
                      <h3 className="font-medium mb-2">Comment ce score est-il calculé?</h3>
                      <p className="text-sm text-muted-foreground">
                        Notre algorithme analyse les mentions des valeurs éthiques dans les avis, les pratiques observées par les utilisateurs et les rapports de nos équipes de certification. Un score élevé indique un lieu exemplaire qui respecte les principes fondamentaux d'intégrité, d'authenticité et de responsabilité.
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                    <h2 className="text-xl font-semibold mb-4">Commentaires sur l'intégrité</h2>
                    <div className="space-y-4">
                      <CleanlinessReview 
                        name="Sophie M."
                        date="Il y a 2 semaines"
                        comment="Vraiment impressionnée par l'intégrité de cet établissement. Tout était parfaitement aligné avec les valeurs annoncées. Le personnel incarne parfaitement la philosophie du lieu."
                      />
                      <CleanlinessReview 
                        name="Ahmed K."
                        date="Il y a 1 mois"
                        comment="Un endroit qui mérite sa réputation pour son éthique exemplaire. Le respect des clients et des traditions locales est particulièrement notable."
                      />
                      <CleanlinessReview 
                        name="Nadia B."
                        date="Il y a 2 mois"
                        comment="Je suis venue avec ma famille et nous avons tous été agréablement surpris par l'authenticité du lieu. On voit que les valeurs fondamentales sont une priorité ici."
                      />
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="reviews" className="animate-fade-in">
                  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-semibold">Avis des utilisateurs</h2>
                      <Button>Laisser un avis</Button>
                    </div>
                    
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-6">
                      <div className="text-center">
                        <div className="text-5xl font-bold">{ratings.overall}</div>
                        <div className="flex items-center justify-center mt-2">
                          {Array.from({ length: 5 }).map((_, index) => (
                            <Star 
                              key={index}
                              size={18}
                              className={index < Math.round(ratings.overall) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}
                            />
                          ))}
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          {ratings.totalReviews} avis
                        </div>
                      </div>
                      
                      <div className="flex-1 space-y-2">
                        <RatingBar rating={5} percentage={50} />
                        <RatingBar rating={4} percentage={30} />
                        <RatingBar rating={3} percentage={15} />
                        <RatingBar rating={2} percentage={3} />
                        <RatingBar rating={1} percentage={2} />
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <Review 
                        name="Marie D."
                        rating={5}
                        date="Il y a 1 semaine"
                        comment="Une expérience merveilleuse! Le lieu est non seulement magnifique mais aussi parfaitement entretenu. Le personnel est attentionné et l'ambiance très agréable. Je recommande vivement."
                        likes={12}
                      />
                      <Review 
                        name="Jean P."
                        rating={4}
                        date="Il y a 3 semaines"
                        comment="Très bon endroit, propre et agréable. Le service est rapide et efficace. Seul petit bémol, un peu bruyant aux heures de pointe."
                        likes={8}
                      />
                      <Review 
                        name="Ines M."
                        rating={5}
                        date="Il y a 1 mois"
                        comment="Ce lieu est devenu mon préféré en Tunisie! La propreté est irréprochable et l'accueil chaleureux. Les prix sont raisonnables pour la qualité offerte."
                        likes={15}
                      />
                    </div>
                    
                    <div className="mt-6 text-center">
                      <Button variant="outline">Voir plus d'avis</Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="lg:col-span-1">
              {/* Sidebar */}
              <div className="space-y-6">
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                  <h3 className="font-semibold mb-4">Vous pourriez aimer aussi</h3>
                  <div className="space-y-4">
                    {/* Similar locations would go here */}
                    <LocationCard location={location} variant="default" />
                  </div>
                </div>
                
                <div className="bg-clean-50 rounded-xl border border-clean-100 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full clean-gradient flex items-center justify-center">
                      <MapPin className="text-white" size={16} />
                    </div>
                    <h3 className="font-semibold">Tunisia Essence Certified</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Ce lieu a été certifié par notre équipe comme respectant les plus hauts standards d'intégrité, d'éthique et d'authenticité.
                  </p>
                  <Button variant="outline" className="w-full">En savoir plus</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
          © 2023 Tunisia Essence. Tous droits réservés.
        </div>
      </footer>
    </div>
  );
};

const formatDayName = (day: string) => {
  const days: Record<string, string> = {
    monday: 'Lundi',
    tuesday: 'Mardi',
    wednesday: 'Mercredi',
    thursday: 'Jeudi',
    friday: 'Vendredi',
    saturday: 'Samedi',
    sunday: 'Dimanche'
  };
  
  return days[day] || day;
};

interface ScoreBarProps {
  label: string;
  value: number;
}

const ScoreBar = ({ label, value }: ScoreBarProps) => (
  <div>
    <div className="flex justify-between items-center mb-1">
      <span className="text-sm">{label}</span>
      <span className="font-medium">{value.toFixed(1)}/5</span>
    </div>
    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
      <div 
        className="h-full clean-gradient rounded-full"
        style={{ width: `${(value / 5) * 100}%` }}
      ></div>
    </div>
  </div>
);

interface RatingBarProps {
  rating: number;
  percentage: number;
}

const RatingBar = ({ rating, percentage }: RatingBarProps) => (
  <div className="flex items-center">
    <div className="w-12 flex items-center">
      <span className="text-sm font-medium">{rating}</span>
      <Star size={14} className="ml-1 text-yellow-500 fill-yellow-500" />
    </div>
    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden mx-2">
      <div 
        className="h-full bg-yellow-500 rounded-full"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
    <div className="w-12 text-right text-sm text-muted-foreground">
      {percentage}%
    </div>
  </div>
);

interface CleanlinessReviewProps {
  name: string;
  date: string;
  comment: string;
}

const CleanlinessReview = ({ name, date, comment }: CleanlinessReviewProps) => (
  <div className="p-4 bg-clean-50/50 rounded-lg">
    <div className="flex justify-between items-center mb-2">
      <span className="font-medium">{name}</span>
      <span className="text-sm text-muted-foreground">{date}</span>
    </div>
    <p className="text-muted-foreground">{comment}</p>
  </div>
);

interface ReviewProps {
  name: string;
  rating: number;
  date: string;
  comment: string;
  likes: number;
}

const Review = ({ name, rating, date, comment, likes }: ReviewProps) => (
  <div className="border-t border-gray-100 pt-6">
    <div className="flex justify-between items-center mb-2">
      <span className="font-medium">{name}</span>
      <span className="text-sm text-muted-foreground">{date}</span>
    </div>
    <div className="flex items-center mb-3">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star 
          key={index}
          size={16}
          className={index < rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}
        />
      ))}
    </div>
    <p className="text-muted-foreground mb-3">{comment}</p>
    <div className="flex items-center gap-4 text-sm text-muted-foreground">
      <button className="flex items-center hover:text-primary transition-colors">
        <ThumbsUp size={14} className="mr-1" />
        <span>Utile ({likes})</span>
      </button>
      <button className="flex items-center hover:text-primary transition-colors">
        <MessageCircle size={14} className="mr-1" />
        <span>Commenter</span>
      </button>
    </div>
  </div>
);

export default LocationDetail;
