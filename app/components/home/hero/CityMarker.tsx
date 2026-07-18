"use client";

import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from "three";

export interface CityMarkerData {
  name: string;
  label: string;
  position: [number, number, number];
}

interface CityMarkerProps extends CityMarkerData {
  active: boolean;
  reducedMotion: boolean;
}

export default function CityMarker({ name, label, position, active, reducedMotion }: CityMarkerProps) {
  const markerRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!markerRef.current || !active || reducedMotion) return;
    const pulse = 1 + Math.sin(state.clock.elapsedTime * 2.5 + position[0]) * 0.18;
    markerRef.current.scale.setScalar(hovered ? 1.45 : pulse);
  });

  return (
    <group position={position}>
      <mesh
        ref={markerRef}
        onPointerOver={(event) => {
          event.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.055, 18, 18]} />
        <meshStandardMaterial color="#C89B24" emissive="#C89B24" emissiveIntensity={1.2} roughness={0.18} metalness={0.35} />
      </mesh>
      <mesh>
        <ringGeometry args={[0.09, 0.12, 28]} />
        <meshBasicMaterial color="#C89B24" transparent opacity={0.45} side={THREE.DoubleSide} />
      </mesh>
      {hovered ? (
        <Html center distanceFactor={6} position={[0, 0.28, 0.12]} zIndexRange={[60, 10]}>
          <div className="whitespace-nowrap rounded-2xl border border-white/60 bg-white/75 px-4 py-3 text-xs font-bold text-[#081F4D] shadow-[0_18px_60px_rgba(8,31,77,0.16)] backdrop-blur-xl">
            <span className="text-[#C89B24]">{name}</span> - {label}
          </div>
        </Html>
      ) : null}
    </group>
  );
}
