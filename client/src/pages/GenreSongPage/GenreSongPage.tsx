import React, { useCallback, useEffect, useState } from 'react';
import { ChartComponent } from '../../components';
import { useGetSongsByGenre, useRefreshGetSongsByGenre } from '../../hooks';

export default function GenreSongPage() {
  const [genre, setGenre] = useState('발라드');
  const [pageNum, setPageNum] = useState(1);
  const { data, isLoading } = useGetSongsByGenre(genre, pageNum);
  const { mutate } = useRefreshGetSongsByGenre(genre, pageNum);
  const items: {
    title: string;
    img: string;
    artist?: string;
    length: number;
    isLiked: boolean;
  }[] = [];

  data?.songs.map((item) =>
    items.push({
      title: item.song.songName,
      img: '/img/AlbumSample.jpg',
      artist: item.song.songArtist ?? 'Unknown Artist',
      length: item.song.songDuration,
      isLiked: item.isCurrentUserLiked,
    }),
  );

  const memoizedMutate = useCallback(mutate, [mutate]);
  useEffect(() => {
    memoizedMutate();
  }, [genre, memoizedMutate]);

  return (
    <>
      {isLoading ? (
        <>로딩 중...</>
      ) : (
        <ChartComponent
          items={items}
          title={'장르별 음악'}
          setGenre={setGenre}
        />
      )}
    </>
  );
}
