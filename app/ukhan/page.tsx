'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, Variants, PanInfo } from 'framer-motion';
import { ProverbCard } from '@/components/ukhan/ProverbCard';
import { GiScrollUnfurled } from 'react-icons/gi';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { FiRefreshCw, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface Ukhan {
  id: string;
  text: string;
  meaning?: string;
  category?: string;
  alphabet?: string;
  isVerified?: boolean;
  likes?: number;
  views?: number;
  createdAt?: any;
}

export default function UkhanPage() {
  const [allUkhans, setAllUkhans] = useState<Ukhan[]>([]);
  const [randomProverbs, setRandomProverbs] = useState<Ukhan[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [autoRotate, setAutoRotate] = useState(true);
  const [dragDirection, setDragDirection] = useState(0);
  
  const autoRotateRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Fetch ukhans from Firebase
  useEffect(() => {
    const fetchUkhans = async () => {
      try {
        const response = await fetch('/api/ukhan');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setAllUkhans(data);
        getRandomProverbs(data);
      } catch (error) {
        console.error('Error fetching ukhans:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUkhans();
  }, []);

  // Get random proverbs from the list
  const getRandomProverbs = (ukhans: Ukhan[]) => {
    const shuffled = [...ukhans];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setRandomProverbs(shuffled.slice(0, 3));
    setCurrentIndex(0);
  };

  // Shuffle and get new random proverbs
  const shuffleProverbs = () => {
    getRandomProverbs(allUkhans);
    if (autoRotate) {
      if (autoRotateRef.current) clearInterval(autoRotateRef.current);
      startAutoRotate();
    }
  };

  // Auto-rotate through proverbs
  const startAutoRotate = () => {
    if (autoRotateRef.current) clearInterval(autoRotateRef.current);
    autoRotateRef.current = setInterval(() => {
      nextProverb();
    }, 5000);
  };

  // Handle auto-rotate
  useEffect(() => {
    if (autoRotate && randomProverbs.length > 0) {
      startAutoRotate();
    }
    return () => {
      if (autoRotateRef.current) clearInterval(autoRotateRef.current);
    };
  }, [autoRotate, randomProverbs.length]);

  // Navigate to next/previous proverb
  const nextProverb = () => {
    setCurrentIndex((prev) => (prev + 1) % randomProverbs.length);
    if (autoRotate) {
      if (autoRotateRef.current) clearInterval(autoRotateRef.current);
      startAutoRotate();
    }
  };

  const prevProverb = () => {
    setCurrentIndex((prev) => (prev - 1 + randomProverbs.length) % randomProverbs.length);
    if (autoRotate) {
      if (autoRotateRef.current) clearInterval(autoRotateRef.current);
      startAutoRotate();
    }
  };

  // Handle drag end for swipe
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 50;
    if (info.offset.x > swipeThreshold) {
      // Swipe right - go to previous
      prevProverb();
      setDragDirection(-1);
    } else if (info.offset.x < -swipeThreshold) {
      // Swipe left - go to next
      nextProverb();
      setDragDirection(1);
    }
    setTimeout(() => setDragDirection(0), 300);
  };

  // Animation variants for swipe
  const cardVariants: Variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
        scale: { duration: 0.2 }
      }
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
      scale: 0.9,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
        scale: { duration: 0.2 }
      }
    })
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner />
          <p className="mt-4 text-gray-500 dark:text-gray-400">Loading proverbs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 dark:from-emerald-900 dark:via-teal-900 dark:to-cyan-900 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative container mx-auto px-4 py-12 md:py-20 text-center">
          <div className="inline-block p-4 bg-white/10 rounded-full backdrop-blur-sm mb-6">
            <GiScrollUnfurled className="text-5xl md:text-6xl" />
          </div>
          <h1 className="text-3xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-amber-200 to-yellow-100 bg-clip-text text-transparent">
            Ukhan Tukka
          </h1>
          <p className="text-lg md:text-2xl opacity-90 max-w-2xl mx-auto">
            Discover timeless Nepali proverbs and their hidden wisdom
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 60" fill="currentColor" className="text-gray-50 dark:text-gray-900">
            <path d="M0,32L80,37.3C160,43,320,53,480,48C640,43,800,21,960,21.3C1120,21,1280,43,1360,53.3L1440,64L1440,60L1360,60C1280,60,1120,60,960,60C800,60,640,60,480,60C320,60,160,60,80,60L0,60Z"></path>
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        
        {/* Featured Random Proverbs Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-800 dark:text-white mb-2">
              ✨ Today's Wisdom
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              Swipe left or right to explore more proverbs
            </p>
          </div>

          {/* Carousel with Swipe */}
          <div className="relative max-w-4xl mx-auto" ref={containerRef}>
            {/* Navigation Buttons - Hide on mobile, show on desktop */}
            <button
              onClick={prevProverb}
              className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 z-10 p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-700 hover:scale-110 transition-all"
              aria-label="Previous proverb"
            >
              <FiChevronLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </button>
            
            <button
              onClick={nextProverb}
              className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 z-10 p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-700 hover:scale-110 transition-all"
              aria-label="Next proverb"
            >
              <FiChevronRight className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </button>

            {/* Swipeable Proverb Card */}
            <AnimatePresence mode="wait" custom={dragDirection}>
              <motion.div
                key={currentIndex}
                custom={dragDirection}
                variants={cardVariants}
                initial="enter"
                animate="center"
                exit="exit"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.7}
                onDragEnd={handleDragEnd}
                dragTransition={{ bounceStiffness: 300, bounceDamping: 30 }}
                whileTap={{ cursor: 'grabbing' }}
                className="cursor-grab active:cursor-grabbing"
              >
                {randomProverbs[currentIndex] && (
                  <ProverbCard {...randomProverbs[currentIndex]} isRandom />
                )}
              </motion.div>
            </AnimatePresence>

            {/* Swipe Hint for Mobile */}
            <div className="text-center mt-4 md:hidden">
              <p className="text-xs text-gray-400 dark:text-gray-500">
                👆 Swipe left or right to browse
              </p>
            </div>

            {/* Progress Indicators */}
            <div className="flex justify-center gap-2 mt-6">
              {randomProverbs.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setCurrentIndex(idx);
                    if (autoRotate) {
                      if (autoRotateRef.current) clearInterval(autoRotateRef.current);
                      startAutoRotate();
                    }
                  }}
                  className={`transition-all duration-300 rounded-full ${
                    idx === currentIndex
                      ? 'w-8 h-2 bg-gradient-to-r from-emerald-600 to-teal-600'
                      : 'w-2 h-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                  }`}
                  aria-label={`Go to proverb ${idx + 1}`}
                />
              ))}
            </div>

            {/* Controls */}
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={shuffleProverbs}
                className="flex items-center gap-2 px-4 py-2 text-sm bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg transition-all border border-gray-200 dark:border-gray-700 hover:scale-105"
              >
                <FiRefreshCw className="text-emerald-600 dark:text-emerald-400" />
                <span className="text-gray-700 dark:text-gray-300 hidden sm:inline">Shuffle New</span>
                <span className="text-gray-700 dark:text-gray-300 sm:hidden">Shuffle</span>
              </button>
              
              <button
                onClick={() => setAutoRotate(!autoRotate)}
                className={`px-4 py-2 text-sm rounded-full shadow-md transition-all ${
                  autoRotate
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-lg border border-gray-200 dark:border-gray-700'
                }`}
              >
                {autoRotate ? '⏸ Pause' : '▶ Auto'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <BackToTopButton />
    </div>
  );
}

// Back to Top Button Component
function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-30 p-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110"
      aria-label="Back to top"
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  );
}