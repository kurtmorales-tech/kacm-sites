import { useRef, useEffect } from 'react';

const Navigation = ({ onNavClick }) => {
  const navRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.target.id === 'home' && !entry.isIntersecting) {
          navRef.current?.classList.add('bg-black/50', 'backdrop-blur-md');
        } else {
          navRef.current?.classList.remove('bg-black/50', 'backdrop-blur-md');
        }
      },
      { threshold: 0.1 }
    );

    const homeSection = document.getElementById('home');
    if (homeSection) observer.observe(homeSection);

    return () => observer.disconnect();
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 w-full z-40 px-6 py-4 flex justify-between items-center mix-blend-difference text-white transition-all"
    >
      <a href="#home" className="font-display font-bold text-xl tracking-wider hover:text-cyan-400 transition-colors">
        KM<span className="text-cyan-400">WD</span>
      </a>

      <div className="hidden md:flex gap-8 text-sm font-medium tracking-wide">
        <a href="#about" className="hover:text-cyan-400 transition-colors relative group">
          ABOUT
          <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-cyan-400 transition-all group-hover:w-full"></span>
        </a>
        <a href="#services" className="hover:text-pink-500 transition-colors relative group">
          SERVICES
          <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-pink-500 transition-all group-hover:w-full"></span>
        </a>
        <a href="#work" className="hover:text-cyan-400 transition-colors relative group">
          WORK
          <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-cyan-400 transition-all group-hover:w-full"></span>
        </a>
        <a href="#testimonials" className="hover:text-pink-500 transition-colors relative group">
          TESTIMONIALS
          <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-pink-500 transition-all group-hover:w-full"></span>
        </a>
      </div>

      <button
        onClick={() => {
          const contact = document.getElementById('contact');
          contact?.scrollIntoView({ behavior: 'smooth' });
        }}
        className="hidden md:block px-6 py-2 border border-white/20 hover:border-cyan-400 hover:bg-cyan-400/10 hover:text-cyan-400 transition-all text-xs font-bold tracking-widest uppercase rounded-sm"
      >
        Start Project
      </button>

      <button className="md:hidden text-2xl">☰</button>
    </nav>
  );
};

export default Navigation;
