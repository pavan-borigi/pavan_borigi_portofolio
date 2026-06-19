'use client';

import React from 'react';
import { Canvas } from '@react-three/fiber';
import NeuralNetwork from './NeuralNetwork';

export default function ThreeCanvas() {
  return (
    <div 
      className="fixed inset-0 w-full h-full pointer-events-none z-[-1]"
      style={{ willChange: 'transform', transform: 'translate3d(0, 0, 0)' }}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#FF5500" />
        <pointLight position={[-10, -10, -10]} intensity={1.0} color="#FF2200" />
        <NeuralNetwork />
      </Canvas>
    </div>
  );
}
