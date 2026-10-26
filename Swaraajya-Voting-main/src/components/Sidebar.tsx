
import { Link, useLocation } from 'react-router-dom';
import { 
  HomeIcon, 
  LayoutDashboardIcon, 
  FlagIcon, 
  UsersIcon,
  UserIcon,
  BarChart3Icon,
  Settings
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';
import LanguageSelector from './LanguageSelector';
import VoteIcon from './icons/VoteIcon';

interface SidebarProps {
  isAdmin?: boolean;
}

const Sidebar = ({ isAdmin = false }: SidebarProps) => {
  const location = useLocation();
  const { t } = useLanguage();
  
  const adminLinks = [
    { 
      href: '/admin-dashboard', 
      label: t("admin_dashboard"), 
      icon: <LayoutDashboardIcon className="h-4 w-4 mr-2" /> 
    },
    { 
      href: '/manage-parties', 
      label: t("political_parties"), 
      icon: <FlagIcon className="h-4 w-4 mr-2" /> 
    },
    { 
      href: '/manage-candidates', 
      label: t("candidates"), 
      icon: <UsersIcon className="h-4 w-4 mr-2" /> 
    },
    { 
      href: '/manage-voters', 
      label: t("voters"), 
      icon: <UserIcon className="h-4 w-4 mr-2" /> 
    },
    { 
      href: '/election-results', 
      label: t("total_votes"), 
      icon: <BarChart3Icon className="h-4 w-4 mr-2" /> 
    },
  ];
  
  const voterLinks = [
    { 
      href: '/voter-dashboard', 
      label: t("voter_dashboard"), 
      icon: <LayoutDashboardIcon className="h-4 w-4 mr-2" /> 
    },
    { 
      href: '/cast-vote', 
      label: t("cast_vote"), 
      icon: <VoteIcon className="h-4 w-4 mr-2" /> 
    },
    { 
      href: '/election-results', 
      label: t("total_votes"), 
      icon: <BarChart3Icon className="h-4 w-4 mr-2" /> 
    },
  ];
  
  const links = isAdmin ? adminLinks : voterLinks;

  return (
    <aside className="w-64 h-screen bg-sidebar text-sidebar-foreground p-4 flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 mb-6">
        <div className="flex items-center space-x-2">
          <VoteIcon className="h-6 w-6 text-primary animate-pulse-slow" />
          <span className="font-bold text-xl">
            {isAdmin ? t('admin_login') : t('voter_login')}
          </span>
        </div>
      </div>
      
      <nav className="space-y-1 flex-1">
        {links.map((link) => (
          <Link
            key={link.href}
            to={link.href}
            className={cn(
              "flex items-center w-full px-4 py-2.5 rounded-md transition-colors hover:bg-sidebar-accent group",
              location.pathname === link.href ? "bg-sidebar-accent text-primary" : "text-sidebar-foreground"
            )}
          >
            <span className={cn(
              "transition-transform duration-200 group-hover:translate-x-0.5",
              location.pathname === link.href ? "text-primary" : "text-sidebar-foreground/80"
            )}>
              {link.icon}
            </span>
            <span>{link.label}</span>
          </Link>
        ))}
      </nav>
      
      <div className="pt-4 mt-4 border-t border-sidebar-border">
        <div className="mb-4 px-4">
          <LanguageSelector />
        </div>
        <Link to="/" className="flex items-center w-full px-4 py-2.5 rounded-md text-sidebar-foreground/80 hover:text-sidebar-foreground transition-colors">
          <HomeIcon className="h-4 w-4 mr-2" />
          <span>{t("home")}</span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
