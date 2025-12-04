const Work = () => {
  const projects = [
    {
      id: 1,
      title: 'Project KRONOS',
      description:
        'Interactive data visualization built with Three.js and custom GLSL shaders for real-time data analysis.',
      tags: ['WebGL', 'Data Viz'],
      color: 'cyan',
      borderColor: 'border-cyan-400',
    },
    {
      id: 2,
      title: 'Project NEXUS',
      description:
        'A high-fidelity e-commerce product experience featuring a 360° interactive view and material customization.',
      tags: ['3D E-Commerce', 'UI/UX'],
      color: 'pink',
      borderColor: 'border-pink-500',
    },
    {
      id: 3,
      title: 'Project AURORA',
      description:
        'A creative coding marketing site with a unique, ever-changing generative background system.',
      tags: ['Generative Art', 'GSAP Motion'],
      color: 'cyan',
      borderColor: 'border-cyan-400',
    },
  ];

  return (
    <section
      id="work"
      className="min-h-screen py-20 px-6 md:px-20 relative bg-black/40 backdrop-blur-sm"
    >
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-display font-bold">
          Featured <span className="text-pink-500">Work</span>
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-cyan-400 mx-auto mt-4"></div>
        <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
          A glimpse into our most complex and visually demanding digital creations,
          pushing the boundaries of WebGL and creative development.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {projects.map((project) => (
          <div
            key={project.id}
            className={`glass-panel p-6 rounded-xl group hover:scale-[1.02] transition-transform duration-300 border-l-4 ${project.borderColor}`}
          >
            <a href="#" className="block">
              <h3 className={`text-xl font-bold font-display mb-1 text-${project.color}-400`}>
                {project.title}
              </h3>
              <p className="text-sm text-gray-400 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className={`text-xs uppercase tracking-wider bg-${project.color}-400/20 text-${project.color}-200 px-2 py-1 rounded-full`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <button className="px-8 py-3 border border-white/20 text-white font-bold tracking-widest hover:border-pink-500 hover:bg-pink-500/10 transition-all uppercase">
          View Complete Case Studies
        </button>
      </div>
    </section>
  );
};

export default Work;
