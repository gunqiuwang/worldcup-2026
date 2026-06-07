import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Filter } from 'lucide-react';

interface Props {
  onSearch: (query: string) => void;
  onFilterGroup: (group: string | null) => void;
  activeGroup: string | null;
  groups: string[];
}

export default function SearchBar({ onSearch, onFilterGroup, activeGroup, groups }: Props) {
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="px-4 mb-3">
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            value={query}
            onChange={(e) => { setQuery(e.target.value); onSearch(e.target.value); }}
            placeholder="搜索球队..."
            className="w-full bg-glass border border-glass-border rounded-xl pl-9 pr-8 py-2.5 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-gold/30 transition"
          />
          {query && (
            <button
              onClick={() => { setQuery(''); onSearch(''); }}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          )}
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`px-3 rounded-xl border transition ${
            activeGroup
              ? 'bg-gold/10 border-gold/30 text-gold'
              : 'bg-glass border-glass-border text-gray-400'
          }`}
        >
          <Filter className="w-4 h-4" />
        </button>
      </div>

      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="flex flex-wrap gap-1.5 pt-2">
              <button
                onClick={() => onFilterGroup(null)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition ${
                  !activeGroup ? 'bg-gold/15 text-gold' : 'bg-white/5 text-gray-400 hover:text-white'
                }`}
              >
                全部
              </button>
              {groups.map((g) => (
                <button
                  key={g}
                  onClick={() => onFilterGroup(g === activeGroup ? null : g)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition ${
                    activeGroup === g ? 'bg-gold/15 text-gold' : 'bg-white/5 text-gray-400 hover:text-white'
                  }`}
                >
                  {g}组
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
