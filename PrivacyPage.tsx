
import React from 'react';

const PrivacyPage: React.FC = () => {
  return (
    <div className="pt-32 pb-24 px-6 max-w-4xl mx-auto prose prose-invert">
      <h1 className="text-5xl font-black mb-10 text-white tracking-tighter">Privacy Policy</h1>
      
      <section className="space-y-8 text-zinc-400 leading-relaxed">
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Introduction</h2>
          <p>
            Welcome to ViralScript AI. We respect your privacy and are committed to protecting your personal data. 
            This policy outlines how we handle your information when you use our service, especially in compliance with advertising standards.
          </p>
        </div>

        <div className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-2xl">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-cyan-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
            Advertising & Cookies (Google AdSense)
          </h2>
          <p className="text-sm mb-4">
            We use Google AdSense to serve advertisements on our platform. 
          </p>
          <ul className="list-disc pl-6 space-y-2 text-sm">
            <li><strong>Cookies:</strong> Third party vendors, including Google, use cookies to serve ads based on a user's prior visits to your website or other websites.</li>
            <li><strong>Personalized Advertising:</strong> Google's use of advertising cookies enables it and its partners to serve ads to your users based on their visit to your sites and/or other sites on the Internet.</li>
            <li><strong>Opt-out:</strong> Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" className="text-cyan-400 underline">Ads Settings</a>.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Information We Collect</h2>
          <p>
            We collect minimal information to provide our core service. This includes:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Email Address:</strong> Used exclusively for our credit system and user authentication.</li>
            <li><strong>IP Address:</strong> Collected to enforce our fair usage policy (100 credits per device) and to detect fraudulent activity.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Content Storage</h2>
          <p className="bg-cyan-500/5 border border-cyan-500/20 p-6 rounded-2xl text-cyan-200">
            <strong>Script Privacy:</strong> We do NOT store the scripts you generate. 
            Once your viral script is displayed, it exists only in your current session. 
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Third-Party Processing</h2>
          <p>
            Our generation logic is powered by Google Gemini AI. When you enter a topic, it is processed via Google's secure enterprise APIs.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Contact</h2>
          <p>
            For any privacy-related inquiries, please contact us at <a href="mailto:Jkplays1292@gmail.com" className="text-cyan-400">Jkplays1292@gmail.com</a>.
          </p>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPage;
