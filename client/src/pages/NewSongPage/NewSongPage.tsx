import React from 'react';
import { ChartComponent } from '../../components';
import { useGetNewSongChart } from '../../hooks';

export default function NewSongPage() {
  const {data: song, error } = useGetNewSongChart()


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
  
  if(error) {
    return <p>Error: {error.message} </p>
  }
  const formatDuration = (duration: number): string => {
    const minutes = Math.floor(duration / 60000);
    const seconds = ((duration % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds.padStart(2, '0')}`;
  };

  const songs: ChartItem[] =
  song?.map((item: SongData) => ({
    title: item.song.songName,
    img: `http://localhost:5173/upload/songImg/${item.song.songImageName}`,
    artist: item.song.songArtist || 'Unknown Artist',
    length: formatDuration(item.song.songDuration),
    isLiked: item.isCurrentUserLiked,
  })) || [];



  return (
    <ChartComponent items={songs} title="차트" />
  );
}
