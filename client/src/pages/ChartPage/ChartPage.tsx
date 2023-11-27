import React from 'react';
import { ChartComponent } from '../../components';
import { usePostlikeToggle, useDeleteLikeToggle } from '../../hooks'
import { useGetSongslike } from '../../hooks/useGetSongslike';
import { formatDuration } from '../../utils';
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
  const postLikeMutation = usePostlikeToggle();
  const deleteLikeMutation = useDeleteLikeToggle();

  const handleLikeToggle = async (songId: string, isLiked: boolean) => {
    if (isLiked) {
      await deleteLikeMutation.mutateAsync(songId);
    } else {
      await postLikeMutation.mutateAsync(songId);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  const songs: ChartItem[] =
    res.data?.map((item: SongData) => ({
      title: item.song.songName,
      img: `http://localhost:5173/upload/songImg/${item.song.songImageName}`,
      artist: item.song.songArtist || 'Unknown Artist',
      length: formatDuration(item.song.songDuration),
      isLiked: item.isCurrentUserLiked,
      _id: item.song._id
    })) || [];

  return <ChartComponent items={songs} onLikeToggle={handleLikeToggle}  title="차트" />;
}
