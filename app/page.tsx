'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { RandomProverb } from '@/components/ukhan/RandomProverb';
import { GiScrollUnfurled } from 'react-icons/gi';
import { FaFlag } from 'react-icons/fa';
import { HiHeart } from 'react-icons/hi';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 dark:from-emerald-800 dark:via-teal-800 dark:to-cyan-800 text-white">
        <div className="container mx-auto px-4 py-20">
          <div className="flex justify-center mb-6">
            <GiScrollUnfurled className="text-7xl animate-bounce" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-center mb-6">
            Ukhan Tukka
          </h1>
          <p className="text-xl md:text-2xl text-center mb-12 max-w-3xl mx-auto text-white/90">
            Discover timeless Nepali proverbs (उखान टुक्का) and their hidden wisdom passed down through generations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/ukhan">
              <Button className="w-full sm:w-auto text-lg px-8 bg-white text-emerald-600 hover:bg-gray-100 dark:bg-gray-900 dark:text-emerald-400 dark:hover:bg-gray-800" icon={<GiScrollUnfurled className="text-xl" />}>
                Explore Ukhan
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          Discover Nepali Wisdom
        </h2>
        <div className="max-w-4xl mx-auto">
          <Link href="/ukhan">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer transform hover:scale-105">
              <div className="p-8 text-center">
                <GiScrollUnfurled className="text-6xl mb-4 mx-auto text-emerald-600 dark:text-emerald-400" />
                <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
                  Ukhan Tukka (उखान टुक्का)
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 max-w-2xl mx-auto">
                  Explore our collection of traditional Nepali proverbs with their meanings and interpretations. 
                  Each proverb carries the wisdom of our ancestors and offers valuable life lessons.
                </p>
                <div className="flex flex-wrap gap-2 justify-center mb-4">
                  <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-full text-sm">
                    ✨ Wisdom
                  </span>
                  <span className="px-3 py-1 bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 rounded-full text-sm">
                    📖 Traditional
                  </span>
                  <span className="px-3 py-1 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400 rounded-full text-sm">
                    🧠 Life Lessons
                  </span>
                </div>
                <Button variant="outline" size="sm" className="border-emerald-500 text-emerald-600 hover:bg-emerald-50 dark:border-emerald-400 dark:text-emerald-400 dark:hover:bg-emerald-950/30">
                  Explore Collection →
                </Button>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Random Proverb Section */}
      <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-gray-800/50 dark:via-gray-800/30 dark:to-gray-800/50 py-16 transition-colors duration-200">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 flex items-center justify-center gap-2 text-gray-900 dark:text-white">
            <HiHeart className="text-emerald-500 dark:text-emerald-400" />
            Proverb of the Moment
            <HiHeart className="text-emerald-500 dark:text-emerald-400" />
          </h2>
          <RandomProverb />
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-800 dark:to-teal-800 rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Explore?
          </h2>
          <p className="text-lg md:text-xl mb-6 text-white/90 max-w-2xl mx-auto">
            Start your journey through Nepali wisdom and discover meaningful proverbs that have stood the test of time.
          </p>
          <Link href="/ukhan">
            <Button className="bg-white text-emerald-600 hover:bg-gray-100 dark:bg-gray-900 dark:text-emerald-400 dark:hover:bg-gray-800 text-lg px-8">
              Browse All Ukhan
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}