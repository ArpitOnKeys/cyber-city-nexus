import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CityMode, CityStats } from '@/types/city';
import { StatusBar } from '@/components/city/StatusBar';
import { ModuleDock } from '@/components/city/ModuleDock';
import { CityMap3D } from '@/components/city/CityMap3D';
import { TrafficModule } from '@/components/city/modules/TrafficModule';
import { EnergyModule } from '@/components/city/modules/EnergyModule';
import { WasteModule } from '@/components/city/modules/WasteModule';
import { EnvironmentModule } from '@/components/city/modules/EnvironmentModule';
import { WaterModule } from '@/components/city/modules/WaterModule';

const mockStats: CityStats = {
  uptime: 847,
  threatLevel: 'YELLOW',
  efficiencyScore: 87,
  weather: {
    condition: 'Cloudy',
    temperature: 28,
    icon: 'cloudy',
  },
};

const Index = () => {
  const [currentMode, setCurrentMode] = useState<CityMode>('TRAFFIC');

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-background">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      
      {/* Scanlines Effect */}
      <div className="absolute inset-0 scanlines pointer-events-none" />

      {/* Status Bar */}
      <StatusBar stats={mockStats} />

      {/* 3D City Map */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentMode}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 pt-12 pb-24"
        >
          <CityMap3D mode={currentMode} />
        </motion.div>
      </AnimatePresence>

      {/* Module-specific HUD Panels */}
      <AnimatePresence mode="wait">
        {currentMode === 'TRAFFIC' && <TrafficModule key="traffic" isVisible={true} />}
        {currentMode === 'ENERGY' && <EnergyModule key="energy" isVisible={true} />}
        {currentMode === 'WASTE' && <WasteModule key="waste" isVisible={true} />}
        {currentMode === 'ENVIRONMENT' && <EnvironmentModule key="environment" isVisible={true} />}
        {currentMode === 'WATER' && <WaterModule key="water" isVisible={true} />}
      </AnimatePresence>

      {/* Module Dock */}
      <ModuleDock currentMode={currentMode} onModeChange={setCurrentMode} />

      {/* Corner Decorations */}
      <div className="absolute top-14 left-4 w-16 h-16 border-l-2 border-t-2 border-neon-cyan/30 rounded-tl-lg pointer-events-none" />
      <div className="absolute top-14 right-4 w-16 h-16 border-r-2 border-t-2 border-neon-cyan/30 rounded-tr-lg pointer-events-none" />
      <div className="absolute bottom-28 left-4 w-16 h-16 border-l-2 border-b-2 border-neon-cyan/30 rounded-bl-lg pointer-events-none" />
      <div className="absolute bottom-28 right-4 w-16 h-16 border-r-2 border-b-2 border-neon-cyan/30 rounded-br-lg pointer-events-none" />

      {/* Holographic Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-neon-cyan/5 via-transparent to-neon-purple/5" />
    </div>
  );
};

export default Index;
