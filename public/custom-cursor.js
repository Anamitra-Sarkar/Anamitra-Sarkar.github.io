
document.addEventListener('DOMContentLoaded', () => {
  // Don't run on touch devices
  if (window.matchMedia('(pointer: coarse)').matches) {
    return;
  }

  // Hide the default body cursor
  document.body.style.cursor = 'none';

  const ring = document.createElement('div');
  const dot = document.createElement('div');

  // Styles for the cursor elements
  const baseRingStyle = 'position: fixed; top: 0; left: 0; pointer-events: none; z-index: 9999; width: 40px; height: 40px; border: 2px solid #18181b; border-radius: 50%; transform: translate(-50%, -50%); will-change: transform; transition: transform 0.2s, opacity 0.2s;';
  const darkRingStyle = 'position: fixed; top: 0; left: 0; pointer-events: none; z-index: 9999; width: 40px; height: 40px; border: 2px solid #fff; border-radius: 50%; transform: translate(-50%, -50%); will-change: transform; transition: transform 0.2s, opacity 0.2s;';
  const baseDotStyle = 'position: fixed; top: 0; left: 0; pointer-events: none; z-index: 9999; width: 8px; height: 8px; background-color: #18181b; border-radius: 50%; transform: translate(-50%, -50%); will-change: transform;';
  const darkDotStyle = 'position: fixed; top: 0; left: 0; pointer-events: none; z-index: 9999; width: 8px; height: 8px; background-color: #fff; border-radius: 50%; transform: translate(-50%, -50%); will-change: transform;';

  // Apply initial styles based on theme
  const isDarkMode = document.documentElement.classList.contains('dark');
  ring.style.cssText = isDarkMode ? darkRingStyle : baseRingStyle;
  dot.style.cssText = isDarkMode ? darkDotStyle : baseDotStyle;
  
  document.body.appendChild(ring);
  document.body.appendChild(dot);

  // Variables for cursor position
  let mouseX = -100;
  let mouseY = -100;
  let ringX = -100;
  let ringY = -100;

  // Track hover state
  let isHovering = false;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Check for hover state on interactive elements
    const target = e.target;
    if (target instanceof HTMLElement) {
      const isInteractive = target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button');
      if (isInteractive) {
        if (!isHovering) {
          isHovering = true;
          ring.style.transform = 'translate(-50%, -50%) scale(1.6)';
          ring.style.opacity = '0.5';
        }
      } else {
        if (isHovering) {
          isHovering = false;
          ring.style.transform = 'translate(-50%, -50%) scale(1)';
          ring.style.opacity = '0.8';
        }
      }
    }
  }, { passive: true });

  const animation = () => {
    // Dot follows mouse directly
    dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;

    // Ring uses linear interpolation for smooth delay
    const lerp = (start, end, amount) => (1 - amount) * start + amount * end;
    ringX = lerp(ringX, mouseX, 0.2);
    ringY = lerp(ringY, mouseY, 0.2);
    
    // Apply the ring's base transform plus the hover scale
    const baseTransform = `translate(${ringX - 20}px, ${ringY - 20}px)`;
    const scale = isHovering ? 'scale(1.6)' : 'scale(1)';
    ring.style.transform = `${baseTransform} ${scale}`;
    
    requestAnimationFrame(animation);
  };
  
  requestAnimationFrame(animation);

  // Handle theme changes
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === 'class') {
        const isDark = document.documentElement.classList.contains('dark');
        ring.style.cssText = isDark ? darkRingStyle : baseRingStyle;
        dot.style.cssText = isDark ? darkDotStyle : baseDotStyle;
        // Re-apply hover styles if needed
        if(isHovering) {
          ring.style.opacity = '0.5';
        } else {
          ring.style.opacity = '0.8';
        }
      }
    });
  });

  observer.observe(document.documentElement, { attributes: true });
});
