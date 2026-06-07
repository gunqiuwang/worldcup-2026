import { motion } from 'framer-motion';
import { Newspaper, Clock, ExternalLink, TrendingUp, AlertCircle, Zap, ChevronRight } from 'lucide-react';
import { TEAMS } from '../data/teams';
import Flag from './Flag';
import { useMemo, useState } from 'react';

// 新闻分类
const CATEGORIES = [
  { id: 'all', label: '全部', icon: Newspaper },
  { id: 'injury', label: '伤病', icon: AlertCircle },
  { id: 'tactical', label: '战术', icon: TrendingUp },
  { id: 'hot', label: '热点', icon: Zap },
];

// 模拟新闻数据（实际可接 API）
const MOCK_NEWS = [
  {
    id: '1',
    category: 'injury',
    title: '梅西确认缺席小组赛首轮',
    summary: '阿根廷队长梅西在训练中遭遇肌肉拉伤，将缺席对阵沙特阿拉伯的首场小组赛。教练组表示伤势不严重，预计第二场可复出。',
    team: 'ARG',
    time: '2小时前',
    source: 'ESPN',
    isHot: true,
  },
  {
    id: '2',
    category: 'tactical',
    title: '法国队公布433阵型',
    summary: '德尚确认世界杯将采用433阵型，姆巴佩居左，登贝莱居右，吉鲁突前。中场由楚阿梅尼、拉比奥、格列兹曼组成。',
    team: 'FRA',
    time: '4小时前',
    source: 'L\'Equipe',
    isHot: false,
  },
  {
    id: '3',
    category: 'hot',
    title: '巴西队抵达多哈，内马尔状态火热',
    summary: '巴西全队已抵达多哈，内马尔在训练中表现出色，连续三场热身赛进球。球迷在机场高呼"六星巴西"。',
    team: 'BRA',
    time: '6小时前',
    source: 'Globo',
    isHot: true,
  },
  {
    id: '4',
    category: 'injury',
    title: '英格兰队长凯恩脚踝伤势存疑',
    summary: '哈里·凯恩在英超最后一轮比赛中脚踝受伤，目前恢复情况良好，但能否出战首场对阵伊朗的比赛仍存疑问。',
    team: 'ENG',
    time: '8小时前',
    source: 'BBC',
    isHot: false,
  },
  {
    id: '5',
    category: 'tactical',
    title: '西班牙主打传控，佩德里核心',
    summary: '恩里克确认将继续坚持tiki-taka风格，佩德里将扮演核心角色。年轻阵容平均年龄仅25.3岁。',
    team: 'ESP',
    time: '10小时前',
    source: 'Marca',
    isHot: false,
  },
  {
    id: '6',
    category: 'hot',
    title: '东道主卡塔尔首秀引关注',
    summary: '作为首次参加世界杯的东道主，卡塔尔队将在揭幕战对阵厄瓜多尔。球队近期状态出色，热身赛击败多支强队。',
    team: 'QAT',
    time: '12小时前',
    source: 'Al Jazeera',
    isHot: true,
  },
  {
    id: '7',
    category: 'injury',
    title: '德国队诺伊尔伤愈复出',
    summary: '拜仁门将诺伊尔已完全康复，将在世界杯首战担任首发。他的回归极大增强了德国队的防守稳定性。',
    team: 'GER',
    time: '14小时前',
    source: 'Bild',
    isHot: false,
  },
  {
    id: '8',
    category: 'tactical',
    title: '阿根廷主打梅西自由人战术',
    summary: '斯卡洛尼透露梅西将获得更多自由度，不再固定在右路。新的战术体系让梅西可以自由游走，寻找最佳进攻位置。',
    team: 'ARG',
    time: '16小时前',
    source: 'TyC Sports',
    isHot: true,
  },
];

interface NewsItem {
  id: string;
  category: string;
  title: string;
  summary: string;
  team: string;
  time: string;
  source: string;
  isHot: boolean;
}

function NewsCard({ news, index }: { news: NewsItem; index: number }) {
  const team = TEAMS[news.team];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="glass-card p-4 mb-3 relative overflow-hidden group cursor-pointer hover:border-gold/20 transition-colors"
    >
      {/* 热点标记 */}
      {news.isHot && (
        <div className="absolute top-3 right-3">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-red/20 text-red">
            <Zap className="w-3 h-3" /> 热点
          </span>
        </div>
      )}

      {/* 分类标签 */}
      <div className="flex items-center gap-2 mb-2">
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${
          news.category === 'injury' ? 'bg-red/10 text-red' :
          news.category === 'tactical' ? 'bg-blue-400/10 text-blue-400' :
          'bg-gold/10 text-gold'
        }`}>
          {news.category === 'injury' ? '伤病' :
           news.category === 'tactical' ? '战术' : '热点'}
        </span>
        {team && (
          <div className="flex items-center gap-1">
            <Flag code={news.team} size="sm" />
            <span className="text-[10px] text-gray-500">{team.cn}</span>
          </div>
        )}
      </div>

      {/* 标题 */}
      <h3 className="text-sm font-bold mb-2 line-clamp-2 group-hover:text-gold transition-colors">
        {news.title}
      </h3>

      {/* 摘要 */}
      <p className="text-xs text-gray-400 leading-relaxed mb-3 line-clamp-2">
        {news.summary}
      </p>

      {/* 底部信息 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-[10px] text-gray-500">
            <Clock className="w-3 h-3" />
            {news.time}
          </div>
          <div className="text-[10px] text-gray-500">
            来源: {news.source}
          </div>
        </div>
        <ExternalLink className="w-3.5 h-3.5 text-gray-500 group-hover:text-gold transition-colors" />
      </div>
    </motion.div>
  );
}

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  
  const filteredNews = useMemo(() => {
    if (activeCategory === 'all') return MOCK_NEWS;
    return MOCK_NEWS.filter(n => n.category === activeCategory);
  }, [activeCategory]);

  return (
    <div>
      {/* 分类标签 */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                activeCategory === cat.id
                  ? 'bg-gold/20 text-gold border border-gold/30'
                  : 'bg-glass border border-glass-border text-gray-400 hover:text-gray-300'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* 新闻列表 */}
      <div>
        {filteredNews.map((news, i) => (
          <NewsCard key={news.id} news={news} index={i} />
        ))}
      </div>

      {/* 加载更多 */}
      <div className="text-center py-4">
        <button className="text-xs text-gray-500 hover:text-gold transition-colors flex items-center gap-1 mx-auto">
          加载更多
          <ChevronRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
