import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import logo from '@/assets/ktc-logo.png';
import {
  LayoutDashboard,
  Type,
  Image,
  Calendar,
  DollarSign,
  Trophy,
  Images,
  Settings,
  Phone,
  LogOut,
  ExternalLink,
  Video
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { to: '/admin', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: '/admin/content', icon: Type, label: 'Content Manager' },
  { to: '/admin/images', icon: Image, label: 'Image Manager' },
  { to: '/admin/schedule', icon: Calendar, label: 'Schedule Manager' },
  { to: '/admin/pricing', icon: DollarSign, label: 'Pricing Manager' },
  { to: '/admin/achievements', icon: Trophy, label: 'Achievements' },
  { to: '/admin/gallery', icon: Images, label: 'Gallery Manager' },
  { to: '/admin/videos', icon: Video, label: 'Video Manager' },
  { to: '/admin/settings', icon: Settings, label: 'Site Settings' },
  { to: '/admin/contact', icon: Phone, label: 'Contact Settings' },
];

const AdminSidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    logout();
    navigate('/');
  };

  return (
    <aside className="w-64 min-h-screen bg-card border-r flex flex-col">
      {/* Logo */}
      <div className="p-4 border-b">
        <div className="flex items-center gap-3">
          <img src={logo} alt="KTC Logo" className="w-10 h-10" />
          <div>
            <h1 className="font-bold text-lg">KTC Admin</h1>
            <p className="text-xs text-muted-foreground">Dashboard</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )
            }
          >
            <item.icon className="w-4 h-4" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Footer Actions */}
      <div className="p-4 border-t space-y-2">
        <Button
          variant="outline"
          className="w-full justify-start"
          onClick={() => navigate('/')}
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          View Website
        </Button>
        <Button
          variant="destructive"
          className="w-full justify-start"
          onClick={handleSignOut}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </aside>
  );
};

export default AdminSidebar;