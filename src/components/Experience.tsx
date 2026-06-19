'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Activity, CheckSquare } from 'lucide-react';
import BorderGlow from './BorderGlow';

interface ExperienceCardProps {
  role: string;
  company: string;
  period: string;
  metric: string;
  metricLabel: string;
  details: string[];
}

const ExperienceCard = React.memo(function ExperienceCard({ role, company, period, metric, metricLabel, details }: ExperienceCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      className="w-full h-full relative group shadow-xl"
    >
      <BorderGlow className="w-full h-full p-6 flex flex-col justify-between text-left" borderRadius={16}>
        <div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <span className="text-xs font-mono text-primary tracking-widest uppercase">{period}</span>
              <h3 className="text-xl font-bold text-white mt-1 group-hover:text-primary transition-colors">{role}</h3>
              <h4 className="text-sm font-semibold text-slate-300">{company}</h4>
            </div>
            
            {/* Metric badge */}
            <div className="mt-4 md:mt-0 bg-[#121212] border border-secondary/30 rounded-xl px-4 py-2.5 flex items-center space-x-2 text-right">
              <div>
                <span className="block text-lg font-mono font-bold text-accent">{metric}</span>
                <span className="block text-[8px] font-mono text-slate-405 uppercase tracking-wider">{metricLabel}</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                <Activity className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Bullet points of contributions */}
          <ul className="space-y-2">
            {details.map((detail, idx) => (
              <li key={idx} className="text-xs text-slate-400 flex items-start">
                <span className="text-secondary mr-2 font-bold">•</span>
                {detail}
              </li>
            ))}
          </ul>
        </div>

        {/* Action button */}
        <div className="mt-6 flex justify-end">
          <button
            suppressHydrationWarning
            className="text-[10px] font-mono text-slate-400 group-hover:text-primary transition-colors flex items-center space-x-1 uppercase tracking-wider"
          >
            <span>LEARN MORE</span>
            <span>→</span>
          </button>
        </div>
      </BorderGlow>
    </motion.div>
  );
});

export default function Experience() {
  const experiences: ExperienceCardProps[] = [
    {
      role: 'Swecha AI Intern',
      company: 'Swecha AI Development Group',
      period: '2024 - PRESENT',
      metric: '<800ms',
      metricLabel: 'RESPONSE LATENCY',
      details: [
        'Fine-tuned Transformer models locally, reducing inference parameters for voice assistant integration.',
        'Created custom NLP semantic parsers that mapping voice input directly to machine execution intents.',
        'Assisted in data pipeline cleanup routines, increasing language corpus processing metrics.'
      ]
    },
    {
      role: 'IBM SkillsBuild Intern',
      company: 'IBM Academy / SkillsBuild Program',
      period: '2023 - 2024',
      metric: '94.6%',
      metricLabel: 'DIAGNOSTIC ACCURACY',
      details: [
        'Trained Convolutional Neural Networks on diverse crop datasets to categorize leaf disease signatures.',
        'Designed Grad-CAM visual overlays pointing exactly where disease anomalies are centered on the leaf.',
        'Automated local model inference packaging, containerizing FastAPI endpoints with Docker.'
      ]
    },
    {
      role: 'AICTE / Shell Intern',
      company: 'AICTE Virtual Internships with Shell',
      period: '2023',
      metric: '30 FPS',
      metricLabel: 'EDGE THROUGHPUT',
      details: [
        'Implemented object detection models (YOLOv8) to track hazard items on camera feeds in real time.',
        'Configured PyTorch training loops to run on limited local GPU nodes with batch-size adjustments.',
        'Documented benchmarking reports to evaluate accuracy vs frame-rate across different deployment cards.'
      ]
    }
  ];

  return (
    <section id="experience" className="relative w-full py-24 bg-transparent overflow-hidden">
      {/* Background neon ambient nodes */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-6xl w-full mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center space-x-2 mb-3"
          >
            <span className="w-3 h-3 rounded-full bg-secondary animate-pulse" />
            <span className="text-xs font-mono text-secondary tracking-widest uppercase font-semibold">EXPERIENCE LOG</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-extrabold tracking-tight"
          >
            <span className="text-gradient">Professional Achievements</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 mt-4 max-w-xl text-sm leading-relaxed"
          >
            Key contributions, quantitative milestones, and technical outcomes from internships.
          </motion.p>
        </div>

        {/* Experience Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experiences.map((exp, index) => (
            <ExperienceCard key={index} {...exp} />
          ))}
        </div>

      </div>
    </section>
  );
}
