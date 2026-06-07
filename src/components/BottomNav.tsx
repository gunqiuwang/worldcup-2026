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
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[560px] z-50 safe-area-pb">
      {/* 背景 */}
      <div className="absolute inset-0 bg-bg/90 backdrop-blur-xl" />
      
      {/* 顶部边框 */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="relative flex">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="flex-1 flex flex-col items-center gap-1 py-2.5 relative group"
            >
              {/* 活跃指示器 */}
              {isActive && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute -top-px left-1/4 right-1/4 h-0.5 rounded-full"
                  style={{ 
                    background: 'linear-gradient(90deg, transparent, var(--gold), transparent)',
                    boxShadow: '0 0 8px rgba(255,213,79,0.5)'
                  }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
              
              {/* 图标 */}
              <motion.div
                whileTap={{ scale: 0.9 }}
                className="relative"
              >
                <Icon className={`w-5 h-5 transition-all duration-200 ${
                  isActive 
                    ? 'text-gold' 
                    : 'text-gray-500 group-hover:text-gray-400'
                }`} />
                
                {/* 活跃时的光晕 */}
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0 -m-1 rounded-full"
                    style={{ 
                      background: 'radial-gradient(circle, rgba(255,213,79,0.2) 0%, transparent 70%)',
                    }}
                  />
                )}
              </motion.div>
              
              {/* 标签 */}
              <span className={`text-[10px] font-medium transition-colors duration-200 ${
                isActive ? 'text-gold' : 'text-gray-500 group-hover:text-gray-400'
              }`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
