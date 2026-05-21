'use client';

import { motion, Variants } from 'framer-motion';
import { GiMusicalNotes, GiHeadphones, GiMicrophone } from 'react-icons/gi';
import { FaGuitar, FaDrum } from 'react-icons/fa';

export default function SongsPage() {
  // Animation variants with proper typing
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const iconVariants: Variants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    },
    hover: {
      scale: 1.2,
      rotate: 10,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  };

  const floatVariants = (i: number): Variants => ({
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "loop" as const,
        delay: i * 0.1,
        ease: "easeInOut",
      },
    },
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        className="bg-gradient-to-r from-red-600 to-orange-600 dark:from-red-800 dark:to-orange-800 text-white py-12"
      >
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            🎵 Nepali Songs Lyrics
          </h1>
          <p className="text-xl text-center opacity-90">
            Explore the largest collection of Nepali song lyrics
          </p>
        </div>
      </motion.div>

      {/* Coming Soon Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          {/* Main Coming Soon Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
          >
            {/* Animated gradient top bar */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-2 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 origin-left"
            />
            
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="p-8 md:p-12 text-center"
            >
              {/* Animated Music Icons */}
              <motion.div variants={itemVariants} className="flex justify-center gap-4 mb-8">
                <motion.div
                  variants={iconVariants}
                  whileHover="hover"
                  className="inline-block"
                >
                  <GiMusicalNotes className="w-12 h-12 text-red-500 dark:text-red-400" />
                </motion.div>
                <motion.div
                  variants={iconVariants}
                  whileHover="hover"
                  className="inline-block"
                >
                  <GiHeadphones className="w-12 h-12 text-orange-500 dark:text-orange-400" />
                </motion.div>
                <motion.div
                  variants={iconVariants}
                  whileHover="hover"
                  className="inline-block"
                >
                  <GiMicrophone className="w-12 h-12 text-yellow-500 dark:text-yellow-400" />
                </motion.div>
              </motion.div>

              {/* Title */}
              <motion.h2
                variants={itemVariants}
                className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4"
              >
                🎶 Coming Soon!
              </motion.h2>
              
              {/* Description */}
              <motion.p
                variants={itemVariants}
                className="text-lg text-gray-600 dark:text-gray-300 mb-6"
              >
                We're working hard to bring you the largest collection of Nepali song lyrics.
              </motion.p>
              
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/30 dark:to-orange-950/30 rounded-xl p-6 mb-6"
              >
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  🎤 Get ready to explore lyrics from your favorite Nepali artists, 
                  from timeless classics to the latest hits. Our team is curating 
                  an extensive library of song lyrics with accurate translations and meanings.
                </p>
              </motion.div>

              {/* Feature List */}
              <motion.div
                variants={containerVariants}
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
              >
                {[
                  { icon: FaGuitar, color: "text-red-500", text: "Song Lyrics" },
                  { icon: FaDrum, color: "text-orange-500", text: "Artist Info" },
                  { icon: GiHeadphones, color: "text-yellow-500", text: "Audio Previews" }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400"
                  >
                    <feature.icon className={feature.color} />
                    <span>{feature.text}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Decorative Music Notes with Framer Motion */}
          <div className="mt-12 flex justify-center gap-6 opacity-50">
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                custom={i}
                variants={floatVariants(i)}
                animate="animate"
                whileHover={{ scale: 1.3, rotate: 15 }}
              >
                <GiMusicalNotes
                  className={`${
                    i === 1 || i === 4 
                      ? 'w-8 h-8' 
                      : i === 2 
                      ? 'w-6 h-6' 
                      : i === 3 
                      ? 'w-5 h-5' 
                      : 'w-7 h-7'
                  } ${
                    i === 0 || i === 3
                      ? 'text-red-400 dark:text-red-600'
                      : i === 1 || i === 4
                      ? 'text-orange-400 dark:text-orange-600'
                      : 'text-yellow-400 dark:text-yellow-600'
                  }`}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}