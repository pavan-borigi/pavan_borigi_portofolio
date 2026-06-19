'use client';

import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export default function NeuralNetwork() {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const groupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  const scrollPercentRef = useRef(0);
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      scrollPercentRef.current = maxScroll > 0 ? scrollY / maxScroll : 0;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Create random nodes for neural network
  const count = 75;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 14;
    }
    return pos;
  }, []);

  // Set up animation movement speeds for each node
  const velocities = useMemo(() => {
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      vel[i * 3] = (Math.random() - 0.5) * 0.01;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.01;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.01;
    }
    return vel;
  }, []);

  const maxConnections = 120;

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const pointerX = state.pointer.x;
    const pointerY = state.pointer.y;

    if (!pointsRef.current || !linesRef.current || !groupRef.current) return;

    // Use cached scrollPercent to avoid DOM layout recalculation jank
    const scrollPercent = scrollPercentRef.current;

    // Dynamic camera/group depth parallax on scroll
    const targetY = scrollPercent * 5;
    const targetZ = -scrollPercent * 3;
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.05);
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ, 0.05);

    // Rotate the overall neural network based on time, mouse, and scroll
    groupRef.current.rotation.y = time * 0.02 + pointerX * 0.15 + scrollPercent * Math.PI * 0.4;
    groupRef.current.rotation.x = time * 0.01 + pointerY * 0.1 + scrollPercent * Math.PI * 0.2;

    // Animate individual nodes and compute connections
    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const linePosAttr = linesRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const array = linePosAttr.array as Float32Array;
    
    let lineIdx = 0;

    for (let i = 0; i < count; i++) {
      // Move nodes
      let x = posAttr.getX(i) + velocities[i * 3];
      let y = posAttr.getY(i) + velocities[i * 3 + 1];
      let z = posAttr.getZ(i) + velocities[i * 3 + 2];

      // Keep them bounded
      if (Math.abs(x) > 7) velocities[i * 3] *= -1;
      if (Math.abs(y) > 7) velocities[i * 3 + 1] *= -1;
      if (Math.abs(z) > 7) velocities[i * 3 + 2] *= -1;

      // Subtle mouse interaction: push particles away from pointer
      const dx = x - pointerX * 6;
      const dy = y - pointerY * 6;
      const distToPointerSq = dx * dx + dy * dy;
      if (distToPointerSq < 6.25) { // 2.5 ** 2
        const distToPointer = Math.sqrt(distToPointerSq);
        if (distToPointer > 0) {
          x += (dx / distToPointer) * 0.02;
          y += (dy / distToPointer) * 0.02;
        }
      }

      posAttr.setXYZ(i, x, y, z);
    }
    posAttr.needsUpdate = true;

    // Find connections (lines) between close nodes
    for (let i = 0; i < count; i++) {
      const x1 = posAttr.getX(i);
      const y1 = posAttr.getY(i);
      const z1 = posAttr.getZ(i);

      for (let j = i + 1; j < count; j++) {
        const x2 = posAttr.getX(j);
        const y2 = posAttr.getY(j);
        const z2 = posAttr.getZ(j);

        const dx = x1 - x2;
        const dy = y1 - y2;
        const dz = z1 - z2;
        const distSq = dx * dx + dy * dy + dz * dz;
        
        // Connect if nodes are close to each other (dist < 2.8 => distSq < 7.84)
        if (distSq < 7.84 && lineIdx < maxConnections) {
          array[lineIdx * 6] = x1;
          array[lineIdx * 6 + 1] = y1;
          array[lineIdx * 6 + 2] = z1;
          
          array[lineIdx * 6 + 3] = x2;
          array[lineIdx * 6 + 4] = y2;
          array[lineIdx * 6 + 5] = z2;
          
          lineIdx++;
        }
      }
    }

    // Fill remaining line vertices with zeros if count is less than maxConnections
    const end = maxConnections * 6;
    for (let i = lineIdx * 6; i < end; i++) {
      array[i] = 0;
    }

    linePosAttr.needsUpdate = true;
  });

  return (
    <group ref={groupRef}>
      {/* Background space particles */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.07}
          color="#FF5500"
          transparent
          opacity={0.65}
          depthWrite={false}
        />
      </points>

      {/* Dynamic connection lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array(120 * 2 * 3), 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#FF2200"
          transparent
          opacity={0.25}
          linewidth={1}
        />
      </lineSegments>
    </group>
  );
}
