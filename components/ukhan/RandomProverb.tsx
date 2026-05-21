'use client';

import { useState, useEffect } from 'react';
import { Button } from '../ui/Button';
import { HiRefresh } from 'react-icons/hi';

interface Ukhan {
  id: string;
  text: string;
  meaning?: string;
  category?: string;
  alphabet?: string;
  isVerified?: boolean;
  likes?: number;
  views?: number;
}

export function RandomProverb() {
  const [proverb, setProverb] = useState<Ukhan | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchRandomProverb = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/ukhan/random');
      if (!response.ok) {
        throw new Error('Failed to fetch');
      }
      const data = await response.json();
      setProverb(data);
    } catch (error) {
      console.error('Error fetching proverb:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomProverb();
  }, []);

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center ring-1 ring-gray-900/5 dark:ring-gray-700">
        <div className="animate-pulse text-gray-600 dark:text-gray-400">
          <div className="text-4xl mb-4">📜</div>
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (!proverb) return null;

  return (
    <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-lg shadow-md p-8 ring-1 ring-gray-900/5 dark:ring-gray-700 transition-all duration-200">
      <div className="text-center">
        <div className="text-4xl mb-4">📜</div>
        <h3 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-white mb-4 leading-relaxed">
          "{proverb.text}"
        </h3>
        {proverb.meaning && (
          <p className="text-gray-600 dark:text-gray-300 mb-4 text-lg">
            {proverb.meaning}
          </p>
        )}
        <div className="flex justify-center gap-3 mb-6">
          {proverb.category && (
            <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-3 py-1 rounded-full">
              {proverb.category}
            </span>
          )}
          {proverb.alphabet && (
            <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full">
              {proverb.alphabet}
            </span>
          )}
          {proverb.isVerified && (
            <span className="text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 px-3 py-1 rounded-full">
              ✓ Verified
            </span>
          )}
        </div>
        <div className="flex justify-center gap-4 mb-6 text-sm text-gray-500 dark:text-gray-400">
          {proverb.likes !== undefined && (
            <span>❤️ {proverb.likes} likes</span>
          )}
          {proverb.views !== undefined && (
            <span>👁️ {proverb.views} views</span>
          )}
        </div>
        <Button 
          onClick={fetchRandomProverb} 
          variant="outline" 
          icon={<HiRefresh className="text-lg" />}
        >
          New Proverb
        </Button>
      </div>
    </div>
  );
}