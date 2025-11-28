import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface NeonProgressProps {
  value: number;
  max?: number;
  label?: string;
  showValue?: boolean;
  color?: 'cyan' | 'purple' | 'green' | 'yellow' | 'red' | 'orange' | 'teal';
  size?: 'sm' | 'md' | 'lg';
}

const colorClasses = {
  cyan: 'bg-neon-cyan shadow-[0_0_10px_hsl(var(--neon-cyan))]',
  purple: 'bg-neon-purple shadow-[0_0_10px_hsl(var(--neon-purple))]',
  green: 'bg-neon-green shadow-[0_0_10px_hsl(var(--neon-green))]',
  yellow: 'bg-neon-yellow shadow-[0_0_10px_hsl(var(--neon-yellow))]',
  red: 'bg-neon-red shadow-[0_0_10px_hsl(var(--neon-red))]',
  orange: 'bg-neon-orange shadow-[0_0_10px_hsl(var(--neon-orange))]',
  teal: 'bg-neon-teal shadow-[0_0_10px_hsl(var(--neon-teal))]',
};

const sizeClasses = {
  sm: 'h-1',
  md: 'h-2',
  lg: 'h-3',
};

export const NeonProgress = ({
  value,
  max = 100,
  label,
  showValue = true,
  color = 'cyan',
  size = 'md',
}: NeonProgressProps) => {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className="w-full">
      {(label || showValue) && (
        <div className="flex justify-between mb-1">
          {label && <span className="text-xs text-muted-foreground">{label}</span>}
          {showValue && <span className="text-xs text-foreground">{Math.round(percentage)}%</span>}
        </div>
      )}
      <div className={cn('w-full bg-muted rounded-full overflow-hidden', sizeClasses[size])}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={cn('h-full rounded-full', colorClasses[color])}
        />
      </div>
    </div>
  );
};
