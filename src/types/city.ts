export type CityMode = 'TRAFFIC' | 'ENERGY' | 'WASTE' | 'ENVIRONMENT' | 'WATER';

export interface ModeConfig {
  id: CityMode;
  label: string;
  icon: string;
  primaryColor: string;
  secondaryColor: string;
  description: string;
}

export interface TrafficData {
  congestionLevel: number;
  activeIncidents: number;
  avgSpeed: number;
  signalEfficiency: number;
}

export interface EnergyData {
  totalConsumption: number;
  solarPercentage: number;
  windPercentage: number;
  gridPercentage: number;
  batteryLevel: number;
  peakDemand: number;
}

export interface WasteData {
  totalBins: number;
  fullBins: number;
  activeTrucks: number;
  todayCollected: number;
  optimizedRoutes: number;
}

export interface EnvironmentData {
  aqi: number;
  pm25: number;
  pm10: number;
  temperature: number;
  humidity: number;
  windSpeed: number;
}

export interface WaterData {
  drainageEfficiency: number;
  activePumps: number;
  cloggedDrains: number;
  waterLevel: number;
  floodRisk: 'LOW' | 'MEDIUM' | 'HIGH';
}

export interface CityStats {
  uptime: number;
  threatLevel: 'GREEN' | 'YELLOW' | 'RED';
  efficiencyScore: number;
  weather: {
    condition: string;
    temperature: number;
    icon: string;
  };
}
