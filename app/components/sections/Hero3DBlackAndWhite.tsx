"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { motion } from "motion/react";
import { 
  Sparkles, 
  ArrowRight, 
  Layers, 
  Globe, 
  Activity,
  ChevronDown
} from "lucide-react";
import * as THREE from "three";

type ShapeType = "network" | "sphere" | "helix";

interface ParticleData {
  baseX: number;
  baseY: number;
  baseZ: number;
  x: number;
  y: number;
  z: number;
  targetX: number;
  targetY: number;
  targetZ: number;
  offsetX: number;
  offsetY: number;
  offsetZ: number;
  speed: number;
  angle: number;
  radius: number;
}

export default function Hero3DBlackAndWhite() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();
  const [activeShape, setActiveShape] = useState<ShapeType>("network");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    
    let width = container.clientWidth;
    let height = container.clientHeight;

    // 1. Create Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.z = 4;

    // 2. Create WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 3. Define Colors based on theme
    const isDark = resolvedTheme === "dark";
    const particleColor = isDark ? 0xffffff : 0x000000;
    const lineColor = isDark ? 0xffffff : 0x000000;

    // 4. Initialize Particle Buffers
    const PARTICLE_COUNT = 600;
    const particlesData: ParticleData[] = [];

    // Helper math formulas for shapes
    const getNetworkCoords = (i: number, count: number) => {
      // Grid distribution (20 x 30 plane)
      const cols = 30;
      const r = Math.floor(i / cols);
      const c = i % cols;
      const x = ((c / cols) - 0.5) * 5.5;
      const z = ((r / (count / cols)) - 0.5) * 3.5;
      const y = 0; // Will be animated with wave noise
      return { x, y, z };
    };

    const getSphereCoords = (i: number, count: number) => {
      // Fibonacci spiral on sphere
      const theta = Math.acos(-1 + (2 * i) / count);
      const phi = Math.sqrt(count * Math.PI) * theta;
      const radius = 1.35;
      const x = radius * Math.cos(phi) * Math.sin(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(theta);
      return { x, y, z };
    };

    const getHelixCoords = (i: number, count: number) => {
      // Intertwined double helix along Y axis
      const isHelixB = i >= count / 2;
      const index = isHelixB ? i - count / 2 : i;
      const t = (index / (count / 2));
      const angle = t * Math.PI * 10; // 5 full twists
      const radius = 0.75;
      
      const x = Math.sin(angle + (isHelixB ? Math.PI : 0)) * radius;
      const z = Math.cos(angle + (isHelixB ? Math.PI : 0)) * radius;
      const y = (t - 0.5) * 3.2;
      
      return { x, y, z };
    };

    // Instantiate particles with initial shape (Network)
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const netCoords = getNetworkCoords(i, PARTICLE_COUNT);
      particlesData.push({
        baseX: netCoords.x,
        baseY: netCoords.y,
        baseZ: netCoords.z,
        x: netCoords.x,
        y: netCoords.y,
        z: netCoords.z,
        targetX: netCoords.x,
        targetY: netCoords.y,
        targetZ: netCoords.z,
        offsetX: 0,
        offsetY: 0,
        offsetZ: 0,
        speed: 0.1 + Math.random() * 0.1,
        angle: Math.random() * Math.PI * 2,
        radius: 0.5 + Math.random() * 1.5
      });
    }

    // 5. Create Three.js Objects (Points & Lines)
    // Dynamic Geometry for Points
    const pointsGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const sizes = new Float32Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3] = particlesData[i].x;
      positions[i * 3 + 1] = particlesData[i].y;
      positions[i * 3 + 2] = particlesData[i].z;
      sizes[i] = particlesData[i].radius * (isDark ? 1.8 : 2.5);
    }

    pointsGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    // Custom shader material for beautiful circular anti-aliased dots
    const pointsMaterial = new THREE.ShaderMaterial({
      uniforms: {
        color: { value: new THREE.Color(particleColor) }
      },
      vertexShader: `
        attribute float size;
        void main() {
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        void main() {
          vec2 center = gl_PointCoord - vec2(0.5);
          if (dot(center, center) > 0.25) {
            discard;
          }
          gl_FragColor = vec4(color, 1.0);
        }
      `,
      transparent: true,
      depthWrite: false
    });

    const pointsMesh = new THREE.Points(pointsGeometry, pointsMaterial);
    scene.add(pointsMesh);

    // Dynamic Connections (Plexus Line Segments)
    const MAX_LINE_CONNECTIONS = 400;
    const lineGeometry = new THREE.BufferGeometry();
    const linePositions = new Float32Array(MAX_LINE_CONNECTIONS * 2 * 3); // 2 points per line, 3 coords per point
    const lineColors = new Float32Array(MAX_LINE_CONNECTIONS * 2 * 3);
    
    lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    lineGeometry.setAttribute("color", new THREE.BufferAttribute(lineColors, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: isDark ? 0.55 : 0.35,
      blending: isDark ? THREE.AdditiveBlending : THREE.NormalBlending
    });

    const linesMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(linesMesh);

    // 6. Track Mouse Position & Interaction Physics
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0, active: false };
    const raycaster = new THREE.Raycaster();
    const mousePlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const mouse3D = new THREE.Vector3();

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / width) * 2 - 1;
      const y = -((event.clientY - rect.top) / height) * 2 + 1;
      
      mouse.targetX = x;
      mouse.targetY = y;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    // 7. Morphing triggers (set targets based on state)
    const updateTargets = (shape: ShapeType) => {
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        let coords;
        if (shape === "network") coords = getNetworkCoords(i, PARTICLE_COUNT);
        else if (shape === "sphere") coords = getSphereCoords(i, PARTICLE_COUNT);
        else coords = getHelixCoords(i, PARTICLE_COUNT);

        particlesData[i].baseX = coords.x;
        particlesData[i].baseY = coords.y;
        particlesData[i].baseZ = coords.z;
      }
    };

    // 8. Animation Render Loop
    const clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      const delta = Math.min(clock.getDelta(), 0.05);

      // Smooth mouse coordinates interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.1;
      mouse.y += (mouse.targetY - mouse.y) * 0.1;

      // Project mouse coordinates to 3D space
      if (mouse.active) {
        raycaster.setFromCamera(new THREE.Vector2(mouse.x, mouse.y), camera);
        raycaster.ray.intersectPlane(mousePlane, mouse3D);
      }

      // Base rotation for the entire group depending on scroll/time
      const scrollY = typeof window !== "undefined" ? window.scrollY : 0;
      const scrollFactor = scrollY * 0.001;
      
      pointsMesh.rotation.y = elapsedTime * 0.05 + scrollFactor * 0.5;
      pointsMesh.rotation.x = elapsedTime * 0.02 + scrollFactor * 0.2;
      linesMesh.rotation.y = pointsMesh.rotation.y;
      linesMesh.rotation.x = pointsMesh.rotation.x;

      const positionAttr = pointsGeometry.getAttribute("position") as THREE.BufferAttribute;

      // Dynamic variables for shape morphing speed
      const morphSpeed = 0.06; 

      // Line segments tracker
      let lineIndex = 0;
      const linePosArray = lineGeometry.getAttribute("position").array as Float32Array;
      const lineColorArray = lineGeometry.getAttribute("color").array as Float32Array;

      // Reset lines opacity
      lineGeometry.setDrawRange(0, 0);

      // Connect particles index mapping
      const isNetwork = activeShape === "network";
      const isSphere = activeShape === "sphere";
      const isHelix = activeShape === "helix";

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const p = particlesData[i];

        // 1. Calculate dynamic baseline animations (e.g. waves for network/helix)
        let waveY = 0;
        if (isNetwork) {
          // Floating wave effect
          waveY = Math.sin(p.baseX * 2 + elapsedTime * 1.5) * Math.cos(p.baseZ * 2 + elapsedTime * 1.2) * 0.3;
        } else if (isSphere) {
          // Subtle breathing pulse
          const pulse = 1.0 + Math.sin(elapsedTime * 2.5 + i * 0.05) * 0.06;
          p.targetX = p.baseX * pulse;
          p.targetY = p.baseY * pulse;
          p.targetZ = p.baseZ * pulse;
        } else if (isHelix) {
          // Waving spiral DNA string
          waveY = Math.sin(elapsedTime * 2.0 + p.baseY * 3.0) * 0.08;
          p.targetX = p.baseX + Math.sin(elapsedTime + p.baseY) * 0.05;
          p.targetY = p.baseY;
          p.targetZ = p.baseZ + Math.cos(elapsedTime + p.baseY) * 0.05;
        }

        if (isNetwork) {
          p.targetX = p.baseX;
          p.targetY = p.baseY + waveY;
          p.targetZ = p.baseZ;
        }

        // 2. Morph base coordinates towards active shape targets
        p.x += (p.targetX - p.x) * morphSpeed;
        p.y += (p.targetY - p.y) * morphSpeed;
        p.z += (p.targetZ - p.z) * morphSpeed;

        // 3. Mouse repulsion physics
        const actualPos = new THREE.Vector3(p.x, p.y, p.z);
        // Transform particle actual position to match group rotation in world coords
        actualPos.applyEuler(pointsMesh.rotation);

        let repulsionForceX = 0;
        let repulsionForceY = 0;
        let repulsionForceZ = 0;

        if (mouse.active) {
          const distToMouse = actualPos.distanceTo(mouse3D);
          const maxDist = 1.2;

          if (distToMouse < maxDist) {
            const dir = actualPos.clone().sub(mouse3D).normalize();
            // Force strength is proportional to how close it is
            const force = (maxDist - distToMouse) * 0.65;
            
            // Map the world force offset back into the local pointsMesh space
            const localForce = dir.clone().multiplyScalar(force);
            const invRotation = new THREE.Euler(
              -pointsMesh.rotation.x,
              -pointsMesh.rotation.y,
              -pointsMesh.rotation.z,
              "ZYX"
            );
            localForce.applyEuler(invRotation);
            
            repulsionForceX = localForce.x;
            repulsionForceY = localForce.y;
            repulsionForceZ = localForce.z;
          }
        }

        // Lerp offsets back to 0
        p.offsetX += (repulsionForceX - p.offsetX) * 0.12;
        p.offsetY += (repulsionForceY - p.offsetY) * 0.12;
        p.offsetZ += (repulsionForceZ - p.offsetZ) * 0.12;

        // Update Three.js buffer geometry positions
        positionAttr.setXYZ(i, p.x + p.offsetX, p.y + p.offsetY, p.z + p.offsetZ);
      }

      positionAttr.needsUpdate = true;

      // 4. Draw Plexus connections (checking sub-sample to optimize CPU load)
      const scanLimit = isNetwork ? 250 : 200; // Check fewer particles for connections
      const maxDistance = isNetwork ? 0.42 : isSphere ? 0.35 : 0.32;

      for (let i = 0; i < scanLimit; i++) {
        for (let j = i + 1; j < scanLimit; j++) {
          if (lineIndex >= MAX_LINE_CONNECTIONS) break;

          const p1X = positionAttr.getX(i);
          const p1Y = positionAttr.getY(i);
          const p1Z = positionAttr.getZ(i);

          const p2X = positionAttr.getX(j);
          const p2Y = positionAttr.getY(j);
          const p2Z = positionAttr.getZ(j);

          const dx = p1X - p2X;
          const dy = p1Y - p2Y;
          const dz = p1Z - p2Z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < maxDistance) {
            // Draw connection line segment
            const baseIdx = lineIndex * 6;
            
            linePosArray[baseIdx] = p1X;
            linePosArray[baseIdx + 1] = p1Y;
            linePosArray[baseIdx + 2] = p1Z;

            linePosArray[baseIdx + 3] = p2X;
            linePosArray[baseIdx + 4] = p2Y;
            linePosArray[baseIdx + 5] = p2Z;

            // Calculate line opacity based on distance
            const alpha = 1.0 - dist / maxDistance;
            
            // Set vertex colors
            const col = isDark ? 1.0 : 0.05;
            const rCol = isDark ? 0.79 : 0.79; // Custom gold hue highlight on hover
            const gCol = isDark ? 0.63 : 0.63;
            const bCol = isDark ? 0.15 : 0.15;
            
            const isPlexusInteractive = mouse.active && (particlesData[i].offsetX !== 0 || particlesData[j].offsetX !== 0);

            // Interpolate line colors: gold highlight near cursor, basic B&W color elsewhere
            const finalR = isPlexusInteractive ? rCol * alpha : col * alpha;
            const finalG = isPlexusInteractive ? gCol * alpha : col * alpha;
            const finalB = isPlexusInteractive ? bCol * alpha : col * alpha;

            lineColorArray[baseIdx] = finalR;
            lineColorArray[baseIdx + 1] = finalG;
            lineColorArray[baseIdx + 2] = finalB;

            lineColorArray[baseIdx + 3] = finalR;
            lineColorArray[baseIdx + 4] = finalG;
            lineColorArray[baseIdx + 5] = finalB;

            lineIndex++;
          }
        }
      }

      if (lineIndex > 0) {
        lineGeometry.getAttribute("position").needsUpdate = true;
        lineGeometry.getAttribute("color").needsUpdate = true;
        lineGeometry.setDrawRange(0, lineIndex * 2);
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    // Initial shape setup
    updateTargets(activeShape);
    animate();

    // 9. Resize Handler
    const handleResize = () => {
      width = container.clientWidth;
      height = container.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup listeners
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mouseleave", handleMouseLeave);
      pointsGeometry.dispose();
      lineGeometry.dispose();
      pointsMaterial.dispose();
      lineMaterial.dispose();
      renderer.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeShape, resolvedTheme]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[95vh] w-full flex items-center justify-center py-20 overflow-hidden bg-white dark:bg-[#0A1F44] transition-colors duration-500"
    >
      {/* 3D WebGL Canvas Layer */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none z-0" 
      />

      {/* Futuristic Grid Overlay Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />
      
      {/* Dynamic radial gradient for spotlighting content */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0.8)_80%)] dark:bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.2)_0%,rgba(0,0,0,0.9)_80%)] pointer-events-none z-0" />

      {/* Main Content Card Container */}
      <div className="container relative z-10 mx-auto px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
          
          {/* Glowing Badges & Tech Indicators */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex items-center gap-3 px-4 py-2 rounded-full border border-black/10 dark:border-white/10 bg-white/40 dark:bg-black/40 backdrop-blur-md mb-8"
          >
            <div className="w-2 h-2 rounded-full bg-black dark:bg-white animate-ping" />
            <span className="text-[10px] font-bold tracking-widest text-black dark:text-white uppercase">
              Structured Pathways // Global Outcomes
            </span>
          </motion.div>

          {/* Headline in Luxury Minimal Typography */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="flex flex-col items-center text-center mb-8 uppercase"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            <span className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.95] mb-4 block">
              <span className="text-[#0C2D57] dark:text-white">GE</span>
              <span className="text-[#2E5FA3]">MCA</span>
            </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-black via-gray-500 to-black dark:from-white dark:via-gray-400 dark:to-white text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-bold tracking-[0.22em] whitespace-nowrap block px-4">
              GORAYA EDUCATION & MIGRATION CONSULTANT AUSTRALIA
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-base md:text-lg font-medium text-gray-900 dark:text-gray-100 max-w-2xl leading-relaxed mb-12"
          >
            We provide strategic and compliant education and migration solutions that help individuals and families achieve their global aspirations with clarity and confidence.
          </motion.p>

          {/* Call To Actions */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center gap-4 mb-16"
          >
            <a 
              href="#book"
              className="group relative w-full sm:w-auto flex items-center justify-center gap-2 bg-[#2E5FA3] text-white border border-[#2E5FA3] px-8 py-4 rounded-xl text-sm font-bold shadow-2xl hover:bg-transparent hover:text-[#2E5FA3] dark:hover:text-[#2E5FA3] transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
            >
              <span>Book Consultation</span>
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a 
              href="#services"
              className="group w-full sm:w-auto flex items-center justify-center gap-2 bg-transparent border border-black/20 dark:border-white/20 text-black dark:text-white px-8 py-4 rounded-xl text-sm font-bold hover:border-black dark:hover:border-white transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
            >
              <span>Our Services</span>
            </a>
          </motion.div>

          {/* Particle Morphing Control Controls */}
          {mounted && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex items-center gap-2.5 p-2 rounded-2xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-black/60 backdrop-blur-md shadow-lg"
            >
              <button
                onClick={() => setActiveShape("network")}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeShape === "network"
                    ? "bg-[#2E5FA3] text-white shadow-md scale-[1.03]"
                    : "text-gray-600 dark:text-gray-400 hover:text-[#2E5FA3]"
                }`}
              >
                <Layers size={13} />
                Network Grid
              </button>
              
              <button
                onClick={() => setActiveShape("sphere")}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeShape === "sphere"
                    ? "bg-[#2E5FA3] text-white shadow-md scale-[1.03]"
                    : "text-gray-600 dark:text-gray-400 hover:text-[#2E5FA3]"
                }`}
              >
                <Globe size={13} />
                3D Sphere
              </button>

              <button
                onClick={() => setActiveShape("helix")}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeShape === "helix"
                    ? "bg-[#2E5FA3] text-white shadow-md scale-[1.03]"
                    : "text-gray-600 dark:text-gray-400 hover:text-[#2E5FA3]"
                }`}
              >
                <Activity size={13} />
                Helix Wave
              </button>
            </motion.div>
          )}

        </div>
      </div>

      {/* Down Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-50 dark:opacity-40 animate-bounce pointer-events-none">
        <span className="text-[9px] font-bold tracking-widest uppercase text-black dark:text-white">Scroll</span>
        <ChevronDown size={14} className="text-black dark:text-white" />
      </div>
    </section>
  );
}
