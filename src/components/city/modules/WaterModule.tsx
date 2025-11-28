import { GlassCard } from '../GlassCard';
import { NeonButton } from '../NeonButton';
import { NeonProgress } from '../NeonProgress';
import { NeonGauge } from '../NeonGauge';
import { HUDPanel } from '../HUDPanel';
import { Droplets, AlertTriangle, Waves, CloudRain, Gauge } from 'lucide-react';
import { motion } from 'framer-motion';

interface WaterModuleProps {
  isVisible: boolean;
}

const DrainIndicator = ({ id, level, status }: { id: string; level: number; status: 'ok' | 'warning' | 'critical' }) => {
  const colors = {
    ok: 'border-neon-green bg-neon-green/10',
    warning: 'border-neon-yellow bg-neon-yellow/10',
    critical: 'border-neon-red bg-neon-red/10 animate-pulse',
  };
  const textColors = {
    ok: 'text-neon-green',
    warning: 'text-neon-yellow',
    critical: 'text-neon-red',
  };

  return (
    <div className={`p-2 rounded-lg border ${colors[status]}`}>
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-medium">{id}</span>
        <span className={`text-xs ${textColors[status]}`}>{level}%</span>
      </div>
      <div className="h-8 bg-muted/50 rounded relative overflow-hidden">
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: `${level}%` }}
          transition={{ duration: 0.8 }}
          className={`absolute bottom-0 left-0 right-0 ${
            status === 'critical' ? 'bg-neon-red' : status === 'warning' ? 'bg-neon-yellow' : 'bg-neon-aqua'
          }`}
          style={{ opacity: 0.6 }}
        />
        <Waves className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-4 ${textColors[status]}`} />
      </div>
    </div>
  );
};

export const WaterModule = ({ isVisible }: WaterModuleProps) => {
  return (
    <>
      {/* Left HUD - Drain Health */}
      <HUDPanel side="left" title="Drainage System" isVisible={isVisible}>
        <GlassCard glowColor="cyan">
          <div className="flex items-center gap-2 mb-4">
            <Droplets className="w-5 h-5 text-neon-aqua" />
            <span className="text-sm font-medium">Manhole Sensors</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <DrainIndicator id="MH-001" level={35} status="ok" />
            <DrainIndicator id="MH-002" level={62} status="warning" />
            <DrainIndicator id="MH-003" level={88} status="critical" />
            <DrainIndicator id="MH-004" level={45} status="ok" />
            <DrainIndicator id="MH-005" level={71} status="warning" />
            <DrainIndicator id="MH-006" level={28} status="ok" />
          </div>
        </GlassCard>

        <GlassCard glowColor="teal" className="mt-4">
          <div className="flex items-center gap-2 mb-3">
            <Gauge className="w-4 h-4 text-neon-teal" />
            <span className="text-sm font-medium">District Flow Efficiency</span>
          </div>
          <div className="space-y-3">
            <NeonProgress value={92} label="District A" color="green" />
            <NeonProgress value={78} label="District B" color="cyan" />
            <NeonProgress value={45} label="District C (Blocked)" color="red" />
            <NeonProgress value={86} label="District D" color="teal" />
          </div>
        </GlassCard>

        <GlassCard glowColor="purple" className="mt-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-neon-aqua">847</div>
            <div className="text-xs text-muted-foreground">Active Sensors</div>
            <div className="flex justify-center gap-3 mt-3">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-neon-green" />
                <span className="text-[10px]">724 Normal</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-neon-yellow" />
                <span className="text-[10px]">98 Warning</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-neon-red" />
                <span className="text-[10px]">25 Critical</span>
              </div>
            </div>
          </div>
        </GlassCard>
      </HUDPanel>

      {/* Right HUD - Controls */}
      <HUDPanel side="right" title="Flood Control" isVisible={isVisible}>
        <GlassCard glowColor="red">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-neon-yellow animate-pulse" />
            <span className="text-sm font-medium">Flood Risk Assessment</span>
          </div>
          <div className="flex justify-center my-4">
            <NeonGauge value={65} max={100} label="Flood Risk Level" color="yellow" size="lg" />
          </div>
          <div className="p-2 bg-neon-yellow/10 rounded-lg border border-neon-yellow/30">
            <p className="text-xs text-center">
              <span className="text-neon-yellow font-medium">MEDIUM RISK</span>
              <br />
              <span className="text-muted-foreground">Heavy rain expected in 3 hours</span>
            </p>
          </div>
        </GlassCard>

        <GlassCard glowColor="cyan" className="mt-4">
          <div className="flex items-center gap-2 mb-3">
            <CloudRain className="w-4 h-4 text-neon-cyan" />
            <span className="text-sm font-medium">Storm Prediction</span>
          </div>
          <div className="flex items-end gap-1 h-20">
            {[20, 35, 55, 78, 92, 85, 70, 45, 30, 20, 15, 10].map((v, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${v}%` }}
                transition={{ delay: i * 0.05 }}
                className={`flex-1 rounded-t ${
                  v > 80 ? 'bg-neon-red' : v > 50 ? 'bg-neon-yellow' : 'bg-neon-aqua'
                }`}
                style={{ opacity: 0.4 + (v / 100) * 0.6 }}
              />
            ))}
          </div>
          <div className="flex justify-between text-[8px] text-muted-foreground mt-1">
            <span>Now</span>
            <span>+3h</span>
            <span>+6h</span>
            <span>+12h</span>
          </div>
        </GlassCard>

        <GlassCard glowColor="green" className="mt-4">
          <span className="text-sm font-medium mb-3 block">Pump Control</span>
          <div className="space-y-3">
            {[
              { id: 'PS-001', status: 'Active', flow: 450 },
              { id: 'PS-002', status: 'Standby', flow: 0 },
              { id: 'PS-003', status: 'Active', flow: 380 },
            ].map((pump, i) => (
              <div key={i} className="flex items-center justify-between p-2 bg-muted/30 rounded-lg">
                <div>
                  <span className="text-xs font-medium">{pump.id}</span>
                  <p className="text-[10px] text-muted-foreground">
                    {pump.status} • {pump.flow} L/min
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    pump.status === 'Active' ? 'bg-neon-green animate-pulse' : 'bg-muted'
                  }`} />
                  <NeonButton variant={pump.status === 'Active' ? 'red' : 'green'} size="sm">
                    {pump.status === 'Active' ? 'Stop' : 'Start'}
                  </NeonButton>
                </div>
              </div>
            ))}
          </div>
          <NeonButton variant="cyan" className="w-full mt-4">
            Emergency Override - All Pumps
          </NeonButton>
        </GlassCard>
      </HUDPanel>
    </>
  );
};
