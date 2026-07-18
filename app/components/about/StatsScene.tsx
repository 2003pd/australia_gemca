"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function FloatingShape({ position, speed, phase }: { position: [number, number, number]; speed: number; phase: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.position.y = position[1] + Math.sin(t * speed + phase) * 0.4;
    ref.current.rotation.x += 0.005 * speed;
    ref.current.rotation.z += 0.003 * speed;
  });
  return (
    <mesh ref={ref} position={position}>
      <octahedronGeometry args={[0.5, 0]} />
      <meshPhysicalMaterial
        color="#6F9FDC"
        metalness={0.3}
        roughness={0.1}
        transparent
        opacity={0.5}
        transmission={0.2}
      />
    </mesh>
  );
}

const SHAPES: Array<{ position: [number, number, number]; speed: number; phase: number }> = [
  { position: [-5, 1, -2], speed: 0.7, phase: 0 },
  { position: [5, -1, -3], speed: 0.5, phase: 1.5 },
  { position: [0, 2, -4], speed: 0.9, phase: 0.8 },
  { position: [-3, -2, -2], speed: 0.6, phase: 2.1 },
  { position: [3, 0, -3], speed: 0.8, phase: 3.0 },
];

export default function StatsScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: false }}
      style={{ pointerEvents: "none" }}
    >
      <ambientLight intensity={1} />
      <pointLight position={[0, 0, 4]} intensity={2} color="#ffffff" />
      {SHAPES.map((s, i) => (
        <FloatingShape key={i} {...s} />
      ))}
    </Canvas>
  );
}
