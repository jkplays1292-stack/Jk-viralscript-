
import React from 'react';
import { UserProfile, UserType } from '../types';

interface NavbarProps {
  user: UserProfile | null;
  onLoginClick: () => void;
  onLogout: () => void;
  onUpgradeClick: () => void;
  onLogoClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLoginClick, onLogout, onUpgradeClick, onLogoClick }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <button onClick={onLogoClick} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.5)]">
              <span className="text-black font-bold text-xl italic">V</span>
            </div>
            <span className="text-xl font-extrabold tracking-tighter text-white">
              VIRAL<span className="text-cyan-400">SCRIPT</span>
            </span>
          </button>
          
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-full">
                  <span className="text-cyan-400 text-xs">⚡</span>
                  <span className="text-xs font-bold text-white">{user.credits_balance} Credits</span>
                </div>
                
                <div className="hidden md:flex items-center gap-4 ml-2">
                  <span className="text-xs text-zinc-500">{user.email}</span>
                  <button 
                    onClick={onLogout}
                    className="text-xs font-bold text-zinc-400 hover:text-white transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-zinc-400">
                <button onClick={onLogoClick} className="hover:text-cyan-400 transition-colors">Home</button>
                <button 
                  onClick={onLoginClick}
                  className="bg-zinc-100 hover:bg-white text-black px-4 py-2 rounded-full font-bold transition-all"
                >
                  Sign In
                </button>
              </div>
            )}

            {(!user || user.user_type === 'Free') && (
              <button 
                onClick={onUpgradeClick}
                className="bg-cyan-500 hover:bg-cyan-400 text-black px-4 py-2 rounded-full font-bold transition-all shadow-lg hover:shadow-cyan-500/25 text-xs"
              >
                Get Pro
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
