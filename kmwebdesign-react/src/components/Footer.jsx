const Footer = () => {
  return (
    <footer className="py-12 border-t border-white/10 bg-black relative z-10">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-2xl font-display font-bold tracking-wider">
          KM<span className="text-cyan-400">WD</span>
        </div>
        <div className="text-gray-500 text-sm">
          &copy; 2024 Kmwebdesign Studio, founded by Kurt Anthony Morales. All
          systems nominal.
        </div>
        <div className="flex gap-6">
          <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
            Instagram
          </a>
          <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
            Twitter
          </a>
          <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
