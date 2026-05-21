'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { RandomProverb } from '@/components/ukhan/RandomProverb';
import { GiMusicalNotes, GiScrollUnfurled } from 'react-icons/gi';
import { FaFlag } from 'react-icons/fa';
import { HiHeart } from 'react-icons/hi';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 dark:from-red-800 dark:via-purple-800 dark:to-blue-800 text-white">
        <div className="container mx-auto px-4 py-20">
          <div className="flex justify-center mb-6">
            <FaFlag className="text-7xl animate-bounce" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-center mb-6">
            Nepali Cultural Hub
          </h1>
          <p className="text-xl md:text-2xl text-center mb-12 max-w-3xl mx-auto text-white/90">
            Explore Nepali song lyrics, Ukhan Tukka (proverbs), and immerse yourself in Nepali culture
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
          
            <Link href="/ukhan">
              <Button variant="outline" className="w-full sm:w-auto text-lg px-8 bg-white dark:bg-gray-900 text-purple-600 dark:text-purple-400" icon={<GiScrollUnfurled className="text-xl" />}>
                Discover Ukhan
              </Button>
            </Link>

              <Link href="/songs">
              <Button className="w-full sm:w-auto text-lg px-8" icon={<GiMusicalNotes className="text-xl" />}>
                Explore Songs
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          What We Offer
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <Link href="/songs">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer transform hover:scale-105">
              <div className="p-8">
                <GiMusicalNotes className="text-5xl mb-4 text-red-600 dark:text-red-400" />
                <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
                  Song Lyrics
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Explore thousands of Nepali song lyrics from classic to modern hits.
                  Find lyrics for your favorite Nepali songs.
                </p>
                <Button variant="outline" size="sm">
                  Browse Songs →
                </Button>
              </div>
            </div>
          </Link>

          <Link href="/ukhan">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer transform hover:scale-105">
              <div className="p-8">
                <GiScrollUnfurled className="text-5xl mb-4 text-green-600 dark:text-green-400" />
                <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
                  Ukhan Tukka
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Discover traditional Nepali proverbs (उखान टुक्का) with their meanings.
                  Learn wisdom passed down through generations.
                </p>
                <Button variant="outline" size="sm">
                  Explore Ukhan →
                </Button>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Random Proverb Section */}
      <div className="bg-gray-50 dark:bg-gray-800/50 py-16 transition-colors duration-200">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 flex items-center justify-center gap-2 text-gray-900 dark:text-white">
            <HiHeart className="text-red-500 dark:text-red-400" />
            Proverb of the Moment
            <HiHeart className="text-red-500 dark:text-red-400" />
          </h2>
          <RandomProverb />
        </div>
      </div>
    </div>
  );
}