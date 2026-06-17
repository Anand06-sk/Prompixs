import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bookmark, Eye, Heart } from 'lucide-react';

interface PromptCard {
  id: number;
  title: string;
  category: string;
  description: string;
  height: string;
  color: string;
  likes: number;
  views: number;
}

const TrendingPrompts: React.FC = () => {
  const [selectedPrompt, setSelectedPrompt] = useState<PromptCard | null>(null);
  const [bookmarks, setBookmarks] = useState<number[]>([]);

  const prompts: PromptCard[] = [
    {
      id: 1,
      title: 'Cyberpunk Couple',
      category: 'Couples',
      description: 'A futuristic cyberpunk-style image of a couple',
      height: 'h-72',
      color: 'from-purple-500 to-pink-500',
      likes: 234,
      views: 1234,
    },
    {
      id: 2,
      title: 'Anime Friends',
      category: 'Friends',
      description: 'Anime-style group of friends in a cozy setting',
      height: 'h-96',
      color: 'from-blue-400 to-cyan-500',
      likes: 456,
      views: 2345,
    },
    {
      id: 3,
      title: 'Cute Chibi Avatar',
      category: 'AI Chibi',
      description: 'Adorable chibi character with big eyes',
      height: 'h-64',
      color: 'from-pink-400 to-purple-400',
      likes: 678,
      views: 3456,
    },
    {
      id: 4,
      title: 'Cartoon Adventure',
      category: 'Cartoon',
      description: 'Colorful cartoon-style adventure scene',
      height: 'h-80',
      color: 'from-yellow-400 to-orange-500',
      likes: 345,
      views: 1567,
    },
    {
      id: 5,
      title: 'Movie Poster Magic',
      category: 'Fake Movie Poster',
      description: 'Hollywood-style movie poster design',
      height: 'h-96',
      color: 'from-indigo-500 to-purple-600',
      likes: 789,
      views: 4567,
    },
    {
      id: 6,
      title: 'Fantasy Realm',
      category: 'Fantasy',
      description: 'Mystical fantasy landscape with magical creatures',
      height: 'h-72',
      color: 'from-fuchsia-500 to-pink-500',
      likes: 567,
      views: 2890,
    },
    {
      id: 7,
      title: '90s Nostalgia',
      category: '90s Photo',
      description: 'Retro 90s aesthetic photograph',
      height: 'h-64',
      color: 'from-amber-400 to-yellow-500',
      likes: 432,
      views: 1876,
    },
    {
      id: 8,
      title: 'Anime City Night',
      category: 'Anime',
      description: 'Neon-lit anime city during nighttime',
      height: 'h-80',
      color: 'from-violet-500 to-purple-600',
      likes: 654,
      views: 3210,
    },
    {
      id: 9,
      title: 'Barbie Dream',
      category: 'Barbie Version',
      description: 'Pink and glamorous Barbie-style aesthetic',
      height: 'h-72',
      color: 'from-pink-500 to-rose-500',
      likes: 890,
      views: 5432,
    },
  ];

  const toggleBookmark = (id: number) => {
    setBookmarks((prev) =>
      prev.includes(id) ? prev.filter((bid) => bid !== id) : [...prev, id]
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
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
    <section className="py-20 bg-gradient-subtle">
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
            Trending Prompts
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Discover the most popular and creative AI prompts from our community
          </p>
        </motion.div>

        {/* Masonry Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {prompts.map((prompt) => (
            <motion.div
              key={prompt.id}
              className={`${prompt.height} group relative cursor-pointer overflow-hidden rounded-2xl`}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              onClick={() => setSelectedPrompt(prompt)}
            >
              {/* Background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${prompt.color} opacity-80`}
              />

              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Content */}
              <div className="relative h-full p-6 flex flex-col justify-end">
                {/* Title and Category */}
                <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="inline-block bg-white/20 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-white mb-3">
                    {prompt.category}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {prompt.title}
                  </h3>
                  <p className="text-white/80 text-sm mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {prompt.description}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex items-center space-x-4 text-white text-sm">
                    <div className="flex items-center space-x-1">
                      <Heart className="w-4 h-4" />
                      <span>{prompt.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>{prompt.views}</span>
                    </div>
                  </div>
                  <motion.button
                    className={`p-2 rounded-full transition-all ${
                      bookmarks.includes(prompt.id)
                        ? 'bg-secondary text-white'
                        : 'bg-white/20 text-white hover:bg-white/40'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleBookmark(prompt.id);
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Bookmark className="w-5 h-5" fill={bookmarks.includes(prompt.id) ? 'currentColor' : 'none'} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Modal */}
      {selectedPrompt && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedPrompt(null)}
        >
          <motion.div
            className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto glass-effect"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="mb-6">
              <div className="mb-4 inline-block bg-gradient-purple-pink text-white px-4 py-2 rounded-full text-sm font-semibold">
                {selectedPrompt.category}
              </div>
              <h2 className="text-3xl font-bold text-slate-800 mb-2">
                {selectedPrompt.title}
              </h2>
              <p className="text-slate-600">{selectedPrompt.description}</p>
            </div>

            {/* Preview Image Area */}
            <div
              className={`${selectedPrompt.height} bg-gradient-to-br ${selectedPrompt.color} rounded-xl mb-6`}
            />

            {/* Prompt Text (Placeholder) */}
            <div className="mb-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
              <p className="text-slate-700 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. This is the full prompt text that users can copy and use in their AI image generation tools.
              </p>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.button
                className="bg-gradient-purple-pink text-white px-6 py-3 rounded-full font-semibold hover:shadow-elegant transition flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Copy Prompt</span>
              </motion.button>
              <motion.button
                className="border-2 border-primary text-primary px-6 py-3 rounded-full font-semibold hover:bg-primary/10 transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Save for Later</span>
              </motion.button>
              <motion.button
                className="bg-blue-500 text-white px-6 py-3 rounded-full font-semibold hover:shadow-elegant transition flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Open in ChatGPT</span>
              </motion.button>
              <motion.button
                className="bg-secondary text-white px-6 py-3 rounded-full font-semibold hover:shadow-elegant transition flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Open in Gemini</span>
              </motion.button>
            </div>

            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-slate-600 hover:text-slate-800"
              onClick={() => setSelectedPrompt(null)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default TrendingPrompts;
