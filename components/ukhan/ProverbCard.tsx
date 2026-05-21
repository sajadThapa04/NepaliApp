'use client';

import { Card } from '../ui/Card';
import { Ukhan } from '@/app/types/ukhan.types';
import { FaQuoteLeft, FaQuoteRight, FaLeaf } from 'react-icons/fa';
import { GiScrollUnfurled } from 'react-icons/gi';

interface ProverbCardProps extends Ukhan {
  isRandom?: boolean;
}

export function ProverbCard({ 
  text, 
  meaning, 
  category, 
  alphabet,
  isRandom = false
}: ProverbCardProps) {
  return (
    <Card className={`
      group cursor-default transition-all duration-300 h-full flex flex-col text-center
      hover:shadow-2xl hover:-translate-y-1
      relative overflow-hidden
      ${isRandom 
        ? 'border-amber-200/50 dark:border-amber-800/50 bg-gradient-to-br from-amber-50/80 via-yellow-50/60 to-orange-50/80 dark:from-amber-900/20 dark:via-yellow-900/15 dark:to-orange-900/20' 
        : 'border-gray-100 dark:border-gray-800 bg-white/90 dark:bg-gray-900/90 hover:border-emerald-200 dark:hover:border-emerald-800'
      }
    `}>
      {/* Decorative corner elements */}
      <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-emerald-500/5 to-transparent rounded-br-full"></div>
      <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-teal-500/5 to-transparent rounded-tl-full"></div>

      {/* Decorative quote marks */}
      <div className="absolute top-4 left-4 text-3xl text-gray-200 dark:text-gray-800 opacity-30 group-hover:opacity-40 transition-opacity">
        <FaQuoteLeft />
      </div>
      <div className="absolute bottom-4 right-4 text-3xl text-gray-200 dark:text-gray-800 opacity-30 group-hover:opacity-40 transition-opacity">
        <FaQuoteRight />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 relative z-10">
        {/* Decorative icon */}
        <div className="mb-5 transform group-hover:scale-110 transition-transform duration-300">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/40 dark:to-teal-900/40 flex items-center justify-center group-hover:shadow-lg transition-shadow">
            <GiScrollUnfurled className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
          </div>
        </div>
        
        {/* Proverb Text */}
        <p className="text-xl md:text-2xl font-medium text-gray-800 dark:text-white leading-relaxed text-center group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
          {text}
        </p>
        
        {/* Decorative divider */}
        <div className="flex items-center justify-center gap-2 my-5">
          <div className="w-10 h-px bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-700"></div>
          <FaLeaf className="w-3 h-3 text-emerald-400 dark:text-emerald-600 opacity-60" />
          <div className="w-10 h-px bg-gradient-to-l from-transparent to-gray-300 dark:to-gray-700"></div>
        </div>
        
        {/* Meaning */}
        {meaning && (
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed text-center italic">
            {meaning}
          </p>
        )}
      </div>

      {/* Tags */}
      {(category || alphabet) && (
        <div className="flex flex-wrap gap-2 justify-center px-4 pb-6 pt-2">
          {category && (
            <span className="inline-flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-full bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/50 dark:to-teal-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50">
              <span className="text-emerald-400">✦</span>
              {category}
            </span>
          )}
          {alphabet && (
            <span className="inline-flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/50 dark:to-cyan-950/50 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/50">
              <span>📖</span>
              {alphabet}
            </span>
          )}
        </div>
      )}

      {/* Bottom highlight bar */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
    </Card>
  );
}