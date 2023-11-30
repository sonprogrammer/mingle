import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import {
  AlbumArtComponent,
  PlaylistContentsComponent,
  PlaylistDescriptionComponent,
  PlaylistCommentComponent,
} from '../../components';
import { PlaylistModifyComponent } from '../../components/PlaylistModifyComponent';
import { useGetPlaylistById } from '../../hooks';
import { useDeletePlayList } from '../../hooks/useCUDPlayList';
import { formatDuration, musicState } from '../../utils';
import { Content, Divider, ModifyBtn, DeleteBtn } from './styles';

export default function PlaylistPage() {
  const location = useLocation();
  const id = new URLSearchParams(location.search).get('id') as string;
  const songId = location.state.id;
  const isFromMyPage = Boolean(location.state.isFromMyPage);
  const { data, isLoading } = useGetPlaylistById(id);
  const items: {
    title: string;
    img: string;
    url: string;
    length: string;
    _id: string;
  }[] = [];
  data?.songDetails.map((song) => {
    items.push({
      title: `${song.songName} - ${song.songArtist || song.songUploader}`,
      img: song.songImageLocation,
      url: song.audioLocation,
      length: formatDuration(song.songDuration),
      _id: song._id,
    });
  });

  const music = useRecoilValue(musicState);

  const [isModalAppear, setIsModalAppear] = useState<boolean>(false);
  const modalRef = useRef();

  const handleOutsideClick = (e: React.MouseEvent<HTMLElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      // 모달 외부를 클릭한 경우에만 모달을 닫음
      setIsModalAppear(false);
    }
  };

  const { mutate: deleteMutate } = useDeletePlayList(data?._id);

  const handlePlayListDelete = () => {
    const isUserAgreed = confirm('정말로 이 플레이리스트를 삭제하시겠습니까?');
    if (!isUserAgreed) return;
    deleteMutate(data?._id);
    window.location.href = '/mypage';
  };

  useEffect(() => {
    // 모달이 열려있을 때만 외부 클릭 이벤트를 감지함
    if (isModalAppear) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    // 컴포넌트가 언마운트될 때 이벤트 리스너를 정리함
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isModalAppear]);

  return (
    <>
      <Content>
        {isLoading ? (
          <>Loading...</>
        ) : (
          <>
            {isModalAppear ? (
              <div ref={modalRef}>
                <PlaylistModifyComponent
                  playListId={data?._id}
                  img={data?.playListImg}
                  title={data?.playListTitle}
                  playListSongs={items}
                  description={data?.playListExplain}
                  genre={data?.genre}
                  setIsModalAppear={setIsModalAppear}
                />
              </div>
            ) : null}
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
      {isFromMyPage ? (
        <>
          <DeleteBtn onClick={handlePlayListDelete}>삭제하기</DeleteBtn>
          <ModifyBtn onClick={() => setIsModalAppear(true)}>수정하기</ModifyBtn>
        </>
      ) : null}
      <Divider />
      <PlaylistDescriptionComponent
        playlistId={data?._id}
        description={data?.playListExplain}
        userImg={`http://kdt-sw-6-team09.elicecoding.com/file/profile/${data?.playListOwner.userFile}`}
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
