"use client";

import { Line } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import CityMarker, { type CityMarkerData } from "./CityMarker";

const cityMarkers: CityMarkerData[] = [
  { name: "Sydney", label: "Study & Career Opportunities", position: [1.02, -0.44, 0.21] },
  { name: "Melbourne", label: "Education & Migration Support", position: [0.56, -0.96, 0.21] },
  { name: "Brisbane", label: "Growing Student Destination", position: [1.15, 0.02, 0.21] },
  { name: "Adelaide", label: "Regional Study Planning", position: [0.12, -0.78, 0.21] },
  { name: "Perth", label: "Western Australia Pathways", position: [-1.28, -0.42, 0.21] },
  { name: "Darwin", label: "Northern Australia Options", position: [-0.35, 0.85, 0.21] },
];

interface AustraliaMapProps {
  active: boolean;
  reducedMotion: boolean;
  cursor: { x: number; y: number };
}

function makeAustraliaShape() {
  const shape = new THREE.Shape();
  const points = [
    [-1.88, 0.24],
    [-1.64, 0.78],
    [-1.18, 1.05],
    [-0.52, 0.98],
    [-0.02, 1.16],
    [0.58, 0.95],
    [1.14, 0.55],
    [1.5, 0.12],
    [1.66, -0.28],
    [1.28, -0.72],
    [0.78, -0.9],
    [0.42, -1.12],
    [-0.1, -1.0],
    [-0.56, -1.2],
    [-1.06, -0.9],
    [-1.52, -0.62],
    [-1.9, -0.08],
  ] as const;

  shape.moveTo(points[0][0], points[0][1]);
  points.slice(1).forEach(([x, y]) => shape.lineTo(x, y));
  shape.closePath();
  return shape;
}

function AnimatedTrail({ from, to, active, reducedMotion }: { from: [number, number, number]; to: [number, number, number]; active: boolean; reducedMotion: boolean }) {
  const bead = useRef<THREE.Mesh>(null);
  const curve = useMemo(() => {
    const start = new THREE.Vector3(...from);
    const end = new THREE.Vector3(...to);
    const mid = start.clone().lerp(end, 0.5);
    mid.z += 0.34;
    mid.y += 0.18;
    return new THREE.QuadraticBezierCurve3(start, mid, end);
  }, [from, to]);
  const points = useMemo(() => curve.getPoints(36), [curve]);

  useFrame((state) => {
    if (!bead.current || !active || reducedMotion) return;
    const t = (state.clock.elapsedTime * 0.22 + from[0] * 0.05) % 1;
    bead.current.position.copy(curve.getPoint(t));
  });

  return (
    <>
      <Line points={points} color="#C89B24" lineWidth={1} transparent opacity={0.36} />
      <mesh ref={bead}>
        <sphereGeometry args={[0.025, 10, 10]} />
        <meshBasicMaterial color="#F8FAFC" />
      </mesh>
    </>
  );
}

function DepthGrid() {
  return (
    <group position={[0, -1.7, -0.72]} rotation={[Math.PI / 2, 0, 0]}>
      <gridHelper args={[4.8, 18, "#C89B24", "#D6E0EF"]} />
    </group>
  );
}

function DeterministicParticles({ active, reducedMotion }: { active: boolean; reducedMotion: boolean }) {
  const group = useRef<THREE.Group>(null);
  const particles = useMemo(
    () =>
      Array.from({ length: 52 }, (_, index) => ({
        position: [
          Math.sin(index * 2.17) * 2.55,
          Math.cos(index * 1.41) * 1.55,
          -0.5 + Math.sin(index * 0.77) * 0.7,
        ] as [number, number, number],
        scale: 0.008 + (index % 5) * 0.003,
        gold: index % 6 === 0,
      })),
    [],
  );

  useFrame((state) => {
    if (!group.current || !active || reducedMotion) return;
    group.current.rotation.y = state.clock.elapsedTime * 0.025;
  });

  return (
    <group ref={group}>
      {particles.map((particle, index) => (
        <mesh key={index} position={particle.position}>
          <sphereGeometry args={[particle.scale, 8, 8]} />
          <meshBasicMaterial color={particle.gold ? "#C89B24" : "#164A8A"} transparent opacity={particle.gold ? 0.58 : 0.32} />
        </mesh>
      ))}
    </group>
  );
}

export default function AustraliaMap({ active, reducedMotion, cursor }: AustraliaMapProps) {
  const group = useRef<THREE.Group>(null);
  const ring = useRef<THREE.Mesh>(null);
  const australiaGeometry = useMemo(
    () =>
      new THREE.ExtrudeGeometry(makeAustraliaShape(), {
        depth: 0.16,
        bevelEnabled: true,
        bevelSegments: 3,
        bevelThickness: 0.025,
        bevelSize: 0.025,
      }),
    [],
  );
  const tasmaniaGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0.44, -1.42);
    shape.lineTo(0.62, -1.32);
    shape.lineTo(0.76, -1.46);
    shape.lineTo(0.6, -1.6);
    shape.lineTo(0.42, -1.54);
    shape.closePath();
    return new THREE.ExtrudeGeometry(shape, { depth: 0.12, bevelEnabled: true, bevelSegments: 2, bevelThickness: 0.018, bevelSize: 0.018 });
  }, []);

  useFrame((state, delta) => {
    if (!group.current) return;
    const targetX = -0.18 + cursor.y * -0.13;
    const targetY = 0.22 + cursor.x * 0.18;
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetX, 0.04);
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetY + (active && !reducedMotion ? Math.sin(state.clock.elapsedTime * 0.25) * 0.04 : 0), 0.04);
    if (active && !reducedMotion) {
      group.current.position.y = Math.sin(state.clock.elapsedTime * 0.75) * 0.06;
      group.current.rotation.z += delta * 0.025;
    }
    if (ring.current && active && !reducedMotion) ring.current.rotation.z += delta * 0.1;
  });

  return (
    <group>
      <DepthGrid />
      <DeterministicParticles active={active} reducedMotion={reducedMotion} />
      <mesh ref={ring} position={[0, 0, -0.2]} rotation={[0, 0, 0.2]}>
        <torusGeometry args={[1.95, 0.008, 8, 160]} />
        <meshBasicMaterial color="#C89B24" transparent opacity={0.34} />
      </mesh>
      <mesh position={[0, 0, -0.26]} rotation={[0.12, 0.3, 0.1]}>
        <torusGeometry args={[2.18, 0.006, 8, 160]} />
        <meshBasicMaterial color="#164A8A" transparent opacity={0.22} />
      </mesh>
      <group ref={group} scale={1.05}>
        <mesh geometry={australiaGeometry}>
          <meshPhysicalMaterial
            color="#081F4D"
            roughness={0.18}
            metalness={0.18}
            transmission={0.18}
            thickness={0.45}
            transparent
            opacity={0.78}
            emissive="#164A8A"
            emissiveIntensity={0.12}
          />
        </mesh>
        <lineSegments>
          <edgesGeometry args={[australiaGeometry]} />
          <lineBasicMaterial color="#C89B24" transparent opacity={0.7} />
        </lineSegments>
        <mesh geometry={tasmaniaGeometry}>
          <meshPhysicalMaterial color="#081F4D" roughness={0.2} metalness={0.18} transparent opacity={0.76} emissive="#164A8A" emissiveIntensity={0.1} />
        </mesh>
        <lineSegments>
          <edgesGeometry args={[tasmaniaGeometry]} />
          <lineBasicMaterial color="#C89B24" transparent opacity={0.65} />
        </lineSegments>
        {cityMarkers.map((city) => (
          <CityMarker key={city.name} {...city} active={active} reducedMotion={reducedMotion} />
        ))}
        <AnimatedTrail from={cityMarkers[4].position} to={cityMarkers[3].position} active={active} reducedMotion={reducedMotion} />
        <AnimatedTrail from={cityMarkers[3].position} to={cityMarkers[1].position} active={active} reducedMotion={reducedMotion} />
        <AnimatedTrail from={cityMarkers[1].position} to={cityMarkers[0].position} active={active} reducedMotion={reducedMotion} />
        <AnimatedTrail from={cityMarkers[0].position} to={cityMarkers[2].position} active={active} reducedMotion={reducedMotion} />
        <AnimatedTrail from={cityMarkers[5].position} to={cityMarkers[2].position} active={active} reducedMotion={reducedMotion} />
      </group>
    </group>
  );
}
