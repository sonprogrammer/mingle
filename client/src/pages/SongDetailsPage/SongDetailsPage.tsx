import React, { useState } from 'react';
import { useGetSongDetails } from '../../hooks';

type Song = {
  id: string;
  name: string;
};
type SongListProps = {
  songs: Song[];
};

export default function SongList({ songs }: SongListProps) {
  const [selectedSongId, setSelectedSongId] = useState<string | null>(null);
  const { data: songData, isLoading: loading } = useGetSongDetails(
    selectedSongId || '',
  );

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <ul>
        {songs.map((song) => (
          <li key={song.id} onClick={() => setSelectedSongId(song.id)}>
            {song.name}
          </li>
        ))}
      </ul>

      {songData && (
        <div>
          <h1>{songData.song.songName}</h1>
          <p>{songData.song.songDescription}</p>
          // 이하 생략...
        </div>
      )}
    </div>
  );
}
