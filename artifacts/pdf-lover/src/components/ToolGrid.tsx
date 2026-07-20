import { Tool } from '@/data/tools';
import { ToolCard } from './ToolCard';
import { motion, AnimatePresence } from 'framer-motion';

type ToolGridProps = {
  tools: Tool[];
};

export function ToolGrid({ tools }: ToolGridProps) {
  if (tools.length === 0) {
    return (
      <div className="py-20 text-center">
        <h3 className="text-xl font-medium text-foreground mb-2">No tools found</h3>
        <p className="text-muted-foreground">Try adjusting your search or category filter.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <AnimatePresence mode="popLayout">
        {tools.map((tool, index) => (
          <motion.div
            key={tool.slug}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <ToolCard tool={tool} index={index} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
