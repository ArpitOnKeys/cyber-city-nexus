import { GlassCard } from '../GlassCard';
import { NeonButton } from '../NeonButton';
import { NeonProgress } from '../NeonProgress';
import { NeonGauge } from '../NeonGauge';
import { HUDPanel } from '../HUDPanel';
import { Wind, Thermometer, Droplets, AlertTriangle, Leaf, CloudRain } from 'lucide-react';
import { motion } from 'framer-motion';

interface EnvironmentModuleProps {
  isVisible: boolean;
}

const getAQIStatus = (aqi: number) => {
  if (aqi <= 50) return { label: 'Good', color: 'green' };
  if (aqi <= 100) return { label: 'Moderate', color: 'yellow' };
  if (aqi <= 150) return { label: 'Unhealthy for Sensitive', color: 'orange' };
  if (aqi <= 200) return { label: 'Unhealthy', color: 'red' };
  return { label: 'Hazardous', color: 'purple' };
};

export const EnvironmentModule = ({ isVisible }: EnvironmentModuleProps) => {
  const aqi = 127;
  const aqiStatus = getAQIStatus(aqi);

  return (
    <>
      {/* Left HUD - Sensor Readings */}
      <HUDPanel side="left" title="Environmental Sensors" isVisible={isVisible}>
        <GlassCard glowColor="green">
          <div className="flex items-center gap-2 mb-4">
            <Leaf className="w-5 h-5 text-neon-green" />
            <span className="text-sm font-medium">Air Quality Index</span>
          </div>
          <div className="flex justify-center">
            <NeonGauge value={aqi} max={500} label="AQI Level" color={aqiStatus.color as any} size="lg" />
          </div>
          <div className={`mt-4 p-2 rounded-lg text-center bg-neon-${aqiStatus.color}/20 border border-neon-${aqiStatus.color}/30`}>
            <span className={`text-sm font-medium text-neon-${aqiStatus.color}`}>{aqiStatus.label}</span>
          </div>
        </GlassCard>

        <GlassCard glowColor="teal" className="mt-4">
          <div className="flex items-center gap-2 mb-3">
            <Wind className="w-4 h-4 text-neon-teal" />
            <span className="text-sm font-medium">Particulate Matter</span>
          </div>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">PM2.5</span>
                <span className="text-neon-yellow">45 μg/m³</span>
              </div>
              <NeonProgress value={45} max={150} showValue={false} color="yellow" />
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">PM10</span>
                <span className="text-neon-orange">78 μg/m³</span>
              </div>
              <NeonProgress value={78} max={200} showValue={false} color="orange" />
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">O3</span>
                <span className="text-neon-green">32 ppb</span>
              </div>
              <NeonProgress value={32} max={100} showValue={false} color="green" />
            </div>
          </div>
        </GlassCard>

        <GlassCard glowColor="cyan" className="mt-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-2 bg-muted/30 rounded-lg">
              <Thermometer className="w-5 h-5 mx-auto text-neon-orange mb-1" />
              <div className="text-xl font-bold text-neon-orange">28°C</div>
              <div className="text-[10px] text-muted-foreground">Temperature</div>
            </div>
            <div className="text-center p-2 bg-muted/30 rounded-lg">
              <Droplets className="w-5 h-5 mx-auto text-neon-aqua mb-1" />
              <div className="text-xl font-bold text-neon-aqua">65%</div>
              <div className="text-[10px] text-muted-foreground">Humidity</div>
            </div>
            <div className="text-center p-2 bg-muted/30 rounded-lg">
              <Wind className="w-5 h-5 mx-auto text-neon-cyan mb-1" />
              <div className="text-xl font-bold text-neon-cyan">12</div>
              <div className="text-[10px] text-muted-foreground">km/h Wind</div>
            </div>
            <div className="text-center p-2 bg-muted/30 rounded-lg">
              <CloudRain className="w-5 h-5 mx-auto text-neon-blue mb-1" />
              <div className="text-xl font-bold text-neon-blue">20%</div>
              <div className="text-[10px] text-muted-foreground">Rain Chance</div>
            </div>
          </div>
        </GlassCard>
      </HUDPanel>

      {/* Right HUD - Actions */}
      <HUDPanel side="right" title="Environmental Actions" isVisible={isVisible}>
        <GlassCard glowColor="red">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-neon-yellow animate-pulse" />
            <span className="text-sm font-medium">Air Quality Alert</span>
          </div>
          <p className="text-xs text-muted-foreground mb-3">
            PM2.5 levels exceeding safe limits in Downtown and Industrial zones. Recommended actions available.
          </p>
          <div className="p-2 bg-neon-yellow/10 rounded-lg border border-neon-yellow/30 mb-3">
            <div className="flex items-center justify-between">
              <span className="text-xs">Affected Population</span>
              <span className="text-sm font-medium text-neon-yellow">~45,000</span>
            </div>
          </div>
        </GlassCard>

        <GlassCard glowColor="green" className="mt-4">
          <span className="text-sm font-medium mb-3 block">Mitigation Systems</span>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-2 bg-muted/30 rounded-lg">
              <div>
                <span className="text-xs font-medium">Mist Spraying Drones</span>
                <p className="text-[10px] text-muted-foreground">12 units available</p>
              </div>
              <NeonButton variant="green" size="sm">
                Deploy
              </NeonButton>
            </div>
            <div className="flex items-center justify-between p-2 bg-muted/30 rounded-lg">
              <div>
                <span className="text-xs font-medium">Purification Towers</span>
                <p className="text-[10px] text-muted-foreground">8 of 15 active</p>
              </div>
              <NeonButton variant="cyan" size="sm">
                Activate All
              </NeonButton>
            </div>
            <div className="flex items-center justify-between p-2 bg-muted/30 rounded-lg">
              <div>
                <span className="text-xs font-medium">Green Corridor Fans</span>
                <p className="text-[10px] text-muted-foreground">Currently OFF</p>
              </div>
              <NeonButton variant="purple" size="sm">
                Enable
              </NeonButton>
            </div>
          </div>
        </GlassCard>

        <GlassCard glowColor="teal" className="mt-4">
          <div className="flex items-center gap-2 mb-3">
            <Thermometer className="w-4 h-4 text-neon-red" />
            <span className="text-sm font-medium">Heat Island Detection</span>
          </div>
          <div className="space-y-2">
            {[
              { zone: 'Central Business', temp: '+4.2°C', severity: 'high' },
              { zone: 'Industrial Area', temp: '+3.8°C', severity: 'high' },
              { zone: 'Shopping District', temp: '+2.1°C', severity: 'medium' },
            ].map((zone, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center justify-between p-2 bg-muted/30 rounded"
              >
                <span className="text-xs">{zone.zone}</span>
                <span className={`text-xs font-medium ${
                  zone.severity === 'high' ? 'text-neon-red' : 'text-neon-yellow'
                }`}>
                  {zone.temp}
                </span>
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </HUDPanel>
    </>
  );
};
