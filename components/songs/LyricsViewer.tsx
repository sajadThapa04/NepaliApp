'use client';

import { useState } from 'react';
import { Button } from '../ui/Button';

interface LyricsViewerProps {
  lyrics: string;
  title: string;
}

export const LyricsViewer = ({ lyrics, title }: LyricsViewerProps) => {
  const [showTranslation, setShowTranslation] = useState(false);

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Lyrics</h2>
        <Button 
          variant="outline" 
          onClick={() => setShowTranslation(!showTranslation)}
        >
          {showTranslation ? 'Hide Translation' : 'Show Translation'}
        </Button>
      </div>
      <div className="prose max-w-none">
        <pre className="font-sans whitespace-pre-wrap text-gray-700 leading-relaxed">
          {lyrics}
        </pre>
      </div>
    </div>
  );
};