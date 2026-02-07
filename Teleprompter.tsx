
import React, { useState, useEffect } from 'react';

interface TeleprompterProps {
  isOpen: boolean;
  onClose: () => void;
  text: string;
}

const Teleprompter: React.FC<TeleprompterProps> = ({ isOpen, onClose, text }) => {
  const [scrollSpeed, setScrollSpeed] = useState(2); // 1 to 5
  const [fontSize, setFontSize] = useState(32); // 24 to 64
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center p-6 animate-in fade-in duration-300">
      {/* Controls Bar */}
      <div className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between bg-zinc-900/50 backdrop-blur-md border-b border-zinc-800">
        <div className="flex items-center gap-6">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] text-zinc-500 uppercase font-black">Scroll Speed</span>
            <input 
              type="range" min="0" max="10" step="0.5" 
              value={scrollSpeed} 
              onChange={(e) => setScrollSpeed(Number(e.target.value))}
              className="accent-cyan-500"
            />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] text-zinc-500 uppercase font-black">Font Size</span>
            <div className="flex gap-2">
              <button onClick={() => setFontSize(s => Math.max(20, s-4))} className="px-3 bg-zinc-800 rounded-lg">-</button>
              <button onClick={() => setFontSize(s => Math.min(80, s+4))} className="px-3 bg-zinc-800 rounded-lg">+</button>
            </div>
          </div>
        </div>
        
        <button 
          onClick={onClose}
          className="bg-red-500/10 text-red-400 px-6 py-2 rounded-full font-bold hover:bg-red-500/20 transition-all"
        >
          Exit Prompter
        </button>
      </div>

      {/* Main Reading Area */}
      <div className="w-full max-w-4xl h-[70vh] overflow-y-auto mt-20 p-10 mask-gradient no-scrollbar">
        <div className="flex flex-col items-center">
          {/* Visual Indicator of Reading Line */}
          <div className="fixed top-1/2 left-0 right-0 h-24 border-y border-cyan-500/20 pointer-events-none bg-cyan-500/5 -translate-y-1/2"></div>
          
          <div 
            className="text-center font-bold text-white whitespace-pre-wrap leading-relaxed pb-[50vh] pt-[40vh]"
            style={{ fontSize: `${fontSize}px` }}
          >
            {text}
          </div>
        </div>
      </div>

      <p className="mt-8 text-zinc-500 text-sm animate-pulse">
        Scroll manually or set speed to auto-scroll (Coming Soon)
      </p>
    </div>
  );
};

export default Teleprompter;
