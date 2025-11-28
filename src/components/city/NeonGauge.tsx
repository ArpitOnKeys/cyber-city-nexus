import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface NeonGaugeProps {
  value: number;
  max: number;
  label: string;
  unit?: string;
  color?: 'cyan' | 'purple' | 'green' | 'yellow' | 'red' | 'orange' | 'teal';
  size?: 'sm' | 'md' | 'lg';
}

const colorClasses = {
  cyan: { stroke: 'stroke-neon-cyan', text: 'text-neon-cyan', glow: 'drop-shadow-[0_0_8px_hsl(var(--neon-cyan))]' },
  purple: { stroke: 'stroke-neon-purple', text: 'text-neon-purple', glow: 'drop-shadow-[0_0_8px_hsl(var(--neon-purple))]' },
  green: { stroke: 'stroke-neon-green', text: 'text-neon-green', glow: 'drop-shadow-[0_0_8px_hsl(var(--neon-green))]' },
  yellow: { stroke: 'stroke-neon-yellow', text: 'text-neon-yellow', glow: 'drop-shadow-[0_0_8px_hsl(var(--neon-yellow))]' },
  red: { stroke: 'stroke-neon-red', text: 'text-neon-red', glow: 'drop-shadow-[0_0_8px_hsl(var(--neon-red))]' },
  orange: { stroke: 'stroke-neon-orange', text: 'text-neon-orange', glow: 'drop-shadow-[0_0_8px_hsl(var(--neon-orange))]' },
  teal: { stroke: 'stroke-neon-teal', text: 'text-neon-teal', glow: 'drop-shadow-[0_0_8px_hsl(var(--neon-teal))]' },
};

const sizeConfig = {
  sm: { size: 80, strokeWidth: 6, fontSize: 'text-lg' },
  md: { size: 120, strokeWidth: 8, fontSize: 'text-2xl' },
  lg: { size: 160, strokeWidth: 10, fontSize: 'text-3xl' },
};

export const NeonGauge = ({ value, max, label, unit = '', color = 'cyan', size = 'md' }: NeonGaugeProps) => {
  const config = sizeConfig[size];
  const colors = colorClasses[color];
  const radius = (config.size - config.strokeWidth) / 2;
  const circumference = radius * Math.PI * 1.5;
  const progress = (value / max) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: config.size, height: config.size * 0.75 }}>
        <svg
          width={config.size}
          height={config.size * 0.75}
          viewBox={`0 0 ${config.size} ${config.size * 0.75}`}
          className={cn('transform -rotate-90', colors.glow)}
        >
          {/* Background arc */}
          <path
            d={`M ${config.strokeWidth / 2} ${config.size * 0.75 - config.strokeWidth / 2} 
                A ${radius} ${radius} 0 0 1 ${config.size - config.strokeWidth / 2} ${config.size * 0.75 - config.strokeWidth / 2}`}
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth={config.strokeWidth}
            strokeLinecap="round"
          />
          {/* Progress arc */}
          <motion.path
            d={`M ${config.strokeWidth / 2} ${config.size * 0.75 - config.strokeWidth / 2} 
                A ${radius} ${radius} 0 0 1 ${config.size - config.strokeWidth / 2} ${config.size * 0.75 - config.strokeWidth / 2}`}
            fill="none"
            className={colors.stroke}
            strokeWidth={config.strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: circumference - progress }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-end justify-center pb-1">
          <span className={cn('font-bold', config.fontSize, colors.text)}>
            {value}
            {unit && <span className="text-sm ml-0.5">{unit}</span>}
          </span>
        </div>
      </div>
      <span className="text-xs text-muted-foreground mt-1">{label}</span>
    </div>
  );
};
