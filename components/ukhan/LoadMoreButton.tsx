'use client';

import { Button } from '../ui/Button';

interface LoadMoreButtonProps {
  onClick: () => void;
  hasMore: boolean;
  loading: boolean;
}

export function LoadMoreButton({ onClick, hasMore, loading }: LoadMoreButtonProps) {
  if (!hasMore) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        You've reached the end! 🎉
      </div>
    );
  }

  return (
    <div className="flex justify-center py-8">
      <Button 
        onClick={onClick} 
        variant="outline"
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Load More Proverbs'}
      </Button>
    </div>
  );
}