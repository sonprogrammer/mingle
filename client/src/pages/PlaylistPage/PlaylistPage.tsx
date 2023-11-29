import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
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
  const setMusic = useSetRecoilState(musicState);
  const music = useRecoilValue(musicState);
  useEffect(() => {
    setMusic({
      playlistId: data?._id as string,
      playlist: data?.playListTitle as string,
      title: items[0]?.title,
      idx: data?.playListTitle === music.playlist ? music.idx : 0,
      img: `http://kdt-sw-6-team09.elicecoding.com/file/songImg/${items[
        music.idx
      ]?.img}`,
      url: `http://kdt-sw-6-team09.elicecoding.com/file/audio/${items[music.idx]
        ?.url}`,
      isPlaying: true,
      volume: music.volume,
      mute: music.mute,
    });
  }, []);
  return (
    <>
      <Content>
        {isLoading ? (
          <>Loading...</>
        ) : (
          <>
            <AlbumArtComponent albumArtSrc={music.img} />
            <PlaylistContentsComponent
              title={data?.playListTitle}
              songs={items}
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
