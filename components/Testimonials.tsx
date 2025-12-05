import React from 'react';
import { Star } from 'lucide-react';

const reviews = [
  {
    name: "Sarah Notreal",
    role: "Professional Procrastinator",
    quote: "I used to be productive. Then I found this site. Now I know that sloths can hold their breath longer than dolphins. 10/10.",
    image: "https://picsum.photos/100/100?random=1"
  },
  {
    name: "John Doe-ish",
    role: "Aspiring Nothingness",
    quote: "Changed my life. Still useless. But now I'm useless with trivia.",
    image: "https://picsum.photos/100/100?random=2"
  },
  {
    name: "Karen McFacts",
    role: "Fun at Parties",
    quote: "I've never learned so little in such a beautiful way. My brain is delightfully smooth now.",
    image: "https://picsum.photos/100/100?random=3"
  }
];

export const Testimonials: React.FC = () => {
  return (
    <section className="py-20 bg-yellow-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-center text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-16 transition-colors duration-300">
          Real Reviews from Real(ish) People
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm relative border border-yellow-100 dark:border-gray-700 transition-colors duration-300">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6 italic transition-colors duration-300">"{review.quote}"</p>
              <div className="flex items-center gap-4">
                <img 
                  src={review.image} 
                  alt={review.name} 
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-yellow-200 dark:ring-gray-600"
                />
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-sm transition-colors duration-300">{review.name}</h4>
                  <p className="text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wide">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};