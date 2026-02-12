import React, { useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';

export const AmbientBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

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
      // Reset transform before applying new scale
      ctx.setTransform(1, 0, 0, 1, 0, 0); 
      ctx.scale(dpr, dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };
    
    // Initial resize
    resize();
    window.addEventListener('resize', resize);

    // Configuration for the silk ribbons
    const ribbons = [
      { r: 249, g: 115, b: 22, speed: 0.005, period: 200, amplitude: 80, yOffset: 0, width: 100, phase: 0 },
      { r: 20, g: 184, b: 166, speed: 0.007, period: 250, amplitude: 60, yOffset: 60, width: 80, phase: 2 },
      { r: 139, g: 92, b: 246, speed: 0.006, period: 180, amplitude: 90, yOffset: -60, width: 90, phase: 4 },
      { r: 236, g: 72, b: 153, speed: 0.004, period: 300, amplitude: 50, yOffset: 30, width: 60, phase: 1 },
    ];

    const draw = () => {
      // Safety check if canvas or context was lost
      if (!canvas || !ctx) return;

      const w = window.innerWidth;
      const h = window.innerHeight;
      
      // Clear with transparency
      ctx.clearRect(0, 0, w, h);
      
      const centerY = h / 2;

      // Use screen blend mode for glowing effect in dark mode
      ctx.globalCompositeOperation = theme === 'dark' ? 'screen' : 'multiply';
      const alphaBase = theme === 'dark' ? 0.15 : 0.12;
      
      // Increment time for animation
      time += 0.5;

      ribbons.forEach((ribbon) => {
        ctx.beginPath();
        
        // Create gradient based on current screen height
        const gradient = ctx.createLinearGradient(0, centerY - 100, 0, centerY + 100);
        const colorStr = `${ribbon.r}, ${ribbon.g}, ${ribbon.b}`;
        
        gradient.addColorStop(0, `rgba(${colorStr}, 0)`);
        gradient.addColorStop(0.5, `rgba(${colorStr}, ${alphaBase})`);
        gradient.addColorStop(1, `rgba(${colorStr}, 0)`);
        
        ctx.fillStyle = gradient;
        
        // Draw the top edge
        for (let x = 0; x <= w; x += 10) {
          const wave = Math.sin((x + time * ribbon.speed * 100) / ribbon.period) * ribbon.amplitude;
          const wave2 = Math.sin((x + time * ribbon.speed * 50) / (ribbon.period * 0.5)) * (ribbon.amplitude * 0.3);
          const y = centerY + ribbon.yOffset + wave + wave2;

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        // Draw the bottom edge (reverse x)
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
  }, [theme]);

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