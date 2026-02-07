
import React, { useState, useEffect, useRef } from 'react';
import { generateViralScript, generateScriptAudio, generateHookVisual } from '../geminiService';
import { ViralScript, UserProfile } from '../types';
import { SidebarAd } from './AdPlaceholders';
import { authService } from '../services/authService';
import Teleprompter from './Teleprompter';

interface GeneratorProps {
  user: UserProfile | null;
  onTriggerAuth: () => void;
  onTriggerRefill: () => void;
  onCreditSync: (newBalance: number) => void;
}

const COST_PER_GENERATION = 10;
const BONUS_TIME_SECONDS = 1500;
const BONUS_REWARD_CREDITS = 10;
const HISTORY_KEY = 'viralscript_global_v5';
const BONUS_TARGET_KEY = 'viralscript_bonus_target';

const COUNTRIES = [
  { id: 'USA', flag: '🇺🇸', best_time: '7 PM EST' },
  { id: 'India', flag: '🇮🇳', best_time: '8 PM IST' },
  { id: 'UK', flag: '🇬🇧', best_time: '6 PM GMT' },
  { id: 'UAE', flag: '🇦🇪', best_time: '9 PM GST' }
];

const LANGUAGES = [
  "English (US)", "Hindi", "Spanish", "Arabic", "French", "German", "Portuguese", "Japanese", "Bengali"
];

const PLATFORMS = [
  { id: 'Instagram Reels', name: 'Reels', icon: '📸' },
  { id: 'TikTok', name: 'TikTok', icon: '🎵' },
  { id: 'YouTube', name: 'YouTube', icon: '📺' },
  { id: 'Facebook', name: 'Facebook', icon: '👥' },
  { id: 'LinkedIn Video', name: 'LinkedIn', icon: '💼' },
  { id: 'X Twitter', name: 'X / Twitter', icon: '🐦' },
  { id: 'Threads', name: 'Threads', icon: '🧵' },
  { id: 'Shorts', name: 'Shorts', icon: '📱' }
];

const Generator: React.FC<GeneratorProps> = ({ user, onTriggerAuth, onTriggerRefill, onCreditSync }) => {
  const [topic, setTopic] = useState('');
  const [platform, setPlatform] = useState(PLATFORMS[0].id);
  const [language, setLanguage] = useState(LANGUAGES[0]);
  const [loading, setLoading] = useState(false);
  const [script, setScript] = useState<ViralScript | null>(null);
  const [history, setHistory] = useState<ViralScript[]>([]);
  const [activeTab, setActiveTab] = useState<'script' | 'visuals' | 'hashtags' | 'analytics'>('script');
  const [isTeleprompterOpen, setIsTeleprompterOpen] = useState(false);
  const [hookImage, setHookImage] = useState<string | null>(null);
  const [isVisualizing, setIsVisualizing] = useState(false);
  const [isAudioLoading, setIsAudioLoading] = useState(false);
  const [copyStatus, setCopyStatus] = useState<string | null>(null);

  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);
  const [secondsRemaining, setSecondsRemaining] = useState(BONUS_TIME_SECONDS);
  const [canClaim, setCanClaim] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(HISTORY_KEY);
    if (saved) setHistory(JSON.parse(saved));

    const initializeTimer = () => {
      let targetTime = localStorage.getItem(BONUS_TARGET_KEY);
      const now = Date.now();
      if (!targetTime) {
        const newTarget = now + (BONUS_TIME_SECONDS * 1000);
        localStorage.setItem(BONUS_TARGET_KEY, newTarget.toString());
        targetTime = newTarget.toString();
      }
      const diff = Math.max(0, Math.floor((parseInt(targetTime) - now) / 1000));
      setSecondsRemaining(diff);
      if (diff === 0) setCanClaim(true);
    };

    initializeTimer();
    timerRef.current = window.setInterval(() => {
      if (document.hidden) return;
      setSecondsRemaining(prev => {
        if (prev <= 1) {
          setCanClaim(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const claimBonus = async () => {
    if (!user) { onTriggerAuth(); return; }
    const newBal = await authService.updateCredits(user.id, BONUS_REWARD_CREDITS);
    onCreditSync(newBal);
    const newTarget = Date.now() + (BONUS_TIME_SECONDS * 1000);
    localStorage.setItem(BONUS_TARGET_KEY, newTarget.toString());
    setSecondsRemaining(BONUS_TIME_SECONDS);
    setCanClaim(false);
  };

  const handleGenerate = async () => {
    if (!user) { onTriggerAuth(); return; }
    if (user.credits_balance < COST_PER_GENERATION) { onTriggerRefill(); return; }
    if (!topic.trim()) { alert("Please enter a topic first!"); return; }

    setLoading(true);
    setHookImage(null);
    try {
      const result = await generateViralScript({ topic, platform, tone: 'Viral', language });
      const newBal = await authService.updateCredits(user.id, -COST_PER_GENERATION);
      onCreditSync(newBal);
      setScript(result);
      const newHistory = [result, ...history].slice(0, 10);
      setHistory(newHistory);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
      
      setTimeout(() => {
        document.getElementById('result-area')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    } catch (e: any) {
      alert(`Error: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Robust Copy Function
  const copyToClipboard = async (text: string, label: string) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback for non-secure or older mobile browsers
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        textArea.style.top = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopyStatus(label);
      setTimeout(() => setCopyStatus(null), 2500);
    } catch (err) {
      alert("Please copy manually - your browser prevented automatic copying.");
    }
  };

  const handleCopyScript = () => {
    if (!script) return;
    const fullText = `HOOK: ${script.hook}\n\nCONTENT:\n${script.body}\n\nCTA: ${script.cta}`;
    copyToClipboard(fullText, "Script Copied!");
  };

  const handleCopyHashtags = () => {
    if (!script) return;
    const tags = script.hashtags.map(t => `#${t.trim().replace('#','')}`).join(' ');
    copyToClipboard(tags, "Hashtags Copied!");
  };

  const handleVisualizeHook = async () => {
    if (!script) return;
    setIsVisualizing(true);
    try {
      const img = await generateHookVisual(script.hook);
      setHookImage(img);
    } catch (e) {
      alert("Visual generation failed.");
    } finally {
      setIsVisualizing(false);
    }
  };

  const handleAudioPreview = async () => {
    if (!script) return;
    setIsAudioLoading(true);
    try {
      await generateScriptAudio(`${script.hook}. ${script.body}`);
      alert("AI Voice generated successfully!");
    } catch (e) {
      alert("Audio generation failed.");
    } finally {
      setIsAudioLoading(false);
    }
  };

  const progressPercent = ((BONUS_TIME_SECONDS - secondsRemaining) / BONUS_TIME_SECONDS) * 100;

  return (
    <section id="generator" className="py-20 px-4 max-w-7xl mx-auto">
      {/* Engagement Reward Banner */}
      <div className="mb-10 glass-card rounded-3xl p-6 border border-cyan-500/20 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative group">
        <div className="absolute inset-y-0 left-0 bg-cyan-500/5 transition-all duration-1000 ease-linear pointer-events-none" style={{ width: `${progressPercent}%` }}></div>
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-12 h-12 bg-cyan-500/10 rounded-2xl flex items-center justify-center text-cyan-400 shadow-inner">
            <svg className="w-6 h-6 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          </div>
          <div>
            <h4 className="text-white font-black uppercase text-[10px] tracking-widest flex items-center gap-2">Engagement Reward <span className="px-2 py-0.5 bg-cyan-500 text-black rounded-md text-[8px]">+{BONUS_REWARD_CREDITS} Credits</span></h4>
            <p className="text-zinc-500 text-xs">Stay active to claim your bonus.</p>
          </div>
        </div>
        <div className="flex items-center gap-6 relative z-10 w-full md:w-auto">
          {!canClaim && (
            <div className="flex flex-col items-end">
              <span className="text-cyan-400 font-mono font-black text-xl">{Math.floor(secondsRemaining / 60)}:{(secondsRemaining % 60).toString().padStart(2, '0')}</span>
            </div>
          )}
          <button onClick={claimBonus} disabled={!canClaim} className={`px-8 py-4 rounded-2xl font-black text-[10px] uppercase transition-all ${canClaim ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/30' : 'bg-zinc-800 text-zinc-600 cursor-not-allowed'}`}>
            {canClaim ? 'Collect 10 Credits' : 'Watching...'}
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-grow space-y-8">
          {/* Studio Input */}
          <div className="glass-card rounded-[3rem] p-6 md:p-10 border border-white/5 shadow-2xl">
            <h2 className="text-2xl font-black text-white tracking-tighter mb-10 flex items-center gap-4"><div className="w-2 h-8 bg-cyan-500 rounded-full"></div>Global Content Studio</h2>
            
            <div className="space-y-10">
              {/* Platform Selector */}
              <div className="space-y-4">
                <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest block ml-1">Select Target Platform</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {PLATFORMS.map(p => (
                    <button 
                      key={p.id} 
                      onClick={() => setPlatform(p.id)} 
                      className={`flex flex-col items-center p-4 rounded-2xl border transition-all duration-300 ${platform === p.id ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-400 scale-[1.02] shadow-xl shadow-cyan-500/5' : 'bg-zinc-900/40 border-transparent text-zinc-600 hover:border-zinc-800'}`}
                    >
                      <span className="text-2xl mb-2">{p.icon}</span> 
                      <span className="text-[10px] font-black uppercase tracking-tight">{p.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Language & Topic */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                   <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest block ml-1">Target Language</label>
                   <select 
                    value={language} 
                    onChange={(e) => setLanguage(e.target.value)} 
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-5 text-white focus:border-cyan-500 outline-none transition-all appearance-none cursor-pointer font-bold text-sm"
                   >
                      {LANGUAGES.map(lang => <option key={lang} value={lang}>{lang}</option>)}
                   </select>
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest block ml-1">What is your video about?</label>
                  <input 
                    type="text" 
                    value={topic} 
                    onChange={(e) => setTopic(e.target.value)} 
                    placeholder="E.g. How to grow on Instagram 2024..." 
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-5 text-white placeholder-zinc-700 focus:border-cyan-500 outline-none transition-all font-bold text-sm" 
                  />
                </div>
              </div>

              <button 
                onClick={handleGenerate} 
                disabled={loading} 
                className="w-full py-7 bg-cyan-500 hover:bg-cyan-400 text-black font-black text-lg rounded-3xl transition-all shadow-2xl shadow-cyan-500/30 disabled:opacity-30 disabled:cursor-not-allowed active:scale-95"
              >
                {loading ? 'AI Engine Calibrating...' : 'Generate Viral Content'}
              </button>
            </div>
          </div>

          {/* Results Area */}
          <div id="result-area">
            {script && (
              <div className="glass-card rounded-[3rem] overflow-hidden border border-white/5 relative shadow-2xl animate-in slide-in-from-bottom-10 duration-500">
                {/* Copy Status Notification */}
                {copyStatus && (
                  <div className="absolute top-6 right-6 z-50 bg-cyan-500 text-black px-6 py-3 rounded-2xl text-xs font-black uppercase shadow-2xl animate-in fade-in slide-in-from-top-4">
                    {copyStatus}
                  </div>
                )}

                <nav className="flex bg-zinc-900/40 border-b border-white/5">
                  {(['script', 'hashtags', 'visuals', 'analytics'] as const).map(tab => (
                    <button 
                      key={tab} 
                      onClick={() => setActiveTab(tab)} 
                      className={`flex-1 py-7 text-[10px] font-black uppercase tracking-widest relative transition-colors ${activeTab === tab ? 'text-cyan-400' : 'text-zinc-500 hover:text-zinc-300'}`}
                    >
                      {tab}
                      {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-1 bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.5)]"></div>}
                    </button>
                  ))}
                </nav>

                <div className="p-8 md:p-12">
                  {activeTab === 'script' && (
                    <div className="space-y-12 animate-in fade-in duration-300">
                      <div className="flex flex-wrap gap-4">
                        <button onClick={handleCopyScript} className="px-7 py-4 bg-white text-black rounded-2xl text-[10px] font-black uppercase hover:bg-zinc-200 transition-all flex items-center gap-2 shadow-lg active:scale-95">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
                          Copy Script
                        </button>
                        <button onClick={handleAudioPreview} disabled={isAudioLoading} className="px-7 py-4 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-2xl text-[10px] font-black uppercase hover:bg-cyan-500/20 transition-all">
                          {isAudioLoading ? 'Synthesizing...' : 'Voice Preview'}
                        </button>
                        <button onClick={handleVisualizeHook} disabled={isVisualizing} className="px-7 py-4 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-2xl text-[10px] font-black uppercase hover:bg-purple-500/20 transition-all">
                          {isVisualizing ? 'Thinking...' : 'Scene Frame'}
                        </button>
                      </div>

                      {hookImage && (
                        <div className="rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl animate-in zoom-in duration-500">
                          <img src={hookImage} alt="Hook Frame" className="w-full h-auto aspect-video object-cover" />
                        </div>
                      )}

                      <div className="space-y-10">
                        <div className="relative pl-10 border-l-4 border-cyan-500 bg-cyan-500/5 p-8 rounded-r-3xl">
                          <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest block mb-4">Phase 1: The Hook</span>
                          <p className="text-2xl md:text-3xl font-black text-white italic leading-tight">"{script.hook}"</p>
                        </div>
                        <div className="space-y-6">
                          <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest block ml-1">Phase 2: Narrative Flow</span>
                          <div className="bg-zinc-950/40 p-8 rounded-[2rem] border border-white/5">
                            <p className="text-zinc-300 leading-relaxed text-lg whitespace-pre-wrap font-medium">{script.body}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {activeTab === 'hashtags' && (
                    <div className="space-y-12 animate-in fade-in duration-300">
                      <button onClick={handleCopyHashtags} className="px-7 py-4 bg-cyan-500 text-black rounded-2xl text-[10px] font-black uppercase hover:bg-cyan-400 transition-all flex items-center gap-2 shadow-xl active:scale-95">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
                        Copy All Tags
                      </button>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="space-y-6">
                          <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block ml-1">Viral Algorithms</span>
                          <div className="flex flex-wrap gap-3">
                            {script.hashtags.map(t => (
                              <span key={t} className="px-4 py-2 bg-zinc-950 text-cyan-400 text-xs font-black rounded-xl border border-white/5">
                                #{t.trim().replace('#','')}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="space-y-6">
                          <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block ml-1">SEO Keywords</span>
                          <div className="flex flex-wrap gap-3">
                            {script.seo_tags.map(t => (
                              <span key={t} className="px-4 py-2 bg-zinc-900/50 text-zinc-500 text-xs font-bold rounded-xl border border-white/5">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'analytics' && (
                    <div className="space-y-12 animate-in fade-in duration-300">
                      <div className="flex flex-col md:flex-row items-center justify-between p-10 bg-zinc-950 rounded-[2.5rem] border border-white/5 gap-8">
                        <div>
                          <h4 className="text-5xl font-black text-white mb-2 tracking-tighter">{script.viral_score}%</h4>
                          <p className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.2em]">Viral Potential</p>
                        </div>
                        <div className="w-24 h-24 rounded-full border-4 border-cyan-500/10 flex items-center justify-center relative">
                          <div className="absolute inset-0 border-4 border-cyan-500 rounded-full border-t-transparent animate-spin"></div>
                          <span className="text-[10px] font-black uppercase text-center leading-tight">AI<br/>Insight</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-8 bg-zinc-900/40 rounded-3xl border border-white/5">
                          <span className="text-[9px] font-black text-zinc-600 uppercase block mb-4 tracking-widest">Hook Score</span>
                          <p className="text-sm text-zinc-300 leading-relaxed font-medium">{script.analysis.hook_strength}</p>
                        </div>
                        <div className="p-8 bg-zinc-900/40 rounded-3xl border border-white/5">
                          <span className="text-[9px] font-black text-zinc-600 uppercase block mb-4 tracking-widest">Retention</span>
                          <p className="text-sm text-zinc-300 leading-relaxed font-medium">{script.analysis.retention_factor}</p>
                        </div>
                        <div className="p-8 bg-zinc-900/40 rounded-3xl border border-white/5">
                          <span className="text-[9px] font-black text-zinc-600 uppercase block mb-4 tracking-widest">Global Reach</span>
                          <p className="text-sm text-zinc-300 leading-relaxed font-medium">{script.analysis.global_appeal}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'visuals' && (
                    <div className="space-y-6 animate-in fade-in duration-300">
                      {script.visual_scenes.map((s, i) => (
                        <div key={i} className="flex gap-8 p-8 bg-zinc-950/50 rounded-3xl border border-white/5 group">
                          <div className="flex flex-col items-center">
                            <span className="text-cyan-500 font-mono text-xs font-black px-3 py-1 bg-cyan-500/10 rounded-lg">{s.timestamp}</span>
                            <div className="w-px h-full bg-zinc-800 mt-2 group-last:hidden"></div>
                          </div>
                          <p className="text-zinc-400 text-sm leading-relaxed font-medium">{s.description}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Global Sidebar Tools */}
        <aside className="w-full lg:w-80 space-y-8">
          <div className="glass-card rounded-[3rem] p-8 border border-white/5 shadow-xl">
            <h3 className="text-[10px] font-black text-white uppercase tracking-widest mb-8 border-l-2 border-cyan-500 pl-4">Global Pulse</h3>
            <div className="space-y-8">
              <div className="grid grid-cols-2 gap-3">
                {COUNTRIES.map(c => (
                  <button 
                    key={c.id} 
                    onClick={() => setSelectedCountry(c)}
                    className={`px-4 py-3 rounded-2xl text-[10px] font-black transition-all ${selectedCountry.id === c.id ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20' : 'bg-zinc-900 text-zinc-500 hover:text-zinc-300'}`}
                  >
                    {c.flag} {c.id}
                  </button>
                ))}
              </div>
              <div className="p-8 bg-zinc-950 rounded-[2rem] border border-white/5 text-center">
                <span className="text-[8px] font-black text-zinc-600 uppercase block mb-2 tracking-[0.2em]">Peak Traffic Window</span>
                <p className="text-white font-black text-2xl tracking-tighter">{selectedCountry.best_time}</p>
                <div className="mt-6 flex items-center justify-center gap-3">
                   <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></div>
                   <span className="text-[9px] font-black text-green-500 uppercase tracking-widest">Surging Now</span>
                </div>
              </div>
            </div>
          </div>
          <SidebarAd />
        </aside>
      </div>

      <Teleprompter isOpen={isTeleprompterOpen} onClose={() => setIsTeleprompterOpen(false)} text={script ? `${script.hook}\n\n${script.body}` : ''} />
    </section>
  );
};

export default Generator;
