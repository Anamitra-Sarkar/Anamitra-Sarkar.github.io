import React, { useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useScrollData } from '../providers/ScrollProvider';
import { useMotionValueEvent } from 'framer-motion';

// Color conversion helpers
function rgbToHsl(r, g, b) {
    r /= 255, g /= 255, b /= 255;
    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    if (max == min) {
        h = s = 0; // achromatic
    } else {
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return [h * 360, s, l];
}

function hslToRgb(h, s, l) {
    let r, g, b;
    h /= 360;
    if (s == 0) {
        r = g = b = l; // achromatic
    } else {
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1/6) return p + (q - p) * 6 * t;
            if (t < 1/2) return q;
            if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }
        let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        let p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }
    return [r * 255, g * 255, b * 255];
}

export const AmbientBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const { springScrollY } = useScrollData();
  const scrollYRef = useRef(0);

  // Subscribe to the motion value to get the latest scrollY without re-rendering
  useMotionValueEvent(springScrollY, "change", (latest) => {
    scrollYRef.current = latest;
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };
    
    resize();
    window.addEventListener('resize', resize);

    const initialRibbons = [
      { r: 249, g: 115, b: 22, speed: 0.005, period: 200, amplitude: 80, yOffset: 0, width: 100, phase: 0 },
      { r: 20, g: 184, b: 166, speed: 0.007, period: 250, amplitude: 60, yOffset: 60, width: 80, phase: 2 },
      { r: 139, g: 92, b: 246, speed: 0.006, period: 180, amplitude: 90, yOffset: -60, width: 90, phase: 4 },
      { r: 236, g: 72, b: 153, speed: 0.004, period: 300, amplitude: 50, yOffset: 30, width: 60, phase: 1 },
    ].map(r => ({ ...r, hsl: rgbToHsl(r.r, r.g, r.b) }));

    const draw = () => {
      if (!canvas || !ctx) return;

      const w = window.innerWidth;
      const h = window.innerHeight;
      
      ctx.clearRect(0, 0, w, h);
      
      const centerY = h / 2;

      ctx.globalCompositeOperation = theme === 'dark' ? 'screen' : 'multiply';
      const alphaBase = theme === 'dark' ? 0.15 : 0.12;
      
      time += 0.5;

      const scrollHueShift = scrollYRef.current / 30; // 1 degree shift every 30px of scroll

      initialRibbons.forEach((ribbon) => {
        ctx.beginPath();

        const [h, s, l] = ribbon.hsl;
        const currentHue = (h + scrollHueShift) % 360;
        const [r, g, b] = hslToRgb(currentHue, s, l);
        
        const gradient = ctx.createLinearGradient(0, centerY - 100, 0, centerY + 100);
        const colorStr = `${r.toFixed(0)}, ${g.toFixed(0)}, ${b.toFixed(0)}`;
        
        gradient.addColorStop(0, `rgba(${colorStr}, 0)`);
        gradient.addColorStop(0.5, `rgba(${colorStr}, ${alphaBase})`);
        gradient.addColorStop(1, `rgba(${colorStr}, 0)`);
        
        ctx.fillStyle = gradient;
        
        for (let x = 0; x <= w; x += 10) {
          const wave = Math.sin((x + time * ribbon.speed * 100) / ribbon.period) * ribbon.amplitude;
          const wave2 = Math.sin((x + time * ribbon.speed * 50) / (ribbon.period * 0.5)) * (ribbon.amplitude * 0.3);
          const y = centerY + ribbon.yOffset + wave + wave2;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        for (let x = w; x >= 0; x -= 10) {
           const wave = Math.sin((x + time * ribbon.speed * 100) / ribbon.period + ribbon.phase) * ribbon.amplitude;
           const wave2 = Math.sin((x + time * ribbon.speed * 50) / (ribbon.period * 0.5)) * (ribbon.amplitude * 0.3);
           const twist = Math.cos((x + time * 0.5) / 150) * 20; 
           const y = centerY + ribbon.yOffset + wave + wave2 + ribbon.width + twist;
           ctx.lineTo(x, y);
        }

        ctx.closePath();
        ctx.fill();
      });

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, [theme]); // Rerun effect if theme changes

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-warm-50 dark:bg-stone-950 transition-colors duration-500">
        <canvas 
            ref={canvasRef} 
            className="block w-full h-full"
            style={{ willChange: 'transform' }}
        />
    </div>
  );
};