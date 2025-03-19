
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Star, Clock, Heart, Settings, LogOut, History, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { locations } from '@/lib/mockData';
import LocationCard from '@/components/LocationCard';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('favorites');
  
  // Mock user data
  const user = {
    name: 'Sarah Ben Ali',
    email: 'sarah.benali@example.com',
    joinDate: '12 août 2023',
    favorites: locations.slice(0, 3),
    history: locations.slice(1, 4),
    contributions: [
      { id: 1, type: 'review', location: 'Café Sidi Bou Said', date: 'Il y a 2 semaines' },
      { id: 2, type: 'photo', location: 'Plage de Hammamet', date: 'Il y a 1 mois' },
      { id: 3, type: 'review', location: 'Restaurant El Walima', date: 'Il y a 2 mois' },
    ],
    cleanPoints: 125,
    certifications: [
      { id: 1, name: 'Découvreur', description: 'A découvert plus de 10 lieux', icon: MapPin },
      { id: 2, name: 'Critique', description: 'A laissé plus de 5 avis', icon: Star },
      { id: 3, name: 'Photographe', description: 'A partagé plus de 3 photos', icon: Clock },
    ]
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="space-y-6">
                {/* Profile card */}
                <Card>
                  <CardHeader className="text-center pb-4">
                    <div className="w-24 h-24 rounded-full bg-secondary mx-auto mb-4">
                      <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-secondary-foreground">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </div>
                    </div>
                    <CardTitle>{user.name}</CardTitle>
                    <CardDescription className="text-sm">{user.email}</CardDescription>
                    <CardDescription className="text-xs">Membre depuis {user.joinDate}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-center space-x-4 py-2">
                      <div className="text-center">
                        <div className="text-2xl font-bold">{user.favorites.length}</div>
                        <div className="text-xs text-muted-foreground">Favoris</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">{user.history.length}</div>
                        <div className="text-xs text-muted-foreground">Visités</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">{user.contributions.length}</div>
                        <div className="text-xs text-muted-foreground">Avis</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Navigation */}
                <Card>
                  <CardContent className="p-3">
                    <nav className="space-y-1">
                      <NavItem 
                        icon={<Heart size={18} />} 
                        label="Favoris" 
                        active={activeTab === 'favorites'} 
                        onClick={() => setActiveTab('favorites')}
                      />
                      <NavItem 
                        icon={<History size={18} />} 
                        label="Historique" 
                        active={activeTab === 'history'} 
                        onClick={() => setActiveTab('history')}
                      />
                      <NavItem 
                        icon={<Award size={18} />} 
                        label="Récompenses" 
                        active={activeTab === 'rewards'} 
                        onClick={() => setActiveTab('rewards')}
                      />
                      <NavItem 
                        icon={<Settings size={18} />} 
                        label="Paramètres" 
                        active={activeTab === 'settings'} 
                        onClick={() => setActiveTab('settings')}
                      />
                      <NavItem 
                        icon={<LogOut size={18} />} 
                        label="Déconnexion" 
                        onClick={() => console.log('Logout')}
                      />
                    </nav>
                  </CardContent>
                </Card>
                
                {/* Clean points */}
                <Card className="bg-gradient-to-br from-clean-600 to-clean-500 text-white">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Clean Points</span>
                      <span className="text-2xl">{user.cleanPoints}</span>
                    </CardTitle>
                    <CardDescription className="text-white/80">
                      Continuez à contribuer pour gagner plus de points!
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-white rounded-full"
                        style={{ width: '40%' }}
                      ></div>
                    </div>
                    <div className="mt-2 text-sm text-white/80">
                      Plus que 75 points pour débloquer le niveau suivant
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            {/* Main content */}
            <div className="lg:col-span-3">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-4 w-full mb-6">
                  <TabsTrigger value="favorites">Favoris</TabsTrigger>
                  <TabsTrigger value="history">Historique</TabsTrigger>
                  <TabsTrigger value="rewards">Récompenses</TabsTrigger>
                  <TabsTrigger value="settings">Paramètres</TabsTrigger>
                </TabsList>
                
                <TabsContent value="favorites" className="animate-fade-in">
                  <Card>
                    <CardHeader>
                      <CardTitle>Mes lieux favoris</CardTitle>
                      <CardDescription>
                        Les lieux que vous avez marqués comme favoris
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {user.favorites.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {user.favorites.map(location => (
                            <LocationCard key={location.id} location={location} />
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <Heart size={48} className="mx-auto text-muted-foreground/30 mb-3" />
                          <h3 className="text-lg font-medium mb-1">Aucun favori</h3>
                          <p className="text-muted-foreground mb-4">
                            Vous n'avez pas encore ajouté de lieu à vos favoris
                          </p>
                          <Button>Explorer les lieux</Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="history" className="animate-fade-in">
                  <Card>
                    <CardHeader>
                      <CardTitle>Historique de visites</CardTitle>
                      <CardDescription>
                        Les lieux que vous avez récemment visités
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {user.history.length > 0 ? (
                        <div className="space-y-4">
                          {user.history.map(location => (
                            <div key={location.id} className="flex items-center p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                              <div className="w-16 h-16 rounded-lg overflow-hidden mr-4">
                                <img 
                                  src={location.images[0]} 
                                  alt={location.name} 
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex-1">
                                <h3 className="font-medium">{location.name}</h3>
                                <p className="text-sm text-muted-foreground">
                                  {location.city}, {location.region}
                                </p>
                              </div>
                              <div className="text-sm text-muted-foreground">
                                Il y a 2 semaines
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <History size={48} className="mx-auto text-muted-foreground/30 mb-3" />
                          <h3 className="text-lg font-medium mb-1">Historique vide</h3>
                          <p className="text-muted-foreground mb-4">
                            Vous n'avez pas encore visité de lieu
                          </p>
                          <Button>Explorer les lieux</Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="rewards" className="animate-fade-in">
                  <Card>
                    <CardHeader>
                      <CardTitle>Mes récompenses</CardTitle>
                      <CardDescription>
                        Les badges et certifications que vous avez débloqués
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                        {user.certifications.map(cert => (
                          <div key={cert.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm text-center">
                            <div className="w-12 h-12 rounded-full bg-clean-100 flex items-center justify-center mx-auto mb-3">
                              <cert.icon size={24} className="text-clean-600" />
                            </div>
                            <h3 className="font-medium mb-1">{cert.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {cert.description}
                            </p>
                          </div>
                        ))}
                      </div>
                      
                      <h3 className="font-medium mb-4">Mes contributions</h3>
                      <div className="space-y-3">
                        {user.contributions.map(contribution => (
                          <div key={contribution.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center mr-3">
                                {contribution.type === 'review' ? (
                                  <Star size={16} />
                                ) : (
                                  <Clock size={16} />
                                )}
                              </div>
                              <div>
                                <p className="font-medium">
                                  {contribution.type === 'review' ? 'Avis' : 'Photo'} sur {contribution.location}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {contribution.date}
                                </p>
                              </div>
                            </div>
                            <div className="text-sm font-medium text-clean-600">
                              +{contribution.type === 'review' ? 10 : 5} points
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="settings" className="animate-fade-in">
                  <Card>
                    <CardHeader>
                      <CardTitle>Paramètres du compte</CardTitle>
                      <CardDescription>
                        Gérez vos préférences et informations personnelles
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-medium mb-4">Informations personnelles</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium mb-1">Nom complet</label>
                              <input 
                                type="text" 
                                defaultValue={user.name}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">Adresse email</label>
                              <input 
                                type="email" 
                                defaultValue={user.email}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                              />
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-medium mb-4">Préférences</h3>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">Notifications par email</p>
                                <p className="text-sm text-muted-foreground">
                                  Recevoir des emails sur les nouveaux lieux et recommandations
                                </p>
                              </div>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" defaultChecked className="sr-only peer" />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                              </label>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">Partage de localisation</p>
                                <p className="text-sm text-muted-foreground">
                                  Autoriser l'application à accéder à votre position
                                </p>
                              </div>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" defaultChecked className="sr-only peer" />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                              </label>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">Score minimum de propreté</p>
                                <p className="text-sm text-muted-foreground">
                                  Ne voir que les lieux avec un score supérieur à
                                </p>
                              </div>
                              <select className="px-3 py-2 border border-gray-300 rounded-md">
                                <option value="3">3+</option>
                                <option value="3.5">3.5+</option>
                                <option value="4" selected>4+</option>
                                <option value="4.5">4.5+</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex justify-end pt-4">
                          <Button>Enregistrer les modifications</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
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

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
}

const NavItem = ({ icon, label, active = false, onClick }: NavItemProps) => (
  <button
    className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors ${
      active ? 'bg-primary text-white' : 'hover:bg-gray-100'
    }`}
    onClick={onClick}
  >
    <span className="mr-3">{icon}</span>
    <span>{label}</span>
  </button>
);

export default Dashboard;
