import React from 'react';
import { ChartComponent } from '../../components';
import { usePostlikeToggle, useDeleteLikeToggle } from '../../hooks';
import { useGetSongsByTop } from '../../hooks/useGetSongsByTop';
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
  const { data: res, isLoading } = useGetSongsByTop();
  const { mutate: postLike } = usePostlikeToggle();
  const { mutate: deleteLike } = useDeleteLikeToggle();

  const handleLikeToggle = async (songId: string, isLiked: boolean) => {
    const mutation = isLiked ? deleteLike : postLike;
    await mutation.mutateAsync(songId);
  };

  if (isLoading) return <div>Loading...</div>;

  const songs: ChartItem[] = res
    ? res.data.map((item: SongData) => ({
        _id: item.song._id,
        title: item.song.songName,
        img: `http://kdt-sw-6-team09.elicecoding.com/file/songImg/${item.song.songImageLocation}`,
        artist: item.song.songArtist || 'Unknown Artist',
        length: formatDuration(item.song.songDuration),
        isLiked: item.isCurrentUserLiked,
      }))
    : [];

  return (
    <ChartComponent
      items={songs}
      onLikeToggle={handleLikeToggle}
      title="차트"
    />
  );
}
