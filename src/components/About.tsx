'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Briefcase, GraduationCap, Award } from 'lucide-react';
import BorderGlow from './BorderGlow';

interface TimelineItemProps {
  date: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  align: 'left' | 'right';
  metric?: string;
}

const TimelineItem = React.memo(function TimelineItem({ date, title, subtitle, description, icon, align, metric }: TimelineItemProps) {
  const isLeft = align === 'left';
  
  return (
    <div className={`relative flex flex-col md:flex-row items-center justify-between w-full mb-12 md:mb-16 ${isLeft ? '' : 'md:flex-row-reverse'}`}>
      {/* Central glow line indicator */}
      <div className="absolute left-[30px] md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-secondary to-primary/40 -translate-x-1/2 pointer-events-none hidden md:block" />

      {/* Decorative center icon bubble */}
      <div className="absolute left-[30px] md:left-1/2 top-4 w-10 h-10 rounded-full bg-[#080808] border-2 border-secondary flex items-center justify-center -translate-x-1/2 z-10 shadow-[0_0_15px_rgba(255,85,0,0.4)]">
        <div className="text-primary">{icon}</div>
      </div>

      {/* Spacer for structure grid on desktop */}
      <div className="w-full md:w-[45%] hidden md:block" />

      {/* Card Content */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="w-full md:w-[45%] ml-16 md:ml-0 relative group shadow-xl"
      >
        <BorderGlow className="w-full p-6 flex flex-col relative" borderRadius={16}>
          {/* Subtle grid backdrop */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-radial-gradient opacity-30 group-hover:opacity-50 transition-opacity" />

          <div className="flex justify-between items-center mb-3">
            <span className="flex items-center text-xs font-mono text-accent bg-accent/10 px-3 py-1 rounded-full border border-accent/20">
              <Calendar className="w-3.5 h-3.5 mr-1" />
              {date}
            </span>
            {metric && (
              <span className="text-xs font-bold text-primary bg-primary/10 px-2.5 py-0.5 rounded border border-primary/20">
                {metric}
              </span>
            )}
          </div>

          <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{title}</h3>
          <h4 className="text-sm font-semibold text-slate-300 mt-1 mb-3">{subtitle}</h4>
          <p className="text-sm text-slate-400 leading-relaxed">{description}</p>
        </BorderGlow>
      </motion.div>
    </div>
  );
});

export default function About() {
  const milestones: Omit<TimelineItemProps, 'align'>[] = [
    {
      date: '2024 - 2025',
      title: 'Swecha AI Internship',
      subtitle: 'AI/ML Research & Development',
      description: 'Worked on NLP modeling, voice assistant integrations, and dataset fine-tuning. Enhanced semantic reasoning capabilities and real-time audio pipeline latency.',
      icon: <Briefcase className="w-5 h-5" />,
      metric: 'Completed'
    },
    {
      date: '2023 - 2024',
      title: 'IBM SkillsBuild Internship',
      subtitle: 'Data Science & Machine Learning',
      description: 'Developed plant disease diagnostic models using computer vision. Created robust deployment scripts and automated verification testing loops.',
      icon: <Briefcase className="w-5 h-5" />,
      metric: 'Grade A'
    },
    {
      date: '2023',
      title: 'AICTE / Shell Internship',
      subtitle: 'Object Detection & Predictive Analytics',
      description: 'Integrated YOLO-based pipelines for automated video monitoring and hazard warning signals. Optimized model inferences for resource-constrained environments.',
      icon: <Briefcase className="w-5 h-5" />,
      metric: 'Cert. Achieved'
    },
    {
      date: '2022 - 2023',
      title: 'IIIT Hyderabad ML Certification',
      subtitle: 'Advanced Machine Learning Program',
      description: 'Rigorous coursework in neural network design, optimization algorithms, NLP pipelines, and vision models. Gained deeper command of linear algebra and statistics.',
      icon: <Award className="w-5 h-5" />,
      metric: 'Grade A'
    },
    {
      date: '2022 - 2026',
      title: 'Bachelor of Technology',
      subtitle: 'Computer Science and Engineering',
      description: 'Focused academic studies in algorithms, artificial intelligence, operating systems, and software architectures.',
      icon: <GraduationCap className="w-5 h-5" />
    }
  ];

  return (
    <section id="about" className="relative w-full py-24 bg-transparent overflow-hidden">
      {/* Background ambient elements */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] rounded-full bg-secondary/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[150px] pointer-events-none" />

      <div className="max-w-6xl w-full mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center space-x-2 mb-3"
          >
            <span className="w-3 h-3 rounded-full bg-secondary animate-pulse" />
            <span className="text-xs font-mono text-secondary tracking-widest uppercase">THE JOURNEY</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-extrabold tracking-tight"
          >
            <span className="text-gradient">Storytelling Timeline</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 mt-4 max-w-xl text-sm leading-relaxed"
          >
            Explore Pavan Borigi's professional milestones, specialized learning tracks, and practical internships in AI/ML.
          </motion.p>
        </div>

        {/* Timeline Grid */}
        <div className="relative">
          {/* Mobile timeline line */}
          <div className="absolute left-[30px] md:left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-secondary to-primary/20 -translate-x-1/2 md:hidden" />

          {milestones.map((item, idx) => (
            <TimelineItem
              key={idx}
              {...item}
              align={idx % 2 === 0 ? 'left' : 'right'}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
