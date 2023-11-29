import React, { useState } from 'react';
import { ChartComponent, PaginationComponent } from '../../components';
import {
  useGetSongsByLike,
  usePostlikeToggle,
  useDeleteLikeToggle,
} from '../../hooks';
import { formatDuration } from '../../utils';

export default function LikedSongPage() {
  const [pageNum, setPageNum] = useState(1);
  const { data, isLoading } = useGetSongsByLike(pageNum);
  const postLikeMutation = usePostlikeToggle();
  const deleteLikeMutation = useDeleteLikeToggle();

  const handleLikeToggle = async (songId: string, isLiked: boolean) => {
    if (isLiked) {
      await deleteLikeMutation.mutateAsync(songId);
    } else {
      await postLikeMutation.mutateAsync(songId);
    }
  };
  const items: {
    title: string;
    img: string;
    artist?: string;
    length: string;
    isLiked: boolean;
  }[] = [];

  data?.songs.map((item) =>
    items.push({
      title: item.song.songName,
      img: `http://kdt-sw-6-team09.elicecoding.com/file/songImg/${item.song.songImageLocation}`,
      artist: item.song.songArtist ?? 'Unknown Artist',
      length: formatDuration(item.song.songDuration),
      isLiked: item.isCurrentUserLiked,
      _id: item.song._id,
    }),
  );

  return (
    <>
      {isLoading ? (
        <>로딩 중...</>
      ) : (
        <>
          <ChartComponent
            items={items}
            title={'좋아요한 음악'}
            onLikeToggle={handleLikeToggle}
          />
          {data?.songs && data.songs.length > 0 ? (
            <PaginationComponent
              setPageNum={setPageNum}
              currentPage={data?.currentPage}
              totalPages={data?.totalPages}
            />
          ) : null}
        </>
      )}
    </>
  );
}
