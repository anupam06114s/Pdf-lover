import { useState, useMemo } from 'react';
import { Hero } from '@/components/Hero';
import { ToolGrid } from '@/components/ToolGrid';
import { tools, ToolCategory } from '@/data/tools';
import { Features } from '@/components/Features';
import { HowItWorks } from '@/components/HowItWorks';
import { Testimonials } from '@/components/Testimonials';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<ToolCategory | 'all'>('all');

  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      const matchesSearch = tool.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           tool.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'all' || tool.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="flex flex-col min-h-screen">
      <Hero 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      <section className="py-12 bg-background relative z-10 pb-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-10 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">
              {activeCategory === 'all' 
                ? 'All Tools' 
                : `${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} Tools`}
              {searchQuery && <span className="text-muted-foreground ml-2 font-normal text-lg">for "{searchQuery}"</span>}
            </h2>
            <span className="text-sm font-medium bg-secondary px-3 py-1 rounded-full text-secondary-foreground">
              {filteredTools.length} {filteredTools.length === 1 ? 'tool' : 'tools'}
            </span>
          </div>
          
          <ToolGrid tools={filteredTools} />
        </div>
      </section>

      <div id="features">
        <Features />
      </div>
      
      <div id="how-it-works">
        <HowItWorks />
      </div>
      
      <Testimonials />
    </div>
  );
}
