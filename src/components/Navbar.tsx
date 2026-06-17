import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Menu, X, User } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['Couples', 'Friends', 'AI Chibi', 'Cartoon', 'AI Caricature', 'Fantasy', 'Anime'];

  return (
    <motion.nav
      className="fixed top-0 w-full z-50 glass-effect border-b border-white/20"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-10 h-10 bg-gradient-purple-pink rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">P</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              PromptVerse
            </span>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search prompts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-4 pr-10 py-2 rounded-full bg-white/80 border border-white/20 focus:outline-none focus:border-primary transition"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary w-5 h-5" />
            </div>

            {/* Categories Dropdown */}
            <div className="relative group">
              <button className="flex items-center space-x-2 text-slate-700 hover:text-primary transition">
                <span>Categories</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>
              <div className="absolute left-0 mt-0 w-48 bg-white/95 backdrop-blur rounded-xl shadow-elegant border border-white/20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-300 py-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    className="block w-full text-left px-4 py-2 text-slate-700 hover:bg-primary/10 hover:text-primary transition"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Auth Button */}
            <motion.button
              className="flex items-center space-x-2 bg-gradient-purple-pink text-white px-6 py-2 rounded-full font-semibold hover:shadow-elegant transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <User className="w-5 h-5" />
              <span>Sign In</span>
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-primary"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            className="md:hidden pb-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <input
              type="text"
              placeholder="Search prompts..."
              className="w-full px-4 py-2 rounded-full bg-white/80 border border-white/20 mb-4"
            />
            <div className="space-y-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className="block w-full text-left px-4 py-2 text-slate-700 hover:bg-primary/10 hover:text-primary transition rounded-lg"
                >
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
