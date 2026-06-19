'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Brain, Cpu, Database, Award } from 'lucide-react';

interface Skill {
  name: string;
  orbit: number;
  category: string;
  proficiency: number;
  level: string;
  desc: string;
}

const skillsData: Skill[] = [
  // Orbit 1: AI/ML & Deep Learning (Radius: 100px)
  { name: 'Machine Learning', orbit: 1, category: 'AI/ML', proficiency: 92, level: 'Advanced', desc: 'Advanced predictive models, regression, classification, clustering, feature engineering, and algorithms.' },
  { name: 'Deep Learning', orbit: 1, category: 'AI/ML', proficiency: 88, level: 'Advanced', desc: 'Multi-layer neural network training, CNNs, RNNs, LSTMs, backpropagation, and optimization.' },
  { name: 'PyTorch', orbit: 1, category: 'Frameworks', proficiency: 90, level: 'Advanced', desc: 'Dynamic computation graphs, custom autograd, tensor operations, and PyTorch Lightning pipelines.' },
  { name: 'TensorFlow', orbit: 1, category: 'Frameworks', proficiency: 82, level: 'Advanced', desc: 'Building deep learning graphs, utilizing Keras APIs, and model saving/deployment workflows.' },
  { name: 'Python', orbit: 1, category: 'Languages', proficiency: 95, level: 'Expert', desc: 'Primary programming language for research, scripting, backend APIs, and data science.' },
  { name: 'NLP', orbit: 1, category: 'AI/ML', proficiency: 85, level: 'Intermediate', desc: 'Natural Language Processing, text tokenization, BERT, GPT fine-tuning, and semantic embeddings.' },
  { name: 'Computer Vision', orbit: 1, category: 'AI/ML', proficiency: 90, level: 'Advanced', desc: 'Image classification, semantic segmentation, feature extraction, and real-time processing.' },
  { name: 'Object Detection', orbit: 1, category: 'AI/ML', proficiency: 92, level: 'Advanced', desc: 'YOLOv8, bounding box coordinates prediction, and edge-deployed real-time tracking.' },

  // Orbit 2: Frameworks & Libraries (Radius: 190px)
  { name: 'Neural Networks', orbit: 2, category: 'AI/ML', proficiency: 87, level: 'Advanced', desc: 'Custom dense, recurrent, and transformer network architectures designed from scratch.' },
  { name: 'Transfer Learning', orbit: 2, category: 'AI/ML', proficiency: 86, level: 'Advanced', desc: 'Leveraging pre-trained models (ResNet, VGG, BERT) to solve specialized tasks with limited data.' },
  { name: 'Hyperparameter Tuning', orbit: 2, category: 'AI/ML', proficiency: 84, level: 'Intermediate', desc: 'Optimizing learning rates, batch sizes, and model parameters using Grid/Random Search.' },
  { name: 'Cross-Validation', orbit: 2, category: 'AI/ML', proficiency: 85, level: 'Intermediate', desc: 'Evaluating model generalizability and preventing overfitting using K-Fold validation methods.' },
  { name: 'Keras', orbit: 2, category: 'Frameworks', proficiency: 83, level: 'Advanced', desc: 'High-level neural network API for rapid prototyping, running on top of TensorFlow.' },
  { name: 'Scikit-learn', orbit: 2, category: 'Frameworks', proficiency: 90, level: 'Advanced', desc: 'Standard ML libraries, regression, decision trees, support vector machines, and preprocessing.' },
  { name: 'YOLOv8', orbit: 2, category: 'Frameworks', proficiency: 92, level: 'Advanced', desc: 'State-of-the-art real-time object detection, segmentation, and pose estimation framework.' },
  { name: 'OpenCV', orbit: 2, category: 'Frameworks', proficiency: 88, level: 'Advanced', desc: 'Open-source computer vision library for image manipulation, contours, and real-time video frames.' },
  { name: 'Hugging Face', orbit: 2, category: 'Frameworks', proficiency: 84, level: 'Intermediate', desc: 'Transformers library, datasets hub, pre-trained LLMs, pipeline APIs, and model cards.' },
  { name: 'Docker', orbit: 2, category: 'Tools', proficiency: 80, level: 'Intermediate', desc: 'Containerizing microservices and ML engines to ensure environment parity in deployments.' },
  { name: 'REST API', orbit: 2, category: 'Tools', proficiency: 86, level: 'Advanced', desc: 'Designing endpoints using REST architecture, serializing JSON, and handling requests.' },
  { name: 'Git', orbit: 2, category: 'Tools', proficiency: 90, level: 'Advanced', desc: 'Distributed version control system for tracking source code history and collaboration.' },
  { name: 'GitHub', orbit: 2, category: 'Tools', proficiency: 92, level: 'Advanced', desc: 'Hosting service for Git repositories, pull request code reviews, actions, and CI/CD pipelines.' },
  { name: 'Flask', orbit: 2, category: 'Frameworks', proficiency: 80, level: 'Intermediate', desc: 'Lightweight Python web framework for microservices, serving ML model inference REST endpoints.' },
  { name: 'Pandas', orbit: 2, category: 'Frameworks', proficiency: 92, level: 'Advanced', desc: 'Data manipulation, structured dataframes, cleansing, grouping, joining, and timeseries.' },
  { name: 'NumPy', orbit: 2, category: 'Frameworks', proficiency: 94, level: 'Expert', desc: 'High-performance multi-dimensional arrays, linear algebra, vector operations, and math routines.' },

  // Orbit 3: Languages & Tools (Radius: 280px)
  { name: 'Batch Normalization', orbit: 3, category: 'AI/ML', proficiency: 82, level: 'Advanced', desc: 'Stabilizing and accelerating neural network training by normalizing layer inputs.' },
  { name: 'Dropout Regularization', orbit: 3, category: 'AI/ML', proficiency: 85, level: 'Advanced', desc: 'Improving network robustness and generalization by randomly disabling nodes during training.' },
  { name: 'Model Evaluation', orbit: 3, category: 'AI/ML', proficiency: 88, level: 'Advanced', desc: 'Assessing classifiers and regressors using ROC-AUC, F1-Score, MSE, and precision-recall.' },
  { name: 'Supervised Learning', orbit: 3, category: 'AI/ML', proficiency: 94, level: 'Expert', desc: 'Training algorithms on labeled training datasets for classification and regression tasks.' },
  { name: 'Unsupervised Learning', orbit: 3, category: 'AI/ML', proficiency: 88, level: 'Advanced', desc: 'Clustering, dimensionality reduction, and pattern discovery without labeled target variables.' },
  { name: 'Inference Optimization', orbit: 3, category: 'AI/ML', proficiency: 87, level: 'Advanced', desc: 'Pruning, quantization, and compiling models to run at maximum FPS on edge devices.' },
  { name: 'Detectron2', orbit: 3, category: 'Frameworks', proficiency: 78, level: 'Intermediate', desc: "Meta AI's next-generation platform for object detection and semantic/instance segmentation." },
  { name: 'NLTK', orbit: 3, category: 'Frameworks', proficiency: 80, level: 'Intermediate', desc: 'Natural Language Toolkit for tokenization, stemming, lemmatization, tagging, and syntactic parsing.' },
  { name: 'Matplotlib', orbit: 3, category: 'Frameworks', proficiency: 88, level: 'Advanced', desc: 'Basic visualization plots, charts, graphs, figures, and data rendering output.' },
  { name: 'Seaborn', orbit: 3, category: 'Frameworks', proficiency: 86, level: 'Advanced', desc: 'Statistical data visualization built on Matplotlib, offering sleek themes and graphics.' },
  { name: 'Java', orbit: 3, category: 'Languages', proficiency: 75, level: 'Intermediate', desc: 'Robust object-oriented programming language used for enterprise scale applications.' },
  { name: 'C', orbit: 3, category: 'Languages', proficiency: 78, level: 'Intermediate', desc: 'Low-level system programming language optimized for hardware integration and performance.' },
  { name: 'Jupyter Notebook', orbit: 3, category: 'Tools', proficiency: 92, level: 'Advanced', desc: 'Interactive web application for prototyping code, documenting equations, and rendering plots.' },
  { name: 'Google Colab', orbit: 3, category: 'Tools', proficiency: 90, level: 'Advanced', desc: 'Cloud-based Jupyter notebooks offering free access to GPU and TPU compute instances.' },
  { name: 'SpeechRecognition', orbit: 3, category: 'Tools', proficiency: 82, level: 'Intermediate', desc: 'Library for performing speech-to-text processing, mapping audio waves to string literals.' },
  { name: 'pyttsx3', orbit: 3, category: 'Tools', proficiency: 80, level: 'Intermediate', desc: 'Offline text-to-speech conversion library for Python, configuring voice rate and gender details.' }
];

export default function Skills() {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [mounted, setMounted] = useState(false);
  const [angle, setAngle] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [scaleFactor, setScaleFactor] = useState(1);
  const [activeFilter, setActiveFilter] = useState<string>('All');

  useEffect(() => {
    setMounted(true);
  }, []);

  // Responsive Scaling for 3D constellations
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setScaleFactor(0.52);
      } else if (window.innerWidth < 1024) {
        setScaleFactor(0.8);
      } else {
        setScaleFactor(1);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Animation ticks for the rotation
  useEffect(() => {
    let animId: number;
    const tick = () => {
      const speed = isHovered ? 0.0015 : 0.006; // increased speeds for more energetic rotation
      setAngle((prev) => (prev + speed) % (Math.PI * 2));
      animId = requestAnimationFrame(tick);
    };
    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [isHovered]);

  // Group skills by orbit
  const orbit1Skills = useMemo(() => skillsData.filter(s => s.orbit === 1), []);
  const orbit2Skills = useMemo(() => skillsData.filter(s => s.orbit === 2), []);
  const orbit3Skills = useMemo(() => skillsData.filter(s => s.orbit === 3), []);

  // Pre-calculate fixed parameters for positioning
  const positionedSkills = useMemo(() => {
    return skillsData.map((skill, index) => {
      let groupLength = 1;
      let radius = 100;
      let dirMultiplier = 1;

      if (skill.orbit === 1) {
        groupLength = orbit1Skills.length;
        radius = 130;
        dirMultiplier = 1.0; // Innermost orbits rotate fastest (Kepler's Law)
      } else if (skill.orbit === 2) {
        groupLength = orbit2Skills.length;
        radius = 240;
        dirMultiplier = 0.55; // Middle orbits rotate at moderate speed
      } else {
        groupLength = orbit3Skills.length;
        radius = 350;
        dirMultiplier = 0.3; // Outermost orbits rotate slowest
      }

      const groupIndex = (skill.orbit === 1 ? orbit1Skills : skill.orbit === 2 ? orbit2Skills : orbit3Skills).findIndex(s => s.name === skill.name);
      const offsetAngle = (groupIndex * (360 / groupLength) * Math.PI) / 180;
      
      return {
        ...skill,
        index,
        groupIndex,
        groupLength,
        radius,
        dirMultiplier,
        offsetAngle
      };
    });
  }, [orbit1Skills, orbit2Skills, orbit3Skills]);

  // Compute frame coordinates dynamically
  const skillsWithCoords = positionedSkills.map((skill) => {
    const currentAngle = skill.offsetAngle + angle * skill.dirMultiplier;
    const x = skill.radius * Math.cos(currentAngle);
    const zVal = Math.sin(currentAngle);
    
    const floatOffset = Math.sin(angle * 5 + skill.index) * 6;
    const y = skill.radius * Math.sin(currentAngle) * 0.42 + floatOffset;
    
    const scale = 0.82 + (zVal + 1) * 0.12;
    const depthOpacity = 0.45 + (zVal + 1) * 0.28;
    const zIndex = Math.round((zVal + 1) * 20) + 10;
    
    const isDimmed = activeFilter !== 'All' && skill.category !== activeFilter;
    const finalOpacity = isDimmed ? 0.12 : depthOpacity;
    const isSelected = selectedSkill?.name === skill.name;

    return {
      ...skill,
      x: x * scaleFactor,
      y: y * scaleFactor,
      zVal,
      scale,
      opacity: finalOpacity,
      zIndex,
      isSelected,
      isDimmed
    };
  });

  return (
    <section id="skills" className="relative w-full py-24 bg-transparent overflow-hidden" data-cursor="skill">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-secondary/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl w-full mx-auto px-6 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center space-x-2 mb-3"
          >
            <span className="w-3 h-3 rounded-full bg-accent animate-pulse" />
            <span className="text-xs font-mono text-accent tracking-widest uppercase font-semibold">SKILL CONSTELLATION</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-extrabold tracking-tight"
          >
            <span className="text-gradient">3D Orbiting Skill System</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 mt-4 max-w-xl text-sm leading-relaxed"
          >
            Hover or select an environment node below to review technical competencies and architecture capabilities.
          </motion.p>
        </div>

        {/* Orbit System Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[500px]">

          {/* Left: Interactive 3D Orbit Constellation */}
          <div 
            className="lg:col-span-8 flex justify-center items-center relative h-[450px] sm:h-[550px] w-full overflow-visible"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Concentric Orbit Paths */}
            {mounted && (
              <>
                <div 
                  className="absolute rounded-full border border-dashed border-secondary/15 pointer-events-none transition-all duration-300" 
                  style={{ width: 260 * scaleFactor, height: 117 * scaleFactor }}
                />
                <div 
                  className="absolute rounded-full border border-dashed border-primary/15 pointer-events-none transition-all duration-300" 
                  style={{ width: 480 * scaleFactor, height: 216 * scaleFactor }}
                />
                <div 
                  className="absolute rounded-full border border-dashed border-accent/15 pointer-events-none transition-all duration-300" 
                  style={{ width: 700 * scaleFactor, height: 315 * scaleFactor }}
                />
              </>
            )}

            {/* Interlinking Constellation Lines SVG */}
            {mounted && (
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible">
                <g style={{ transform: 'translate(50%, 50%)' }}>
                  
                  {/* 1. Core connection lines for Orbit 1 nodes */}
                  {skillsWithCoords.map((skill) => {
                    if (skill.orbit !== 1 || skill.isDimmed) return null;
                    return (
                      <line
                        key={`line-core-${skill.name}`}
                        x1={0}
                        y1={0}
                        x2={skill.x}
                        y2={skill.y}
                        stroke={skill.isSelected ? 'rgba(255, 85, 0, 0.65)' : 'rgba(255, 85, 0, 0.12)'}
                        strokeWidth={skill.isSelected ? 2 : 0.8}
                        className="transition-all duration-300"
                      />
                    );
                  })}

                  {/* 2. Constellation adjacent linkages on each orbit */}
                  {skillsWithCoords.map((skill) => {
                    if (skill.isDimmed) return null;
                    const nextIndex = (skill.groupIndex + 1) % skill.groupLength;
                    const nextSkill = skillsWithCoords.find(s => s.orbit === skill.orbit && s.groupIndex === nextIndex);
                    if (!nextSkill || nextSkill.isDimmed) return null;
                    
                    const color = skill.orbit === 1 
                      ? 'rgba(255, 85, 0, 0.1)' 
                      : skill.orbit === 2 ? 'rgba(255, 34, 0, 0.1)' : 'rgba(255, 170, 0, 0.1)';

                    return (
                      <line
                        key={`line-orbit-${skill.orbit}-${skill.name}`}
                        x1={skill.x}
                        y1={skill.y}
                        x2={nextSkill.x}
                        y2={nextSkill.y}
                        stroke={color}
                        strokeWidth={0.8}
                      />
                    );
                  })}

                  {/* 3. Special connection lines between orbits (linking tools/languages to core skills) */}
                  {skillsWithCoords.map((skill) => {
                    if (skill.orbit !== 2 || skill.isDimmed) return null;
                    // Connect orbit 2 nodes to closest orbit 1 node
                    const closestOrbit1 = skillsWithCoords.find(
                      s => s.orbit === 1 && !s.isDimmed && Math.abs(s.groupIndex - skill.groupIndex) <= 1
                    );
                    if (!closestOrbit1) return null;
                    return (
                      <line
                        key={`inter-orbit-${skill.name}`}
                        x1={skill.x}
                        y1={skill.y}
                        x2={closestOrbit1.x}
                        y2={closestOrbit1.y}
                        stroke="rgba(255, 255, 255, 0.05)"
                        strokeWidth={0.6}
                      />
                    );
                  })}

                  {/* 4. Active highlighted pulsing link to selected skill */}
                  {selectedSkill && (() => {
                    const skill = skillsWithCoords.find(s => s.name === selectedSkill.name);
                    if (!skill) return null;
                    return (
                      <line
                        x1={0}
                        y1={0}
                        x2={skill.x}
                        y2={skill.y}
                        stroke="#FF5500"
                        strokeWidth={1.8}
                        strokeDasharray="4 4"
                        className="animate-pulse"
                      />
                    );
                  })()}

                </g>
              </svg>
            )}

            {/* Central Neural core node */}
            <div className="absolute w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-slate-950 border-2 border-secondary flex flex-col items-center justify-center shadow-[0_0_30px_rgba(255,34,0,0.6)] z-20">
              <Brain className="w-6 h-6 sm:w-8 sm:h-8 text-primary animate-pulse" />
              <span className="text-[8px] sm:text-[9px] font-mono text-secondary tracking-widest mt-1">CORE</span>
            </div>

            {/* Orbiting skill nodes */}
            {mounted && skillsWithCoords.map((skill) => {
              const isSelected = selectedSkill?.name === skill.name;
              return (
                <motion.button
                  key={skill.name}
                  onClick={() => {
                    if (!skill.isDimmed) setSelectedSkill(skill);
                  }}
                  whileHover={{ scale: skill.isDimmed ? 1.0 : 1.12 }}
                  className={`absolute px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full border text-[8px] sm:text-[10px] cursor-pointer transition-colors duration-300 font-sans font-medium whitespace-nowrap backdrop-blur-md shadow-md select-none ${
                    skill.isDimmed ? 'pointer-events-none' : ''
                  }`}
                  style={{
                    left: `calc(50% + ${skill.x}px)`,
                    top: `calc(50% + ${skill.y}px)`,
                    transform: `translate(-50%, -50%) scale(${skill.scale})`,
                    opacity: skill.opacity,
                    zIndex: isSelected ? 99 : skill.zIndex,
                    backgroundColor: isSelected ? 'rgba(255, 85, 0, 0.15)' : 'rgba(10, 10, 10, 0.88)',
                    borderColor: isSelected 
                      ? '#FF5500' 
                      : (skill.orbit === 1 ? 'rgba(255,85,0,0.3)' : skill.orbit === 2 ? 'rgba(255,34,0,0.3)' : 'rgba(255,170,0,0.3)'),
                    boxShadow: isSelected ? '0 0 20px rgba(255,85,0,0.5)' : '0 4px 12px rgba(0,0,0,0.4)',
                    color: isSelected ? '#ffffff' : '#e2e8f0',
                  }}
                >
                  {skill.name}
                </motion.button>
              );
            })}
          </div>

          {/* Right: Details Card Panel */}
          <div className="lg:col-span-4">
            <motion.div
              key={selectedSkill ? selectedSkill.name : 'default'}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-panel p-8 rounded-2xl border border-secondary/25 min-h-[340px] flex flex-col justify-between shadow-[0_12px_40px_rgba(0,0,0,0.5)]"
            >
              {selectedSkill ? (
                <div className="flex flex-col space-y-6">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-primary tracking-widest uppercase bg-primary/10 border border-primary/20 px-2.5 py-0.5 rounded">
                      {selectedSkill.category}
                    </span>
                    <h3 className="text-2xl font-bold text-white mt-3">{selectedSkill.name}</h3>
                  </div>

                  <p className="text-slate-350 text-xs sm:text-sm leading-relaxed">{selectedSkill.desc}</p>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-slate-400">Proficiency Level</span>
                      <span className="text-accent font-semibold">{selectedSkill.level} ({selectedSkill.proficiency}%)</span>
                    </div>
                    <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden p-0.5 border border-slate-800">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${selectedSkill.proficiency}%` }}
                        transition={{ duration: 0.6 }}
                        className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-center my-auto space-y-4">
                  <Award className="w-12 h-12 text-secondary animate-bounce" />
                  <h3 className="text-lg font-bold text-white">Select a Node</h3>
                  <p className="text-slate-400 text-xs max-w-[280px] leading-relaxed">
                    Click any floating orbital node on the left to reveal detail metrics, proficiencies, and application scopes.
                  </p>
                </div>
              )}

              {/* Dimming Filters Overview */}
              <div className="border-t border-slate-800/60 pt-4 mt-6">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block mb-2">Category Filters</span>
                <div className="flex flex-wrap gap-2">
                  {['All', 'AI/ML', 'Frameworks', 'Languages', 'Tools'].map((filter) => (
                    <button
                      suppressHydrationWarning
                      key={filter}
                      onClick={() => setActiveFilter(filter)}
                      className={`text-[10px] font-mono px-3 py-1 rounded transition-colors ${
                        activeFilter === filter
                          ? 'bg-primary/25 border-primary text-primary font-bold'
                          : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:text-slate-300'
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
