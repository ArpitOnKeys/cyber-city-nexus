import { GlassCard } from '../GlassCard';
import { NeonButton } from '../NeonButton';
import { NeonProgress } from '../NeonProgress';
import { NeonGauge } from '../NeonGauge';
import { HUDPanel } from '../HUDPanel';
import { AlertTriangle, Camera, TrendingUp, Zap, Car } from 'lucide-react';
import { motion } from 'framer-motion';

interface TrafficModuleProps {
  isVisible: boolean;
}

const CCTVFeed = ({ id, location }: { id: number; location: string }) => (
  <div className="relative rounded-lg overflow-hidden bg-muted/50 aspect-video">
    <div className="absolute inset-0 flex items-center justify-center">
      <Camera className="w-8 h-8 text-muted-foreground/50" />
    </div>
    <div className="absolute top-1 left-1 px-1.5 py-0.5 bg-neon-red/80 rounded text-[8px] font-bold flex items-center gap-1">
      <div className="w-1.5 h-1.5 rounded-full bg-foreground animate-pulse" />
      LIVE
    </div>
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent p-2">
      <span className="text-[10px] text-muted-foreground">CAM-{id}: {location}</span>
    </div>
    {/* Simulated detection boxes */}
    <div className="absolute top-1/3 left-1/4 w-6 h-4 border border-neon-cyan rounded-sm opacity-60" />
    <div className="absolute top-1/2 right-1/3 w-8 h-5 border border-neon-cyan rounded-sm opacity-60" />
  </div>
);

export const TrafficModule = ({ isVisible }: TrafficModuleProps) => {
  return (
    <>
      {/* Left HUD - Live Feeds */}
      <HUDPanel side="left" title="Live Traffic Feeds" isVisible={isVisible}>
        <div className="grid grid-cols-2 gap-2">
          <CCTVFeed id={1} location="Main St & 5th Ave" />
          <CCTVFeed id={2} location="Highway Exit 12" />
          <CCTVFeed id={3} location="Downtown Square" />
          <CCTVFeed id={4} location="Industrial Zone" />
        </div>
        
        <GlassCard glowColor="orange" className="mt-4">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-4 h-4 text-neon-red" />
            <span className="text-sm font-medium">Active Incidents</span>
          </div>
          <div className="space-y-2">
            {[
              { type: 'Accident', location: 'Highway 101', severity: 'High' },
              { type: 'Congestion', location: 'Downtown', severity: 'Medium' },
            ].map((incident, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center justify-between p-2 bg-neon-red/10 rounded-lg border border-neon-red/30"
              >
                <div>
                  <span className="text-xs font-medium text-neon-red">{incident.type}</span>
                  <p className="text-[10px] text-muted-foreground">{incident.location}</p>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                  incident.severity === 'High' ? 'bg-neon-red/20 text-neon-red' : 'bg-neon-yellow/20 text-neon-yellow'
                }`}>
                  {incident.severity}
                </span>
              </motion.div>
            ))}
          </div>
        </GlassCard>

        <GlassCard glowColor="cyan" className="mt-4">
          <div className="flex items-center gap-2 mb-2">
            <Car className="w-4 h-4 text-neon-cyan" />
            <span className="text-sm font-medium">Vehicle Count</span>
          </div>
          <div className="text-3xl font-bold text-neon-cyan">12,847</div>
          <span className="text-xs text-muted-foreground">Active vehicles in city</span>
        </GlassCard>
      </HUDPanel>

      {/* Right HUD - Analytics */}
      <HUDPanel side="right" title="Traffic Analytics" isVisible={isVisible}>
        <div className="flex justify-center gap-4">
          <NeonGauge value={67} max={100} label="Current Load" unit="%" color="orange" />
          <NeonGauge value={82} max={100} label="Predicted (1h)" unit="%" color="red" />
        </div>

        <GlassCard glowColor="cyan" className="mt-4">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4 text-neon-cyan" />
            <span className="text-sm font-medium">Congestion Levels</span>
          </div>
          <div className="space-y-3">
            <NeonProgress value={78} label="Highway 101" color="red" />
            <NeonProgress value={54} label="Downtown Core" color="yellow" />
            <NeonProgress value={32} label="Residential Areas" color="green" />
            <NeonProgress value={45} label="Industrial Zone" color="cyan" />
          </div>
        </GlassCard>

        <GlassCard glowColor="green" className="mt-4">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-4 h-4 text-neon-green" />
            <span className="text-sm font-medium">Signal Optimization</span>
          </div>
          <p className="text-xs text-muted-foreground mb-3">
            AI-powered signal timing can reduce average wait time by 23%
          </p>
          <NeonButton variant="green" pulse className="w-full">
            Optimize All Signals
          </NeonButton>
        </GlassCard>

        <GlassCard glowColor="orange" className="mt-4">
          <span className="text-xs text-muted-foreground">Traffic Severity</span>
          <div className="flex items-end gap-1 h-16 mt-2">
            {[45, 62, 78, 85, 72, 58, 45, 38, 52, 67, 74, 68].map((v, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${v}%` }}
                transition={{ delay: i * 0.05 }}
                className="flex-1 bg-gradient-to-t from-neon-green via-neon-yellow to-neon-red rounded-t"
                style={{ opacity: 0.3 + (v / 100) * 0.7 }}
              />
            ))}
          </div>
          <div className="flex justify-between text-[8px] text-muted-foreground mt-1">
            <span>6AM</span>
            <span>Now</span>
            <span>6PM</span>
          </div>
        </GlassCard>
      </HUDPanel>
    </>
  );
};
