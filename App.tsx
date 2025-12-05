import React, { useState, useEffect } from 'react';
import { FactGenerator } from './components/FactGenerator';
import { FeaturedFacts } from './components/FeaturedFacts';
import { WhySection } from './components/WhySection';
import { Stats } from './components/Stats';
import { Testimonials } from './components/Testimonials';
import { ScrollToTop } from './components/ScrollToTop';
import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';

const Footer: React.FC = () => (
  <footer className="bg-gray-900 text-gray-400 py-12 text-center border-t border-gray-800">
    <div className="max-w-4xl mx-auto px-4">
      <h3 className="text-white font-bold text-xl mb-4">Daily Useless Facts</h3>
      <p className="mb-8 max-w-lg mx-auto text-sm leading-relaxed opacity-70">
        DISCLAIMER: This website will not improve your IQ, career, relationships, or general knowledge. 
        It might actually make you dumber. Proceed happily.
      </p>
      <div className="text-xs text-gray-600 space-y-2">
        <div>© {new Date().getFullYear()} Daily Useless Facts. All rights reserved (but why would you want them?).</div>
        <motion.div 
          animate={{ 
            color: ["#9ca3af", "#ec4899", "#3b82f6", "#9ca3af"], // gray-400 -> pink-500 -> blue-500 -> gray-400
          }}
          transition={{ 
            duration: 4, 
            ease: "easeInOut", 
            repeat: Infinity 
          }}
          className="font-mono font-bold inline-block"
        >
          Created by: Ghost
        </motion.div>
      </div>
    </div>
  </footer>
);

const App: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Check system preference on initial load
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <>
      <div className={`min-h-screen bg-white dark:bg-gray-950 selection:bg-pink-200 selection:text-pink-900 dark:selection:bg-indigo-500 dark:selection:text-white transition-colors duration-300`}>
        
        {/* Hero Header */}
        <header className="pt-20 pb-10 px-4 text-center relative">
          <button 
            onClick={toggleTheme}
            className="absolute top-6 right-6 p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Toggle Dark Mode"
          >
            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>

          <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-pink-100 dark:bg-indigo-900/30 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-70 animate-pulse transition-colors duration-1000"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-100 dark:bg-purple-900/30 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-70 animate-pulse transition-colors duration-1000" style={{ animationDelay: '2s' }}></div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white tracking-tight mb-4 transition-colors duration-300">
              Daily <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-indigo-600 dark:from-pink-400 dark:to-indigo-400">Useless</span> Facts
            </h1>
            <p className="text-xl md:text-2xl text-gray-500 dark:text-gray-400 font-light transition-colors duration-300">
              Talent: wasting your time since 2025.
            </p>
          </motion.div>
        </header>

        {/* Main Generator Section */}
        <main>
          <FactGenerator />
          <FeaturedFacts />
          <WhySection />
          <Stats />
          <Testimonials />
        </main>

        <Footer />
      </div>
      <ScrollToTop />
    </>
  );
};

export default App;