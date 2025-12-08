
import React, { useState } from 'react';
import { ScanFace, Zap, MessageSquareWarning, Upload, Cpu, HeartCrack, ChevronDown, Plus, Minus } from 'lucide-react';

const LandingContent: React.FC = () => {
  return (
    <div className="w-full">
      {/* FEATURES SECTION */}
      <section id="features" className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
              Why get roasted by AI?
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Because your friends are too polite to tell you that your CV looks like a 2003 Word Art project.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<ScanFace className="w-8 h-8 text-blue-400" />}
              title="Multimodal Analysis"
              desc="We read PDFs, DOCX, and even images. If you took a screenshot of your CV, we will roast you for that too."
            />
            <FeatureCard 
              icon={<MessageSquareWarning className="w-8 h-8 text-orange-400" />}
              title="Hinglish Engine"
              desc="Trained on 10,000 hours of Indian stand-up comedy and disappointed Asian parents."
            />
            <FeatureCard 
              icon={<Zap className="w-8 h-8 text-yellow-400" />}
              title="Meme Injection"
              desc="We don't just use words. We visually assault your resume with context-aware GIFs."
            />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-20 bg-white/5 border-y border-white/5">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">How the Magic Happens</h2>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-12 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-1/2 left-20 right-20 h-0.5 bg-gradient-to-r from-transparent via-gray-700 to-transparent -translate-y-1/2 z-0"></div>

            <StepCard 
              step="01" 
              icon={<Upload className="w-6 h-6" />}
              title="Upload File" 
              desc="Drop your resume. Don't worry, we don't save it. We just laugh at it." 
            />
            <StepCard 
              step="02" 
              icon={<Cpu className="w-6 h-6" />}
              title="AI Analysis" 
              desc="Gemini Pro scans your typos, fake skills, and 'Leadership' claims." 
            />
            <StepCard 
              step="03" 
              icon={<HeartCrack className="w-6 h-6" />}
              title="Emotional Damage" 
              desc="Receive a detailed report explaining why you are still unemployed." 
            />
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <FaqCard 
              question="Will this actually fix my resume?"
              answer="No, but it will fix your ego. We highlight mistakes so you can fix them, but mostly we just make fun of you."
            />
            <FaqCard 
              question="Is my data safe?"
              answer="Yes. We don't store your resume. Even our database doesn't want to keep your 'Microsoft Word' certification record."
            />
            <FaqCard 
              question="Can I use this for my LinkedIn?"
              answer="Sure, if you want to remain #OpenToWork forever. Post the roast and tag us for clout."
            />
            <FaqCard 
              question="Why is the AI so mean?"
              answer="It was trained on data from Indian relatives during wedding season. It knows exactly where it hurts."
            />
            <FaqCard 
              question="What formats do you support?"
              answer="PDF, DOCX, and Images. Basically, whatever format you used to commit design crimes."
            />
            <FaqCard 
              question="Is this free?"
              answer="Yes, unlike the career advice you paid for on LinkedIn Premium."
            />
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
  <div className="bg-gray-900/50 p-8 rounded-2xl border border-gray-800 hover:border-gray-700 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-900/10">
    <div className="bg-gray-800/50 w-14 h-14 rounded-xl flex items-center justify-center mb-6 border border-gray-700">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
    <p className="text-gray-400 leading-relaxed">{desc}</p>
  </div>
);

const StepCard = ({ step, icon, title, desc }: { step: string, icon: React.ReactNode, title: string, desc: string }) => (
  <div className="relative z-10 flex flex-col items-center text-center max-w-xs">
    <div className="w-16 h-16 rounded-full bg-gray-900 border-2 border-orange-500/50 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(249,115,22,0.3)]">
      {icon}
    </div>
    <div className="text-xs font-bold text-orange-500 mb-2 uppercase tracking-widest">Step {step}</div>
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-gray-400 text-sm">{desc}</p>
  </div>
);

const FaqCard = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className={`rounded-xl border transition-all duration-300 ${
        isOpen 
          ? 'bg-gray-800/40 border-orange-500/30' 
          : 'bg-gray-900/40 border-gray-800 hover:border-gray-700'
      }`}
    >
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
      >
        <h3 className={`text-lg font-bold transition-colors ${isOpen ? 'text-orange-400' : 'text-gray-200'}`}>
          {question}
        </h3>
        <div className={`p-1 rounded-full border transition-all duration-300 ${
            isOpen ? 'bg-orange-500/10 border-orange-500/50 rotate-180' : 'border-gray-700 rotate-0'
        }`}>
          <ChevronDown className={`w-5 h-5 transition-colors ${isOpen ? 'text-orange-500' : 'text-gray-500'}`} />
        </div>
      </button>
      
      <div 
        className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] pb-6' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden px-6">
          <p className="text-gray-400 leading-relaxed text-base border-t border-gray-700/50 pt-4">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingContent;
