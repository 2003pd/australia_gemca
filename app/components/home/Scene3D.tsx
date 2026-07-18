"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, MeshDistortMaterial, Icosahedron } from "@react-three/drei";
import * as THREE from "three";

interface Scene3DProps {
  scrollProgress?: number;
  mousePosition?: { x: number; y: number };
}

function PremiumObject({ scrollProgress = 0, mousePosition = { x: 0, y: 0 } }: Scene3DProps) {
  const goldKnotRef = useRef<THREE.Mesh>(null);
  const glassKnotRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const elapsed = state.clock.getElapsedTime();

    // 1. Slow, organic floating motion (sine wave offset)
    const floatOffset = Math.sin(elapsed * 0.8) * 0.15;

    // 2. Rotate the two interlocking knots in opposite directions
    if (goldKnotRef.current) {
      goldKnotRef.current.rotation.x = elapsed * 0.12;
      goldKnotRef.current.rotation.y = elapsed * 0.18;
      goldKnotRef.current.rotation.z = elapsed * 0.05;

      // Mouse reactivity
      const targetX = mousePosition.x * 0.4;
      const targetY = mousePosition.y * 0.4;
      goldKnotRef.current.rotation.x += THREE.MathUtils.lerp(0, targetY, 0.05);
      goldKnotRef.current.rotation.y += THREE.MathUtils.lerp(0, targetX, 0.05);

      // Scroll translation
      goldKnotRef.current.position.y = floatOffset + scrollProgress * 3.5;
      const scaleFactor = 1 - scrollProgress * 0.2;
      goldKnotRef.current.scale.setScalar(scaleFactor);
    }

    if (glassKnotRef.current) {
      // Opposite rotation direction
      glassKnotRef.current.rotation.x = -elapsed * 0.15;
      glassKnotRef.current.rotation.y = -elapsed * 0.1;
      glassKnotRef.current.rotation.z = -elapsed * 0.08;

      // Mouse reactivity
      const targetX = mousePosition.x * 0.3;
      const targetY = mousePosition.y * 0.3;
      glassKnotRef.current.rotation.x += THREE.MathUtils.lerp(0, targetY, 0.05);
      glassKnotRef.current.rotation.y += THREE.MathUtils.lerp(0, targetX, 0.05);

      // Scroll translation
      glassKnotRef.current.position.y = floatOffset + scrollProgress * 3.5;
      const scaleFactor = 1 - scrollProgress * 0.2;
      glassKnotRef.current.scale.setScalar(scaleFactor);
    }
  });

  return (
    <group>
      {/* 1. Gold Metallic Ribbon */}
      <mesh ref={goldKnotRef}>
        <torusKnotGeometry args={[1.2, 0.05, 180, 16, 2, 3]} />
        <meshPhysicalMaterial
          color="#d4af37"
          metalness={0.95}
          roughness={0.1}
          emissive="#2A1B00"
          emissiveIntensity={0.1}
          clearcoat={1}
          clearcoatRoughness={0.05}
        />
      </mesh>

      {/* 2. Frosted Glass Ribbon (Interlocking) */}
      <mesh ref={glassKnotRef}>
        <torusKnotGeometry args={[1.35, 0.045, 180, 16, 3, 4]} />
        <meshPhysicalMaterial
          color="#FAF6F0"
          roughness={0.05}
          metalness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.05}
          transmission={0.85}
          thickness={1.5}
          ior={1.52}
          transparent
          opacity={0.9}
        />
      </mesh>
    </group>
  );
}

export default function Scene3D({ scrollProgress = 0, mousePosition = { x: 0, y: 0 } }: Scene3DProps) {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 10, 5]} intensity={2.5} color="#FFFFFF" />
        <directionalLight position={[-5, -5, -5]} intensity={1.5} color="#FAF6F0" />
        <pointLight position={[0, 5, 2]} intensity={1.5} color="#F5E9E6" />
        
        <PremiumObject scrollProgress={scrollProgress} mousePosition={mousePosition} />
        <Environment preset="studio" />
      </Canvas>
    </div>
  );
}
