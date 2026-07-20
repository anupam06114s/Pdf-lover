import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ToolCategory } from '@/data/tools';

type HeroProps = {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  activeCategory: ToolCategory | 'all';
  setActiveCategory: (cat: ToolCategory | 'all') => void;
};

export function Hero({
  searchQuery,
  setSearchQuery,
  activeCategory,
  setActiveCategory,
}: HeroProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring' as const, damping: 20, stiffness: 100 } },
  };

  const categories: { id: ToolCategory | 'all'; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'convert', label: 'Convert' },
    { id: 'edit', label: 'Edit & Organize' },
    { id: 'security', label: 'Security' },
    { id: 'scan', label: 'Scan & Repair' },
    { id: 'ai', label: 'AI Tools' },
  ];

  return (
    <div className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <motion.h1 
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight text-foreground mb-6"
          >
            Every PDF tool you need,<br className="hidden md:block" />
            <span className="text-primary relative whitespace-nowrap">
              loved in one place.
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-primary/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" fill="none" stroke="currentColor" strokeWidth="3" />
              </svg>
            </span>
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Convert, edit, compress, sign — all in one beautifully simple platform. Free for everyone.
          </motion.p>

          <motion.div variants={itemVariants} className="max-w-2xl mx-auto mb-8 relative group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="h-6 w-6 text-muted-foreground group-focus-within:text-primary transition-colors" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tools… (e.g. Compress PDF, Word to PDF)"
              className="w-full bg-card border-2 border-border/50 text-foreground rounded-2xl py-5 pl-14 pr-6 text-lg focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all shadow-sm placeholder:text-muted-foreground/60"
              data-testid="hero-search"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-4 flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                Clear
              </button>
            )}
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-2 md:gap-3"
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all",
                  activeCategory === cat.id 
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20 scale-105" 
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:scale-105"
                )}
                data-testid={`category-filter-${cat.id}`}
              >
                {cat.label}
              </button>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
