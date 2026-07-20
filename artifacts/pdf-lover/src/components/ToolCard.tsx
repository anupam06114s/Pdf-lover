import { useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Link } from 'wouter';
import * as LucideIcons from 'lucide-react';
import { Tool } from '@/data/tools';
import { cn } from '@/lib/utils';

type ToolCardProps = {
  tool: Tool;
  index: number;
};

export function ToolCard({ tool, index }: ToolCardProps) {
  // @ts-ignore
  const IconComponent = LucideIcons[tool.icon] || LucideIcons.FileQuestion;
  const ref = useRef<HTMLDivElement>(null);

  // 3D tilt motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), {
    stiffness: 500,
    damping: 40,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), {
    stiffness: 500,
    damping: 40,
  });
  const glowX = useTransform(mouseX, [-0.5, 0.5], ['0%', '100%']);
  const glowY = useTransform(mouseY, [-0.5, 0.5], ['0%', '100%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left - rect.width / 2) / rect.width);
    mouseY.set((e.clientY - rect.top - rect.height / 2) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <Link href={`/tools/${tool.slug}`}>
      {/* Perspective wrapper */}
      <div style={{ perspective: '900px' }} className="h-full">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.5) }}
          style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="h-full cursor-pointer relative group"
          data-testid={`tool-card-${tool.slug}`}
        >
          {/* 3D Frame: outer glow border */}
          <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-primary/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0" />

          {/* Card body */}
          <div className="relative z-10 h-full bg-card/90 backdrop-blur-sm rounded-2xl border border-border/60 p-5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.12)] group-hover:shadow-[0_16px_40px_-8px_rgba(0,0,0,0.2),0_0_0_1px_rgba(229,62,62,0.12)] transition-shadow duration-300 flex flex-col overflow-hidden">

            {/* Moving light spot (follows mouse) */}
            <motion.div
              className="absolute w-32 h-32 rounded-full bg-primary/8 blur-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ left: glowX, top: glowY, translateX: '-50%', translateY: '-50%' }}
            />

            {/* 3D lifted icon */}
            <div className="flex items-start justify-between mb-4" style={{ transform: 'translateZ(20px)' }}>
              <div className={cn('p-3 rounded-xl shadow-md transition-transform duration-300 group-hover:scale-110', tool.color)}>
                <IconComponent className="w-6 h-6" strokeWidth={1.5} />
              </div>
              {tool.isAI && (
                <span className="bg-gradient-to-r from-violet-500 to-purple-500 text-white text-[9px] font-bold uppercase tracking-widest py-1 px-2.5 rounded-full shadow-sm">
                  AI
                </span>
              )}
            </div>

            {/* Title */}
            <h3
              className="text-base font-bold text-card-foreground mb-1.5 group-hover:text-primary transition-colors duration-200"
              style={{ transform: 'translateZ(12px)' }}
            >
              {tool.title}
            </h3>

            {/* Description */}
            <p className="text-xs text-muted-foreground leading-relaxed mt-auto">
              {tool.description}
            </p>

            {/* Bottom shine strip */}
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </motion.div>
      </div>
    </Link>
  );
}
