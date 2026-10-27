'use client';

import { useRef, useState, type ReactNode } from 'react';

interface InteractiveCardProps {
  children: ReactNode;
}

export function InteractiveCard({ children }: InteractiveCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [mouseX, setMouseX] = useState(50);
  const [mouseY, setMouseY] = useState(50);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateXValue = ((y - centerY) / centerY) * -3;
    const rotateYValue = ((x - centerX) / centerX) * 3;

    const mouseXPercent = (x / rect.width) * 100;
    const mouseYPercent = (y / rect.height) * 100;

    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
    setMouseX(mouseXPercent);
    setMouseY(mouseYPercent);
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovering(false);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition:
          rotateX === 0 && rotateY === 0
            ? 'transform 0.5s ease-out, box-shadow 0.3s ease-out'
            : 'transform 0s',
        boxShadow: isHovering
          ? `${(mouseX - 50) * 0.4}px ${(mouseY - 50) * 0.4}px 40px rgba(0, 0, 0, 0.12), 0 20px 70px rgba(0, 0, 0, 0.25)`
          : '0 20px 70px rgba(0, 0, 0, 0.25)',
      }}
      className="group absolute inset-0 flex flex-col overflow-hidden rounded-xl border border-fd-border/60 bg-fd-background/80 backdrop-blur dark:shadow-2xl"
    >
      {children}

      {/* Glow effect on hover - dark mode (white) */}
      <div
        className="pointer-events-none absolute -inset-[1px] rounded-xl opacity-0 blur transition-opacity duration-300 hidden dark:block"
        style={{
          opacity: isHovering ? 0.4 : 0,
          background: `radial-gradient(600px circle at ${mouseX}% ${mouseY}%, rgba(255, 255, 255, 0.1), transparent 40%)`,
        }}
      />
    </div>
  );
}
