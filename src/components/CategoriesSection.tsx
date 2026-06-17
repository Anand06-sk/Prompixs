import React from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Sparkles,
  Film,
  Palette,
  BookOpen,
  Music,
  Zap,
  Heart,
  Lightbulb,
  Camera,
  Star,
  Tv,
  Wand2,
} from 'lucide-react';

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  color: string;
}

const CategoriesSection: React.FC = () => {
  const categories: Category[] = [
    { id: 1, name: 'Couples', icon: <Heart className="w-8 h-8" />, description: 'Romantic moments', color: 'from-red-400 to-pink-400' },
    { id: 2, name: 'Friends', icon: <Users className="w-8 h-8" />, description: 'Group vibes', color: 'from-blue-400 to-cyan-400' },
    { id: 3, name: 'AI Chibi', icon: <Sparkles className="w-8 h-8" />, description: 'Cute style', color: 'from-purple-400 to-pink-400' },
    { id: 4, name: 'Cartoon', icon: <Palette className="w-8 h-8" />, description: 'Animated art', color: 'from-yellow-400 to-orange-400' },
    { id: 5, name: 'AI Caricature', icon: <Lightbulb className="w-8 h-8" />, description: 'Funny faces', color: 'from-green-400 to-emerald-400' },
    { id: 6, name: 'Fake Movie Poster', icon: <Film className="w-8 h-8" />, description: 'Cinema style', color: 'from-indigo-400 to-purple-400' },
    { id: 7, name: 'AI Action Figure', icon: <Zap className="w-8 h-8" />, description: 'Collectible style', color: 'from-orange-400 to-red-400' },
    { id: 8, name: 'Scrapbook', icon: <BookOpen className="w-8 h-8" />, description: 'Memory collage', color: 'from-pink-400 to-purple-400' },
    { id: 9, name: 'Journal Style', icon: <Music className="w-8 h-8" />, description: 'Diary aesthetic', color: 'from-cyan-400 to-blue-400' },
    { id: 10, name: 'Barbie Version', icon: <Star className="w-8 h-8" />, description: 'Doll aesthetic', color: 'from-pink-500 to-rose-400' },
    { id: 11, name: '90s Photo', icon: <Camera className="w-8 h-8" />, description: 'Retro vibes', color: 'from-amber-400 to-yellow-400' },
    { id: 12, name: 'Anime', icon: <Tv className="w-8 h-8" />, description: 'Japanese style', color: 'from-violet-400 to-purple-400' },
    { id: 13, name: 'Fantasy', icon: <Wand2 className="w-8 h-8" />, description: 'Magical worlds', color: 'from-fuchsia-400 to-pink-400' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="py-20 bg-white/50 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-purple-pink bg-clip-text text-transparent mb-4">
            Explore Categories
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Discover amazing AI prompts across different styles and themes
          </p>
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {categories.map((category) => (
            <motion.div
              key={category.id}
              className="group relative cursor-pointer"
              variants={itemVariants}
              whileHover={{ y: -8 }}
            >
              {/* Card */}
              <div className="glass-effect p-8 rounded-xl h-full border-2 border-white/20 hover:border-primary/40 transition-all duration-300 group-hover:shadow-elegant">
                {/* Background Gradient */}
                <div
                  className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-10 bg-gradient-to-br ${category.color} transition-opacity duration-300`}
                />

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div
                    className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${category.color} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    {category.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-slate-800 mb-2">
                    {category.name}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-slate-600 mb-4">
                    {category.description}
                  </p>

                  {/* View Button */}
                  <div className="flex items-center space-x-2 text-primary font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span>Browse</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CategoriesSection;
