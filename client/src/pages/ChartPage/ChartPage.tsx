import React from 'react';
import { ChartComponent } from '../../components';
import { useGetSongslike } from '../../hooks/useGetSongslike';
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
  const { data: res, isLoading } = useGetSongslike();

  const formatDuration = (duration: number): string => {
    const minutes = Math.floor(duration / 60000);
    const seconds = ((duration % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds.padStart(2, '0')}`;
  };

  if (isLoading) return <div>Loading...</div>;

  const songs: ChartItem[] =
    res?.map((item: SongData) => ({
      title: item.song.songName,
      img: `http://localhost:5173/upload/songImg/${item.song.songImageName}`,
      artist: item.song.songArtist || 'Unknown Artist',
      length: formatDuration(item.song.songDuration),
      isLiked: item.isCurrentUserLiked,
    })) || [];

  return <ChartComponent items={songs} title="차트" />;
}
