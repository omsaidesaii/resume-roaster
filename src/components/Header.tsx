import React from 'react';
import { Flame } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="py-6 text-center relative z-10 mb-6">
      <div className="flex flex-col items-center justify-center">
        <div className="inline-flex items-center gap-2 mb-4 bg-orange-900/20 border border-orange-500/20 rounded-full px-4 py-1.5 animate-fade-in">
           <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
           <span className="text-xs font-semibold text-orange-400 tracking-wider uppercase">Voted #1 Career Destroyer</span>
        </div>
        
        <div className="flex items-center justify-center gap-3 mb-4">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter uppercase italic leading-tight">
            <span className="text-white drop-shadow-2xl">Resume</span>
            <span className="fire-text ml-3 drop-shadow-red">Roaster </span>
          </h1>
        </div>

        <p className="text-gray-400 text-lg md:text-xl font-medium max-w-2xl px-4 leading-relaxed">
          Upload your resume and let AI roast your career choices in savage Hinglish. 
          <br className="hidden md:block" />
          <span className="text-orange-500/80"> Warning: Emotional damage guaranteed.</span>
        </p>
      </div>
    </header>
  );
};

export default Header;