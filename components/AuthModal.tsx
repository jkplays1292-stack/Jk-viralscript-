
import React, { useState } from 'react';
import { authService } from '../services/authService';
import { UserProfile } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (user: UserProfile) => void;
}

const COUNTRIES = [
  { code: '+91', name: 'India', flag: '🇮🇳' },
  { code: '+1', name: 'USA/Canada', flag: '🇺🇸' },
  { code: '+44', name: 'UK', flag: '🇬🇧' },
  { code: '+971', name: 'UAE', flag: '🇦🇪' },
  { code: '+61', name: 'Australia', flag: '🇦🇺' },
  { code: '+49', name: 'Germany', flag: '🇩🇪' },
  { code: '+33', name: 'France', flag: '🇫🇷' },
  { code: '+81', name: 'Japan', flag: '🇯🇵' },
  { code: '+7', name: 'Russia', flag: '🇷🇺' },
  { code: '+55', name: 'Brazil', flag: '🇧🇷' },
  { code: '+39', name: 'Italy', flag: '🇮🇹' }
].sort((a,b) => a.name.localeCompare(b.name));

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onAuthSuccess }) => {
  const [method, setMethod] = useState<'email' | 'phone'>('email');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'input' | 'otp'>('input');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [demoOtp, setDemoOtp] = useState<string | null>(null);

  if (!isOpen) return null;

  const getIdentifier = () => method === 'email' ? email : `${countryCode}${phone}`;

  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const code = await authService.requestOTP(getIdentifier());
      setDemoOtp(code);
      setStep('otp');
    } catch (err: any) {
      setError(err.message || 'Failed to transmit OTP.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await authService.verifyOTP(getIdentifier(), otp);
      onAuthSuccess(user);
      onClose();
    } catch (err: any) {
      setError('Invalid authorization code.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const user = await authService.loginWithGoogle(`creator-${Math.floor(Math.random()*1000)}@viralscript.ai`);
      onAuthSuccess(user);
      onClose();
    } catch (err) {
      setError('Google Cloud sync failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="w-full max-w-md bg-zinc-900 border border-white/10 rounded-[3rem] p-10 relative overflow-hidden shadow-[0_0_100px_rgba(6,182,212,0.15)]">
        <button onClick={onClose} className="absolute top-8 right-8 text-zinc-600 hover:text-white transition-all"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg></button>

        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-cyan-500/20 rotate-6">
            <span className="text-black font-black text-3xl italic">V</span>
          </div>
          <h2 className="text-2xl font-black text-white tracking-tighter uppercase mb-2">Creator Identity</h2>
          <p className="text-zinc-500 text-[10px] font-black tracking-widest uppercase">Secure Multi-Channel Authentication</p>
        </div>

        {error && <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl text-[10px] font-black uppercase text-center animate-bounce">{error}</div>}
        
        {demoOtp && step === 'otp' && (
          <div className="mb-6 p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl text-center">
            <p className="text-[9px] text-zinc-500 uppercase font-black mb-1">Authorization Code</p>
            <span className="text-cyan-400 font-black text-2xl tracking-[0.5em]">{demoOtp}</span>
          </div>
        )}

        <div className="space-y-6">
          {step === 'input' ? (
            <>
              <button onClick={handleGoogleLogin} className="w-full py-4 bg-white text-black font-black text-sm rounded-2xl flex items-center justify-center gap-3 hover:bg-zinc-200 transition-all active:scale-95 shadow-lg">
                <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                Sign in with Google
              </button>

              <div className="flex bg-zinc-950 p-1.5 rounded-2xl border border-white/5">
                <button onClick={() => setMethod('email')} className={`flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${method === 'email' ? 'bg-zinc-800 text-white' : 'text-zinc-600'}`}>Email</button>
                <button onClick={() => setMethod('phone')} className={`flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${method === 'phone' ? 'bg-zinc-800 text-white' : 'text-zinc-600'}`}>Phone</button>
              </div>

              <form onSubmit={handleRequestOtp} className="space-y-4">
                {method === 'email' ? (
                  <input type="email" required placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-4 text-white placeholder-zinc-700 focus:border-cyan-500 outline-none transition-all font-medium text-sm" />
                ) : (
                  <div className="flex gap-2">
                    <select value={countryCode} onChange={(e) => setCountryCode(e.target.value)} className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4 text-white text-xs focus:border-cyan-500 outline-none appearance-none cursor-pointer">
                      {COUNTRIES.map(c => <option key={c.code} value={c.code}>{c.flag} {c.code}</option>)}
                    </select>
                    <input type="tel" required placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))} className="flex-grow bg-zinc-950 border border-zinc-800 rounded-2xl p-4 text-white placeholder-zinc-700 focus:border-cyan-500 outline-none transition-all font-medium text-sm" />
                  </div>
                )}
                <button type="submit" disabled={loading} className="w-full py-5 bg-cyan-500 text-black font-black text-sm rounded-2xl hover:bg-cyan-400 transition-all shadow-xl shadow-cyan-500/20 disabled:opacity-20">{loading ? 'Transmitting...' : 'Request Access Code'}</button>
              </form>
            </>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-8 animate-in zoom-in duration-300">
              <input type="text" maxLength={6} required autoFocus placeholder="000000" value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))} className="w-full bg-zinc-950 border border-zinc-800 rounded-3xl p-6 text-center text-4xl font-black tracking-[0.5em] text-cyan-400 focus:border-cyan-500 outline-none transition-all" />
              <button type="submit" disabled={loading || otp.length !== 6} className="w-full py-5 bg-cyan-500 text-black font-black text-sm rounded-2xl hover:bg-cyan-400 transition-all shadow-xl shadow-cyan-500/20 disabled:opacity-20">{loading ? 'Verifying...' : 'Authorize'}</button>
              <button type="button" onClick={() => setStep('input')} className="w-full text-[9px] font-black text-zinc-600 uppercase tracking-widest hover:text-white transition-colors text-center">Cancel Request</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
