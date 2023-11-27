import React from 'react';
import { ChartComponent } from '../../components';
import { useGetNewSongChart } from '../../hooks';
import { formatDuration } from '../../utils';

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

  const songs: ChartItem[] =
  song?.map((item: SongData) => ({
    title: item.song.songName,
    img: '/img/AlbumSample.jpg',
    artist: item.song.songArtist || 'Unknown Artist',
    length: formatDuration(item.song.songDuration),
    isLiked: item.isCurrentUserLiked,

  })) || [];



  return (
    <ChartComponent items={songs} title="최신 음악" />
  );
}
