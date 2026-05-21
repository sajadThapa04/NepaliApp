import Link from 'next/link';
import { Card } from '../ui/Card';

interface SongCardProps {
  id: string;
  title: string;
  artist: string;
  category: string;
  views?: number;
}

export const SongCard = ({ id, title, artist, category, views = 0 }: SongCardProps) => {
  return (
    <Link href={`/songs/${id}`}>
      <Card className="cursor-pointer hover:transform hover:scale-105 transition-transform">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
            <p className="text-gray-600 mb-2">{artist}</p>
            <div className="flex gap-2">
              <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">
                {category}
              </span>
              <span className="text-xs text-gray-500">👁️ {views}</span>
            </div>
          </div>
          <div className="text-red-500 text-2xl">🎵</div>
        </div>
      </Card>
    </Link>
  );
};