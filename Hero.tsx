
import React, { useState, useEffect } from 'react';

interface HeroProps {
  onStartClick: () => void;
}

const platforms = ['TikTok', 'Reels', 'Shorts', 'YouTube', 'Facebook', 'X / Twitter', 'Threads', 'LinkedIn'];

const Hero: React.FC<HeroProps> = ({ onStartClick }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % platforms.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="pt-40 pb-20 px-4 text-center">
      <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full px-4 py-2 mb-10 animate-pulse">
        <span className="text-[10px] font-black text-cyan-400 tracking-[0.2em] uppercase">Global AI Content Engine v5.0</span>
      </div>
      
      <h1 className="text-4xl md:text-7xl font-black tracking-tighter mb-8 leading-[1.1]">
        Go Viral on <span className="text-cyan-400">{platforms[index]}</span><br/>
        <span className="bg-gradient-to-r from-white via-zinc-400 to-white bg-clip-text text-transparent">
          The World's Smartest Script & Hashtag Generator.
        </span>
      </h1>
      
      <p className="max-w-3xl mx-auto text-lg md:text-xl text-zinc-500 mb-12 font-medium">
        YouTube se lekar Threads tak, har platform ke liye trending hashtags aur high-retention scripts. 
        Engineered to break global algorithms in <span className="text-white">50+ languages</span>.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
        <button 
          onClick={onStartClick}
          className="w-full sm:w-auto px-10 py-5 bg-cyan-500 hover:bg-cyan-400 text-black font-black rounded-2xl transition-all shadow-[0_20px_40px_rgba(6,182,212,0.3)] hover:scale-105 active:scale-95"
        >
          Start Creating Free
        </button>
        <div className="flex -space-x-4">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="w-12 h-12 rounded-full border-2 border-black bg-zinc-800 overflow-hidden">
              <img src={`https://i.pravatar.cc/100?u=global${i}`} alt="user" className="w-full h-full object-cover grayscale" />
            </div>
          ))}
          <div className="w-12 h-12 rounded-full border-2 border-black bg-cyan-500 flex items-center justify-center text-[10px] font-black text-black">
            25k+
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
