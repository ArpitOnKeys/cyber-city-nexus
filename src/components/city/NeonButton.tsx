import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface NeonButtonProps {
  children: ReactNode;
  variant?: 'cyan' | 'purple' | 'green' | 'yellow' | 'red' | 'orange';
  size?: 'sm' | 'md' | 'lg';
  pulse?: boolean;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const variantClasses = {
  cyan: 'bg-neon-cyan/20 text-neon-cyan border-neon-cyan/50 hover:bg-neon-cyan/30 hover:shadow-[0_0_30px_hsl(var(--neon-cyan)/0.5)]',
  purple: 'bg-neon-purple/20 text-neon-purple border-neon-purple/50 hover:bg-neon-purple/30 hover:shadow-[0_0_30px_hsl(var(--neon-purple)/0.5)]',
  green: 'bg-neon-green/20 text-neon-green border-neon-green/50 hover:bg-neon-green/30 hover:shadow-[0_0_30px_hsl(var(--neon-green)/0.5)]',
  yellow: 'bg-neon-yellow/20 text-neon-yellow border-neon-yellow/50 hover:bg-neon-yellow/30 hover:shadow-[0_0_30px_hsl(var(--neon-yellow)/0.5)]',
  red: 'bg-neon-red/20 text-neon-red border-neon-red/50 hover:bg-neon-red/30 hover:shadow-[0_0_30px_hsl(var(--neon-red)/0.5)]',
  orange: 'bg-neon-orange/20 text-neon-orange border-neon-orange/50 hover:bg-neon-orange/30 hover:shadow-[0_0_30px_hsl(var(--neon-orange)/0.5)]',
};

const sizeClasses = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
};

export const NeonButton = ({
  children,
  variant = 'cyan',
  size = 'md',
  pulse = false,
  className,
  onClick,
  disabled,
}: NeonButtonProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'relative font-medium rounded-lg border transition-all duration-300',
        variantClasses[variant],
        sizeClasses[size],
        pulse && 'animate-pulse-neon',
        className
      )}
    >
      {children}
    </motion.button>
  );
};
