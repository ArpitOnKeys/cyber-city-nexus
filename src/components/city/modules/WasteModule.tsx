import { GlassCard } from '../GlassCard';
import { NeonButton } from '../NeonButton';
import { NeonProgress } from '../NeonProgress';
import { HUDPanel } from '../HUDPanel';
import { Trash2, Truck, MapPin, Route, Fuel, Package } from 'lucide-react';
import { motion } from 'framer-motion';

interface WasteModuleProps {
  isVisible: boolean;
}

const TruckCard = ({ id, fuel, load, distance }: { id: number; fuel: number; load: number; distance: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="p-3 bg-neon-purple/10 rounded-lg border border-neon-purple/30"
  >
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center gap-2">
        <Truck className="w-4 h-4 text-neon-purple" />
        <span className="text-sm font-medium">Truck #{id}</span>
      </div>
      <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
    </div>
    <div className="grid grid-cols-3 gap-2 text-center">
      <div>
        <div className="flex items-center justify-center gap-1">
          <Fuel className="w-3 h-3 text-neon-orange" />
          <span className="text-xs font-medium">{fuel}%</span>
        </div>
        <span className="text-[8px] text-muted-foreground">Fuel</span>
      </div>
      <div>
        <div className="flex items-center justify-center gap-1">
          <Package className="w-3 h-3 text-neon-cyan" />
          <span className="text-xs font-medium">{load}%</span>
        </div>
        <span className="text-[8px] text-muted-foreground">Load</span>
      </div>
      <div>
        <div className="flex items-center justify-center gap-1">
          <MapPin className="w-3 h-3 text-neon-purple" />
          <span className="text-xs font-medium">{distance}km</span>
        </div>
        <span className="text-[8px] text-muted-foreground">Traveled</span>
      </div>
    </div>
  </motion.div>
);

export const WasteModule = ({ isVisible }: WasteModuleProps) => {
  return (
    <>
      {/* Left HUD - Fleet Management */}
      <HUDPanel side="left" title="Fleet Management" isVisible={isVisible}>
        <GlassCard glowColor="purple">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-neon-purple" />
              <span className="text-sm font-medium">Active Fleet</span>
            </div>
            <span className="text-xs text-neon-green">8/12 Online</span>
          </div>
          <div className="space-y-2">
            <TruckCard id={1} fuel={78} load={45} distance={32} />
            <TruckCard id={2} fuel={92} load={12} distance={8} />
            <TruckCard id={3} fuel={45} load={87} distance={56} />
            <TruckCard id={4} fuel={65} load={62} distance={41} />
          </div>
        </GlassCard>

        <GlassCard glowColor="orange" className="mt-4">
          <div className="flex items-center gap-2 mb-3">
            <Trash2 className="w-4 h-4 text-neon-orange" />
            <span className="text-sm font-medium">Today's Collection</span>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-neon-orange">2,847</div>
            <div className="text-xs text-muted-foreground">Tons Collected</div>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-4 text-center">
            <div>
              <div className="text-lg font-medium text-neon-green">1,204</div>
              <div className="text-[8px] text-muted-foreground">Recyclable</div>
            </div>
            <div>
              <div className="text-lg font-medium text-neon-yellow">892</div>
              <div className="text-[8px] text-muted-foreground">Organic</div>
            </div>
            <div>
              <div className="text-lg font-medium text-muted-foreground">751</div>
              <div className="text-[8px] text-muted-foreground">General</div>
            </div>
          </div>
        </GlassCard>
      </HUDPanel>

      {/* Right HUD - Optimization */}
      <HUDPanel side="right" title="Route Optimization" isVisible={isVisible}>
        <GlassCard glowColor="purple">
          <div className="flex items-center gap-2 mb-3">
            <Route className="w-4 h-4 text-neon-purple" />
            <span className="text-sm font-medium">Route Comparison</span>
          </div>
          <div className="space-y-4">
            <div className="p-3 bg-muted/30 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-muted-foreground">Standard Route</span>
                <span className="text-sm font-medium">142 km</span>
              </div>
              <NeonProgress value={100} showValue={false} color="orange" />
            </div>
            <div className="p-3 bg-neon-green/10 rounded-lg border border-neon-green/30">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-neon-green">Optimized Route</span>
                <span className="text-sm font-medium text-neon-green">98 km</span>
              </div>
              <NeonProgress value={69} showValue={false} color="green" />
            </div>
            <div className="text-center p-2 bg-neon-green/10 rounded-lg">
              <span className="text-lg font-bold text-neon-green">31%</span>
              <span className="text-xs text-muted-foreground ml-1">Distance Saved</span>
            </div>
          </div>
          <NeonButton variant="purple" className="w-full mt-4">
            Apply Optimized Routes
          </NeonButton>
        </GlassCard>

        <GlassCard glowColor="red" className="mt-4">
          <div className="flex items-center gap-2 mb-3">
            <Trash2 className="w-4 h-4 text-neon-red" />
            <span className="text-sm font-medium">Bin Overflow Prediction</span>
          </div>
          <div className="space-y-2">
            {[
              { zone: 'Downtown', time: '2h', level: 92 },
              { zone: 'Market St', time: '4h', level: 78 },
              { zone: 'Industrial', time: '6h', level: 65 },
            ].map((bin, i) => (
              <div key={i} className="flex items-center justify-between p-2 bg-muted/30 rounded">
                <div>
                  <span className="text-xs font-medium">{bin.zone}</span>
                  <p className="text-[10px] text-muted-foreground">Overflow in ~{bin.time}</p>
                </div>
                <div className={`px-2 py-1 rounded text-xs ${
                  bin.level > 85 ? 'bg-neon-red/20 text-neon-red' : 
                  bin.level > 65 ? 'bg-neon-yellow/20 text-neon-yellow' : 
                  'bg-neon-green/20 text-neon-green'
                }`}>
                  {bin.level}%
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard glowColor="cyan" className="mt-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-neon-cyan">847</div>
            <div className="text-xs text-muted-foreground">Smart Bins Online</div>
            <div className="flex justify-center gap-4 mt-3">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-neon-green" />
                <span className="text-[10px]">612 OK</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-neon-yellow" />
                <span className="text-[10px]">178 Warning</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-neon-red" />
                <span className="text-[10px]">57 Full</span>
              </div>
            </div>
          </div>
        </GlassCard>
      </HUDPanel>
    </>
  );
};
