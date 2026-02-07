
import React, { useState } from 'react';
import { UserType, UserProfile } from '../types';
import { paymentService } from '../paymentService';
interface PricingProps {
  user: UserProfile | null;
  onUpgrade: (tier: UserType) => void;
  onAuthTrigger: () => void;
}

const Pricing: React.FC<PricingProps> = ({ user, onUpgrade, onAuthTrigger }) => {
  const [isYearly, setIsYearly] = useState(false);
  const [isPaying, setIsPaying] = useState<string | null>(null);

  const plans = {
    monthly: {
      basic: { price: 499, tier: 'Basic' as UserType, credits: 500 },
      pro: { price: 999, tier: 'Pro' as UserType, credits: 2000 }
    },
    yearly: {
      basic: { price: 3999, tier: 'Basic' as UserType, credits: 6000 },
      pro: { price: 7999, tier: 'Pro' as UserType, credits: 25000 }
    }
  };

  const handleSubscribe = (tier: UserType) => {
    if (!user) {
      onAuthTrigger();
      return;
    }

    const plan = isYearly ? plans.yearly : plans.monthly;
    const selectedPlan = tier === 'Basic' ? plan.basic : plan.pro;

    setIsPaying(tier);
    
    initializeRazorpayPayment({
      amount: selectedPlan.price,
      tier: tier,
      user: user,
      onSuccess: (response) => {
        setIsPaying(null);
        onUpgrade(tier);
        alert(`Payment Successful! Transaction ID: ${response.razorpay_payment_id}`);
      },
      onCancel: () => {
        setIsPaying(null);
      }
    });
  };

  const currentPrices = isYearly ? plans.yearly : plans.monthly;

  return (
    <section id="pricing" className="py-24 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter">Choose Your Power</h2>
        <p className="text-zinc-500 mb-10 max-w-xl mx-auto">Unleash the full potential of global AI algorithms with a professional membership.</p>
        
        <div className="flex items-center justify-center gap-6">
          <span className={`text-xs font-black uppercase tracking-widest ${!isYearly ? 'text-white' : 'text-zinc-600'}`}>Monthly</span>
          <button 
            onClick={() => setIsYearly(!isYearly)}
            className="w-16 h-8 bg-zinc-900 rounded-full p-1 relative transition-all border border-zinc-800"
          >
            <div className={`w-6 h-6 bg-cyan-500 rounded-full transition-transform shadow-[0_0_10px_rgba(6,182,212,0.5)] ${isYearly ? 'translate-x-8' : 'translate-x-0'}`}></div>
          </button>
          <div className="flex items-center gap-2">
            <span className={`text-xs font-black uppercase tracking-widest ${isYearly ? 'text-white' : 'text-zinc-600'}`}>Yearly</span>
            <span className="bg-cyan-500 text-black text-[9px] font-black px-2 py-1 rounded-md uppercase animate-pulse">Save 20%</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Free Plan */}
        <div className="p-10 rounded-[3rem] bg-zinc-950 border border-white/5 flex flex-col relative group">
          <h3 className="text-2xl font-black mb-2">Free</h3>
          <p className="text-zinc-600 text-xs mb-8">For casual creators.</p>
          <div className="text-5xl font-black mb-10">₹0<span className="text-sm text-zinc-700 font-normal">/mo</span></div>
          <ul className="space-y-4 mb-10 flex-grow">
            <li className="flex items-center gap-3 text-zinc-500 text-xs font-bold italic">
              <span className="text-zinc-800">✕</span> Includes Ads
            </li>
            <li className="flex items-center gap-3 text-zinc-400 text-xs font-bold">
              <span className="text-cyan-500">✓</span> 100 Initial Credits
            </li>
          </ul>
          <button disabled className="w-full py-5 rounded-2xl font-black text-xs uppercase bg-zinc-900 text-zinc-700 cursor-not-allowed border border-white/5">
            Default Plan
          </button>
        </div>

        {/* Basic Plan */}
        <div className="p-10 rounded-[3rem] bg-zinc-900/30 border border-white/5 hover:border-cyan-500/20 transition-all flex flex-col relative group">
          <h3 className="text-2xl font-black mb-2">Basic</h3>
          <p className="text-zinc-500 text-xs mb-8">For serious growth.</p>
          <div className="text-5xl font-black mb-10 text-white">₹{currentPrices.basic.price}<span className="text-sm text-zinc-700 font-normal">/{isYearly ? 'yr' : 'mo'}</span></div>
          <ul className="space-y-4 mb-10 flex-grow">
            <li className="flex items-center gap-3 text-zinc-300 text-xs font-bold">
              <span className="text-cyan-500">✓</span> No Advertisements
            </li>
            <li className="flex items-center gap-3 text-zinc-300 text-xs font-bold">
              <span className="text-cyan-500">✓</span> {isYearly ? '6,000' : '500'} Credits
            </li>
            <li className="flex items-center gap-3 text-zinc-300 text-xs font-bold">
              <span className="text-cyan-500">✓</span> Visual B-Roll Prompts
            </li>
          </ul>
          <button 
            onClick={() => handleSubscribe('Basic')}
            disabled={isPaying !== null}
            className="w-full py-5 rounded-2xl font-black text-xs uppercase bg-white text-black hover:bg-zinc-200 transition-all active:scale-95 shadow-xl"
          >
            {isPaying === 'Basic' ? 'Initializing...' : 'Subscribe Basic'}
          </button>
        </div>

        {/* Pro Plan */}
        <div className="p-10 rounded-[3rem] bg-zinc-900 border-2 border-cyan-500 flex flex-col relative overflow-hidden group shadow-[0_0_50px_rgba(6,182,212,0.1)]">
          <div className="absolute top-0 right-0 bg-cyan-500 text-black text-[9px] font-black px-5 py-2 rounded-bl-2xl uppercase tracking-[0.2em]">Popular</div>
          <h3 className="text-2xl font-black mb-2">Pro</h3>
          <p className="text-zinc-500 text-xs mb-8">For content houses.</p>
          <div className="text-5xl font-black mb-10 text-cyan-400">₹{currentPrices.pro.price}<span className="text-sm text-zinc-700 font-normal">/{isYearly ? 'yr' : 'mo'}</span></div>
          <ul className="space-y-4 mb-10 flex-grow">
            <li className="flex items-center gap-3 text-zinc-200 text-xs font-bold">
              <span className="text-cyan-400">⚡</span> Priority AI Engine
            </li>
            <li className="flex items-center gap-3 text-zinc-200 text-xs font-bold">
              <span className="text-cyan-400">⚡</span> {isYearly ? '25,000' : '2,000'} Credits
            </li>
            <li className="flex items-center gap-3 text-zinc-200 text-xs font-bold">
              <span className="text-cyan-400">⚡</span> AI Voice Cloning (Kore)
            </li>
            <li className="flex items-center gap-3 text-zinc-200 text-xs font-bold">
              <span className="text-cyan-400">⚡</span> Direct API Access
            </li>
          </ul>
          <button 
            onClick={() => handleSubscribe('Pro')}
            disabled={isPaying !== null}
            className="w-full py-5 rounded-2xl font-black text-xs uppercase bg-cyan-500 text-black hover:bg-cyan-400 shadow-xl shadow-cyan-500/20 transition-all active:scale-95"
          >
            {isPaying === 'Pro' ? 'Initializing...' : 'Unlock Pro Now'}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
