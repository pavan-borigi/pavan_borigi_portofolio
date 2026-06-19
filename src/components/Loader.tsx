'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [consoleMsg, setConsoleMsg] = useState('Initializing quantum network...');
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const messages = [
      'Initializing quantum network...',
      'Mapping neural synaptic weights...',
      'Bootstrapping PyTorch backend...',
      'Compiling CUDA compute shaders...',
      'Establishing connection to GPU clusters...',
      'Synthesizing computer vision pipelines...',
      'Running NLP semantic embeddings...',
      'Synchronizing neural interface...'
    ];

    let currentMsgIdx = 0;
    const intervalTime = 2500 / 100; // total 2.5 seconds

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 1;
        
        // Update console message at milestones
        if (next % 12 === 0 && currentMsgIdx < messages.length - 1) {
          currentMsgIdx++;
          setConsoleMsg(messages[currentMsgIdx]);
        }

        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsDone(true);
            setTimeout(onComplete, 600); // Wait for fade out
          }, 400);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
          transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="fixed inset-0 z-[99999] bg-[#080808] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Cyberpunk grid background */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,3px_100%] pointer-events-none opacity-40" />

          {/* Glowing purple ambient lights */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-secondary/15 blur-[120px] pointer-events-none" />
          <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] rounded-full bg-primary/10 blur-[80px] pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center max-w-lg w-full px-6">
            {/* Holographic Logo Container */}
            <div className="relative w-32 h-32 mb-12 flex items-center justify-center">
              {/* Outer spinning hexagon */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 border-2 border-dashed border-primary/40 rounded-[35%] w-full h-full"
              />
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-2 border border-secondary/30 rounded-[40%] w-[90%] h-[90%]"
              />
              
              {/* Logo text/icon */}
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1 }}
                className="text-4xl font-extrabold tracking-widest text-primary drop-shadow-[0_0_15px_rgba(255,85,0,0.8)]"
              >
                PB
              </motion.div>
            </div>

            {/* Central scanning bar */}
            <div className="w-full bg-slate-950 border border-secondary/20 rounded-full h-2 overflow-hidden mb-6 p-0.5 shadow-[0_0_15px_rgba(255,34,0,0.1)]">
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
                className="h-full bg-gradient-to-r from-primary via-secondary to-accent rounded-full shadow-[0_0_10px_#FF5500]"
              />
            </div>

            {/* Progress indicators & System Messages */}
            <div className="w-full flex justify-between items-center mb-6">
              <span className="text-sm font-mono text-secondary/70 tracking-widest uppercase">System Loading</span>
              <span className="text-xl font-mono font-bold text-primary drop-shadow-[0_0_5px_rgba(255,85,0,0.5)]">{progress}%</span>
            </div>

            {/* Terminal console output */}
            <div className="w-full h-20 bg-black/60 rounded-lg border border-secondary/15 p-4 font-mono text-xs text-left text-accent/80 overflow-hidden shadow-inner">
              <div className="flex items-center space-x-2 mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                <span className="text-secondary/60">PAVAN_PORTFOLIO_SYSTEM_OS v1.0.0</span>
              </div>
              <motion.p
                key={consoleMsg}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-primary truncate"
              >
                &gt; {consoleMsg}
              </motion.p>
              <p className="text-secondary/40 text-[10px] mt-1">&gt; GPU Core Temp: 42°C | Memory Load: 82%</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
