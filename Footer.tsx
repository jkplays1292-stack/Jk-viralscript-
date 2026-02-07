
import React from 'react';
import { FooterAdSlot } from './AdPlaceholders';

interface FooterProps {
  setView: (view: 'home' | 'privacy' | 'terms' | 'contact' | 'about') => void;
}

const Footer: React.FC<FooterProps> = ({ setView }) => {
  const linkedinUrl = "https://www.linkedin.com/in/javed-khan-b678503a6";
  const instagramUrl = "https://www.instagram.com/hawk.4994160?igsh=MWd5OWpqenEzeG9vZQ==";
  const xUrl = "https://x.com/plays_jk28017";

  return (
    <footer className="py-16 border-t border-zinc-900 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Footer Ad Slot - Optimized for AdSense Approval */}
        <div className="mb-16">
          <FooterAdSlot />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Column 1: Brand Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                <span className="text-black font-bold text-xl italic">V</span>
              </div>
              <span className="text-xl font-extrabold tracking-tighter text-white uppercase">
                Viral<span className="text-cyan-400">Script</span>
              </span>
            </div>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-xs">
              The ultimate AI content engine for creators who want to dominate the algorithm with high-retention viral scripts.
            </p>
          </div>

          {/* Column 2: Company */}
          <div className="space-y-6">
            <h3 className="text-xs font-black text-zinc-400 uppercase tracking-[0.2em] border-l-2 border-cyan-500 pl-3">Company</h3>
            <div className="flex flex-col gap-3">
              <button 
                onClick={() => setView('about')} 
                className="text-zinc-500 hover:text-white transition-colors text-sm text-left font-medium w-fit"
              >
                About Us
              </button>
              <button 
                onClick={() => setView('contact')} 
                className="text-zinc-500 hover:text-white transition-colors text-sm text-left font-medium w-fit"
              >
                Contact Us
              </button>
            </div>
          </div>

          {/* Column 3: Legal */}
          <div className="space-y-6">
            <h3 className="text-xs font-black text-zinc-400 uppercase tracking-[0.2em] border-l-2 border-cyan-500 pl-3">Legal</h3>
            <div className="flex flex-col gap-3">
              <button 
                onClick={() => setView('privacy')} 
                className="text-zinc-500 hover:text-white transition-colors text-sm text-left font-medium w-fit"
              >
                Privacy Policy
              </button>
              <button 
                onClick={() => setView('terms')} 
                className="text-zinc-500 hover:text-white transition-colors text-sm text-left font-medium w-fit"
              >
                Terms of Service
              </button>
            </div>
          </div>

          {/* Column 4: Social */}
          <div className="space-y-6">
            <h3 className="text-xs font-black text-zinc-400 uppercase tracking-[0.2em] border-l-2 border-cyan-500 pl-3">Social</h3>
            <div className="flex items-center gap-3">
              {/* Instagram */}
              <a 
                href={instagramUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 bg-zinc-900 border border-zinc-800 rounded-full flex items-center justify-center text-zinc-400 hover:text-white transition-all hover:scale-110 group relative"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5 group-hover:drop-shadow-[0_0_8px_rgba(228,64,95,0.6)]" viewBox="0 0 24 24" fill="currentColor">
                  <defs>
                    <linearGradient id="instagrad_footer" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" style={{ stopColor: '#f09433' }} />
                      <stop offset="25%" style={{ stopColor: '#e6683c' }} />
                      <stop offset="50%" style={{ stopColor: '#dc2743' }} />
                      <stop offset="75%" style={{ stopColor: '#cc2366' }} />
                      <stop offset="100%" style={{ stopColor: '#bc1888' }} />
                    </linearGradient>
                  </defs>
                  <path className="group-hover:fill-[url(#instagrad_footer)]" d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.805.249 2.227.412a4.902 4.902 0 0 1 1.822 1.185 4.902 4.902 0 0 1 1.185 1.822c.163.422.358 1.057.412 2.227.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.054 1.17-.249 1.805-.412 2.227a4.902 4.902 0 0 1-1.185 1.822 4.902 4.902 0 0 1-1.822 1.185c-.422.163-1.057.358-2.227.412-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.054-1.805-.249-2.227-.412a4.902 4.902 0 0 1-1.822-1.185 4.902 4.902 0 0 1-1.185-1.822c-.163-.422-.358-1.057-.412-2.227-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.054-1.17.249-1.805.412-2.227A4.902 4.902 0 0 1 4.823 4.823 4.902 4.902 0 0 1 6.645 3.638c.422-.163 1.057-.358 2.227-.412 1.266-.058 1.646-.07 4.85-.07M12 0C8.741 0 8.333.014 7.053.072 5.775.131 4.905.333 4.14.63a7.065 7.065 0 0 0-2.553 1.662A7.065 7.065 0 0 0 .63 4.14c-.297.765-.499 1.635-.558 2.913C.014 8.333 0 8.741 0 12c0 3.259.014 3.667.072 4.947.059 1.278.261 2.148.558 2.913a7.065 7.065 0 0 0 1.662 2.553 7.065 7.065 0 0 0 2.553 1.662c.765.297 1.635.499 2.913.558C8.333 23.986 8.741 24 12 24c3.259 0 3.667-.014 4.947-.072 1.278-.059 2.148-.261 2.913-.558a7.065 7.065 0 0 0 2.553-1.662 7.065 7.065 0 0 0 1.662-2.553c.297-.765.499-1.635.558-2.913.058-1.28.072-1.688.072-4.947s-.014-3.667-.072-4.947c-.059-1.278-.261-2.148-.558-2.913a7.065 7.065 0 0 0-1.662-2.553A7.065 7.065 0 0 0 19.86.63c-.765-.297-1.635-.499-2.913-.558C15.667.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                </svg>
              </a>
              {/* X (Twitter) */}
              <a 
                href={xUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 bg-zinc-900 border border-zinc-800 rounded-full flex items-center justify-center text-zinc-400 hover:text-white transition-all hover:scale-110"
                aria-label="X (Twitter)"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
                </svg>
              </a>
              {/* LinkedIn */}
              <a 
                href={linkedinUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 bg-zinc-900 border border-zinc-800 rounded-full flex items-center justify-center text-zinc-400 hover:text-[#0A66C2] transition-all hover:scale-110"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.454C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-zinc-900 gap-8">
          <p className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.3em] order-2 md:order-1">
            © {new Date().getFullYear()} ViralScript AI. All rights reserved.
          </p>
          
          <a 
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-zinc-900/50 border border-zinc-800 rounded-full px-5 py-2 hover:border-cyan-500/50 transition-all hover:bg-zinc-800 order-1 md:order-2 group"
          >
            <div className="w-6 h-6 rounded-full overflow-hidden border border-cyan-500/30 group-hover:border-cyan-400 transition-colors">
              <img 
                src="https://picsum.photos/seed/javed/100/100" 
                alt="Javed Khan" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" 
              />
            </div>
            <span className="text-[10px] font-bold text-zinc-400 tracking-tight">
              Built by a <span className="text-cyan-400 group-hover:text-cyan-300 transition-colors">Self-Taught AI Entrepreneur</span>
            </span>
            <svg className="w-3 h-3 text-zinc-600 group-hover:text-cyan-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
