import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  AlbumArtComponent,
  PlaylistContentsComponent,
  PlaylistDescriptionComponent,
  PlaylistCommentComponent,
} from '../../components';
import { useGetPlaylistById } from '../../hooks';
import { formatDuration } from '../../utils';
import { Content, Divider } from './styles';

export default function PlaylistPage() {
  const location = useLocation();
  const id = new URLSearchParams(location.search).get('id') as string;
  const { data, isLoading } = useGetPlaylistById(id);
  const items: {
    title: string;
    length: string;
  }[] = [];
  data?.songDetails.map((song) => {
    items.push({
      title: `${song.songName} - ${song.songArtist || song.songUploader}`,
      length: formatDuration(song.songDuration),
    });
  });
  return (
    <>
      <Content>
        {isLoading ? (
          <>Loading...</>
        ) : (
          <>
            <AlbumArtComponent albumArtSrc="/img/AlbumSample.jpg" />
            <PlaylistContentsComponent
              title={data?.playListTitle}
              songs={items}
            />
          </>
        )}
      </Content>
      <Divider />
      <PlaylistDescriptionComponent
        description={data?.playListExplain}
        userImg={'/img/User-Icon.png'}
        userName={data?.playListOwner}
        liked={data?.likeCount}
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
