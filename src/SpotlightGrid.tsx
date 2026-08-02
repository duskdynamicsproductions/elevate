import { useEffect, useRef } from 'react';

type SpotlightGridProps = {
  gridSize?: number;
  spotlightRadius?: number;
  gridColor?: string;
  glowColor?: string;
};

export function SpotlightGrid({
  gridSize = 48,
  spotlightRadius = 200,
  gridColor = 'rgba(255, 255, 255, 0.04)',
  glowColor = '255, 98, 0', // RGB format for rgba
}: SpotlightGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let mouseX = -1000;
    let mouseY = -1000;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    let animFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const width = canvas.width;
      const height = canvas.height;

      // Draw base dark grid
      ctx.strokeStyle = gridColor;
      ctx.lineWidth = 1;

      ctx.beginPath();
      for (let x = 0; x <= width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0; y <= height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // Draw reactive mouse spotlight glow on grid
      if (mouseX >= 0 && mouseY >= 0) {
        const startX = Math.max(0, Math.floor((mouseX - spotlightRadius) / gridSize) * gridSize);
        const endX = Math.min(width, Math.ceil((mouseX + spotlightRadius) / gridSize) * gridSize);
        const startY = Math.max(0, Math.floor((mouseY - spotlightRadius) / gridSize) * gridSize);
        const endY = Math.min(height, Math.ceil((mouseY + spotlightRadius) / gridSize) * gridSize);

        for (let x = startX; x <= endX; x += gridSize) {
          for (let y = startY; y <= endY; y += gridSize) {
            const dx = x - mouseX;
            const dy = y - mouseY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < spotlightRadius) {
              const intensity = (1 - dist / spotlightRadius);
              
              // Draw glowing grid node intersection
              ctx.fillStyle = `rgba(${glowColor}, ${intensity * 0.7})`;
              ctx.beginPath();
              ctx.arc(x, y, 2.5 * intensity + 1, 0, Math.PI * 2);
              ctx.fill();

              // Draw glowing line segments
              ctx.strokeStyle = `rgba(${glowColor}, ${intensity * 0.35})`;
              ctx.lineWidth = 1.5;
              ctx.beginPath();
              ctx.moveTo(x - gridSize / 2, y);
              ctx.lineTo(x + gridSize / 2, y);
              ctx.moveTo(x, y - gridSize / 2);
              ctx.lineTo(x, y + gridSize / 2);
              ctx.stroke();
            }
          }
        }
      }

      animFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animFrameId);
    };
  }, [gridSize, spotlightRadius, gridColor, glowColor]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 opacity-80"
    />
  );
}
