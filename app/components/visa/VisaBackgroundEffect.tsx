"use client";

import { Float, Sparkles as DreiSparkles } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

function VisaScene() {
  const group = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const move = (event: PointerEvent) => {
      mouse.current.x = (event.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = state.clock.elapsedTime * 0.08 + mouse.current.x * 0.12;
    group.current.rotation.x = mouse.current.y * 0.05;
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, mouse.current.x * 0.45, 0.035);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, -mouse.current.y * 0.28, 0.035);
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <color attach="background" args={["#ffffff"]} />
      <fog attach="fog" args={["#ffffff", 4, 12]} />
      <ambientLight intensity={1.5} />
      <directionalLight position={[4, 5, 3]} intensity={2.4} color="#fff5d6" />
      <pointLight position={[-3, 2, 2]} intensity={4} color="#c9a227" />
      <pointLight position={[3, -2, 1]} intensity={2.3} color="#2e5fa3" />

      <group ref={group}>
        {Array.from({ length: 14 }).map((_, index) => {
          const angle = (index / 14) * Math.PI * 2;
          const radius = 2.5 + (index % 3) * 0.35;

          return (
            <Float key={index} speed={1 + index * 0.03} rotationIntensity={1} floatIntensity={1.2}>
              <mesh position={[Math.cos(angle) * radius, Math.sin(angle * 1.4) * 0.7, Math.sin(angle) * radius - 1.5]}>
                <octahedronGeometry args={[0.08 + (index % 4) * 0.018, 0]} />
                <meshStandardMaterial color={index % 2 ? "#C9A227" : "#ffffff"} roughness={0.2} metalness={0.65} />
              </mesh>
            </Float>
          );
        })}

        {Array.from({ length: 7 }).map((_, index) => (
          <mesh key={index} position={[-2.8 + index * 0.9, -1.2 + Math.sin(index) * 0.28, -2.6]} rotation={[0.4, 0.1, -0.45]}>
            <boxGeometry args={[0.68, 0.012, 0.012]} />
            <meshStandardMaterial emissive="#C9A227" emissiveIntensity={1.4} color="#C9A227" />
          </mesh>
        ))}
      </group>

      <DreiSparkles count={95} scale={[7, 4, 7]} speed={0.34} size={2.15} color="#C9A227" opacity={0.44} />
    </>
  );
}

export default function VisaBackgroundEffect({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none fixed inset-0 z-0 ${className}`}>
      <Canvas camera={{ position: [0, 0, 6], fov: 42 }} dpr={[1, 1.6]}>
        <VisaScene />
      </Canvas>
    </div>
  );
}
