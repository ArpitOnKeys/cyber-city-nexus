import { motion } from 'framer-motion';
import { Car, Zap, Trash2, Leaf, Droplets } from 'lucide-react';
import { CityMode, ModeConfig } from '@/types/city';
import { cn } from '@/lib/utils';

interface ModuleDockProps {
  currentMode: CityMode;
  onModeChange: (mode: CityMode) => void;
}

const modes: ModeConfig[] = [
  { id: 'TRAFFIC', label: 'Traffic', icon: 'car', primaryColor: 'amber', secondaryColor: 'cyan', description: 'Traffic Flow & Control' },
  { id: 'ENERGY', label: 'Energy', icon: 'zap', primaryColor: 'yellow', secondaryColor: 'blue', description: 'Power Grid Management' },
  { id: 'WASTE', label: 'Waste', icon: 'trash', primaryColor: 'purple', secondaryColor: 'orange', description: 'Waste Collection' },
  { id: 'ENVIRONMENT', label: 'Environment', icon: 'leaf', primaryColor: 'green', secondaryColor: 'teal', description: 'AQI & Climate' },
  { id: 'WATER', label: 'Water', icon: 'droplets', primaryColor: 'aqua', secondaryColor: 'cyan', description: 'Drainage & Flood' },
];

const iconComponents = {
  car: Car,
  zap: Zap,
  trash: Trash2,
  leaf: Leaf,
  droplets: Droplets,
};

const modeColors: Record<CityMode, { active: string; inactive: string; glow: string }> = {
  TRAFFIC: {
    active: 'bg-neon-orange/30 text-neon-orange border-neon-orange',
    inactive: 'bg-muted/30 text-muted-foreground border-transparent hover:bg-neon-orange/10 hover:text-neon-orange/70',
    glow: 'shadow-[0_0_30px_hsl(var(--neon-orange)/0.5)]',
  },
  ENERGY: {
    active: 'bg-neon-yellow/30 text-neon-yellow border-neon-yellow',
    inactive: 'bg-muted/30 text-muted-foreground border-transparent hover:bg-neon-yellow/10 hover:text-neon-yellow/70',
    glow: 'shadow-[0_0_30px_hsl(var(--neon-yellow)/0.5)]',
  },
  WASTE: {
    active: 'bg-neon-purple/30 text-neon-purple border-neon-purple',
    inactive: 'bg-muted/30 text-muted-foreground border-transparent hover:bg-neon-purple/10 hover:text-neon-purple/70',
    glow: 'shadow-[0_0_30px_hsl(var(--neon-purple)/0.5)]',
  },
  ENVIRONMENT: {
    active: 'bg-neon-green/30 text-neon-green border-neon-green',
    inactive: 'bg-muted/30 text-muted-foreground border-transparent hover:bg-neon-green/10 hover:text-neon-green/70',
    glow: 'shadow-[0_0_30px_hsl(var(--neon-green)/0.5)]',
  },
  WATER: {
    active: 'bg-neon-aqua/30 text-neon-aqua border-neon-aqua',
    inactive: 'bg-muted/30 text-muted-foreground border-transparent hover:bg-neon-aqua/10 hover:text-neon-aqua/70',
    glow: 'shadow-[0_0_30px_hsl(var(--neon-aqua)/0.5)]',
  },
};

export const ModuleDock = ({ currentMode, onModeChange }: ModuleDockProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40"
    >
      <div className="glass-dark rounded-2xl p-2 flex items-center gap-2">
        {modes.map((mode) => {
          const Icon = iconComponents[mode.icon as keyof typeof iconComponents];
          const isActive = currentMode === mode.id;
          const colors = modeColors[mode.id];

          return (
            <motion.button
              key={mode.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onModeChange(mode.id)}
              className={cn(
                'relative flex flex-col items-center gap-1 px-4 py-3 rounded-xl border transition-all duration-300',
                isActive ? colors.active : colors.inactive,
                isActive && colors.glow
              )}
            >
              <Icon className="w-6 h-6" />
              <span className="text-[10px] font-medium">{mode.label}</span>
              
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-current"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
};
