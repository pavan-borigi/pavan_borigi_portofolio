'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, FileText, Send, Terminal, ShieldAlert } from 'lucide-react';
import confetti from 'canvas-confetti';
import BorderGlow from './BorderGlow';

const GithubIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [logs, setLogs] = useState<string[]>(['Systems active. Ready to route packet.']);
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addLog = (msg: string) => {
    setLogs((prev) => [...prev, msg]);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Standard client side validation
    if (!formData.name || !formData.email || !formData.message) {
      addLog('⚠️ ERROR: Payload validation failed. Missing required fields.');
      return;
    }

    setIsSending(true);
    addLog(`$ ./dispatch_packet.sh --target="Pavan Borigi" --sender="${formData.email}"`);
    
    // Simulate high-tech transit logs
    setTimeout(() => {
      addLog('⚡ Processing cryptographic handshake...');
    }, 400);

    setTimeout(() => {
      addLog('📡 Establishing satellite gateway connection...');
    }, 900);

    setTimeout(() => {
      addLog('✓ SUCCESS: Message encrypted & dispatched. Status 202.');
      setIsSending(false);
      setIsSent(true);
      
      // Fire confetti for celebration
      confetti({
        particleCount: 80,
        spread: 60,
        colors: ['#FF5500', '#FF2200', '#FFAA00'],
        origin: { y: 0.8 }
      });
      
      // Reset form
      setFormData({ name: '', email: '', message: '' });
    }, 1600);
  };

  return (
    <section id="contact" className="relative w-full py-24 bg-transparent overflow-hidden" data-cursor="contact">
      {/* Background glowing elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-secondary/5 blur-[140px] pointer-events-none" />

      <div className="max-w-6xl w-full mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center space-x-2 mb-3"
          >
            <span className="w-3 h-3 rounded-full bg-accent animate-pulse" />
            <span className="text-xs font-mono text-accent tracking-widest uppercase font-semibold">GET IN TOUCH</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-extrabold tracking-tight"
          >
            <span className="text-gradient">Communication Terminal</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 mt-4 max-w-xl text-sm leading-relaxed"
          >
            Open a connection or inspect social pipelines. Send a payload message below to ping my node.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Column: Sci-fi command terminal contact form */}
          <div className="lg:col-span-7 flex">
            <BorderGlow className="w-full flex flex-col shadow-2xl overflow-hidden" borderRadius={16}>
              
              {/* Terminal Title Bar */}
              <div className="bg-[#121212] px-4 py-3 border-b border-secondary/15 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <span className="w-3 h-3 rounded-full bg-accent/80" />
                  <span className="text-xs font-mono text-slate-400 ml-2">secure_uplink_bash.sh</span>
                </div>
                <Terminal className="w-4 h-4 text-secondary" />
              </div>

              {/* Terminal Body */}
              <form onSubmit={handleFormSubmit} className="p-6 flex-grow flex flex-col justify-between space-y-6">
                
                {/* Input Fields */}
                <div className="space-y-4 font-mono text-sm">
                  
                  <div className="flex flex-col space-y-1.5">
                    <label className="text-primary text-xs uppercase tracking-wider">&gt; ENTER NAME:</label>
                    <input
                      suppressHydrationWarning
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g. Recruiter / Founder"
                      className="bg-black/40 border border-secondary/25 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary/80 transition-all font-sans text-sm shadow-inner"
                    />
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <label className="text-primary text-xs uppercase tracking-wider">&gt; ENTER EMAIL:</label>
                    <input
                      suppressHydrationWarning
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g. agent@company.ai"
                      className="bg-black/40 border border-secondary/25 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary/80 transition-all font-sans text-sm shadow-inner"
                    />
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <label className="text-primary text-xs uppercase tracking-wider">&gt; ENTER MESSAGE CONTENT:</label>
                    <textarea
                      suppressHydrationWarning
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      placeholder="Provide collaboration details or request scope..."
                      className="bg-black/40 border border-secondary/25 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary/80 transition-all font-sans text-sm resize-none shadow-inner"
                    />
                  </div>

                </div>

                {/* Status Log Monitor */}
                <div className="bg-black/80 rounded-lg p-4 font-mono text-xs text-accent/90 border border-secondary/15 h-32 overflow-y-auto space-y-1">
                  {logs.map((log, idx) => (
                    <div key={idx} className="leading-relaxed">
                      {log}
                    </div>
                  ))}
                  {isSending && (
                    <div className="flex items-center space-x-1.5 text-primary">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
                      <span>Transmitting payload packets...</span>
                    </div>
                  )}
                </div>

                {/* Submit action */}
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">GATEWAY: PORT 8080</span>
                  <button
                    suppressHydrationWarning
                    type="submit"
                    disabled={isSending}
                    className="flex items-center space-x-2 px-6 py-2.5 rounded-full bg-primary text-[#080808] font-semibold hover:bg-accent transition-all duration-300 shadow-[0_0_15px_rgba(255,85,0,0.3)] disabled:opacity-50"
                  >
                    <span>TRANSMIT PACKET</span>
                    <Send className="w-4 h-4" />
                  </button>
                </div>

              </form>

            </BorderGlow>
          </div>

          {/* Right Column: Channels, Socials, Resumes */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            {/* Networking details */}
            <div className="glass-panel p-8 rounded-2xl border border-secondary/25 space-y-6 flex-grow flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-gradient leading-tight">Address Details</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Connect directly through standard social networks or request official curriculum documents for processing.
              </p>
              
              <div className="space-y-4">
                <a
                  href="mailto:pavan42c2@gmail.com"
                  className="flex items-center space-x-4 p-3 rounded-xl bg-slate-900/40 hover:bg-slate-900 border border-slate-800 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[9px] font-mono text-slate-500 tracking-wider">EMAIL DIRECT</span>
                    <span className="text-sm text-slate-300 font-mono font-semibold">pavan42c2@gmail.com</span>
                  </div>
                </a>

                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 p-3 rounded-xl bg-slate-900/40 hover:bg-slate-900 border border-slate-800 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-secondary/10 border border-secondary/20 flex items-center justify-center text-secondary">
                    <LinkedinIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[9px] font-mono text-slate-500 tracking-wider">LINKEDIN UPLINK</span>
                    <span className="text-sm text-slate-300 font-mono font-semibold">linkedin.com/in/pavan-borigi</span>
                  </div>
                </a>

                <a
                  href="https://github.com/pavan-borigi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 p-3 rounded-xl bg-slate-900/40 hover:bg-slate-900 border border-slate-800 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                    <GithubIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[9px] font-mono text-slate-500 tracking-wider">GITHUB HOST</span>
                    <span className="text-sm text-slate-300 font-mono font-semibold">github.com/pavan-borigi</span>
                  </div>
                </a>
              </div>
            </div>

            {/* Resume download vault */}
            <div className="glass-panel p-8 rounded-2xl border border-secondary/25 relative overflow-hidden group">
              {/* Background gradient grid glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-radial-gradient opacity-20 pointer-events-none" />

              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-lg font-bold text-white leading-tight">Curriculum Vitae Vault</h4>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    Retrieve official PDF documentation specifying curriculum, metrics, and academic profiles.
                  </p>
                </div>
                <FileText className="w-10 h-10 text-primary opacity-80" />
              </div>

              <div className="mt-6 flex justify-end">
                {/* File download button */}
                <a
                  href="https://drive.google.com/uc?export=download&id=1o8qRxY1rwSRvZFRZieke1Nc9Myj-7pns"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 rounded-full border border-primary text-primary font-mono text-xs font-bold bg-primary/10 hover:bg-primary hover:text-[#080808] transition-all duration-300 shadow-[0_0_10px_rgba(255,85,0,0.15)] hover:shadow-[0_0_20px_rgba(255,85,0,0.3)]"
                >
                  DOWNLOAD RESUME
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
