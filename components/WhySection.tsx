import React from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, Clock, BatteryWarning, BrainCircuit } from 'lucide-react';

export const WhySection: React.FC = () => {
  const reasons = [
    {
      icon: <Clock className="w-6 h-6 text-rose-500" />,
      title: "Productivity is Overrated",
      desc: "Why work hard when you can learn that octopuses have three hearts? Exactly."
    },
    {
      icon: <BatteryWarning className="w-6 h-6 text-amber-500" />,
      title: "World is Too Stressful",
      desc: "Nobody argues about whether bananas are berries (they are). It's a safe space."
    },
    {
      icon: <BrainCircuit className="w-6 h-6 text-purple-500" />,
      title: "Smooth Brain Energy",
      desc: "We are actively trying to decrease your IQ. It's more aerodynamic that way."
    },
    {
      icon: <HelpCircle className="w-6 h-6 text-sky-500" />,
      title: "Someone Had To Do It",
      desc: "We looked at the internet and said: 'Needs more nonsense.' You're welcome."
    }
  ];

  return (
    <section id="why" className="py-20 bg-indigo-900 text-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-800 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-800 rounded-full mix-blend-multiply filter blur-3xl opacity-30 translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Why Does This Exist?</h2>
          <p className="text-xl text-indigo-200 max-w-2xl mx-auto">
            A question we ask ourselves every single day. Here are our best guesses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-indigo-800/50 backdrop-blur-sm p-6 rounded-2xl border border-indigo-700/50 hover:bg-indigo-800 transition-colors"
            >
              <div className="bg-indigo-950/50 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-indigo-200 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
