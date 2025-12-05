import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateUselessFact } from '../services/geminiService';
import { Button } from './Button';
import { Sparkles, Loader2, Trophy } from 'lucide-react';
// @ts-ignore
import confetti from 'canvas-confetti';

const LOADING_EMOJIS = ["🦆", "🥔", "🧦", "🧱", "🧻", "🧽", "🍌", "🗿", "🍞", "🤡", "🍤", "🦀", "🌵", "🥑", "👻", "🍕"];
const LOADING_MESSAGES = [
    "Consulting the void...",
    "Asking a pigeon...",
    "Wasting CPU cycles...",
    "Buffering uselessness...",
    "Calculating nonsense...",
    "Connecting to the toaster...",
    "Loading nothing...",
    "Herding cats...",
    "Staring at a wall...",
    "Dusting the database..."
];

// Sound Effects
const SOUNDS = {
  pop: "https://assets.mixkit.co/sfx/preview/mixkit-soap-bubble-sound-2925.mp3",
  whoosh: "https://assets.mixkit.co/sfx/preview/mixkit-light-transition-whoosh-2611.mp3",
  jingle: "https://assets.mixkit.co/sfx/preview/mixkit-winning-chimes-2015.mp3"
};

export const FactGenerator: React.FC = () => {
  const [fact, setFact] = useState<string>("Ready to learn absolutely nothing?");
  const [loading, setLoading] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [showGrandmaster, setShowGrandmaster] = useState(false);
  const [loadingEmoji, setLoadingEmoji] = useState("🦆");
  const [loadingMsg, setLoadingMsg] = useState("Loading...");

  // Preload sounds on mount
  useEffect(() => {
    Object.values(SOUNDS).forEach(url => {
      const audio = new Audio(url);
      audio.load();
    });
  }, []);

  const playSound = (url: string, volume = 0.5) => {
    try {
      const audio = new Audio(url);
      audio.volume = volume;
      audio.play().catch(e => console.error("Audio playback failed:", e));
    } catch (e) {
      console.error("Audio initialization failed:", e);
    }
  };

  const handleGenerate = async () => {
    // Select random loading visuals before starting
    const randomEmoji = LOADING_EMOJIS[Math.floor(Math.random() * LOADING_EMOJIS.length)];
    const randomMsg = LOADING_MESSAGES[Math.floor(Math.random() * LOADING_MESSAGES.length)];
    setLoadingEmoji(randomEmoji);
    setLoadingMsg(randomMsg);
    
    setLoading(true);
    const newCount = clickCount + 1;
    setClickCount(newCount);
    
    // Easter Egg Checks
    if (newCount === 50) {
      setShowGrandmaster(true);
      triggerConfetti();
      playSound(SOUNDS.jingle, 0.6);
    }

    const newFact = await generateUselessFact();
    
    setFact(newFact);
    setLoading(false);
    // Play pop sound immediately after loading finishes
    playSound(SOUNDS.pop, 0.7);
  };

  const triggerConfetti = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      // since particles fall down, start a bit higher than random
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  const getSarcasticMessage = () => {
    if (clickCount > 0 && clickCount < 5) return null;
    if (clickCount === 5) return "You’re really committed to learning nothing, huh?";
    if (clickCount === 10) return "At this point, your curiosity is the real problem.";
    if (clickCount === 20) return "Do you not have a job?";
    if (clickCount === 30) return "I'm running out of ways to say nothing.";
    return null;
  };

  const sarcasticMsg = getSarcasticMessage();

  const scrollToWhy = () => {
    playSound(SOUNDS.whoosh, 0.3);
    const element = document.getElementById('why');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto px-4 py-12 md:py-20 text-center">
      
      {/* Sarcastic Badge */}
      {sarcasticMsg && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="absolute top-0 left-0 right-0 mx-auto w-fit bg-yellow-200 text-yellow-800 px-4 py-1 rounded-full text-sm font-bold shadow-sm mb-4 z-10"
        >
          {sarcasticMsg}
        </motion.div>
      )}

      {/* Main Card */}
      <motion.div 
        layout
        animate={{ 
          scale: loading ? 0.96 : 1,
          rotate: loading ? -1 : 0
        }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
        className="bg-white dark:bg-gray-800 rounded-[3rem] p-8 md:p-16 shadow-2xl border-b-8 border-r-8 border-indigo-100 dark:border-indigo-900 min-h-[300px] flex flex-col items-center justify-center relative overflow-hidden transition-colors duration-300"
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400" />
        
        <AnimatePresence mode="wait">
          {loading ? (
             <motion.div
                key="loader"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.3 }}
                className="mb-10 flex flex-col items-center justify-center min-h-[160px]"
             >
                <motion.div
                    animate={{ 
                        rotate: 360,
                        scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                        rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                        scale: { duration: 1, repeat: Infinity, ease: "easeInOut" }
                    }}
                    className="text-8xl md:text-9xl drop-shadow-xl select-none filter contrast-125"
                >
                    {loadingEmoji}
                </motion.div>
                <p className="mt-8 text-xl text-gray-400 font-medium animate-pulse tracking-wide">{loadingMsg}</p>
             </motion.div>
          ) : (
             <motion.div
                key={fact}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="mb-10"
             >
                <h2 className="text-3xl md:text-5xl font-bold text-gray-800 dark:text-white leading-tight transition-colors duration-300">
                  {fact}
                </h2>
             </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-col md:flex-row gap-4 items-center">
            <motion.div
              animate={{ 
                scale: [1, 1.03, 1],
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              <Button 
                  onClick={handleGenerate} 
                  disabled={loading}
                  size="lg"
                  className="flex items-center gap-2"
              >
                  {loading ? (
                      <>
                          <Loader2 className="w-6 h-6 animate-spin" />
                          Generating Nonsense...
                      </>
                  ) : (
                      <>
                          <Sparkles className="w-6 h-6" />
                          Give Me Another Useless Fact
                      </>
                  )}
              </Button>
            </motion.div>
            
            <motion.button 
                onClick={scrollToWhy}
                whileHover={{ scale: 1.1, rotate: -2, color: "#4f46e5" }}
                transition={{ type: "spring", stiffness: 300 }}
                className="text-gray-500 dark:text-gray-400 underline decoration-dotted underline-offset-4 text-sm font-medium cursor-pointer inline-block bg-transparent border-none p-0 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded transition-colors duration-300"
            >
                Why Does This Exist?
            </motion.button>
        </div>
      </motion.div>

      {/* Click Counter (Hidden Joke) */}
      <div className="mt-8 text-gray-400 text-sm font-mono">
        Time wasted successfully: {clickCount * 3} seconds
      </div>

      {/* Achievement Modal */}
      <AnimatePresence>
        {showGrandmaster && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            onClick={() => setShowGrandmaster(false)}
          >
            <motion.div 
              initial={{ scale: 0.5, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              className="bg-white dark:bg-gray-800 p-8 rounded-3xl max-w-md w-full text-center border-4 border-yellow-400 shadow-2xl relative transition-colors duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-yellow-400 p-4 rounded-full border-4 border-white dark:border-gray-800 shadow-lg transition-colors duration-300">
                <Trophy className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Achievement Unlocked: <br/>Grandmaster of Uselessness</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                You clicked 50 times. You have officially contributed nothing to society today. We are proud of you.
              </p>
              <Button onClick={() => setShowGrandmaster(false)} variant="secondary">
                I accept my fate
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};