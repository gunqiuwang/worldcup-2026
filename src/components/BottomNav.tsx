import { motion } from 'framer-motion';
import { Calendar, Trophy, TrendingUp, BarChart3, Newspaper } from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'matches', label: '赛程', icon: Calendar },
  { id: 'standings', label: '积分榜', icon: Trophy },
  { id: 'data', label: '数据中心', icon: BarChart3 },
  { id: 'news', label: '资讯', icon: Newspaper },
  { id: 'odds', label: '赔率', icon: TrendingUp },
];

interface Props {
  active: string;
  onNavigate: (id: string) => void;
}

export default function BottomNav({ active, onNavigate }: Props) {
  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[560px] bg-bg/95 backdrop-blur-xl border-t border-glass-border z-50 safe-area-pb">
      <div className="flex">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="flex-1 flex flex-col items-center gap-1 py-2.5 relative"
            >
              {isActive && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute -top-px left-1/4 right-1/4 h-0.5 bg-gold rounded-full"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
              <Icon className={`w-5 h-5 transition-colors ${isActive ? 'text-gold' : 'text-gray-500'}`} />
              <span className={`text-[10px] font-medium transition-colors ${isActive ? 'text-gold' : 'text-gray-500'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
