import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  ...props 
}) => {
  const baseStyles = "font-bold rounded-full transition-all duration-300 transform active:scale-95 focus:outline-none focus:ring-4 focus:ring-opacity-50";
  
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg hover:shadow-indigo-500/30 focus:ring-indigo-300",
    secondary: "bg-rose-400 text-white hover:bg-rose-500 shadow-lg hover:shadow-rose-400/30 focus:ring-rose-200",
    outline: "border-2 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white focus:ring-gray-400 dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-gray-900",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg md:text-xl",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};