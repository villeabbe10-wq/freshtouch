import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'text';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', className = '', children, ...props }) => {
  const baseStyle = "px-8 py-3 rounded-none transition-all duration-300 font-sans tracking-widest text-sm font-medium uppercase";
  const variants = {
    primary: "bg-primary-gold text-white hover:bg-primary-amethyst hover:shadow-lg",
    outline: "border border-primary-gold text-primary-gold hover:bg-primary-gold hover:text-white",
    text: "text-primary-dark hover:text-primary-gold underline-offset-4 hover:underline"
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

interface SectionTitleProps {
  subtitle?: string;
  title: string;
  align?: 'left' | 'center';
  dark?: boolean;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ subtitle, title, align = 'center', dark = false }) => {
  return (
    <div className={`mb-12 ${align === 'center' ? 'text-center' : 'text-left'}`}>
      {subtitle && (
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="block text-primary-gold text-sm font-bold tracking-[0.2em] uppercase mb-3 font-sans"
        >
          {subtitle}
        </motion.span>
      )}
      <motion.h2 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className={`text-4xl md:text-5xl font-serif ${dark ? 'text-primary-cream' : 'text-primary-dark'} mb-4 leading-tight`}
      >
        {title}
      </motion.h2>
      <motion.div 
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className={`h-0.5 bg-primary-gold w-24 ${align === 'center' ? 'mx-auto' : ''}`} 
      />
    </div>
  );
};

export const FadeIn: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({ children, delay = 0, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
