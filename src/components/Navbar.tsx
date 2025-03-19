
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, MapPin, User, Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-lg shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-full clean-gradient flex items-center justify-center">
            <MapPin className="text-white" size={20} />
          </div>
          <span className="font-semibold text-xl tracking-tight">Tunisia Clean</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink to="/" label="Accueil" isActive={location.pathname === '/'} />
          <NavLink to="/search" label="Découvrir" isActive={location.pathname === '/search'} />
          <NavLink to="/dashboard" label="Tableau de bord" isActive={location.pathname.includes('/dashboard')} />
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Search size={20} />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <User size={20} />
          </Button>
          <Button className="rounded-full clean-gradient text-white hover:shadow-lg transition-all">
            Connexion
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden rounded-full"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg rounded-b-xl animate-fade-in">
          <div className="px-4 py-5 space-y-4">
            <MobileNavLink to="/" label="Accueil" onClick={toggleMobileMenu} />
            <MobileNavLink to="/search" label="Découvrir" onClick={toggleMobileMenu} />
            <MobileNavLink to="/dashboard" label="Tableau de bord" onClick={toggleMobileMenu} />
            <div className="pt-4 border-t border-gray-100">
              <Button className="w-full rounded-full clean-gradient text-white">
                Connexion
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

interface NavLinkProps {
  to: string;
  label: string;
  isActive: boolean;
}

const NavLink = ({ to, label, isActive }: NavLinkProps) => (
  <Link 
    to={to} 
    className={`relative font-medium transition-colors hover:text-primary ${
      isActive ? 'text-primary' : 'text-foreground/80'
    }`}
  >
    {label}
    {isActive && (
      <span className="absolute -bottom-1.5 left-0 w-full h-0.5 clean-gradient rounded-full" />
    )}
  </Link>
);

interface MobileNavLinkProps {
  to: string;
  label: string;
  onClick: () => void;
}

const MobileNavLink = ({ to, label, onClick }: MobileNavLinkProps) => (
  <Link 
    to={to} 
    className="block p-3 font-medium rounded-lg hover:bg-gray-50 transition-colors" 
    onClick={onClick}
  >
    {label}
  </Link>
);

export default Navbar;
