
import React from 'react';

const TermsPage: React.FC = () => {
  return (
    <div className="pt-32 pb-24 px-6 max-w-4xl mx-auto prose prose-invert">
      <h1 className="text-5xl font-black mb-10 text-white">Terms of Service</h1>
      
      <section className="space-y-8 text-zinc-400 leading-relaxed">
        <div className="bg-red-500/5 border border-red-500/20 p-8 rounded-[2.5rem]">
          <h2 className="text-2xl font-bold text-red-400 mb-4 flex items-center gap-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            Fair Usage Policy
          </h2>
          <p className="text-zinc-300 font-bold mb-4">
            To ensure high performance for all creators, we strictly enforce a one-account-per-device rule.
          </p>
          <ul className="list-disc pl-6 space-y-4 text-sm">
            <li className="font-bold text-white">100 Free Credits Limit: Every unique IP address is granted exactly 100 free credits upon first sign-up.</li>
            <li><strong>IP Lock:</strong> Our system logs your IP at sign-up. If our security detects multiple accounts being created from the same IP, access will be revoked.</li>
            <li><strong>Abuse Policy:</strong> Any attempt to bypass credit limits or automate account creation will result in a permanent IP and email ban from ViralScript AI.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Service Availability</h2>
          <p>
            ViralScript AI provides AI-assisted content generation. While we strive for 99.9% uptime, we are not responsible for delays caused by third-party API outages (e.g., Google Gemini).
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Pro & Basic Subscriptions</h2>
          <p>
            Subscriptions are billed in advance on a recurring basis. You can cancel at any time. Credits from paid plans do not expire as long as your subscription is active.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Governing Law</h2>
          <p>
            These terms are governed by the digital laws of the internet and professional common sense. By using ViralScript AI, you agree to these terms in full.
          </p>
        </div>
      </section>
    </div>
  );
};

export default TermsPage;
