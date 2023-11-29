import React, { useState } from 'react';
import { ChartComponent } from '../../components';
import PaginationComponent from '../../components/PaginationComponent/PaginationComponent';
import {
  useGetAllGenres,
  useGetSongsByGenre,
  usePostlikeToggle,
  useDeleteLikeToggle,
} from '../../hooks';
import { formatDuration } from '../../utils';
import { useNavigate } from 'react-router-dom';

export default function GenreSongPage() {
  const [genre, setGenre] = useState('클래식');
  const [pageNum, setPageNum] = useState(1);
  const { data, isLoading } = useGetSongsByGenre(genre, pageNum);
  const { data: genres, isLoading: isGenreLoading } = useGetAllGenres();
  const navigate = useNavigate();
  const handleItemClick = (id: string) => {
    const path = `/song/${id}`;
    navigate(path);
  };
  const items: {
    _id: string;
    title: string;
    img: string;
    artist?: string;
    length: string;
    isLiked: boolean;
  }[] = [];

  const { mutate: postLike } = usePostlikeToggle();
  const { mutate: deleteLike } = useDeleteLikeToggle();

  const handleLikeToggle = async (songId: string, isLiked: boolean) => {
    if (isLiked) {
      await deleteLike(songId);
    } else {
      await postLike(songId);
    }
  };

  data?.songs.map((item) =>
    items.push({
      _id: item.song._id,
      title: item.song.songName,
      img: `http://kdt-sw-6-team09.elicecoding.com/file/songImg/${item.song.songImageLocation}`,
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
            onLikeToggle={handleLikeToggle}
            onItemClick={handleItemClick}
            setPageNum={setPageNum}
          />
          {data?.songs && data.songs.length > 0 ? (
            <PaginationComponent
              setPageNum={setPageNum}
              currentPage={pageNum}
              totalPages={data?.totalPages}
            />
          ) : null}
        </>
      )}
    </>
  );
}
