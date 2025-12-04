const About = () => {
  return (
    <section
      id="about"
      className="min-h-screen py-20 px-6 md:px-20 flex flex-col md:flex-row items-center gap-12 bg-black/20 backdrop-blur-sm"
    >
      <div className="w-full md:w-1/2"></div>
      <div className="w-full md:w-1/2 text-right">
        <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
          Meet the <span className="text-pink-500">Founder</span>
        </h2>
        <h3 className="text-2xl font-display font-bold text-cyan-400 mb-4">
          Kurt Anthony Morales
        </h3>
        <p className="text-xl text-gray-300 leading-relaxed mb-6">
          I am the Owner and Lead Web Designer behind Kmwebdesign. As a collective,
          we focus on digital artistry, creative coding, and 3D specialization. We
          don't just build websites; we build worlds that provide next-generation
          UI/UX experiences.
        </p>
        <div className="grid grid-cols-2 gap-4 text-left mt-8">
          <div className="glass-panel p-6 border-t-2 border-pink-500">
            <h4 className="font-display text-lg font-bold text-pink-500 mb-2">
              10+ Years
            </h4>
            <p className="text-sm text-gray-400">Web Design Experience</p>
          </div>
          <div className="glass-panel p-6 border-t-2 border-cyan-400">
            <h4 className="font-display text-lg font-bold text-cyan-400 mb-2">
              50+
            </h4>
            <p className="text-sm text-gray-400">Completed Projects</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
