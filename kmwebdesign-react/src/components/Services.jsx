const Services = () => {
  const services = [
    {
      id: 1,
      title: 'WebGL Experiences',
      description:
        'Custom 3D shaders, particle systems, and fluid simulations that run directly in the browser using Three.js.',
      icon: '🎨',
      color: 'cyan',
    },
    {
      id: 2,
      title: 'UI/UX Design',
      description:
        'Futuristic interfaces grounded in solid usability principles. We design for the user of tomorrow, focusing on accessibility and immersive presentation.',
      icon: '✨',
      color: 'pink',
    },
    {
      id: 3,
      title: 'Creative Coding',
      description:
        'Generative art, interactive installations, and advanced algorithmic animations using libraries like GSAP and Three.js.',
      icon: '⚡',
      color: 'cyan',
    },
  ];

  return (
    <section id="services" className="min-h-screen py-20 px-6 md:px-20 relative">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-display font-bold">
          Our <span className="text-cyan-400">Services</span>
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-pink-500 mx-auto mt-4"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {services.map((service) => (
          <div
            key={service.id}
            className={`glass-panel p-8 group hover:bg-white/5 transition-all duration-500 hover:-translate-y-2 border border-white/5 hover:border-${service.color}-400/50`}
          >
            <div className={`h-16 w-16 bg-${service.color}-500/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform text-3xl`}>
              {service.icon}
            </div>
            <h3 className="text-xl font-bold mb-4 font-display">{service.title}</h3>
            <p className="text-gray-400">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
