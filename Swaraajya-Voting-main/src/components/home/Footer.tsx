
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="py-10 px-6 bg-amber-50 border-t border-amber-200 sanskrit-pattern">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center space-x-2 mb-4 md:mb-0">
          <img 
            src="/lovable-uploads/23a24be2-3e94-4402-90a8-a4dd424afcf7.png" 
            alt="E-Swarajya Logo" 
            className="h-10 w-auto" 
          />
          <span className="font-serif font-semibold text-amber-800">E-Swarajya</span>
        </div>
        <div className="text-sm text-amber-700">
          &copy; {new Date().getFullYear()} E-Swarajya. All rights reserved.
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-amber-200">
        <div className="flex flex-wrap justify-center gap-8 text-sm text-amber-700">
          <Link to="/" className="hover:text-amber-900 transition-colors">Home</Link>
          <Link to="/about" className="hover:text-amber-900 transition-colors">About</Link>
          <Link to="/contact" className="hover:text-amber-900 transition-colors">Contact</Link>
          <Link to="/privacy" className="hover:text-amber-900 transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-amber-900 transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
