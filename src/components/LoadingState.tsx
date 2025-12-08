import React, { useEffect, useState } from 'react';
import { LOADING_MESSAGES } from '../constants';
import { Loader2 } from 'lucide-react';

const LoadingState: React.FC = () => {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const currentMsg = LOADING_MESSAGES[msgIndex];

  return (
    <div className="flex flex-col items-center justify-center p-12 text-center w-full max-w-2xl mx-auto">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-orange-500 rounded-full blur-xl opacity-20 animate-pulse"></div>
        <Loader2 className="w-16 h-16 text-orange-500 animate-spin relative z-10" />
      </div>
      
      <h3 className="text-2xl font-bold text-white mb-2 min-h-[40px] transition-all duration-300">
        {currentMsg.text}
      </h3>
      <p className="text-gray-400 text-lg min-h-[28px] italic transition-all duration-300">
        "{currentMsg.subtext}"
      </p>

      <div className="mt-8 flex gap-2">
        <div className="w-2 h-2 rounded-full bg-orange-500 animate-bounce" style={{ animationDelay: '0s' }}></div>
        <div className="w-2 h-2 rounded-full bg-orange-500 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-2 h-2 rounded-full bg-orange-500 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
      </div>
    </div>
  );
};

export default LoadingState;
