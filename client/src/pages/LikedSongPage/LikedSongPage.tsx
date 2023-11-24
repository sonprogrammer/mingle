import React, { useState } from 'react';
import { ChartComponent, PaginationComponent } from '../../components';
import { useGetSongsByLike } from '../../hooks';
import { formatDuration } from '../../utils';

export default function LikedSongPage() {
  const [pageNum, setPageNum] = useState(1);
  const { data, isLoading } = useGetSongsByLike(pageNum);
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
      img: '/img/AlbumSample.jpg',
      artist: item.song.songArtist ?? 'Unknown Artist',
      length: formatDuration(item.song.songDuration),
      isLiked: item.isCurrentUserLiked,
    }),
  );

  return (
    <>
      {isLoading ? (
        <>로딩 중...</>
      ) : (
        <>
          <ChartComponent items={items} title={'좋아요한 음악'} />
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
