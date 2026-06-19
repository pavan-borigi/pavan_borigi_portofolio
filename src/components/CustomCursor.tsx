'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [cursorType, setCursorType] = useState<'default' | 'project' | 'skill' | 'contact' | 'button'>('default');
  const [isVisible, setIsVisible] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  
  // Mouse position tracking
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  
  // Smooth spring physics for outer ring
  const springConfig = { damping: 30, stiffness: 250, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const onMouseEnter = () => {
      setIsVisible(true);
    };

    // Global listener for hover elements
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const projectEl = target.closest('[data-cursor="project"]');
      const skillEl = target.closest('[data-cursor="skill"]');
      const contactEl = target.closest('[data-cursor="contact"]');
      const interactiveEl = target.closest('button, a, input, textarea, [role="button"]');

      if (projectEl) {
        setCursorType('project');
      } else if (skillEl) {
        setCursorType('skill');
      } else if (contactEl) {
        setCursorType('contact');
      } else if (interactiveEl) {
        setCursorType('button');
      } else {
        setCursorType('default');
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    window.addEventListener('mouseover', onMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      window.removeEventListener('mouseover', onMouseOver);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  // Render cursor styling depending on current active type
  const getCursorStyle = () => {
    switch (cursorType) {
      case 'project':
        return {
          width: 80,
          height: 80,
          border: '2px solid #00F5FF',
          backgroundColor: 'rgba(0, 245, 255, 0.05)',
          boxShadow: '0 0 20px rgba(0, 245, 255, 0.3)',
        };
      case 'skill':
        return {
          width: 90,
          height: 90,
          border: '2px dashed #7B61FF',
          backgroundColor: 'rgba(123, 97, 255, 0.05)',
          boxShadow: '0 0 20px rgba(123, 97, 255, 0.3)',
          borderRadius: '35% 65% 70% 30% / 30% 30% 70% 70%', // organic blob shape
          animation: 'spin 10s linear infinite',
        };
      case 'contact':
        return {
          width: 70,
          height: 70,
          border: '2px solid #00FFB3',
          backgroundColor: 'rgba(0, 255, 179, 0.05)',
          boxShadow: '0 0 20px rgba(0, 255, 179, 0.4)',
        };
      case 'button':
        return {
          width: 50,
          height: 50,
          border: '1px solid #7B61FF',
          backgroundColor: 'rgba(123, 97, 255, 0.1)',
        };
      default:
        return {
          width: 30,
          height: 30,
          border: '1.5px solid rgba(123, 97, 255, 0.8)',
          backgroundColor: 'rgba(123, 97, 255, 0.02)',
          boxShadow: '0 0 10px rgba(123, 97, 255, 0.2)',
        };
    }
  };

  const currentStyle = getCursorStyle();

  return (
    <>
      {/* Outer physics-based cursor element */}
      <motion.div
        ref={cursorRef}
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          pointerEvents: 'none',
          zIndex: 9999,
          borderRadius: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          transition: 'width 0.3s, height 0.3s, border 0.3s, background-color 0.3s, box-shadow 0.3s, border-radius 0.3s',
          ...currentStyle,
        }}
      >
        {/* Cursor central dot or icon based on state */}
        {cursorType === 'project' && (
          <span className="text-[10px] font-bold text-primary tracking-wider uppercase">VIEW</span>
        )}
        {cursorType === 'skill' && (
          <div className="w-1.5 h-1.5 bg-secondary rounded-full animate-ping" />
        )}
        {cursorType === 'contact' && (
          <span className="text-[10px] font-bold text-accent tracking-wider uppercase">SEND</span>
        )}
      </motion.div>

      {/* Inner dot that directly follows the mouse coordinates for responsive feedback */}
      <div
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 10000,
          width: '6px',
          height: '6px',
          backgroundColor: cursorType === 'project' ? '#00F5FF' : cursorType === 'contact' ? '#00FFB3' : '#7B61FF',
          borderRadius: '50%',
          boxShadow: '0 0 8px currentColor',
        }}
        ref={(el) => {
          if (el) {
            // Keep inner dot directly linked with state changes
            mouseX.on('change', (val) => {
              el.style.left = `${val}px`;
            });
            mouseY.on('change', (val) => {
              el.style.top = `${val}px`;
            });
          }
        }}
      />
    </>
  );
}
