
import React, { useState } from 'react';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:Jkplays1292@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`From: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`)}`;
    window.location.href = mailtoLink;
    setStatus("Opening your email client...");
  };

  return (
    <div className="pt-32 pb-24 px-6 max-w-4xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-black mb-6">Contact Us</h1>
        <p className="text-zinc-500 text-lg">Have questions? We're here to help you go viral.</p>
      </div>

      <div className="bg-zinc-900/30 border border-zinc-800 rounded-[3rem] p-10 backdrop-blur-md">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest ml-1">Your Name</label>
              <input 
                type="text" 
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-4 text-white focus:outline-none focus:border-cyan-500 transition-all"
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest ml-1">Email Address</label>
              <input 
                type="email" 
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-4 text-white focus:outline-none focus:border-cyan-500 transition-all"
                placeholder="john@example.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest ml-1">Subject</label>
            <input 
              type="text" 
              required
              value={formData.subject}
              onChange={(e) => setFormData({...formData, subject: e.target.value})}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-4 text-white focus:outline-none focus:border-cyan-500 transition-all"
              placeholder="Question about Pro features"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest ml-1">Message</label>
            <textarea 
              required
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-4 text-white focus:outline-none focus:border-cyan-500 transition-all resize-none"
              placeholder="Tell us what's on your mind..."
            />
          </div>

          <button 
            type="submit"
            className="w-full py-5 bg-cyan-500 text-black font-black text-lg rounded-2xl hover:bg-cyan-400 transition-all shadow-xl shadow-cyan-500/20 active:scale-[0.98]"
          >
            Send Message
          </button>
          
          {status && <p className="text-center text-cyan-400 text-sm font-bold animate-pulse">{status}</p>}
        </form>
      </div>

      <div className="mt-16 text-center">
        <p className="text-zinc-600 text-sm italic">Direct Email: <a href="mailto:Jkplays1292@gmail.com" className="text-zinc-400 hover:text-white transition-colors">Jkplays1292@gmail.com</a></p>
      </div>
    </div>
  );
};

export default ContactPage;
