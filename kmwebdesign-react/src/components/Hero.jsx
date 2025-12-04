const Hero = () => {
  return (
    <section
      id="home"
      className="h-screen w-full flex items-center justify-start px-6 md:px-20 relative"
    >
      <div className="max-w-4xl relative pointer-events-none">
        <h2 className="text-cyan-400 font-display tracking-[0.2em] text-sm mb-4 animate-fade-in-up">
          WELCOME TO THE FUTURE
        </h2>
        <h1 className="text-5xl md:text-8xl font-bold font-display leading-tight mb-6">
          <span className="glitch-wrapper" data-text="DESIGN">
            DESIGN
          </span>
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 neon-text-cyan">
            BEYOND
          </span>
          <br />
          REALITY
        </h1>
        <p className="text-gray-400 max-w-md text-lg mb-8 leading-relaxed glass-panel p-4 rounded-r-xl border-l-4 border-cyan-400 pointer-events-auto">
          Kmwebdesign crafts immersive digital experiences using cutting-edge 3D
          technology (WebGL, Three.js) and motion graphics.
        </p>
        <div className="flex gap-4 pointer-events-auto">
          <button className="bg-white text-black px-8 py-3 font-bold hover:bg-cyan-400 hover:scale-105 transition-all duration-300">
            Explore Work
          </button>
          <button className="border border-white/30 px-8 py-3 font-bold hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
            Learn More
          </button>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce">
        <span className="text-[10px] tracking-widest uppercase">Scroll</span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-cyan-400 to-transparent"></div>
      </div>
    </section>
  );
};

export default Hero;
