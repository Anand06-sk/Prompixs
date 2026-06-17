import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Heart } from 'lucide-react';

const Footer: React.FC = () => {
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
    <footer className="bg-gradient-to-b from-white/50 to-white/80 backdrop-blur border-t border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Brand */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-purple-pink rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">P</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                PromptVerse
              </span>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              Discover and share the most creative AI image prompts with our vibrant community.
            </p>
          </motion.div>

          {/* Product Links */}
          <motion.div variants={itemVariants}>
            <h4 className="font-bold text-slate-800 mb-6">Product</h4>
            <ul className="space-y-3">
              {['Explore Prompts', 'Collections', 'Trending', 'Categories'].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-slate-600 hover:text-primary transition text-sm"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company Links */}
          <motion.div variants={itemVariants}>
            <h4 className="font-bold text-slate-800 mb-6">Company</h4>
            <ul className="space-y-3">
              {['About', 'Blog', 'Careers', 'Press'].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-slate-600 hover:text-primary transition text-sm"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal Links */}
          <motion.div variants={itemVariants}>
            <h4 className="font-bold text-slate-800 mb-6">Legal</h4>
            <ul className="space-y-3">
              {['Privacy Policy', 'Terms of Service', 'Contact', 'Support'].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-slate-600 hover:text-primary transition text-sm"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Newsletter Section */}
        <motion.div
          className="bg-gradient-purple-pink rounded-2xl p-8 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Subscribe to Updates
              </h3>
              <p className="text-white/80">
                Get the latest trending prompts and creative inspiration delivered to your inbox.
              </p>
            </div>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-full text-slate-800 focus:outline-none focus:ring-2 focus:ring-white/30"
              />
              <motion.button
                className="bg-white text-primary px-6 py-3 rounded-full font-semibold hover:shadow-elegant transition flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          className="border-t border-white/20 pt-8 flex flex-col md:flex-row items-center justify-between"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-slate-600 text-sm flex items-center space-x-1 mb-4 md:mb-0">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-secondary" fill="currentColor" />
            <span>by PromptVerse Team</span>
          </p>

          {/* Social Links */}
          <div className="flex items-center space-x-6">
            {[
              { icon: '𝕏', label: 'Twitter' },
              { icon: 'f', label: 'Facebook' },
              { icon: '📷', label: 'Instagram' },
              { icon: 'in', label: 'LinkedIn' },
            ].map((social) => (
              <motion.a
                key={social.label}
                href="#"
                className="w-10 h-10 rounded-full glass-effect flex items-center justify-center hover:bg-primary/20 text-slate-600 hover:text-primary transition"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>

          <p className="text-slate-500 text-xs mt-4 md:mt-0">
            &copy; 2024 PromptVerse. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
