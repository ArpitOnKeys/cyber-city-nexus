import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Grid, Float } from '@react-three/drei';
import * as THREE from 'three';
import { CityMode } from '@/types/city';

interface CityMap3DProps {
  mode: CityMode;
}

const modeColors: Record<CityMode, { primary: string; secondary: string }> = {
  TRAFFIC: { primary: '#f59e0b', secondary: '#06b6d4' },
  ENERGY: { primary: '#eab308', secondary: '#3b82f6' },
  WASTE: { primary: '#a855f7', secondary: '#f97316' },
  ENVIRONMENT: { primary: '#22c55e', secondary: '#14b8a6' },
  WATER: { primary: '#06b6d4', secondary: '#0ea5e9' },
};

const Building = ({ position, height, width, mode }: { position: [number, number, number]; height: number; width: number; mode: CityMode }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const colors = modeColors[mode];
  
  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.MeshStandardMaterial;
      if (material.emissiveIntensity !== undefined) {
        material.emissiveIntensity = 0.2 + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.1;
      }
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[width, height, width]} />
      <meshStandardMaterial
        color="#0a0a15"
        emissive={colors.primary}
        emissiveIntensity={0.2}
        metalness={0.9}
        roughness={0.2}
      />
    </mesh>
  );
};

const TrafficFlow = ({ mode }: { mode: CityMode }) => {
  const particlesRef = useRef<THREE.Points>(null);
  
  const particleCount = 200;
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 1] = 0.2;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 40;
    }
    return pos;
  }, []);

  useFrame(() => {
    if (particlesRef.current && mode === 'TRAFFIC') {
      const posArray = particlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        posArray[i * 3] += 0.02;
        if (posArray[i * 3] > 20) posArray[i * 3] = -20;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  if (mode !== 'TRAFFIC') return null;

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.1} color="#f59e0b" transparent opacity={0.8} />
    </points>
  );
};

const EnergyGrid = ({ mode }: { mode: CityMode }) => {
  if (mode !== 'ENERGY') return null;
  
  const lines = [];
  for (let i = -15; i <= 15; i += 5) {
    const hGeom = useMemo(() => {
      const geom = new THREE.BufferGeometry();
      geom.setAttribute('position', new THREE.Float32BufferAttribute([-20, 0.1, i, 20, 0.1, i], 3));
      return geom;
    }, [i]);
    
    const vGeom = useMemo(() => {
      const geom = new THREE.BufferGeometry();
      geom.setAttribute('position', new THREE.Float32BufferAttribute([i, 0.1, -20, i, 0.1, 20], 3));
      return geom;
    }, [i]);

    lines.push(
      <primitive key={`h-${i}`} object={new THREE.Line(hGeom, new THREE.LineBasicMaterial({ color: '#3b82f6', transparent: true, opacity: 0.3 }))} />
    );
    lines.push(
      <primitive key={`v-${i}`} object={new THREE.Line(vGeom, new THREE.LineBasicMaterial({ color: '#eab308', transparent: true, opacity: 0.3 }))} />
    );
  }
  return <>{lines}</>;
};

const WasteBins = ({ mode }: { mode: CityMode }) => {
  if (mode !== 'WASTE') return null;
  
  const bins = [
    { pos: [-8, 0.3, -5] as [number, number, number], level: 0.3 },
    { pos: [5, 0.3, 8] as [number, number, number], level: 0.7 },
    { pos: [-12, 0.3, 10] as [number, number, number], level: 0.95 },
    { pos: [10, 0.3, -8] as [number, number, number], level: 0.5 },
    { pos: [0, 0.3, 0] as [number, number, number], level: 0.85 },
  ];

  return (
    <>
      {bins.map((bin, i) => (
        <Float key={i} speed={2} rotationIntensity={0} floatIntensity={0.5}>
          <mesh position={bin.pos}>
            <cylinderGeometry args={[0.3, 0.3, 0.6, 16]} />
            <meshStandardMaterial
              color={bin.level > 0.9 ? '#ef4444' : bin.level > 0.6 ? '#eab308' : '#22c55e'}
              emissive={bin.level > 0.9 ? '#ef4444' : bin.level > 0.6 ? '#eab308' : '#22c55e'}
              emissiveIntensity={0.5}
            />
          </mesh>
        </Float>
      ))}
    </>
  );
};

const EnvironmentClouds = ({ mode }: { mode: CityMode }) => {
  if (mode !== 'ENVIRONMENT') return null;
  
  const cloudPositions: [number, number, number][] = [
    [-10, 3, -10],
    [8, 4, 5],
    [-5, 3.5, 12],
    [12, 3, -8],
  ];

  return (
    <>
      {cloudPositions.map((pos, i) => (
        <Float key={i} speed={1} rotationIntensity={0.2} floatIntensity={1}>
          <mesh position={pos}>
            <sphereGeometry args={[1.5, 16, 16]} />
            <meshStandardMaterial
              color="#22c55e"
              transparent
              opacity={0.3}
              emissive="#22c55e"
              emissiveIntensity={0.2}
            />
          </mesh>
        </Float>
      ))}
    </>
  );
};

const WaterOverlay = ({ mode }: { mode: CityMode }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current && mode === 'WATER') {
      const material = meshRef.current.material as THREE.MeshStandardMaterial;
      if (material.opacity !== undefined) {
        material.opacity = 0.1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
      }
    }
  });

  if (mode !== 'WATER') return null;

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}>
      <planeGeometry args={[40, 40]} />
      <meshStandardMaterial
        color="#06b6d4"
        transparent
        opacity={0.1}
        emissive="#06b6d4"
        emissiveIntensity={0.3}
      />
    </mesh>
  );
};

const CityScene = ({ mode }: { mode: CityMode }) => {
  const colors = modeColors[mode];
  
  const buildings = useMemo(() => {
    const b = [];
    for (let x = -15; x <= 15; x += 5) {
      for (let z = -15; z <= 15; z += 5) {
        if (Math.random() > 0.3) {
          const height = 1 + Math.random() * 4;
          const width = 1 + Math.random() * 1.5;
          b.push({ position: [x, height / 2, z] as [number, number, number], height, width });
        }
      }
    }
    return b;
  }, []);

  return (
    <>
      <ambientLight intensity={0.1} />
      <pointLight position={[10, 20, 10]} intensity={0.5} color={colors.primary} />
      <pointLight position={[-10, 20, -10]} intensity={0.3} color={colors.secondary} />
      
      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#050510" />
      </mesh>
      
      {/* Grid */}
      <Grid
        args={[50, 50]}
        cellSize={2}
        cellThickness={0.5}
        cellColor={colors.secondary}
        sectionSize={10}
        sectionThickness={1}
        sectionColor={colors.primary}
        fadeDistance={50}
        fadeStrength={1}
        followCamera={false}
        infiniteGrid={false}
      />
      
      {/* Buildings */}
      {buildings.map((b, i) => (
        <Building key={i} position={b.position} height={b.height} width={b.width} mode={mode} />
      ))}
      
      {/* Mode-specific overlays */}
      <TrafficFlow mode={mode} />
      <EnergyGrid mode={mode} />
      <WasteBins mode={mode} />
      <EnvironmentClouds mode={mode} />
      <WaterOverlay mode={mode} />
      
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2.5}
        minDistance={10}
        maxDistance={40}
      />
    </>
  );
};

export const CityMap3D = ({ mode }: CityMap3DProps) => {
  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [20, 15, 20], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'linear-gradient(180deg, #050510 0%, #0a0a20 100%)' }}
      >
        <fog attach="fog" args={['#050510', 30, 60]} />
        <CityScene mode={mode} />
      </Canvas>
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-background/30 via-transparent to-background/50" />
    </div>
  );
};
