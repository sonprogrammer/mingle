import React from 'react';
import { ChartComponent } from '../../components';
import { useGetSongslike } from '../../hooks/useGetSongslike';
import { formatDuration } from '../../utils';
interface SongData {
  song: {
    _id: string;
    songName: string;
    songImageName: string;
    songArtist: string | null;
    songDuration: number;
  };
  isCurrentUserLiked: boolean;
}
interface ChartItem {
  _id: string;
  title: string;
  img: string;
  artist: string;
  length: string;
  isLiked: boolean;
}

export default function ChartPage() {
  const { data: res, isLoading } = useGetSongslike();

  if (isLoading) return <div>Loading...</div>;

  const songs: ChartItem[] = res
    ? res.data.map((item: SongData) => ({
        _id: item.song._id,
        title: item.song.songName,
        img: `http://localhost:5173/upload/songImg/${item.song.songImageName}`,
        artist: item.song.songArtist || 'Unknown Artist',
        length: formatDuration(item.song.songDuration),
        isLiked: item.isCurrentUserLiked,
      }))
    : [];

  return <ChartComponent items={songs} title="차트" />;
}
