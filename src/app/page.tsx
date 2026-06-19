'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import Hero from '@/components/Hero';
import CardNav from '@/components/CardNav';

const ThreeCanvas = dynamic(() => import('@/components/ThreeCanvas'), { ssr: false });
const About = dynamic(() => import('@/components/About'), { ssr: false });
const Skills = dynamic(() => import('@/components/Skills'), { ssr: false });
const Projects = dynamic(() => import('@/components/Projects'), { ssr: false });
const Experience = dynamic(() => import('@/components/Experience'), { ssr: false });
const Achievements = dynamic(() => import('@/components/Achievements'), { ssr: false });
const Contact = dynamic(() => import('@/components/Contact'), { ssr: false });

const navItems = [
  {
    label: "Navigate",
    bgColor: "#FF5500",
    textColor: "#ffffff",
    links: [
      { label: "Home", href: "#home", ariaLabel: "Navigate to Home" },
      { label: "About", href: "#about", ariaLabel: "Navigate to About" },
      { label: "Skills", href: "#skills", ariaLabel: "Navigate to Skills" }
    ]
  },
  {
    label: "Portfolio",
    bgColor: "#FF2200",
    textColor: "#ffffff",
    links: [
      { label: "Projects", href: "#projects", ariaLabel: "Navigate to Projects" },
      { label: "Experience", href: "#experience", ariaLabel: "Navigate to Experience" },
      { label: "Achievements", href: "#achievements", ariaLabel: "Navigate to Achievements" }
    ]
  },
  {
    label: "Connect",
    bgColor: "#FFAA00",
    textColor: "#080808",
    links: [
      { label: "Contact", href: "#contact", ariaLabel: "Navigate to Contact" },
      { label: "GitHub", href: "https://github.com/pavan-borigi", ariaLabel: "Visit GitHub profile" },
      { label: "LinkedIn", href: "https://linkedin.com", ariaLabel: "Visit LinkedIn profile" }
    ]
  }
];

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Global 3D Background */}
      <ThreeCanvas />

      {/* 2. Navigation Header - Custom CardNav */}
      <CardNav
        logo="Pavan Borigi"
        items={navItems}
        baseColor="#121212"
        menuColor="#ffffff"
        buttonBgColor="#FF5500"
        buttonTextColor="#ffffff"
      />

      {/* 3. Section Assemblage */}
      <main className="flex-grow">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Achievements />
        <Contact />
      </main>

      {/* 4. Footer */}
      <footer className="w-full bg-[#050505] border-t border-slate-900 py-8 px-6 text-center text-xs font-mono text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <span>© {new Date().getFullYear()} PAVAN BORIGI. ALL RIGHTS RESERVED.</span>
          <div className="flex space-x-6">
            <a href="https://github.com/pavan-borigi" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">GITHUB</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">LINKEDIN</a>
            <a href="#home" className="hover:text-primary transition-colors">BACK TO TOP</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
