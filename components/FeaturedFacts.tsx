import React from 'react';
import { motion } from 'framer-motion';

const facts = [
  "You can't hum while holding your nose. Go ahead, try it.",
  "Your tongue rests on the roof of your mouth, not the bottom.",
  "Ducks have no idea they are ducks.",
  "The word 'bed' looks like a bed.",
  "You just blinked. And you're now manually breathing.",
  "Every odd number has an 'e' in it. Verify it if you have time."
];

export const FeaturedFacts: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200 px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wide">
            Curated Nonsense
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-4 transition-colors duration-300">Today's Featured Useless Facts</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {facts.map((fact, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className={`
                p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700
                ${index % 3 === 0 ? 'bg-rose-50 dark:bg-rose-900/20' : index % 3 === 1 ? 'bg-sky-50 dark:bg-sky-900/20' : 'bg-emerald-50 dark:bg-emerald-900/20'}
              `}
            >
              <div className="text-4xl opacity-20 font-serif mb-4 dark:text-white">“</div>
              <p className="text-lg font-medium text-gray-800 dark:text-gray-200 relative z-10 transition-colors duration-300">
                {fact}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};