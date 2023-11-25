import React, { useCallback, useEffect, useState } from 'react';
import { ChartComponent } from '../../components';
import PaginationComponent from '../../components/PaginationComponent/PaginationComponent';
import { useGetAllGenres, useGetSongsByGenre } from '../../hooks';
import { formatDuration } from '../../utils';

export default function GenreSongPage() {
  const [genre, setGenre] = useState('발라드');
  const [pageNum, setPageNum] = useState(1);
  const { data, isLoading } = useGetSongsByGenre(genre, pageNum);
  const { data: genres, isLoading: isGenreLoading } = useGetAllGenres();
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
      {isLoading && isGenreLoading ? (
        <>로딩 중...</>
      ) : (
        <>
          <ChartComponent
            items={items}
            title={'장르별 음악'}
            setGenre={setGenre}
            genres={genres}
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
