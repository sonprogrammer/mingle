import { useGetSongDetails } from '../../hooks';
import { useParams } from 'react-router-dom';

export default function SongDetailsPage() {
  const { songId } = useParams();
  const { data, isLoading, error } = useGetSongDetails(songId ?? '');

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>에러가 발생했습니다.</div>;

  const song = data?.song; // 곡의 상세 정보

  return (
    <div>
      <h1>{song.songName}</h1>
      <p>{song.songArtist || '익명의 아티스트'}</p>
      <p>{song.songDescription}</p>

      {song.songImageLocation && (
        <img
          src={song.songImageLocation}
          alt={`Album art for ${song.songName}`}
        />
      )}
    </div>
  );
}
