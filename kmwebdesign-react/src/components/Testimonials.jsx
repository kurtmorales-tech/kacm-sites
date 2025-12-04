const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      quote:
        'Kmwebdesign transformed our vision into a stunning 3D digital experience that exceeded all expectations. Their attention to detail and technical expertise is unmatched.',
      author: 'Sarah Chen',
      title: 'CEO, TechVision Inc.',
      color: 'cyan',
    },
    {
      id: 2,
      quote:
        'Working with Kurt and the team was a game-changer. They brought our product to life in ways we never imagined possible. Truly innovative.',
      author: 'Michael Rodriguez',
      title: 'Founder, DigitalCraft',
      color: 'pink',
    },
    {
      id: 3,
      quote:
        'The level of creativity and technical skill is remarkable. Our website now stands out from competitors and has significantly improved user engagement.',
      author: 'Emma Thompson',
      title: 'Marketing Director, BrandGrow',
      color: 'cyan',
    },
  ];

  return (
    <section id="testimonials" className="py-20 px-6 md:px-20 relative">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-display font-bold">
          Client <span className="text-cyan-400">Validation</span>
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-pink-500 mx-auto mt-4"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className={`glass-panel p-8 rounded-xl border-b-4 border-${testimonial.color}-400 flex flex-col justify-between`}
          >
            <p className="text-lg text-gray-300 italic mb-6 testimonial-quote">
              {testimonial.quote}
            </p>
            <div>
              <p className={`font-bold text-${testimonial.color}-400`}>
                {testimonial.author}
              </p>
              <p className="text-sm text-gray-500">{testimonial.title}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
