'use client';

import React, { useState, useRef } from 'react';

interface FolderProps {
  color?: string;
  size?: number;
  items?: React.ReactNode[];
  className?: string;
}

const darkenColor = (hex: string, percent: number): string => {
  let color = hex.startsWith('#') ? hex.slice(1) : hex;
  if (color.length === 3) {
    color = color
      .split('')
      .map(c => c + c)
      .join('');
  }
  const num = parseInt(color, 16);
  let r = (num >> 16) & 0xff;
  let g = (num >> 8) & 0xff;
  let b = num & 0xff;
  r = Math.max(0, Math.min(255, Math.floor(r * (1 - percent))));
  g = Math.max(0, Math.min(255, Math.floor(g * (1 - percent))));
  b = Math.max(0, Math.min(255, Math.floor(b * (1 - percent))));
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
};

const Folder: React.FC<FolderProps> = ({ color = '#FF5500', size = 1.6, items = [], className = '' }) => {
  const maxItems = items.length || 3;
  const papers = [...items];

  const [open, setOpen] = useState(false);
  const rectRef = useRef<DOMRect | null>(null);

  const folderBackColor = darkenColor(color, 0.08);
  const paper1 = '#EBEBEB';
  const paper2 = '#F5F5F5';
  const paper3 = '#FFFFFF';
  const paperColors = [paper1, paper2, paper3];

  const handleClick = () => {
    setOpen(prev => !prev);
  };

  const handlePaperMouseEnter = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    rectRef.current = e.currentTarget.getBoundingClientRect();
  };

  const handlePaperMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!open) return;
    if (!rectRef.current) {
      rectRef.current = e.currentTarget.getBoundingClientRect();
    }
    const rect = rectRef.current;
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const offsetX = (e.clientX - centerX) * 0.15;
    const offsetY = (e.clientY - centerY) * 0.15;

    const paper = e.currentTarget as HTMLElement;
    paper.style.setProperty('--paper-move-x', `${offsetX}px`);
    paper.style.setProperty('--paper-move-y', `${offsetY}px`);
  };

  const handlePaperMouseLeave = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const paper = e.currentTarget as HTMLElement;
    paper.style.setProperty('--paper-move-x', '0px');
    paper.style.setProperty('--paper-move-y', '0px');
    rectRef.current = null;
  };

  const folderStyle: React.CSSProperties = {
    '--folder-color': color,
    '--folder-back-color': folderBackColor,
    '--paper-1': paper1,
    '--paper-2': paper2,
    '--paper-3': paper3
  } as React.CSSProperties;

  const scaleStyle = { transform: `scale(${size})` };

  const getOpenTransform = (index: number, total: number) => {
    if (total <= 3) {
      if (index === 0) return 'translate(-125%, -85%) rotate(-12deg)';
      if (index === 1) return 'translate(25%, -85%) rotate(12deg)';
      if (index === 2) return 'translate(-50%, -115%) rotate(2deg)';
    } else {
      const step = 1 / (total - 1);
      const t = index * step; // 0 to 1
      const angle = -18 + t * 36;
      const x = -140 + t * 180;
      const y = -85 - 27 * (1 - Math.pow(2 * t - 1, 2));
      return `translate(${x.toFixed(1)}%, ${y.toFixed(1)}%) rotate(${angle.toFixed(1)}deg)`;
    }
    return '';
  };

  return (
    <div style={scaleStyle} className={`${className} flex items-center justify-center`}>
      <div
        className={`group relative transition-all duration-200 ease-in cursor-pointer ${
          !open ? 'hover:-translate-y-2' : ''
        }`}
        style={{
          ...folderStyle,
          transform: open ? 'translateY(-8px)' : undefined
        }}
        onClick={handleClick}
      >
        {/* Main Folder Back Pocket */}
        <div
          className="relative w-[110px] h-[85px] rounded-tr-[12px] rounded-br-[12px] rounded-bl-[12px] shadow-[0_4px_15px_rgba(0,0,0,0.4)]"
          style={{ backgroundColor: folderBackColor }}
        >
          {/* Top Folder Tab */}
          <span
            className="absolute z-0 bottom-[98%] left-0 w-[36px] h-[12px] rounded-tl-[6px] rounded-tr-[6px]"
            style={{ backgroundColor: folderBackColor }}
          ></span>

          {/* Render fanning papers */}
          {papers.map((item, i) => {
            const sizeClasses = 'w-[82%] h-[92%]';

            const transformStyle = open
              ? `${getOpenTransform(i, maxItems)} translate(var(--paper-move-x, 0px), var(--paper-move-y, 0px))`
              : undefined;

            return (
              <div
                key={i}
                onMouseEnter={handlePaperMouseEnter}
                onMouseMove={handlePaperMouseMove}
                onMouseLeave={handlePaperMouseLeave}
                className={`absolute z-20 bottom-[8%] left-1/2 transition-all duration-300 ease-in-out select-none border border-slate-300/40 p-1 flex flex-col justify-between overflow-hidden shadow-md ${
                  !open
                    ? 'transform -translate-x-1/2 translate-y-[8%] group-hover:translate-y-0'
                    : 'hover:scale-[2.4] hover:z-50 hover:shadow-[0_15px_35px_rgba(0,0,0,0.65)] hover:border-[#FF5500]/60'
                } ${sizeClasses}`}
                style={{
                  ...(!open ? {} : { transform: transformStyle }),
                  backgroundColor: paperColors[i % paperColors.length],
                  borderRadius: '6px',
                  transformOrigin: '50% 50%'
                }}
              >
                {item}
              </div>
            );
          })}

          {/* Folder Front Cover - Left Half Cover */}
          <div
            className={`absolute z-30 w-full h-full origin-bottom transition-all duration-300 ease-in-out ${
              !open ? 'group-hover:[transform:skew(10deg)_scaleY(0.75)]' : ''
            }`}
            style={{
              backgroundColor: color,
              borderRadius: '6px 12px 12px 12px',
              borderTop: `1.5px solid ${darkenColor(color, -0.15)}`,
              ...(open && { transform: 'skew(10deg) scaleY(0.75)' })
            }}
          ></div>

          {/* Folder Front Cover - Right Half Cover */}
          <div
            className={`absolute z-30 w-full h-full origin-bottom transition-all duration-300 ease-in-out ${
              !open ? 'group-hover:[transform:skew(-10deg)_scaleY(0.75)]' : ''
            }`}
            style={{
              backgroundColor: color,
              borderRadius: '6px 12px 12px 12px',
              borderTop: `1.5px solid ${darkenColor(color, -0.15)}`,
              ...(open && { transform: 'skew(-10deg) scaleY(0.75)' })
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Folder;
