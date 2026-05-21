'use client';

import { ProverbCard } from './ProverbCard';
import { Ukhan } from '@/app/types/ukhan.types';

interface ProverbListProps {
  proverbs: Ukhan[];
  loadingMore?: boolean;
}

export function ProverbList({ proverbs, loadingMore }: ProverbListProps) {
  if (proverbs.length === 0) {
    return (
      <div className="text-center py-16 bg-white/50 dark:bg-gray-800/50 rounded-2xl">
        <div className="text-6xl mb-4">🔍</div>
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          No proverbs found
        </p>
        <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
          Try adjusting your search or filter
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {proverbs.map((proverb, index) => (
        <div 
          key={proverb.id} 
          className="animate-fadeInUp" 
          style={{ animationDelay: `${(index % 12) * 0.05}s` }}
        >
          <ProverbCard {...proverb} />
        </div>
      ))}
    </div>
  );
}