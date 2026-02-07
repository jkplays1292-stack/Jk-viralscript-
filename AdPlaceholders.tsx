
import React from 'react';

export const BannerAd: React.FC = () => (
  <div className="w-full max-w-4xl mx-auto h-28 bg-zinc-900/40 border border-dashed border-zinc-800 rounded-2xl flex flex-col items-center justify-center my-8 group overflow-hidden relative">
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-800/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
    <span className="text-[10px] font-black tracking-[0.3em] text-zinc-700 uppercase mb-2">Advertisement</span>
    <div className="text-zinc-500 font-bold text-xs">Google AdSense Space</div>
    <div className="text-[9px] text-zinc-800 mt-2 font-medium">Remove these ads with Pro membership</div>
  </div>
);

export const GeneratorAdSlot: React.FC = () => (
  <div className="w-full h-32 bg-zinc-950/80 border border-zinc-800 rounded-2xl flex flex-col items-center justify-center mb-10 border-dashed hover:border-cyan-500/20 transition-colors group">
    <span className="text-[9px] font-bold text-zinc-700 uppercase tracking-widest mb-2">Ad Slot #1 (Manual Placement)</span>
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded bg-zinc-900 animate-pulse"></div>
      <div className="space-y-2">
        <div className="w-32 h-2 bg-zinc-900 rounded"></div>
        <div className="w-24 h-2 bg-zinc-900 rounded opacity-50"></div>
      </div>
    </div>
  </div>
);

export const FooterAdSlot: React.FC = () => (
  <div className="w-full max-w-5xl mx-auto h-20 bg-zinc-900/30 border border-zinc-800 rounded-xl flex items-center justify-center border-dashed">
    <span className="text-[9px] font-black text-zinc-700 uppercase tracking-[0.4em]">Footer Ad Container</span>
  </div>
);

export const SidebarAd: React.FC = () => (
  <div className="w-full aspect-[4/5] bg-zinc-900/40 border border-dashed border-zinc-800 rounded-[2rem] flex flex-col items-center justify-center p-6 text-center">
    <span className="text-[10px] font-bold tracking-widest text-zinc-600 uppercase mb-4">Sponsored Area</span>
    <div className="w-full h-full bg-zinc-950/50 rounded-2xl flex flex-col items-center justify-center text-zinc-600 text-[10px] p-6 leading-relaxed border border-zinc-900">
      <svg className="w-12 h-12 mb-4 opacity-20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
      This space is reserved for AdSense Contextual Ads. 
      <br/><br/>
      Basic & Pro users see a clean dashboard instead.
    </div>
  </div>
);
