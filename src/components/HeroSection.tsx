import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ArrowRight } from 'lucide-react';

const HeroSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <section className="min-h-screen bg-gradient-subtle pt-32 pb-16 relative overflow-hidden">
      {/* Decorative elements */}
      <motion.div
        className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-full blur-3xl"
        animate={{ y: [0, 30, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 left-10 w-72 h-72 bg-gradient-to-tr from-secondary/30 to-primary/30 rounded-full blur-3xl"
        animate={{ y: [0, -30, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Main Headline */}
          <motion.h1
            className="text-5xl md:text-7xl font-bold bg-gradient-purple-pink bg-clip-text text-transparent mb-6"
            variants={itemVariants}
          >
            Discover Viral AI Image Prompts
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-lg md:text-xl text-slate-600 mb-12 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Explore thousands of creative, trending AI prompts for stunning image generation. Find inspiration from our curated collection.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto mb-12"
            variants={itemVariants}
          >
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search by category, style, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 rounded-full bg-white/80 border-2 border-white/20 focus:border-primary focus:outline-none text-slate-700 placeholder-slate-400 transition shadow-lg"
              />
              <Search className="absolute right-6 top-1/2 transform -translate-y-1/2 text-primary w-6 h-6" />
            </div>
            <motion.button
              className="bg-gradient-purple-pink text-white px-8 py-4 rounded-full font-semibold flex items-center justify-center space-x-2 hover:shadow-elegant transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Explore</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-3 gap-8 max-w-md mx-auto"
            variants={itemVariants}
          >
            {[
              { number: '10K+', label: 'Prompts' },
              { number: '50K+', label: 'Users' },
              { number: '1M+', label: 'Generations' },
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <p className="text-3xl font-bold bg-gradient-purple-pink bg-clip-text text-transparent">
                  {stat.number}
                </p>
                <p className="text-sm text-slate-600 mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
