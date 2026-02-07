
import React, { useState } from 'react';

interface RefillModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBuy: () => void;
  onWatchAd: () => void;
}

const RefillModal: React.FC<RefillModalProps> = ({ isOpen, onClose, onBuy, onWatchAd }) => {
  const [adLoading, setAdLoading] = useState(false);

  if (!isOpen) return null;

  const handleWatchAd = () => {
    setAdLoading(true);
    setTimeout(() => {
      setAdLoading(false);
      onWatchAd();
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in zoom-in duration-300">
      <div className="w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-[3rem] p-10 shadow-2xl relative text-center">
        <div className="w-20 h-20 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
          <svg className="w-10 h-10 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>

        <h2 className="text-3xl font-black text-white mb-4">Out of Credits</h2>
        <p className="text-zinc-400 text-lg mb-10">Script generation costs <span className="text-cyan-400 font-bold">15 credits</span>. Refill your balance to continue creating.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button 
            onClick={onBuy}
            className="p-6 bg-cyan-500 hover:bg-cyan-400 text-black rounded-[2rem] transition-all group hover:scale-[1.02]"
          >
            <div className="text-sm font-bold opacity-60 uppercase tracking-widest mb-1">Premium Refill</div>
            <div className="text-2xl font-black mb-2">500 Credits</div>
            <div className="text-xl font-bold bg-black/10 rounded-full px-4 py-1 inline-block">$9.00</div>
          </button>

          <button 
            onClick={handleWatchAd}
            disabled={adLoading}
            className="p-6 bg-zinc-800 hover:bg-zinc-750 text-white rounded-[2rem] border border-zinc-700 transition-all disabled:opacity-50"
          >
            <div className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-1">Watch Video Ad</div>
            <div className="text-2xl font-black mb-2">20 Credits</div>
            <div className="text-sm text-zinc-500">
              {adLoading ? 'Watching Ad...' : 'Free for everyone'}
            </div>
          </button>
        </div>

        <button onClick={onClose} className="mt-8 text-zinc-500 hover:text-white text-sm font-bold uppercase tracking-widest transition-colors">
          Dismiss
        </button>
      </div>
    </div>
  );
};

export default RefillModal;
