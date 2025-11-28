import { motion } from 'framer-motion';
import { Activity, AlertTriangle, Cloud, Sun, CloudRain, Zap } from 'lucide-react';
import { CityStats } from '@/types/city';
import { cn } from '@/lib/utils';

interface StatusBarProps {
  stats: CityStats;
}

const threatColors = {
  GREEN: 'text-neon-green bg-neon-green/20 border-neon-green/50',
  YELLOW: 'text-neon-yellow bg-neon-yellow/20 border-neon-yellow/50',
  RED: 'text-neon-red bg-neon-red/20 border-neon-red/50',
};

const WeatherIcon = ({ condition }: { condition: string }) => {
  switch (condition.toLowerCase()) {
    case 'sunny':
      return <Sun className="w-4 h-4 text-neon-yellow" />;
    case 'cloudy':
      return <Cloud className="w-4 h-4 text-muted-foreground" />;
    case 'rainy':
      return <CloudRain className="w-4 h-4 text-neon-aqua" />;
    default:
      return <Cloud className="w-4 h-4 text-muted-foreground" />;
  }
};

export const StatusBar = ({ stats }: StatusBarProps) => {
  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-dark fixed top-0 left-0 right-0 z-50 px-4 py-2 flex items-center justify-between"
    >
      {/* Left Section - System Status */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-neon-cyan animate-pulse" />
          <span className="text-xs text-muted-foreground">System Uptime</span>
          <span className="text-sm font-medium text-neon-cyan">{stats.uptime}h</span>
        </div>
        
        <div className={cn(
          'flex items-center gap-2 px-2 py-1 rounded-full border text-xs',
          threatColors[stats.threatLevel]
        )}>
          <AlertTriangle className="w-3 h-3" />
          <span>{stats.threatLevel}</span>
        </div>
      </div>

      {/* Center Section - Title */}
      <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
        <h1 className="text-sm font-bold text-glow-cyan text-neon-cyan tracking-wider">
          SMART CITY DIGITAL TWIN
        </h1>
        <span className="text-[10px] text-muted-foreground">Control Center v2.0</span>
      </div>

      {/* Right Section - Weather & Time */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <WeatherIcon condition={stats.weather.condition} />
          <span className="text-sm">{stats.weather.temperature}°C</span>
          <span className="text-xs text-muted-foreground">{stats.weather.condition}</span>
        </div>

        <div className="h-4 w-px bg-border" />

        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-neon-yellow" />
          <span className="text-xs text-muted-foreground">Efficiency</span>
          <span className="text-sm font-medium text-neon-yellow">{stats.efficiencyScore}%</span>
        </div>

        <div className="h-4 w-px bg-border" />

        <div className="text-right">
          <div className="text-sm font-medium">{currentTime}</div>
          <div className="text-[10px] text-muted-foreground">{currentDate}</div>
        </div>
      </div>
    </motion.div>
  );
};
