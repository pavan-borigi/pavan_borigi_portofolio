'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Award, FileCode, CheckCircle } from 'lucide-react';
import Folder from './Folder';
import BorderGlow from './BorderGlow';


interface TrophyCardProps {
  title: string;
  metric: string;
  metricLabel: string;
  icon: React.ReactNode;
  color: string;
}

function Counter({ targetValue, duration = 1.5 }: { targetValue: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    let start = 0;
    const end = targetValue;
    if (start === end) return;

    const totalMiliseconds = duration * 1000;
    const incrementTime = Math.max(Math.floor(totalMiliseconds / end), 30);
    
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [targetValue, duration, hasStarted]);

  return <span ref={elementRef}>{count}</span>;
}

export default function Achievements() {
  const stats = [
    { title: 'Generative AI Internship', metric: 'Grade O', metricLabel: 'OUTSTANDING ACHIEVEMENT', icon: <Award className="w-8 h-8 text-primary" />, color: '#FF5500' },
    { title: 'IIIT Hyderabad ML Track', metric: 'Grade A', metricLabel: 'ACADEMIC EXCELLENCE', icon: <Trophy className="w-8 h-8 text-secondary" />, color: '#FF2200' },
    { title: 'LeetCode / HackerRank', metric: '100+', metricLabel: 'CODING PROBLEMS SOLVED', icon: <FileCode className="w-8 h-8 text-accent" />, color: '#FFAA00' },
    { title: 'AI Internships Executed', metric: '3', metricLabel: 'INDUSTRY DEPLOYMENTS', icon: <CheckCircle className="w-8 h-8 text-white" />, color: '#FF8800' }
  ];

  const certificates = [
    {
      title: 'Machine Learning Certificate',
      issuer: 'IIIT Hyderabad / Talentsprint',
      grade: 'Grade A achieved',
      hash: 'IIIT-H-ML-99816'
    },
    {
      title: 'Generative AI Internship Certificate',
      issuer: 'Swecha AI Foundation',
      grade: 'Grade O (Outstanding)',
      hash: 'SWECHA-GENAI-1082'
    },
    {
      title: 'Data Science & ML Internship',
      issuer: 'IBM SkillsBuild Academic',
      grade: 'Grade A completed',
      hash: 'IBM-SB-DS-77615'
    },
    {
      title: 'AI/ML for Geodata Analysis',
      issuer: 'ISRO - Indian Institute of Remote Sensing',
      grade: 'Course completed',
      hash: 'IIRS-ISRO-2024234370608'
    },
    {
      title: 'AI & Data Analytics Internship',
      issuer: 'AICTE / Shell / Edunet',
      grade: 'Completed (Skills4Future)',
      hash: 'STU66798a12d9d911719241234'
    },
    {
      title: 'AI & ML Domain Internship',
      issuer: 'IBM SkillsBuild / APSSDC / Edunet',
      grade: '6-Week Internship Completed',
      hash: 'EDUNET-APSSDC-6W2024'
    }
  ];

  const folderItems = certificates.map((cert, idx) => (
    <div key={idx} className="flex flex-col justify-between h-full w-full p-2.5 text-left select-none relative">
      {/* Certificate double border frame */}
      <div className="absolute inset-1.5 border border-double border-slate-300 rounded-sm pointer-events-none opacity-40" />

      {/* Header Info */}
      <div className="flex justify-between items-start">
        <div className="flex flex-col">
          <span className="text-[5px] font-mono text-[#FF5500] font-extrabold tracking-widest leading-none">OFFICIAL CREDENTIAL</span>
          <span className="text-[7.5px] font-extrabold text-slate-800 leading-tight mt-1 font-sans">{cert.title}</span>
          <span className="text-[6px] text-slate-500 leading-none mt-1 font-mono">{cert.issuer}</span>
        </div>
        <Award className="w-3.5 h-3.5 text-[#FF5500] opacity-90 flex-shrink-0" />
      </div>

      {/* Footer Info */}
      <div className="flex justify-between items-end text-[5px] font-mono border-t border-slate-200/80 pt-1.5 mt-2">
        <div>
          <span className="block text-slate-400 font-bold scale-[0.9] origin-left">STATUS / GRADE:</span>
          <span className="block text-[#FF5500] font-extrabold mt-0.5 scale-[0.95] origin-left">{cert.grade}</span>
        </div>
        <div className="text-right">
          <span className="block text-slate-400 font-bold scale-[0.9] origin-right">HASH:</span>
          <span className="block text-slate-600 mt-0.5 scale-[0.95] origin-right">{cert.hash}</span>
        </div>
      </div>
    </div>
  ));

  return (
    <section id="achievements" className="relative w-full py-24 bg-transparent overflow-hidden">
      {/* Space elements */}
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl w-full mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center space-x-2 mb-3"
          >
            <span className="w-3 h-3 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-mono text-primary tracking-widest uppercase font-semibold">HONORS</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-extrabold tracking-tight"
          >
            <span className="text-gradient">Trophy Room & Vault</span>
          </motion.h2>
        </div>

        {/* 1. Trophy Room Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-20">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="w-full aspect-square sm:aspect-auto sm:h-[200px] relative group"
            >
              <BorderGlow className="w-full h-full" borderRadius={16}>
                <div className="w-full h-full p-3 sm:p-6 lg:p-8 flex flex-col justify-between items-center text-center">
                  <div
                    className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center transition-transform group-hover:scale-110"
                    style={{ backgroundColor: `${stat.color}15`, border: `1px solid ${stat.color}40` }}
                  >
                    <div className="scale-75 sm:scale-90 lg:scale-100 flex items-center justify-center">
                      {stat.icon}
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="block text-base sm:text-xl lg:text-2xl font-extrabold text-white font-mono">
                      {stat.metric.includes('+') ? (
                        <>
                          <Counter targetValue={100} />+
                        </>
                      ) : stat.metric === '3' ? (
                        <Counter targetValue={3} />
                      ) : (
                        stat.metric
                      )}
                    </span>
                    <span className="block text-[6px] sm:text-[7px] lg:text-[8px] font-mono text-slate-400 mt-1 uppercase tracking-widest leading-tight">{stat.metricLabel}</span>
                  </div>
                  <h4 className="text-[9px] sm:text-xs font-semibold text-slate-300 leading-tight">{stat.title}</h4>
                </div>
              </BorderGlow>
            </motion.div>
          ))}
        </div>

        {/* 2. Interactive Certification Vault Folder */}
        <div className="flex flex-col items-center mt-12">
          <div className="text-center mb-14">
            <span className="text-[10px] font-mono text-secondary uppercase tracking-widest block mb-1">CERTIFICATION VAULT</span>
            <h3 className="text-xl font-bold text-white">Interactive Credential Folder</h3>
            <p className="text-[10px] text-slate-500 font-mono mt-2 tracking-widest uppercase animate-pulse">
              CLICK FOLDER TO OPEN • HOVER PAPERS TO INSPECT
            </p>
          </div>

          <div className="relative w-full max-w-lg min-h-[300px] flex items-center justify-center">
            <Folder items={folderItems} color="#FF5500" />
          </div>
        </div>

      </div>
    </section>
  );
}
