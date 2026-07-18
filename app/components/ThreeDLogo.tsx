"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function ThreeDLogo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    // Create scene
    const scene = new THREE.Scene();

    // Create camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 5.5;

    // Create renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    setIsLoaded(true);

    // Group to hold the entire logo (G shape + gold diamond)
    const logoGroup = new THREE.Group();

    // 1. Create the Extruded G Shape
    const gShape = new THREE.Shape();
    gShape.moveTo(-0.8, 1.0);
    gShape.lineTo(0.8, 1.0);
    gShape.lineTo(0.8, 0.4);
    gShape.lineTo(-0.2, 0.4);
    gShape.lineTo(-0.2, -0.4);
    gShape.lineTo(0.4, -0.4);
    gShape.lineTo(0.4, 0.0);
    gShape.lineTo(0.0, 0.0);
    gShape.lineTo(0.0, -0.15);
    gShape.lineTo(0.8, -0.15);
    gShape.lineTo(0.8, -1.0);
    gShape.lineTo(-0.8, -1.0);
    gShape.closePath();

    const gExtrudeSettings = {
      depth: 0.35,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: 0.04,
      bevelThickness: 0.04,
    };

    const gGeometry = new THREE.ExtrudeGeometry(gShape, gExtrudeSettings);
    gGeometry.center();

    const gMaterial = new THREE.MeshStandardMaterial({
      color: 0x1b4178, // Medium Navy/Blue
      metalness: 0.85,
      roughness: 0.15,
      flatShading: true,
    });

    const gMesh = new THREE.Mesh(gGeometry, gMaterial);
    logoGroup.add(gMesh);

    // 2. Create the Floating Gold Diamond Shape above G
    const diamondShape = new THREE.Shape();
    // Diamond center is shifted right-up, floating above G
    diamondShape.moveTo(0.35, 0.95);
    diamondShape.lineTo(0.55, 1.2);
    diamondShape.lineTo(0.35, 1.45);
    diamondShape.lineTo(0.15, 1.2);
    diamondShape.closePath();

    const diamondExtrudeSettings = {
      depth: 0.25,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: 0.02,
      bevelThickness: 0.02,
    };

    const diamondGeometry = new THREE.ExtrudeGeometry(diamondShape, diamondExtrudeSettings);
    // Don't center diamond, so it stays offset relative to G
    const diamondMaterial = new THREE.MeshStandardMaterial({
      color: 0xc9a227, // Gold
      metalness: 0.9,
      roughness: 0.1,
      flatShading: true,
    });

    const diamondMesh = new THREE.Mesh(diamondGeometry, diamondMaterial);
    // Place diamond slightly forward on Z so it pops
    diamondMesh.position.z = 0.05;
    logoGroup.add(diamondMesh);

    // Add wireframe support group for high-tech aesthetic
    const wireframeGroup = new THREE.Group();
    
    const gWireframeGeom = new THREE.WireframeGeometry(gGeometry);
    const wireMaterial = new THREE.LineBasicMaterial({
      color: 0xc9a227,
      transparent: true,
      opacity: 0.2,
    });
    const gWire = new THREE.LineSegments(gWireframeGeom, wireMaterial);
    wireframeGroup.add(gWire);

    const dWireframeGeom = new THREE.WireframeGeometry(diamondGeometry);
    const dWire = new THREE.LineSegments(dWireframeGeom, wireMaterial);
    dWire.position.z = 0.05;
    wireframeGroup.add(dWire);

    logoGroup.add(wireframeGroup);

    // Add full group to scene
    scene.add(logoGroup);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    // Primary gold light reflecting off the logo
    const goldLight = new THREE.PointLight(0xc9a227, 12, 15);
    goldLight.position.set(3, 3, 3);
    scene.add(goldLight);

    // Secondary blue fill light
    const blueLight = new THREE.PointLight(0x2e5fa3, 10, 15);
    blueLight.position.set(-3, -3, 2);
    scene.add(blueLight);

    // Directional light for crisp shadows & reflection highlights
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight.position.set(0, 5, 2);
    scene.add(dirLight);

    // Handle mouse movement (tilt effect)
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left - width / 2;
      const y = event.clientY - rect.top - height / 2;
      targetX = (x / (width / 2)) * 0.8;
      targetY = (y / (height / 2)) * 0.8;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Animation loop
    const clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Smooth interpolation for mouse movements
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      // Base auto rotation + mouse interaction
      logoGroup.rotation.y = elapsedTime * 0.15 + mouseX * 0.5;
      logoGroup.rotation.x = elapsedTime * 0.1 + mouseY * 0.5;

      // Floating micro-animation
      logoGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.12;

      // Pulse lighting intensity slightly
      goldLight.intensity = 12 + Math.sin(elapsedTime * 2) * 2;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      gGeometry.dispose();
      diamondGeometry.dispose();
      gWireframeGeom.dispose();
      dWireframeGeom.dispose();
      gMaterial.dispose();
      diamondMaterial.dispose();
      wireMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[320px] md:h-[450px] flex items-center justify-center">
      {/* Background radial highlight */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(46,95,163,0.3)_0%,transparent_60%)] pointer-events-none" />
      
      {/* Three.js Container */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
      
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-[#C9A227] border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}
