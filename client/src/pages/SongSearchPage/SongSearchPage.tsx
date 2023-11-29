import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ChartComponent, PaginationComponent } from '../../components';
import { useGetSongsBySearch } from '../../hooks';
import { formatDuration } from '../../utils';

export default function SearchPage() {
  const location = useLocation();
  const type = location.state.type;
  const keyword = location.state.keyword;
  const [pageNum, setPageNum] = useState(1);
  let typeName = '';
  const { data, isLoading } = useGetSongsBySearch(type, keyword, pageNum);
  if (type === 'song-name') {
    typeName = '노래';
  } else typeName = '가수';
  const items: {
    _id: string;
    title: string;
    img: string;
    artist?: string;
    length: string;
    isLiked: boolean;
  }[] = [];
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
      {isLoading ? (
        <>로딩 중...</>
      ) : (
        <>
          <ChartComponent
            items={items}
            title={`'${keyword}'에 대한 ${typeName} 검색 결과입니다.`}
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
