import React, { useEffect, useState } from 'react';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const StatCard: React.FC<{ label: string; value: string; suffix?: string; delay: number }> = ({ label, value, suffix = "", delay }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  // Parse value to number if possible, or just display string
  const target = parseInt(value.replace(/,/g, ''));
  const isNumber = !isNaN(target);

  useEffect(() => {
    if (isInView && isNumber) {
      let start = 0;
      const duration = 2000;
      const increment = target / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, target, isNumber]);

  return (
    <div ref={ref} className="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 transition-colors duration-300">
      <div className="text-4xl md:text-5xl font-bold text-indigo-600 dark:text-indigo-400 mb-2 font-mono">
        {isNumber ? count.toLocaleString() : value}{suffix}
      </div>
      <div className="text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider text-sm">{label}</div>
    </div>
  );
};

export const Stats: React.FC = () => {
  return (
    <section className="py-20 bg-white dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <StatCard label="Useless Facts Generated" value="9348201" delay={0} />
          <StatCard label="Knowledge Gained" value="0" suffix="%" delay={0.2} />
          <StatCard label="Time Wasted" value="100" suffix="%" delay={0.4} />
        </div>
      </div>
    </section>
  );
};