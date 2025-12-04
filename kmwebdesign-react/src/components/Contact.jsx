import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    project: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', project: '', message: '' });
  };

  return (
    <section
      id="contact"
      className="min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-pink-500/20 blur-[100px] rounded-full -z-10"></div>

      <div className="w-full max-w-2xl glass-panel p-8 md:p-12 rounded-xl relative">
        <div className="absolute -top-6 -left-6 w-12 h-12 border-t-4 border-l-4 border-cyan-400"></div>
        <div className="absolute -bottom-6 -right-6 w-12 h-12 border-b-4 border-r-4 border-pink-500"></div>

        <h2 className="text-3xl md:text-5xl font-display font-bold mb-2 text-center">
          Start a Project
        </h2>
        <p className="text-center text-gray-400 mb-8">
          Let's build something impossible together.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold mb-2 text-cyan-400">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white placeholder-gray-600 focus:border-cyan-400 focus:outline-none transition-colors"
                placeholder="Your Name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2 text-cyan-400">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white placeholder-gray-600 focus:border-cyan-400 focus:outline-none transition-colors"
                placeholder="your@email.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold mb-2 text-cyan-400">
              Project Type
            </label>
            <input
              type="text"
              name="project"
              value={formData.project}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white placeholder-gray-600 focus:border-cyan-400 focus:outline-none transition-colors"
              placeholder="e.g., 3D Website, WebGL Experience"
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-2 text-cyan-400">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white placeholder-gray-600 focus:border-cyan-400 focus:outline-none transition-colors resize-none"
              placeholder="Tell us about your vision..."
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 font-bold tracking-widest hover:brightness-110 transition-all text-black mt-4 uppercase"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
