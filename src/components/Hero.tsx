'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProfileCard from './ProfileCard';


const roles = [
  'AI Engineer',
  'Machine Learning Engineer',
  'Computer Vision Developer',
  'Deep Learning Enthusiast',
  'Generative AI Explorer'
];

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayedRole, setDisplayedRole] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Typing effect logic
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentFullText = roles[roleIdx];
    
    if (isDeleting) {
      timer = setTimeout(() => {
        setDisplayedRole(currentFullText.substring(0, displayedRole.length - 1));
      }, 50);
    } else {
      timer = setTimeout(() => {
        setDisplayedRole(currentFullText.substring(0, displayedRole.length + 1));
      }, 100);
    }

    if (!isDeleting && displayedRole === currentFullText) {
      timer = setTimeout(() => setIsDeleting(true), 2000); // Wait before delete
    } else if (isDeleting && displayedRole === '') {
      setIsDeleting(false);
      setRoleIdx((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timer);
  }, [displayedRole, isDeleting, roleIdx]);

  return (
    <section id="home" className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-transparent">

      {/* Floating purple & cyan gradient backdrops */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-secondary/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-primary/10 blur-[130px] pointer-events-none" />

      {/* Hero Content Grid */}
      <div className="relative z-10 max-w-7xl w-full mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Text details */}
        <div className="lg:col-span-6 flex flex-col text-left space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center space-x-3"
          >
            <span className="w-8 h-0.5 bg-primary" />
            <span className="text-sm font-mono text-primary tracking-widest uppercase">HELLO! I AM</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl sm:text-7xl font-extrabold tracking-tight"
          >
            <span className="text-gradient">Pavan Borigi</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-16 flex items-center"
          >
            <h2 className="text-2xl sm:text-3xl font-mono font-medium text-slate-300">
              I am a <span className="text-accent drop-shadow-[0_0_8px_rgba(0,255,179,0.3)]">{displayedRole}</span>
              <span className="animate-pulse font-bold text-accent">|</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base text-slate-400 max-w-xl leading-relaxed"
          >
            A high-potential AI/ML Engineer focused on Deep Learning, Computer Vision, and Natural Language Processing. Designing architectures that solve real-world problems.
          </motion.p>

          {/* Interactive CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap gap-4 pt-4"
          >
            <a
              href="#projects"
              className="px-6 py-3 rounded-full bg-primary/10 border border-primary text-primary font-medium hover:bg-primary hover:text-[#080808] transition-all duration-300 shadow-[0_0_15px_rgba(255,85,0,0.15)] hover:shadow-[0_0_25px_rgba(255,85,0,0.4)]"
            >
              Explore My Work
            </a>
            
            <a
              href="#contact"
              className="px-6 py-3 rounded-full bg-secondary/15 border border-secondary text-white font-medium hover:bg-secondary transition-all duration-300 shadow-[0_0_15px_rgba(255,34,0,0.15)] hover:shadow-[0_0_25px_rgba(255,34,0,0.4)]"
            >
              Contact Me
            </a>
            
            <a
              href="#about"
              className="px-6 py-3 rounded-full bg-slate-900/60 border border-slate-700 text-slate-300 font-medium hover:bg-slate-800 transition-all duration-300"
            >
              About Journey
            </a>
          </motion.div>
        </div>

        {/* Right floating silhouette avatar centerpiece */}
        <div className="lg:col-span-6 flex justify-center items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative flex items-center justify-center"
          >
            <ProfileCard
              onContactClick={() => {
                const el = document.getElementById('contact');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            />
          </motion.div>
        </div>


      </div>

      {/* Down arrow link */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center">
        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-2">SCROLL DOWN</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-1.5 h-6 bg-gradient-to-b from-primary to-transparent rounded-full"
        />
      </div>
    </section>
  );
}
