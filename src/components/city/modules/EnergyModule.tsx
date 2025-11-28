import { GlassCard } from '../GlassCard';
import { NeonButton } from '../NeonButton';
import { NeonProgress } from '../NeonProgress';
import { NeonGauge } from '../NeonGauge';
import { HUDPanel } from '../HUDPanel';
import { Battery, Sun, Wind, Zap, Lightbulb, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

interface EnergyModuleProps {
  isVisible: boolean;
}

export const EnergyModule = ({ isVisible }: EnergyModuleProps) => {
  return (
    <>
      {/* Left HUD - Energy Sources */}
      <HUDPanel side="left" title="Energy Sources" isVisible={isVisible}>
        <GlassCard glowColor="yellow">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-neon-yellow" />
            <span className="text-sm font-medium">Power Distribution</span>
          </div>
          
          {/* Pie Chart Visualization */}
          <div className="relative w-32 h-32 mx-auto mb-4">
            <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
              {/* Solar - 35% */}
              <circle
                cx="18" cy="18" r="15.9"
                fill="none"
                stroke="hsl(var(--neon-yellow))"
                strokeWidth="3"
                strokeDasharray="35 65"
                strokeDashoffset="0"
                className="drop-shadow-[0_0_4px_hsl(var(--neon-yellow))]"
              />
              {/* Wind - 25% */}
              <circle
                cx="18" cy="18" r="15.9"
                fill="none"
                stroke="hsl(var(--neon-cyan))"
                strokeWidth="3"
                strokeDasharray="25 75"
                strokeDashoffset="-35"
                className="drop-shadow-[0_0_4px_hsl(var(--neon-cyan))]"
              />
              {/* Grid - 40% */}
              <circle
                cx="18" cy="18" r="15.9"
                fill="none"
                stroke="hsl(var(--neon-blue))"
                strokeWidth="3"
                strokeDasharray="40 60"
                strokeDashoffset="-60"
                className="drop-shadow-[0_0_4px_hsl(var(--neon-blue))]"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">847</div>
                <div className="text-[10px] text-muted-foreground">MW</div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sun className="w-4 h-4 text-neon-yellow" />
                <span className="text-xs">Solar</span>
              </div>
              <span className="text-sm font-medium text-neon-yellow">35%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wind className="w-4 h-4 text-neon-cyan" />
                <span className="text-xs">Wind</span>
              </div>
              <span className="text-sm font-medium text-neon-cyan">25%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-neon-blue" />
                <span className="text-xs">Grid</span>
              </div>
              <span className="text-sm font-medium text-neon-blue">40%</span>
            </div>
          </div>
        </GlassCard>

        <GlassCard glowColor="green" className="mt-4">
          <div className="flex items-center gap-2 mb-3">
            <Battery className="w-4 h-4 text-neon-green" />
            <span className="text-sm font-medium">Battery Storage</span>
          </div>
          <div className="flex justify-center">
            <NeonGauge value={72} max={100} label="Charge Level" unit="%" color="green" size="lg" />
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2 text-center">
            <div>
              <div className="text-lg font-bold text-neon-green">156</div>
              <div className="text-[10px] text-muted-foreground">MWh Stored</div>
            </div>
            <div>
              <div className="text-lg font-bold text-neon-cyan">4.2h</div>
              <div className="text-[10px] text-muted-foreground">Backup Time</div>
            </div>
          </div>
        </GlassCard>
      </HUDPanel>

      {/* Right HUD - Controls */}
      <HUDPanel side="right" title="Energy Controls" isVisible={isVisible}>
        <GlassCard glowColor="yellow">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="w-4 h-4 text-neon-yellow" />
            <span className="text-sm font-medium">Streetlight Control</span>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">Brightness Level</span>
                <span className="text-neon-yellow">75%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                defaultValue="75"
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-neon-yellow"
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs">Auto-Dimming</span>
              <div className="w-10 h-5 bg-neon-cyan/30 rounded-full p-0.5 cursor-pointer">
                <motion.div
                  className="w-4 h-4 bg-neon-cyan rounded-full shadow-[0_0_10px_hsl(var(--neon-cyan))]"
                  animate={{ x: 18 }}
                />
              </div>
            </div>
          </div>
        </GlassCard>

        <GlassCard glowColor="cyan" className="mt-4">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4 text-neon-cyan" />
            <span className="text-sm font-medium">Load Balancing</span>
          </div>
          <div className="space-y-3">
            <NeonProgress value={82} label="District A" color="yellow" />
            <NeonProgress value={65} label="District B" color="cyan" />
            <NeonProgress value={91} label="District C" color="red" />
            <NeonProgress value={45} label="District D" color="green" />
          </div>
          <NeonButton variant="cyan" className="w-full mt-4">
            Redistribute Load
          </NeonButton>
        </GlassCard>

        <GlassCard glowColor="red" className="mt-4">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-neon-red animate-pulse" />
            <span className="text-sm font-medium">Peak Demand Alert</span>
          </div>
          <p className="text-xs text-muted-foreground mb-2">
            Expected peak in 2 hours. Current: 847MW → Predicted: 1,120MW
          </p>
          <div className="flex items-end gap-1 h-12">
            {[60, 65, 70, 78, 85, 92, 98, 95, 88, 75, 68, 62].map((v, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${v}%` }}
                transition={{ delay: i * 0.05 }}
                className={`flex-1 rounded-t ${i >= 5 && i <= 7 ? 'bg-neon-red' : 'bg-neon-yellow'}`}
                style={{ opacity: 0.3 + (v / 100) * 0.7 }}
              />
            ))}
          </div>
          <div className="flex justify-between text-[8px] text-muted-foreground mt-1">
            <span>Now</span>
            <span>Peak</span>
            <span>+6h</span>
          </div>
        </GlassCard>
      </HUDPanel>
    </>
  );
};
