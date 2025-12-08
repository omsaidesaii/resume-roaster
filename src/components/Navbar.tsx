import React, { useState, useEffect } from 'react';
import { Flame, Github, Twitter, Linkedin } from 'lucide-react';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'py-4 bg-black/80 backdrop-blur-md border-b border-white/10 shadow-lg shadow-orange-900/5' 
          : 'py-6 bg-transparent border-b border-transparent'
      }`}
    >
      <div className="w-full px-4 md:px-8 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer group">
          <div className="bg-orange-600/20 p-2 rounded-lg border border-orange-500/30 group-hover:border-orange-500 transition-colors">
              <Flame className="w-5 h-5 text-orange-500" />
          </div>
          <span className="font-bold text-lg tracking-tight text-gray-200 group-hover:text-white transition-colors">
            Resume<span className="text-orange-500">Roaster</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-400">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a>
          <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
        </div>

        <div className="flex items-center gap-4">
          <a href="https://github.com/omsaidesaii" className="text-gray-400 hover:text-white transition-colors">
            <Github className="w-5 h-5" />
          </a>
          <a href="https://x.com/omsaidesai" className="text-gray-400 hover:text-white transition-colors">
            <Twitter className="w-5 h-5" />
          </a>
          <a href="https://www.linkedin.com/in/omsai-desai" className="text-gray-400 hover:text-white transition-colors">
            <Linkedin className="w-5 h-5" />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;