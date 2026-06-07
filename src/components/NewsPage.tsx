import { motion } from 'framer-motion';
import { Newspaper, Clock, ExternalLink, TrendingUp, AlertCircle, Zap, ChevronRight, RefreshCw, Loader2 } from 'lucide-react';
import { TEAMS } from '../data/teams';
import Flag from './Flag';
import { useMemo, useState, useEffect, useCallback } from 'react';

// 新闻分类
const CATEGORIES = [
  { id: 'all', label: '全部', icon: Newspaper },
  { id: 'injury', label: '伤病', icon: AlertCircle },
  { id: 'tactical', label: '战术', icon: TrendingUp },
  { id: 'hot', label: '热点', icon: Zap },
];

interface NewsItem {
  id: string;
  category: string;
  title: string;
  summary: string;
  url: string;
  team: string;
  time: string;
  source: string;
  is_hot: boolean;
}

interface NewsData {
  updated_at: string;
  count: number;
  articles: NewsItem[];
}

// 本地 mock 数据 (RSS 抓取失败时的 fallback)
const FALLBACK_NEWS: NewsItem[] = [
  {
    id: 'fb1',
    category: 'hot',
    title: '2026 世界杯倒计时进行中',
    summary: '第23届FIFA世界杯将在美国、加拿大、墨西哥三国举办，48支球队参赛。',
    url: '#',
    team: '',
    time: '刚刚',
    source: '系统',
    is_hot: true,
  },
];

function NewsCard({ news, index }: { news: NewsItem; index: number }) {
  const team = news.team ? TEAMS[news.team] : null;

  return (
    <motion.a
      href={news.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.3 }}
      className="glass-card p-4 mb-3 relative overflow-hidden group cursor-pointer hover:border-gold/20 transition-all block"
    >
      {/* 热点标记 */}
      {news.is_hot && (
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
            {news.source === "懂球帝" || news.source === "直播吧" ? "🇨🇳" : "🇬🇧"} {news.source}
          </div>
        </div>
        <ExternalLink className="w-3.5 h-3.5 text-gray-500 group-hover:text-gold transition-colors" />
      </div>
    </motion.a>
  );
}

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [news, setNews] = useState<NewsItem[]>(FALLBACK_NEWS);
  const [updatedAt, setUpdatedAt] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // 从 public/news.json 加载
  const fetchNews = useCallback(async () => {
    try {
      const resp = await fetch('/news.json?t=' + Date.now());
      if (!resp.ok) throw new Error('fetch failed');
      const data: NewsData = await resp.json();
      if (data.articles && data.articles.length > 0) {
        setNews(data.articles);
        setUpdatedAt(data.updated_at);
      }
    } catch (e) {
      console.warn('News fetch failed, using fallback:', e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  // 初始加载
  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  // 每 10 分钟自动刷新
  useEffect(() => {
    const timer = setInterval(fetchNews, 10 * 60 * 1000);
    return () => clearInterval(timer);
  }, [fetchNews]);

  // 手动刷新
  const handleRefresh = () => {
    setRefreshing(true);
    fetchNews();
  };

  const filteredNews = useMemo(() => {
    if (activeCategory === 'all') return news;
    return news.filter(n => n.category === activeCategory);
  }, [news, activeCategory]);

  // 更新时间显示
  const updatedAgo = useMemo(() => {
    if (!updatedAt) return '';
    try {
      const diff = Date.now() - new Date(updatedAt).getTime();
      const mins = Math.floor(diff / 60000);
      if (mins < 1) return '刚刚更新';
      if (mins < 60) return `${mins}分钟前更新`;
      return `${Math.floor(mins / 60)}小时前更新`;
    } catch {
      return '';
    }
  }, [updatedAt]);

  return (
    <div>
      {/* 顶部栏 */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-[10px] text-gray-500">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          {updatedAgo || '自动更新中'}
        </div>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="flex items-center gap-1 text-[10px] text-gray-500 hover:text-gold transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-3 h-3 ${refreshing ? 'animate-spin' : ''}`} />
          刷新
        </button>
      </div>

      {/* 分类标签 */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const count = cat.id === 'all' ? news.length : news.filter(n => n.category === cat.id).length;
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
              <span className="text-[10px] opacity-60">{count}</span>
            </button>
          );
        })}
      </div>

      {/* 加载状态 */}
      {loading && (
        <div className="flex items-center justify-center py-12 text-gray-500">
          <Loader2 className="w-5 h-5 animate-spin mr-2" />
          <span className="text-sm">加载新闻中...</span>
        </div>
      )}

      {/* 新闻列表 */}
      {!loading && (
        <div>
          {filteredNews.length === 0 ? (
            <div className="text-center py-12 text-gray-500 text-sm">
              暂无相关新闻
            </div>
          ) : (
            filteredNews.map((n, i) => (
              <NewsCard key={n.id} news={n} index={i} />
            ))
          )}
        </div>
      )}

      {/* 底部信息 */}
      <div className="text-center py-4">
        <p className="text-[10px] text-gray-600 mb-1">
          数据源: 懂球帝 + 直播吧 + ESPN + BBC | 每小时自动更新
        </p>
        <button
          onClick={handleRefresh}
          className="text-xs text-gray-500 hover:text-gold transition-colors flex items-center gap-1 mx-auto"
        >
          刷新最新
          <ChevronRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
