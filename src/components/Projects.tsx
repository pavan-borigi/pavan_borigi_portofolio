'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ShieldCheck, HelpCircle, AlertCircle, Volume2 } from 'lucide-react';
import BorderGlow from './BorderGlow';

const GithubIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

interface Project {
  id: string;
  title: string;
  tagline: string;
  github: string;
  tech: string[];
  features: string[];
  challenges: string;
  results: string;
}

const projectsList: Project[] = [
  {
    id: 'object-detection',
    title: 'Real-Time Object Detection',
    tagline: 'Custom YOLO pipeline optimized for edge deployments.',
    github: 'https://github.com/pavan-borigi',
    tech: ['Python', 'YOLOv8', 'OpenCV', 'PyTorch', 'REST APIs'],
    features: [
      'Multi-class object localization under 20ms latency',
      'Custom dataset training pipeline with automated data augmentation',
      'Containerized edge-ready inference REST API'
    ],
    challenges: 'Achieving consistent 30fps throughput on resource-constrained embedded CPU architectures without accuracy degradation.',
    results: 'Boosted processing throughput by 42% utilizing model quantization and PyTorch-to-TensorRT model optimization.'
  },
  {
    id: 'plant-disease',
    title: 'Plant Disease Diagnosis',
    tagline: 'Deep learning classification engine with thermal-guided heatmaps.',
    github: 'https://github.com/pavan-borigi',
    tech: ['PyTorch', 'Detectron2', 'FastAPI', 'Docker', 'YOLOv8'],
    features: [
      'Identifies 15+ agricultural plant leaf anomalies',
      'Generates diagnostic heatmaps utilizing Grad-CAM activations',
      'Offline-first support for remote field diagnostics'
    ],
    challenges: 'Classifying diseases correctly in varied field lightning conditions and complex background vegetation interference.',
    results: 'Attained a 94.6% validation accuracy score across independent cross-validation dataset segments.'
  },
  {
    id: 'deepfake',
    title: 'Deepfake Verification Core',
    tagline: 'Dual-stream neural face-spoofing and anomaly analyzer.',
    github: 'https://github.com/pavan-borigi',
    tech: ['TensorFlow', 'Keras', 'Hugging Face', 'Python', 'Git'],
    features: [
      'Analyzes micro-expression timelines and optical flow fields',
      'Dual-stream architecture checking spatial and frequency noise',
      'Generates cryptographic integrity verification tokens'
    ],
    challenges: 'Adapting to highly advanced generative adversarial network models (GANs) and diffusion-based facial face-swap algorithms.',
    results: 'Secured 91.2% detection precision scores on standard Deepfake Detection Challenge benchmark runs.'
  },
  {
    id: 'voice-assistant',
    title: 'Pandu Voice Assistant',
    tagline: 'Conversational LLM command terminal with speech capabilities.',
    github: 'https://github.com/pavan-borigi',
    tech: ['Python', 'NLP', 'Hugging Face', 'REST APIs', 'Docker'],
    features: [
      'Zero-latency wake word detection with lightweight DSP layers',
      'Local semantic parsing utilizing speech-to-intent model pipelines',
      'Real-time synthesis feedback voice generation'
    ],
    challenges: 'Minimizing voice response latencies when integrating remote large language models (LLMs) over spotty networks.',
    results: 'Constructed local sentence caching lowering end-to-end command fulfillment time to under 800ms.'
  }
];

export default function Projects() {
  const [activeProject, setActiveProject] = useState<string>('object-detection');
  
  return (
    <section id="projects" className="relative w-full py-24 bg-transparent overflow-hidden" data-cursor="project">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl w-full mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center space-x-2 mb-3"
          >
            <span className="w-3 h-3 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-mono text-primary tracking-widest uppercase font-semibold">PORTFOLIO</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-extrabold tracking-tight"
          >
            <span className="text-gradient">Featured ML Simulators</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 mt-4 max-w-xl text-sm leading-relaxed"
          >
            Select a project tab below to run interactive client-side neural simulators demonstrating model pipelines.
          </motion.p>
        </div>

        {/* Projects Tab Selectors */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {projectsList.map((project) => (
            <button
              suppressHydrationWarning
              key={project.id}
              onClick={() => setActiveProject(project.id)}
              className={`px-5 py-2.5 rounded-xl border transition-all duration-300 font-mono text-xs ${
                activeProject === project.id
                  ? 'bg-primary/15 border-primary text-primary shadow-[0_0_15px_rgba(255,85,0,0.2)]'
                  : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {project.title}
            </button>
          ))}
        </div>

        {/* Display Active Simulator alongside Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left: Simulator Showcase Component */}
          <BorderGlow className="lg:col-span-7 flex flex-col justify-between overflow-hidden min-h-[380px] p-6 relative" borderRadius={16}>
            <div className="absolute top-4 right-4 z-20 flex items-center space-x-1.5 bg-black/60 px-2.5 py-1 rounded border border-accent/25">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
              <span className="text-[10px] font-mono text-accent">SIMULATION LIVE</span>
            </div>

            <div className="flex-grow flex items-center justify-center min-h-[280px]">
              <AnimatePresence mode="wait">
                {activeProject === 'object-detection' && <ObjectDetectionSimulator />}
                {activeProject === 'plant-disease' && <PlantDiseaseSimulator />}
                {activeProject === 'deepfake' && <DeepfakeSimulator />}
                {activeProject === 'voice-assistant' && <VoiceAssistantSimulator />}
              </AnimatePresence>
            </div>

            <div className="border-t border-slate-800/60 pt-4 flex justify-between items-center text-[10px] font-mono text-slate-500">
              <span>DEVICE CPU/GPU: 60FPS</span>
              <span>ESTIMATED ACCURACY: ~92%</span>
            </div>
          </BorderGlow>

          {/* Right: Detailed text metrics */}
          <div className="lg:col-span-5 flex">
            {projectsList.map((project) => {
              if (project.id !== activeProject) return null;
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex w-full h-full"
                >
                  <BorderGlow className="flex flex-col justify-between w-full h-full p-8 shadow-xl" borderRadius={16}>
                    <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-bold text-white leading-tight">{project.title}</h3>
                      <p className="text-xs font-mono text-slate-400 mt-1">{project.tagline}</p>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map((t) => (
                        <span key={t} className="text-[10px] font-mono bg-slate-900 border border-slate-800 px-2.5 py-1 rounded text-slate-300">
                          {t}
                        </span>
                      ))}
                    </div>

                    <div>
                      <span className="text-[10px] font-mono text-primary uppercase tracking-widest block mb-2 font-bold">Key Architectural Features</span>
                      <ul className="space-y-1.5">
                        {project.features.map((f, idx) => (
                          <li key={idx} className="text-xs text-slate-350 flex items-start">
                            <span className="text-accent mr-2">✓</span>
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-slate-850 pt-4">
                      <div>
                        <span className="text-[10px] font-mono text-secondary uppercase tracking-widest block mb-1 font-bold">The Challenge</span>
                        <p className="text-[11px] text-slate-400 leading-normal">{project.challenges}</p>
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-accent uppercase tracking-widest block mb-1 font-bold">The Results</span>
                        <p className="text-[11px] text-slate-400 leading-normal">{project.results}</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-800 flex items-center justify-between">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-xs font-mono text-primary hover:text-white transition-colors"
                    >
                      <GithubIcon className="w-4 h-4" />
                      <span>Source Repository</span>
                    </a>
                    
                    <span className="text-xs text-slate-400 flex items-center space-x-1">
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span className="font-mono">demo.pipeline</span>
                    </span>
                    </div>
                  </BorderGlow>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}

/* ============================================================================
   REAL-TIME SIMULATORS CODE
   ============================================================================ */

// 1. OBJECT DETECTION SIMULATOR
function ObjectDetectionSimulator() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationId: number;
    
    // Simulate classes
    const classes = [
      { name: 'person', color: '#FF5500' },
      { name: 'safety_helmet', color: '#FFAA00' },
      { name: 'forklift', color: '#FF2200' }
    ];
    
    // Boxes tracker
    const boxes = [
      { id: 1, classIdx: 0, x: 40, y: 60, targetX: 200, targetY: 120, w: 80, h: 140, conf: 0.96 },
      { id: 2, classIdx: 1, x: 45, y: 25, targetX: 205, targetY: 85, w: 30, h: 30, conf: 0.94 },
      { id: 3, classIdx: 2, x: 280, y: 110, targetX: 180, targetY: 150, w: 140, h: 90, conf: 0.91 }
    ];

    const run = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw grid lines
      ctx.strokeStyle = 'rgba(123, 97, 255, 0.05)';
      ctx.lineWidth = 1;
      for (let i = 0; i < canvas.width; i += 30) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
      }
      for (let j = 0; j < canvas.height; j += 30) {
        ctx.beginPath();
        ctx.moveTo(0, j);
        ctx.lineTo(canvas.width, j);
        ctx.stroke();
      }

      // Draw background shapes simulating video objects
      ctx.fillStyle = 'rgba(255,255,255,0.02)';
      ctx.fillRect(80, 80, 100, 100);
      ctx.arc(320, 150, 40, 0, Math.PI * 2);
      ctx.fill();

      // Update and draw bounding boxes
      boxes.forEach(box => {
        // Linear interpolation towards target coords
        box.x += (box.targetX - box.x) * 0.02;
        box.y += (box.targetY - box.y) * 0.02;
        
        // Randomly update targets to simulate moving video objects
        if (Math.abs(box.x - box.targetX) < 5) {
          box.targetX = Math.random() * (canvas.width - box.w);
          box.targetY = Math.random() * (canvas.height - box.h);
        }

        const cls = classes[box.classIdx];
        
        // Draw bounding box
        ctx.strokeStyle = cls.color;
        ctx.lineWidth = 2;
        ctx.strokeRect(box.x, box.y, box.w, box.h);
        
        // Draw label tag background
        ctx.fillStyle = cls.color;
        ctx.fillRect(box.x, box.y - 18, box.w * 0.85, 18);
        
        // Draw label text
        ctx.fillStyle = '#080808';
        ctx.font = 'bold 10px monospace';
        ctx.fillText(`${cls.name} ${(box.conf * 100).toFixed(0)}%`, box.x + 4, box.y - 5);

        // Draw center dots
        ctx.fillStyle = cls.color;
        ctx.beginPath();
        ctx.arc(box.x + box.w/2, box.y + box.h/2, 3, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(run);
    };

    run();
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div className="w-full flex flex-col items-center">
      <span className="text-[10px] font-mono text-slate-400 mb-2">Simulated Camera Feed Input (480x280)</span>
      <canvas
        ref={canvasRef}
        width={480}
        height={280}
        className="w-full max-w-[480px] h-[280px] bg-slate-950/80 rounded-lg border border-secondary/20 shadow-inner"
      />
    </div>
  );
}

// 2. PLANT DISEASE DETECTOR SIMULATOR
function PlantDiseaseSimulator() {
  const [rotation, setRotation] = useState(0);
  const [heatmapVisible, setHeatmapVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setRotation((prev) => (prev + 1.2) % 360);
    }, 20);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* 3D leaf frame */}
      <div className="relative w-56 h-56 flex items-center justify-center bg-slate-950/60 rounded-full border border-secondary/20 p-4">
        {/* Pulsing thermal heatmaps layer */}
        <div 
          className={`absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,0,0,0.15)_0%,transparent_60%)] transition-opacity duration-500 ${heatmapVisible ? 'opacity-100' : 'opacity-0'}`} 
        />
        
        {/* Interactive SVG Leaf */}
        <div 
          style={{ transform: `rotate(${rotation}deg)` }}
          className="w-32 h-32 flex items-center justify-center transition-transform"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {/* Base leaf shape */}
            <path
              d="M50 15 C65 35 75 50 50 85 C25 50 35 35 50 15 Z"
              fill={heatmapVisible ? 'url(#leafGlowGrad)' : '#10b981'}
              stroke="#047857"
              strokeWidth="1.5"
            />
            {/* Center stem */}
            <path d="M50 15 L50 85" stroke="#065f46" strokeWidth="1" />
            
            {/* Leaf veins */}
            <path d="M50 35 L68 45 M50 35 L32 45" stroke="#065f46" strokeWidth="0.8" />
            <path d="M50 50 L72 62 M50 50 L28 62" stroke="#065f46" strokeWidth="0.8" />
            <path d="M50 65 L64 78 M50 65 L36 78" stroke="#065f46" strokeWidth="0.8" />

            {/* Simulated spotty disease anomalies (Red Circles) */}
            {heatmapVisible && (
              <>
                <circle cx="42" cy="40" r="3.5" fill="#ef4444" opacity="0.8" className="animate-pulse" />
                <circle cx="60" cy="52" r="2.5" fill="#ef4444" opacity="0.9" />
                <circle cx="48" cy="62" r="3" fill="#ef4444" opacity="0.85" />
              </>
            )}

            {/* Gradient definition */}
            <defs>
              <linearGradient id="leafGlowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="40%" stopColor="#eab308" />
                <stop offset="100%" stopColor="#ef4444" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Diagnostic Scanning rings */}
        <div className="absolute inset-2 border border-dashed border-primary/25 rounded-full animate-reverse-spin pointer-events-none" />
      </div>

      <div className="flex space-x-3">
        <button
          suppressHydrationWarning
          onClick={() => setHeatmapVisible(!heatmapVisible)}
          className="text-[10px] font-mono px-3 py-1.5 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
        >
          Toggle Grad-CAM Heatmap: {heatmapVisible ? 'ON' : 'OFF'}
        </button>
      </div>
    </div>
  );
}

// 3. DEEPFAKE DETECTOR SIMULATOR
function DeepfakeSimulator() {
  const [status, setStatus] = useState<'IDLE' | 'SCANNING' | 'COMPLETED'>('SCANNING');
  const [fakeConfidence, setFakeConfidence] = useState(0);

  useEffect(() => {
    if (status !== 'SCANNING') return;
    
    let currentConf = 0;
    const timer = setInterval(() => {
      currentConf += Math.floor(Math.random() * 8) + 4;
      if (currentConf >= 88) {
        currentConf = 88;
        clearInterval(timer);
        setStatus('COMPLETED');
      }
      setFakeConfidence(currentConf);
    }, 120);

    return () => clearInterval(timer);
  }, [status]);

  return (
    <div className="w-full max-w-sm flex flex-col items-center space-y-6">
      {/* Facemesh wireframe grid */}
      <div className="relative w-48 h-48 bg-slate-950/80 rounded-2xl border border-secondary/20 flex items-center justify-center overflow-hidden">
        {/* Holographic grid scan bar */}
        <motion.div
          animate={{ top: ['0%', '100%', '0%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          className="absolute left-0 right-0 h-0.5 bg-primary/80 shadow-[0_0_10px_#00F5FF] z-15"
        />

        {/* Mesh Vector SVG */}
        <svg viewBox="0 0 100 100" className="w-32 h-32 text-secondary opacity-60">
          {/* Head structure */}
          <path d="M25,30 Q50,5 75,30 T50,90 Z" fill="none" stroke="currentColor" strokeWidth="0.8" />
          {/* Eyes, Nose, Mouth grids */}
          <circle cx="40" cy="40" r="3" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="60" cy="40" r="3" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <line x1="50" y1="40" x2="50" y2="60" stroke="currentColor" strokeWidth="0.5" />
          <path d="M40,70 Q50,78 60,70" fill="none" stroke="currentColor" strokeWidth="0.5" />
          {/* Synapse connections */}
          <line x1="25" y1="30" x2="40" y2="40" stroke="currentColor" strokeWidth="0.3" />
          <line x1="75" y1="30" x2="60" y2="40" stroke="currentColor" strokeWidth="0.3" />
          <line x1="40" y1="40" x2="50" y2="60" stroke="currentColor" strokeWidth="0.3" />
          <line x1="60" y1="40" x2="50" y2="60" stroke="currentColor" strokeWidth="0.3" />
          <line x1="50" y1="60" x2="40" y2="70" stroke="currentColor" strokeWidth="0.3" />
          <line x1="50" y1="60" x2="60" y2="70" stroke="currentColor" strokeWidth="0.3" />
        </svg>

        <span className="absolute bottom-2 left-2 text-[8px] font-mono text-primary">LANDMARKS: 68 ACTIVE</span>
      </div>

      {/* Progress & confidence meter */}
      <div className="w-full space-y-3">
        <div className="flex justify-between items-center text-xs font-mono">
          <span className="text-slate-400">ANALYSIS STATUS:</span>
          <span className={status === 'COMPLETED' ? 'text-accent font-bold' : 'text-primary animate-pulse'}>
            {status}
          </span>
        </div>
        
        <div className="space-y-1.5">
          <div className="flex justify-between text-[11px] font-mono">
            <span className="text-slate-450">DEEPFAKE INFERENCE WEIGHT:</span>
            <span className="text-red-400 font-bold">{fakeConfidence}% Fake probability</span>
          </div>
          <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden p-0.5 border border-slate-800">
            <div 
              style={{ width: `${fakeConfidence}%` }}
              className="h-full bg-gradient-to-r from-secondary to-red-500 rounded-full transition-all duration-100"
            />
          </div>
        </div>

        {status === 'COMPLETED' && (
          <div className="flex items-center space-x-2 bg-red-950/20 border border-red-800/40 p-2.5 rounded-lg">
            <AlertCircle className="w-4 h-4 text-red-400" />
            <span className="text-[10px] font-mono text-red-300">ANOMALOUS FACE SWAP CLASSIFIED (GAN VERDICT: UNTRUSTWORTHY)</span>
          </div>
        )}
      </div>
    </div>
  );
}

// 4. VOICE ASSISTANT SIMULATOR
function VoiceAssistantSimulator() {
  const [commandIdx, setCommandIdx] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  
  const voiceCommands = [
    { speech: "Hey Pandu, boot my object detection pipeline.", response: "Booting YOLO API layers... Server active on port 8000." },
    { speech: "Show anomaly statistics from deepfake engine.", response: "Deepfake verification metrics: 91.2% precision detected." },
    { speech: "Analyze crop yield rust indices.", response: "Analyzing leaves. Crop health coefficient calculated: 84%." }
  ];

  useEffect(() => {
    if (!isRunning) return;
    
    const timer = setInterval(() => {
      setCommandIdx((prev) => (prev + 1) % voiceCommands.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [isRunning]);

  return (
    <div className="w-full max-w-md flex flex-col space-y-4">
      {/* Waveform graphic inside container */}
      <div className="h-24 bg-slate-950/60 rounded-xl border border-secondary/20 flex items-center justify-center overflow-hidden relative">
        {/* Concentric wave lines */}
        <div className="absolute inset-0 flex items-center justify-center space-x-1">
          {[...Array(18)].map((_, i) => {
            const delay = i * 0.08;
            return (
              <motion.div
                key={i}
                animate={{ height: [8, 48, 8] }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay,
                  ease: 'easeInOut'
                }}
                className="w-1 bg-gradient-to-t from-primary via-secondary to-accent rounded-full"
              />
            );
          })}
        </div>
        <div className="absolute top-2 left-2 flex items-center space-x-1 text-[8px] font-mono text-secondary">
          <Volume2 className="w-3 h-3 text-primary" />
          <span>WAVEFORM MONITOR</span>
        </div>
      </div>

      {/* Interactive dialogue log */}
      <div className="bg-black/60 border border-secondary/15 rounded-lg p-4 font-mono text-xs text-left">
        <div className="mb-2">
          <span className="text-primary font-bold">&gt; USER:</span>
          <p className="text-slate-300 mt-0.5">{voiceCommands[commandIdx].speech}</p>
        </div>
        
        <div>
          <span className="text-accent font-bold">&gt; PANDU ASSISTANT:</span>
          <p className="text-slate-400 mt-0.5">{voiceCommands[commandIdx].response}</p>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          suppressHydrationWarning
          onClick={() => setIsRunning(!isRunning)}
          className="text-[10px] font-mono px-3 py-1 bg-slate-900 border border-slate-800 text-slate-400 rounded hover:text-white"
        >
          {isRunning ? 'Pause Command Loop' : 'Resume Command Loop'}
        </button>
      </div>
    </div>
  );
}
