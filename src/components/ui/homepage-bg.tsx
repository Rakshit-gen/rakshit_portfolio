"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
}

export function HomepageBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    // Create particles
    const w = window.innerWidth;
    const h = window.innerHeight;
    const count = Math.min(Math.floor(w / 8), 160);
    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      radius: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.4 + 0.1,
    }));

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouse, { passive: true });

    const connectionDistance = 120;
    const mouseDistance = 180;

    const draw = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      ctx.clearRect(0, 0, vw, vh);
      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off edges
        if (p.x < 0 || p.x > vw) p.vx *= -1;
        if (p.y < 0 || p.y > vh) p.vy *= -1;

        // Mouse repulsion
        const dmx = p.x - mouse.x;
        const dmy = p.y - mouse.y;
        const dm = Math.sqrt(dmx * dmx + dmy * dmy);
        if (dm < mouseDistance && dm > 0) {
          const force = (mouseDistance - dm) / mouseDistance * 0.02;
          p.vx += (dmx / dm) * force;
          p.vy += (dmy / dm) * force;
        }

        // Clamp velocity
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > 0.5) {
          p.vx = (p.vx / speed) * 0.5;
          p.vy = (p.vy / speed) * 0.5;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 212, 255, ${p.opacity})`;
        ctx.fill();

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const alpha = (1 - dist / connectionDistance) * 0.15;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 212, 255, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }

        // Mouse connections
        if (dm < mouseDistance) {
          const alpha = (1 - dm / mouseDistance) * 0.3;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(255, 179, 71, ${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
    };
  }, []);

  return (
    <>
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
        style={{ opacity: 0.6 }}
      />

      {/* Ambient gradient blobs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-[var(--color-accent)] rounded-full opacity-[0.02] blur-[150px] animate-[drift1_20s_ease-in-out_infinite]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-[var(--color-accent-warm)] rounded-full opacity-[0.025] blur-[130px] animate-[drift2_25s_ease-in-out_infinite]" />
        <div className="absolute top-[40%] right-[20%] w-[300px] h-[300px] bg-[var(--color-success)] rounded-full opacity-[0.015] blur-[120px] animate-[drift3_18s_ease-in-out_infinite]" />
      </div>
    </>
  );
}
