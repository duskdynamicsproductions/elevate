import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

const GRID_SIZE = 8; // tighter grid for higher density
const INTERACTION_RADIUS = 35; // moderate contour radius
const DECAY_RATE = 0.015; // slower decay for a slightly longer trail

const COLORS = ['rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0.6)', 'rgba(255, 255, 255, 0.3)']; // Only white

export default function AsciiCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  
  // Store active cells by a string key 'x,y'
  const activeCells = useRef(new Map<string, { x: number, y: number, life: number, color: string }>());
  const lastPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const checkMobile = () => {
      const hasMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(window.innerWidth <= 1024 || hasMobileUA);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let w = window.innerWidth;
    let h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;

    const onResize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
    };
    window.addEventListener('resize', onResize);

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, w, h);
      
      const cells = activeCells.current;
      
      ctx.font = 'bold 10px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      for (const [key, cell] of cells.entries()) {
        cell.life -= DECAY_RATE;
        
        if (cell.life <= 0) {
          cells.delete(key);
          continue;
        }

        ctx.globalAlpha = cell.life; 
        ctx.fillStyle = cell.color;
        ctx.fillText('.', cell.x, cell.y);
      }
      
      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const activateCellsInRadius = (cx: number, cy: number) => {
      // Find grid coordinates near cx, cy
      const startCol = Math.floor((cx - INTERACTION_RADIUS) / GRID_SIZE);
      const endCol = Math.ceil((cx + INTERACTION_RADIUS) / GRID_SIZE);
      const startRow = Math.floor((cy - INTERACTION_RADIUS) / GRID_SIZE);
      const endRow = Math.ceil((cy + INTERACTION_RADIUS) / GRID_SIZE);

      for (let c = startCol; c <= endCol; c++) {
        for (let r = startRow; r <= endRow; r++) {
          const px = c * GRID_SIZE;
          const py = r * GRID_SIZE;
          const dist = Math.hypot(px - cx, py - cy);
          
          if (dist <= INTERACTION_RADIUS) {
            const key = `${c},${r}`;
            // Closer to center = starts brighter
            const life = 1 - (dist / INTERACTION_RADIUS) * 0.3;
            const existing = activeCells.current.get(key);
            
            if (!existing) {
              const color = COLORS[Math.floor(Math.random() * COLORS.length)];
              activeCells.current.set(key, { x: px, y: py, life, color });
            } else if (existing.life < life) {
              existing.life = life;
            }
          }
        }
      }
    };

    const onMove = (e: MouseEvent) => {
      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;
      
      const dist = Math.hypot(dx, dy);
      const steps = Math.max(1, Math.floor(dist / (GRID_SIZE / 2))); // interpolate smoothly

      for (let i = 0; i <= steps; i++) {
        const px = lastPos.current.x + (dx * i) / steps;
        const py = lastPos.current.y + (dy * i) / steps;
        if (lastPos.current.x !== -100) {
          activateCellsInRadius(px, py);
        }
      }
      
      lastPos.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', onMove);

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isMobile]);

  useEffect(() => {
    activeCells.current.clear();
  }, [location.pathname]);

  if (isMobile) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed top-0 left-0 z-[9998] w-full h-full"
      aria-hidden="true"
    />
  );
}
