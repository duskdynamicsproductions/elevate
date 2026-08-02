import { useEffect, useRef } from 'react';

export interface AsciiContourDividerProps {
  fill?: string;       // Background fill color (solid block at bottom)
  className?: string;
  height?: number;     // Total height of the transition in px
}

/**
 * AsciiContourDivider
 *
 * Renders a canvas-based halftone dot field that:
 *  - is completely transparent / absent at the very top
 *  - grows progressively denser with fullstops (.) as it descends
 *  - transitions to a solid block of `fill` color at the very bottom
 *  - reacts to scroll — the noise pattern shifts as the user scrolls
 *  - uses two alternating dot colors (orange + white) for a premium look
 */
export function AsciiContourDivider({
  fill = '#0C0B0B',
  className = '',
  height = 220,
}: AsciiContourDividerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    let w = 0;
    let h = height;

    const resize = () => {
      w = canvas.offsetWidth;
      h = height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    // Grid spacing – tighter = more dots
    const CELL = 9;
    // Font slightly smaller than cell so dots don't overlap
    const FONT_SIZE = 10;

    let rafId: number;

    const render = () => {
      ctx.clearRect(0, 0, w, h);

      // Scroll drives the phase of the noise → pattern shifts as you scroll
      const phase = window.scrollY * 0.012;

      const cols = Math.ceil(w / CELL) + 1;
      const rows = Math.ceil(h / CELL) + 1;

      ctx.font = `${FONT_SIZE}px monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      for (let r = 0; r < rows; r++) {
        const y = r * CELL + CELL / 2;

        // progressY: 0 at top, 1 at bottom
        const progressY = r / (rows - 1);

        // ── Exponential density ramp ───────────────────────────────────────
        // Cube the progressY so density is almost zero at top and
        // explodes rapidly at the bottom — exactly like the reference.
        const densityFactor = Math.pow(progressY, 2.2);

        for (let c = 0; c < cols; c++) {
          const x = c * CELL + CELL / 2;

          // ── Noise ─────────────────────────────────────────────────────────
          // Several sine waves at different frequencies / phases.
          // The phase variable (from scrollY) makes the pattern slide.
          const n =
            Math.sin(c * 0.13 + phase * 1.0) * 0.40 +
            Math.sin(r * 0.21 + phase * 0.7) * 0.35 +
            Math.sin((c * 0.07 - r * 0.09) + phase * 1.3) * 0.25;
          // n is roughly in [-1, 1]

          // ── Threshold ─────────────────────────────────────────────────────
          // As densityFactor rises from 0→1, threshold drops from 1.0 → -1.4
          // meaning fewer and fewer cells are skipped.
          // The -0.1 bias keeps the very top truly empty.
          const threshold = 1.0 - densityFactor * 2.4 - 0.1;

          if (n < threshold) continue; // dot is absent

          // ── Solid-fill zone ───────────────────────────────────────────────
          // Bottom 20%: pack cells solid so it merges into the bg colour.
          if (densityFactor > 0.80) {
            ctx.fillStyle = fill;
            ctx.fillRect(c * CELL, r * CELL, CELL, CELL);
            continue;
          }

          // ── Color: alternate orange / white per column for premium feel ──
          // Use a simple hash of column index so each column stays consistent
          // across frames, but adjacent columns differ.
          const useOrange = (c + Math.floor(n * 3)) % 3 !== 0;
          ctx.fillStyle = useOrange ? '#FF6200' : '#FDFCFA';

          ctx.fillText('.', x, y);
        }
      }

      rafId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafId);
    };
  }, [height, fill]);

  return (
    <div
      className={`relative w-full overflow-hidden ${className}`}
      style={{ height: `${height}px` }}
    >
      <canvas
        ref={canvasRef}
        className="block w-full"
        style={{ height: `${height}px` }}
        aria-hidden="true"
      />
    </div>
  );
}
