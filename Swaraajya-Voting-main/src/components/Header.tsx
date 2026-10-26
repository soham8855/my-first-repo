
import { Link } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

interface HeaderProps {
  isAdmin?: boolean;
}

const Header = ({ isAdmin = false }: HeaderProps) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    // In a real app, this would handle logout logic
    window.location.href = '/';
  };

  return (
    <header className={cn(
      "w-full px-6 py-4 flex items-center justify-between transition-all duration-300 sticky top-0 z-50",
      scrolled ? "bg-amber-50/95 backdrop-blur-md border-b border-amber-200 shadow-sm" : 
               isHomePage ? "bg-transparent" : "bg-amber-50/95 backdrop-blur-md border-b border-amber-200"
    )}>
      <Link to="/" className="flex items-center space-x-2 group">
        <img 
          src="/lovable-uploads/23a24be2-3e94-4402-90a8-a4dd424afcf7.png" 
          alt="E-Swarajya Logo" 
          className="h-12 w-auto group-hover:animate-pulse transition-all" 
        />
        <span className="font-bold text-xl tracking-tight text-amber-800 font-serif">E-Swarajya</span>
      </Link>
      
      <div className="flex items-center space-x-4">
        {!isHomePage && (
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2 border-amber-500 text-amber-800 hover:bg-amber-100"
            onClick={handleLogout}
          >
            <span>Logout</span>
          </Button>
        )}
        
        {(isHomePage || scrolled) && (
          <div className="flex items-center space-x-2">
            <Link to="/admin-login">
              <Button variant="outline" className="text-amber-800 border-amber-500 font-medium flex items-center gap-2 hover:bg-amber-100">
                <LogIn className="h-4 w-4" />
                Admin
              </Button>
            </Link>
            <Link to="/voter-login">
              <Button variant="default" className="font-medium flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-amber-50">
                <LogIn className="h-4 w-4" />
                Voter Login
              </Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
