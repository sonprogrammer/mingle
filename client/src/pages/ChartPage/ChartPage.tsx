import React, { useEffect, useState } from 'react';
import { ChartComponent } from '../../components';
import { fetchSongsByLikes } from '../../utils';
interface SongData {
  song: {
    songName: string;
    songImageName: string;
    songArtist: string | null;
    songDuration: number;
  };
  isCurrentUserLiked: boolean;
}
interface ChartItem {
  title: string;
  img: string;
  artist: string;
  length: string;
  isLiked: boolean;
}

export default function ChartPage() {
  const [songs, setSongs] = useState<ChartItem[]>([]);

  useEffect(() => {
    fetchSongsByLikes()
      .then((data: SongData[]) => {
        if (data) {
          const formattedSongs = data.map((item: SongData) => ({
            title: item.song.songName,
            img: `http://localhost:5173/upload/songImg/1700467037093.jpg`,
            artist: item.song.songArtist || 'Unknown Artist',
            length: formatDuration(item.song.songDuration),
            isLiked: item.isCurrentUserLiked,
          }));
          setSongs(formattedSongs);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  const formatDuration = (duration: number): string => {
    const minutes = Math.floor(duration / 60000);
    const seconds = ((duration % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds.padStart(2, '0')}`;
  };

  return <ChartComponent items={songs} title="차트" />;
}
