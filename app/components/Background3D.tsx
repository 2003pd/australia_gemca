"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Environment, Line } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "next-themes";

const NUM_FRAGMENTS = 12;

// --- Formation Generators ---
// 1. GEMCA Cluster (Hero & Footer) - Tightly packed geometric cluster
const getClusterFormation = (index: number, total: number) => {
  const phi = Math.acos(-1 + (2 * index) / total);
  const theta = Math.sqrt(total * Math.PI) * phi;
  const radius = 0.6 + Math.random() * 0.3; // Increased spread slightly for clarity
  return new THREE.Vector3(
    radius * Math.cos(theta) * Math.sin(phi),
    radius * Math.sin(theta) * Math.sin(phi),
    radius * Math.cos(phi)
  );
};

// 2. Abstract Australia Map (Visa Section)
const austaliaNodes = [
  [-2.5, 1.5, 0],
  [-2.8, -0.5, 0],
  [-1.0, 2.0, 0],
  [-0.5, 0, 0],
  [1.5, 1.8, 0],
  [2.2, 0.5, 0],
  [1.8, -0.5, 0],
  [2.2, -1.5, 0],   // Sydney (Gold Node - index 7)
  [1.5, -2.2, 0],
  [1.8, -3.5, 0],
  [0, 1.0, 0],
  [0.8, -0.8, 0],
];

const getMapFormation = (index: number) => {
  const node = austaliaNodes[index % austaliaNodes.length];
  return new THREE.Vector3(node[0], node[1], node[2] + (Math.random() - 0.5) * 0.5);
};

// 3. Compass / Data Ring (Tools Section)
const getCompassFormation = (index: number, total: number) => {
  const angle = (index / total) * Math.PI * 2;
  const radius = 3.0;
  return new THREE.Vector3(
    Math.cos(angle) * radius,
    Math.sin(angle) * radius,
    (index % 2 === 0 ? 0.4 : -0.4)
  );
};

function CrystalChoreographer({ isDark }: { isDark: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const fragmentsRef = useRef<THREE.Mesh[]>([]);
  const { viewport, pointer, size } = useThree();
  const [scrollProgress, setScrollProgress] = useState(0);
  const isMobile = size.width < 768;

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      setScrollProgress(Math.min(1, Math.max(0, scrollY / maxScroll)));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // We use dark themes primarily to make the luxury crystal pop.
  // The object itself is a Deep Navy with Gold highlights.
  const glassColor = isDark ? "#ffffff" : "#0A1F44";
  const goldColor = "#C9A227";

  // Precompute target formations
  const formations = useMemo(() => {
    return {
      cluster: Array.from({ length: NUM_FRAGMENTS }).map((_, i) => getClusterFormation(i, NUM_FRAGMENTS)),
      map: Array.from({ length: NUM_FRAGMENTS }).map((_, i) => getMapFormation(i)),
      compass: Array.from({ length: NUM_FRAGMENTS }).map((_, i) => getCompassFormation(i, NUM_FRAGMENTS)),
    };
  }, []);

  // Geometry: Increased scale by 20%
  const geometry = useMemo(() => new THREE.OctahedronGeometry(0.45, 0), []);
  const goldGeometry = useMemo(() => new THREE.OctahedronGeometry(0.55, 0), []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const t = scrollProgress;

    // --- 1. Global Flight Path ---
    let targetX = 0;
    let targetY = 0;
    let targetZ = 0;

    let currentFormation = formations.cluster;
    let formationLerp = 0.05;

    if (t < 0.2) {
      // Hero: Placed significantly to the right, freeing left area for text
      targetX = viewport.width * 0.35;
      targetY = viewport.height * 0.1 - (t * viewport.height);
      targetZ = 1; // Brought forward slightly for impact
      currentFormation = formations.cluster;
    }
    else if (t >= 0.2 && t < 0.5) {
      // Map
      targetX = -viewport.width * 0.15;
      targetY = 0;
      targetZ = -2;
      currentFormation = formations.map;
      formationLerp = 0.03;
    }
    else if (t >= 0.5 && t < 0.8) {
      // Compass
      targetX = viewport.width * 0.25;
      targetY = 0;
      targetZ = -1;
      currentFormation = formations.compass;
    }
    else {
      // Footer
      targetX = 0;
      targetY = -viewport.height * 0.25;
      targetZ = 1;
      currentFormation = formations.cluster;
    }

    if (isMobile) {
      targetX *= 0.5;
      targetZ -= 2;
    }

    // Subtle mouse interaction (inertia)
    targetX += pointer.x * 0.3;
    targetY += pointer.y * 0.3;

    // Smooth position interpolation
    groupRef.current.position.lerp(new THREE.Vector3(targetX, targetY, targetZ), 2.5 * delta);

    // Slow, elegant rotation
    groupRef.current.rotation.y += delta * 0.15;
    groupRef.current.rotation.x += delta * 0.08;

    // --- 2. Animate Fragments ---
    fragmentsRef.current.forEach((mesh, index) => {
      if (!mesh) return;

      const targetLocalPos = currentFormation[index];
      mesh.position.lerp(targetLocalPos, formationLerp * 60 * delta);

      // Sharp, distinct rotations for facets
      mesh.rotation.x += delta * (0.1 + index * 0.02);
      mesh.rotation.y += delta * (0.15 + index * 0.02);

      // Highlight the Gold facet (index 7)
      if (index === 7) {
        if (t >= 0.5 && t < 0.8) {
          mesh.position.lerp(new THREE.Vector3(0, 3.5, 0), formationLerp * 60 * delta);
        } else if (t < 0.2 || t >= 0.8) {
          mesh.position.x += Math.sin(state.clock.elapsedTime) * 0.005;
          mesh.position.y += Math.cos(state.clock.elapsedTime) * 0.005;
        }
      }
    });
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.5}>
        {Array.from({ length: NUM_FRAGMENTS }).map((_, i) => {
          const isGold = i === 7;
          return (
            <mesh
              key={i}
              ref={(el) => {
                if (el) fragmentsRef.current[i] = el;
              }}
              geometry={isGold ? goldGeometry : geometry}
            >
              {isGold ? (
                <meshPhysicalMaterial
                  color={goldColor}
                  emissive={goldColor}
                  emissiveIntensity={0.8} // Crisp gold bloom
                  metalness={1}
                  roughness={0.15}
                  clearcoat={1}
                  clearcoatRoughness={0.1}
                  envMapIntensity={2.5}
                />
              ) : (
                <meshPhysicalMaterial
                  color={glassColor} // Clear white glass instead of dark navy
                  metalness={isDark ? 0.2 : 0.6}
                  roughness={0.05} // Very glossy
                  transmission={isMobile ? 0 : (isDark ? 0.95 : 0.6)} // Extremely high clarity glass
                  ior={1.8} // High Index of refraction for sparkling diamond/crystal look
                  thickness={2.0} // Glass volume
                  clearcoat={1}
                  clearcoatRoughness={0.0}
                  envMapIntensity={3} // Strong HDRI reflections
                />
              )}
            </mesh>
          );
        })}

        {/* Abstract Route Lines */}
        {scrollProgress > 0.2 && scrollProgress < 0.8 && !isMobile && (
          <group>
            <Line points={[austaliaNodes[0] as [number, number, number], austaliaNodes[2] as [number, number, number]]} color={goldColor} lineWidth={0.8} transparent opacity={0.5} />
            <Line points={[austaliaNodes[2] as [number, number, number], austaliaNodes[4] as [number, number, number]]} color={goldColor} lineWidth={0.8} transparent opacity={0.5} />
            <Line points={[austaliaNodes[4] as [number, number, number], austaliaNodes[7] as [number, number, number]]} color={goldColor} lineWidth={1.5} transparent opacity={0.8} />
            <Line points={[austaliaNodes[7] as [number, number, number], austaliaNodes[8] as [number, number, number]]} color={goldColor} lineWidth={1.5} transparent opacity={0.8} />
          </group>
        )}
      </Float>
    </group>
  );
}

export default function Background3D() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const isDark = mounted ? resolvedTheme === "dark" : false;

  return (
    <div className="fixed inset-0 z-[-50] pointer-events-none bg-transparent">
      {/* Subtle vignette layer - dynamic based on theme */}
      <div className={`absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] z-[1] pointer-events-none ${isDark
          ? 'from-transparent via-[#0A1F44]/30 to-[#0A1F44]/90'
          : 'from-transparent via-[#e2e8f0]/30 to-[#e2e8f0]/90'
        }`} />


      <Canvas
        camera={{ position: [0, 0, 10], fov: 40 }} // Tighter FOV for less distortion (product photography style)
        dpr={[1, 2]}
        gl={{ powerPreference: "high-performance", antialias: true }} // Antialiasing ON for sharp edges
        style={{ pointerEvents: "none" }}
        eventSource={typeof document !== "undefined" ? document.body : undefined}
      >
        {/* 
          Premium Studio Lighting 
          - Strong key light
          - Fill light
          - Rim light for edges
        */}
        <ambientLight intensity={0.4} />

        {/* Key Light (Strong, sharp, from top-right) */}
        <directionalLight position={[5, 10, 5]} intensity={3} color="#FFFFFF" castShadow />

        {/* Fill Light (Soft, from left) */}
        <directionalLight position={[-8, 0, 5]} intensity={1.5} color="#2E5FA3" />

        {/* Rim Light (Sharp, from behind to highlight glass edges) */}
        <spotLight position={[0, 5, -10]} intensity={4} color="#FFFFFF" angle={0.5} penumbra={1} />

        {/* Additional radial soft blue behind the object for contrast */}
        <pointLight position={[2, 0, -2]} intensity={2} color="#1B4178" distance={15} />

        {/* The swimming crystal choreography */}
        <CrystalChoreographer isDark={isDark} />

        {/* HDRI Environment map for luxury product reflections */}
        <Environment preset="studio" />
      </Canvas>
    </div>
  );
}
