import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: 'cyan' | 'purple' | 'green' | 'yellow' | 'red' | 'orange' | 'teal';
  animate?: boolean;
}

const glowClasses = {
  cyan: 'neon-border-cyan',
  purple: 'neon-border-purple',
  green: 'border-neon-green/30 shadow-[0_0_20px_hsl(var(--neon-green)/0.2)]',
  yellow: 'border-neon-yellow/30 shadow-[0_0_20px_hsl(var(--neon-yellow)/0.2)]',
  red: 'border-neon-red/30 shadow-[0_0_20px_hsl(var(--neon-red)/0.2)]',
  orange: 'border-neon-orange/30 shadow-[0_0_20px_hsl(var(--neon-orange)/0.2)]',
  teal: 'border-neon-teal/30 shadow-[0_0_20px_hsl(var(--neon-teal)/0.2)]',
};

export const GlassCard = ({ children, className, glowColor = 'cyan', animate = true }: GlassCardProps) => {
  return (
    <motion.div
      initial={animate ? { opacity: 0, y: 10 } : false}
      animate={animate ? { opacity: 1, y: 0 } : false}
      transition={{ duration: 0.3 }}
      className={cn(
        'glass rounded-xl p-4',
        glowClasses[glowColor],
        className
      )}
    >
      {children}
    </motion.div>
  );
};
