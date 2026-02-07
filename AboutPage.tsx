
import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="pt-32 pb-24 px-6 max-w-4xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-black mb-6 text-white tracking-tighter">About Our Story</h1>
        <p className="text-zinc-500 text-lg italic">"From a 10th-pass student to an AI Innovator"</p>
      </div>
      
      <div className="prose prose-invert prose-lg max-w-none text-zinc-400 leading-relaxed">
        <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-[2.5rem] mb-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-3xl rounded-full"></div>
          <p className="mb-6">
            ViralScript AI wasn't born in a high-tech lab or a prestigious university. It was born in a small room, fueled by curiosity and a relentless drive to understand the future of technology.
          </p>
          <p className="mb-6">
            I am a <strong>10th-pass self-taught AI entrepreneur</strong>. For many, a formal degree is the only path to success, but for me, the internet was my greatest classroom. I spent years mastering prompt engineering, deep learning architectures, and the nuances of the Google Gemini API.
          </p>
          <p className="mb-6">
            My goal was simple: to build a tool that levels the playing field for creators worldwide. High-quality content scripting shouldn't be a privilege reserved for those with expensive marketing teams.
          </p>
          <p className="font-bold text-white">
            ViralScript AI is the culmination of that journey—a professional-grade tool designed to help you dominate the attention economy, built by someone who learned everything from scratch.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white">Our Mission</h3>
            <p>To democratize viral content creation through accessible, cutting-edge AI technology.</p>
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white">Our Values</h3>
            <p>Transparency, innovation, and empowering the solo-creator economy.</p>
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm text-zinc-600 italic">
            Founded by Javed Khan - Self-Taught Developer & AI Enthusiast.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
