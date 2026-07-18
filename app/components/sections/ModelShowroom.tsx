"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "motion/react";
import { 
  Play, 
  Pause, 
  Sparkles, 
  Compass, 
  Image as ImageIcon, 
  RotateCw, 
  Eye, 
  Check, 
  Settings 
} from "lucide-react";

// Dynamically import the ModelViewer component to bypass Next.js SSR issues
const ModelViewer = dynamic(() => import("../ModelViewer"), { ssr: false });

interface ModelOption {
  id: string;
  name: string;
  url: string;
  description: string;
  icon: string;
}

const MODELS: ModelOption[] = [
  {
    id: "helmet",
    name: "Sci-Fi Helmet",
    url: "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/main/2.0/DamagedHelmet/glTF-Binary/DamagedHelmet.glb",
    description: "Highly detailed metallic damaged space helmet with advanced reflection mappings.",
    icon: "🪖"
  },
  {
    id: "toycar",
    name: "Premium Toy Car",
    url: "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/main/2.0/ToyCar/glTF-Binary/ToyCar.glb",
    description: "Classic red toy sports car showcasing glossy paint and tire textures.",
    icon: "🏎️"
  },
  {
    id: "duck",
    name: "Classic Rubber Duck",
    url: "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/main/2.0/Duck/glTF-Binary/Duck.glb",
    description: "Simple low-poly yellow rubber duck model, perfect for general performance tests.",
    icon: "🦆"
  },
  {
    id: "avocado",
    name: "Fresh Avocado",
    url: "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/main/2.0/Avocado/glTF-Binary/Avocado.glb",
    description: "Organic textured avocado model showing realistic seed and skin patterns.",
    icon: "🥑"
  }
];

const ENVIRONMENT_PRESETS = [
  { id: "city", name: "City Lights" },
  { id: "forest", name: "Deep Forest" },
  { id: "sunset", name: "Golden Sunset" },
  { id: "studio", name: "Photo Studio" },
  { id: "none", name: "No Environment" }
];

export default function ModelShowroom() {
  const [selectedModel, setSelectedModel] = useState<ModelOption>(MODELS[0]);
  const [envPreset, setEnvPreset] = useState<string>("city");
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [rotateSpeed, setRotateSpeed] = useState<number>(0.5);
  const [parallax, setParallax] = useState<boolean>(true);
  const [fadeIn, setFadeIn] = useState<boolean>(true);
  const [showScreenshot, setShowScreenshot] = useState<boolean>(true);

  return (
    <section id="showroom" className="w-full py-24 bg-transparent overflow-hidden transition-colors duration-500">
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center mb-16 text-center"
        >
          <h4 className="text-[#d4af37] font-bold tracking-widest text-sm uppercase mb-3 flex items-center gap-2">
            <Sparkles size={16} className="text-[#d4af37] animate-pulse" />
            Cutting Edge Tech
          </h4>
          <h2 className="text-3xl lg:text-5xl font-bold text-[#1a2b49] dark:text-white mb-4 tracking-tight">
            Interactive 3D Showroom
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl text-lg mb-6 leading-relaxed">
            Experience our premium digital asset rendering pipeline. Select a model, change environmental lighting settings, and rotate or zoom using mouse controls.
          </p>
          <div className="flex items-center justify-center w-full max-w-[240px]">
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent to-[#d4af37]"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#d4af37] mx-3 flex-shrink-0 animate-ping"></div>
            <div className="h-[1px] w-full bg-gradient-to-l from-transparent to-[#d4af37]"></div>
          </div>
        </motion.div>

        {/* Workspace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Controls - Left 5 Columns */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            {/* Model Selection */}
            <div className="bg-white dark:bg-[#0a1120] p-6 rounded-2xl border border-gray-100 dark:border-white/5 shadow-xl flex flex-col gap-4">
              <h3 className="text-lg font-bold text-[#1a2b49] dark:text-white flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-[#d4af37]/10 text-[#d4af37]">📦</span>
                1. Select 3D Asset
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {MODELS.map((model) => {
                  const isSelected = selectedModel.id === model.id;
                  return (
                    <button
                      key={model.id}
                      onClick={() => setSelectedModel(model)}
                      className={`flex flex-col text-left p-4 rounded-xl border transition-all duration-300 relative overflow-hidden group cursor-pointer ${
                        isSelected
                          ? "border-[#d4af37] bg-[#d4af37]/5 dark:bg-[#d4af37]/10 shadow-md"
                          : "border-gray-100 dark:border-white/5 bg-[#fafafa] dark:bg-[#080d1a] hover:border-gray-300 dark:hover:border-white/20"
                      }`}
                    >
                      <div className="text-2xl mb-1.5">{model.icon}</div>
                      <span className="font-bold text-[#1a2b49] dark:text-white text-sm">
                        {model.name}
                      </span>
                      <span className="text-[10px] text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">
                        {model.description}
                      </span>
                      {isSelected && (
                        <div className="absolute top-2 right-2 w-4 h-4 bg-[#d4af37] rounded-full flex items-center justify-center text-white">
                          <Check size={10} strokeWidth={3} />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Configurator Controls */}
            <div className="bg-white dark:bg-[#0a1120] p-6 rounded-2xl border border-gray-100 dark:border-white/5 shadow-xl flex flex-col gap-6">
              <h3 className="text-lg font-bold text-[#1a2b49] dark:text-white flex items-center gap-2">
                <Settings size={18} className="text-[#d4af37]" />
                2. Render Parameters
              </h3>

              {/* Environment Presets */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                  <ImageIcon size={12} />
                  Environment Map / Lighting
                </label>
                <div className="flex flex-wrap gap-2">
                  {ENVIRONMENT_PRESETS.map((preset) => {
                    const isSelected = envPreset === preset.id;
                    return (
                      <button
                        key={preset.id}
                        onClick={() => setEnvPreset(preset.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                          isSelected
                            ? "bg-[#1a2b49] dark:bg-[#d4af37] text-white dark:text-[#0a1120] border-[#1a2b49] dark:border-[#d4af37]"
                            : "bg-transparent text-gray-600 dark:text-gray-300 border-gray-200 dark:border-white/10 hover:border-gray-400 dark:hover:border-white/30"
                        }`}
                      >
                        {preset.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Auto Rotate Speed Slider */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1.5">
                    <RotateCw size={12} className={autoRotate ? "animate-spin" : ""} style={{ animationDuration: `${3 - rotateSpeed * 2}s` }} />
                    Rotation Speed
                  </span>
                  <span className="text-[#d4af37] font-mono">{rotateSpeed.toFixed(2)}x</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="1.5"
                  step="0.05"
                  value={rotateSpeed}
                  disabled={!autoRotate}
                  onChange={(e) => setRotateSpeed(parseFloat(e.target.value))}
                  className="w-full h-1 bg-gray-200 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#d4af37] disabled:opacity-30 disabled:cursor-not-allowed"
                />
              </div>

              {/* Toggles */}
              <div className="grid grid-cols-2 gap-4 border-t border-gray-100 dark:border-white/5 pt-4">
                
                {/* Auto Rotate Toggle */}
                <button
                  onClick={() => setAutoRotate(!autoRotate)}
                  className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                    autoRotate 
                      ? "border-[#d4af37]/30 bg-[#d4af37]/5 dark:bg-[#d4af37]/10" 
                      : "border-gray-100 dark:border-white/5 bg-[#fafafa] dark:bg-[#080d1a]"
                  }`}
                >
                  <span className="text-xs font-bold text-[#1a2b49] dark:text-gray-200 flex items-center gap-1.5">
                    {autoRotate ? <Play size={12} className="text-[#d4af37]" /> : <Pause size={12} className="text-gray-400" />}
                    Auto Rotate
                  </span>
                  <div className={`w-8 h-4 rounded-full p-0.5 transition-colors duration-300 ${autoRotate ? "bg-[#d4af37]" : "bg-gray-300 dark:bg-gray-700"}`}>
                    <div className={`w-3 h-3 rounded-full bg-white transition-transform duration-300 ${autoRotate ? "translate-x-4" : "translate-x-0"}`} />
                  </div>
                </button>

                {/* Mouse Parallax Toggle */}
                <button
                  onClick={() => setParallax(!parallax)}
                  className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                    parallax 
                      ? "border-[#d4af37]/30 bg-[#d4af37]/5 dark:bg-[#d4af37]/10" 
                      : "border-gray-100 dark:border-white/5 bg-[#fafafa] dark:bg-[#080d1a]"
                  }`}
                >
                  <span className="text-xs font-bold text-[#1a2b49] dark:text-gray-200 flex items-center gap-1.5">
                    <Compass size={12} className={parallax ? "text-[#d4af37]" : "text-gray-400"} />
                    Parallax Effect
                  </span>
                  <div className={`w-8 h-4 rounded-full p-0.5 transition-colors duration-300 ${parallax ? "bg-[#d4af37]" : "bg-gray-300 dark:bg-gray-700"}`}>
                    <div className={`w-3 h-3 rounded-full bg-white transition-transform duration-300 ${parallax ? "translate-x-4" : "translate-x-0"}`} />
                  </div>
                </button>

                {/* Fade-in loaded Toggle */}
                <button
                  onClick={() => setFadeIn(!fadeIn)}
                  className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                    fadeIn 
                      ? "border-[#d4af37]/30 bg-[#d4af37]/5 dark:bg-[#d4af37]/10" 
                      : "border-gray-100 dark:border-white/5 bg-[#fafafa] dark:bg-[#080d1a]"
                  }`}
                >
                  <span className="text-xs font-bold text-[#1a2b49] dark:text-gray-200 flex items-center gap-1.5">
                    <Eye size={12} className={fadeIn ? "text-[#d4af37]" : "text-gray-400"} />
                    Fade In Loading
                  </span>
                  <div className={`w-8 h-4 rounded-full p-0.5 transition-colors duration-300 ${fadeIn ? "bg-[#d4af37]" : "bg-gray-300 dark:bg-gray-700"}`}>
                    <div className={`w-3 h-3 rounded-full bg-white transition-transform duration-300 ${fadeIn ? "translate-x-4" : "translate-x-0"}`} />
                  </div>
                </button>

                {/* Screenshot Button Toggle */}
                <button
                  onClick={() => setShowScreenshot(!showScreenshot)}
                  className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                    showScreenshot 
                      ? "border-[#d4af37]/30 bg-[#d4af37]/5 dark:bg-[#d4af37]/10" 
                      : "border-gray-100 dark:border-white/5 bg-[#fafafa] dark:bg-[#080d1a]"
                  }`}
                >
                  <span className="text-xs font-bold text-[#1a2b49] dark:text-gray-200 flex items-center gap-1.5">
                    <ImageIcon size={12} className={showScreenshot ? "text-[#d4af37]" : "text-gray-400"} />
                    Screenshot Overlay
                  </span>
                  <div className={`w-8 h-4 rounded-full p-0.5 transition-colors duration-300 ${showScreenshot ? "bg-[#d4af37]" : "bg-gray-300 dark:bg-gray-700"}`}>
                    <div className={`w-3 h-3 rounded-full bg-white transition-transform duration-300 ${showScreenshot ? "translate-x-4" : "translate-x-0"}`} />
                  </div>
                </button>

              </div>
            </div>
          </motion.div>

          {/* Interactive Model Display - Right 7 Columns */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 flex flex-col items-center justify-center relative min-h-[500px] lg:min-h-[600px]"
          >
            {/* Visual background glows */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08)_0%,transparent_65%)] pointer-events-none" />
            <div className="absolute w-[350px] h-[350px] bg-gradient-to-tr from-[#0a5cff]/5 to-[#2ec5ff]/5 dark:from-[#d4af37]/5 dark:to-transparent blur-[80px] rounded-full pointer-events-none" />

            {/* Glowing borders outer layer */}
            <div className="w-full h-full p-4 rounded-3xl bg-white/40 dark:bg-[#0a1120]/40 backdrop-blur-md border border-gray-100 dark:border-white/5 shadow-2xl relative flex items-center justify-center group hover:border-[#d4af37]/20 transition-colors duration-500 overflow-hidden">
              
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-gray-300 dark:border-white/10 group-hover:border-[#d4af37] transition-colors duration-500 rounded-tl-xl pointer-events-none" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-gray-300 dark:border-white/10 group-hover:border-[#d4af37] transition-colors duration-500 rounded-tr-xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-gray-300 dark:border-white/10 group-hover:border-[#d4af37] transition-colors duration-500 rounded-bl-xl pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-gray-300 dark:border-white/10 group-hover:border-[#d4af37] transition-colors duration-500 rounded-br-xl pointer-events-none" />

              {/* Canvas box */}
              <div className="w-full h-[450px] lg:h-[550px] relative rounded-2xl overflow-hidden bg-gradient-to-b from-[#fafafa] to-white dark:from-[#070b14] dark:to-[#0a1120] border border-gray-100/50 dark:border-white/5">
                <ModelViewer
                  url={selectedModel.url}
                  width={"100%" as any}
                  height={"100%" as any}
                  autoRotate={autoRotate}
                  autoRotateSpeed={rotateSpeed}
                  environmentPreset={envPreset}
                  enableMouseParallax={parallax}
                  fadeIn={fadeIn}
                  autoFrame={true}
                  showScreenshotButton={showScreenshot}
                  ambientIntensity={0.4}
                  keyLightIntensity={1.2}
                  fillLightIntensity={0.6}
                  rimLightIntensity={1.0}
                />
              </div>
            </div>

            {/* Instruction tooltip below the showroom */}
            <div className="mt-4 text-center">
              <span className="text-xs text-gray-500 dark:text-gray-400 inline-flex items-center gap-1.5">
                <span>🖱️ Drag to rotate</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
                <span>⚙️ Pinch/Scroll to zoom</span>
              </span>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}
