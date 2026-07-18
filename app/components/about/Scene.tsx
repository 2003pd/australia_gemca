"use client";

import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, MeshDistortMaterial, Sphere } from "@react-three/drei";
import * as THREE from "three";

interface SceneProps {
  scrollProgress?: number;
  className?: string;
  reduced?: boolean;
}

function GlassSphere({ scrollProgress = 0, reduced = false }: { scrollProgress?: number; reduced?: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { pointer, viewport } = useThree();

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    if (reduced) {
      meshRef.current.rotation.y += delta * 0.3;
      return;
    }
    // Mouse-reactive tilt
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, pointer.y * -0.4, 0.08);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, pointer.x * 0.4 + delta * 0.2, 0.08);
    // Scroll-reactive vertical drift
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, scrollProgress * -2, 0.06);
  });

  return (
    <mesh ref={meshRef}>
      <Sphere args={[1.4, reduced ? 32 : 64, reduced ? 32 : 64]}>
        <MeshDistortMaterial
          color="#2E5FA3"
          emissive="#10294D"
          emissiveIntensity={0.4}
          metalness={0.15}
          roughness={0.05}
          distort={reduced ? 0 : 0.22}
          speed={reduced ? 0 : 1.5}
          envMapIntensity={2.5}
          clearcoat={1}
          clearcoatRoughness={0.1}
          transmission={0.3}
          thickness={1.5}
          ior={1.5}
        />
      </Sphere>

      {/* Outer glow halo */}
      <mesh scale={1.18}>
        <sphereGeometry args={[1.4, 20, 20]} />
        <meshBasicMaterial color="#6F9FDC" transparent opacity={0.06} side={THREE.BackSide} />
      </mesh>
    </mesh>
  );
}

function ParticleField({ reduced = false }: { reduced?: boolean }) {
  const ref = useRef<THREE.Points>(null);
  const count = reduced ? 200 : 600;

  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
  }

  useFrame((_, delta) => {
    if (ref.current && !reduced) {
      ref.current.rotation.y += delta * 0.02;
      ref.current.rotation.x += delta * 0.01;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#7FA8E0" size={0.025} transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

export default function Scene({ scrollProgress = 0, className = "", reduced = false }: SceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={[1, reduced ? 1 : 2]}
      gl={{ antialias: !reduced, alpha: true, powerPreference: "high-performance" }}
      style={{ pointerEvents: "none" }}
      className={className}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 8, 5]} intensity={2.5} color="#FFFFFF" />
      <directionalLight position={[-6, -2, 4]} intensity={1.2} color="#6F9FDC" />
      <pointLight position={[0, 0, 3]} intensity={1.5} color="#2E5FA3" distance={8} />

      <GlassSphere scrollProgress={scrollProgress} reduced={reduced} />
      <ParticleField reduced={reduced} />

      {!reduced && <Environment preset="studio" />}
    </Canvas>
  );
}
