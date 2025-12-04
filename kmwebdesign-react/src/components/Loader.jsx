import { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Loader = () => {
  useEffect(() => {
    const loader = document.getElementById('loader');
    const bar = document.getElementById('progress-bar');

    let width = 0;
    const interval = setInterval(() => {
      width += Math.random() * 30;
      if (width > 100) width = 100;
      bar.style.width = width + '%';

      if (width === 100) {
        clearInterval(interval);
        setTimeout(() => {
          gsap.to(loader, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
              loader.style.display = 'none';
            },
          });
        }, 300);
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Scroll animations for glass panels - debounced
    let timeout;
    const setupAnimations = () => {
      document.querySelectorAll('.glass-panel').forEach((panel) => {
        gsap.from(panel, {
          scrollTrigger: {
            trigger: panel,
            start: 'top bottom',
            toggleActions: 'play none none reverse',
            once: false,
          },
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
        });
      });
    };

    // Delay setup to let DOM render
    timeout = setTimeout(setupAnimations, 100);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div id="loader" className="loader">
      <div className="w-64">
        <div className="font-display text-sm mb-2 text-cyan-400 tracking-widest text-center">
          INITIALIZING CORE...
        </div>
        <div className="w-full bg-gray-900 h-1 rounded-full overflow-hidden">
          <div id="progress-bar" className="loader-bar"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
