'use client';

import { SongCard } from './SongCard';

interface Song {
  id: string;
  title: string;
  artist: string;
  category: string;
  views: number;
}

interface SongListProps {
  songs: Song[];
}

export const SongList = ({ songs }: SongListProps) => {
  if (songs.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No songs found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {songs.map((song) => (
        <SongCard key={song.id} {...song} />
      ))}
    </div>
  );
};