import React from 'react';
import { useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import {
  AlbumArtComponent,
  PlaylistContentsComponent,
  PlaylistDescriptionComponent,
  PlaylistCommentComponent,
} from '../../components';
import { useGetPlaylistById } from '../../hooks';
import { formatDuration, musicState } from '../../utils';
import { Content, Divider } from './styles';

export default function PlaylistPage() {
  const location = useLocation();
  const id = new URLSearchParams(location.search).get('id') as string;
  const songId = location.state.id;
  const { data, isLoading } = useGetPlaylistById(id);
  const items: {
    title: string;
    img: string;
    url: string;
    length: string;
  }[] = [];
  data?.songDetails.map((song) => {
    items.push({
      title: `${song.songName} - ${song.songArtist || song.songUploader}`,
      img: song.songImageLocation,
      url: song.audioLocation,
      length: formatDuration(song.songDuration),
    });
  });
  const music = useRecoilValue(musicState);
  return (
    <>
      <Content>
        {isLoading ? (
          <>Loading...</>
        ) : (
          <>
            <AlbumArtComponent albumArtSrc={music.img} />
            <PlaylistContentsComponent
              playlistId={data?._id}
              title={data?.playListTitle}
              songs={items}
              songId={songId}
            />
          </>
        )}
      </Content>
      <Divider />
      <PlaylistDescriptionComponent
        playlistId={data?._id}
        description={data?.playListExplain}
        userImg={'/img/User-Icon.png'}
        userName={data?.playListOwner.userNickname}
        isUserLiked={data?.like}
        likeCount={data?.likeCount}
      />
      <Divider />
      <PlaylistCommentComponent
        userImage={'./img/User-Icon.png'}
        userName={'떼깔룩'}
        userComment={'덕분에 오늘 하루가 즐거워졌습니다!'}
        currentUser={'떼깔룩'}
      />
    </>
  );
}
