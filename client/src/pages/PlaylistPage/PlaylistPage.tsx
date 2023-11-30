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
import {
  Content,
  Divider,
  ButtonBox,
  ModifyBtn,
  DeleteBtn,
  Text,
} from './styles';

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
          <div role="status" className="text-center mt-[36vh]">
            <svg
              aria-hidden="true"
              className="inline w-8 h-8 text-gray-200 mx-auto animate-spin dark:text-gray-600 fill-purple-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
        ) : (
          <>
            <AlbumArtComponent albumArtSrc={music.img[music.idx]} />
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
        <ButtonBox>
          <DeleteBtn onClick={handlePlayListDelete}>삭제하기</DeleteBtn>
          <Text>/</Text>
          <ModifyBtn onClick={() => setIsModalAppear(true)}>수정하기</ModifyBtn>
        </ButtonBox>
      ) : null}
      <Divider />
      <PlaylistDescriptionComponent
        playlistId={data?._id}
        description={data?.playListExplain}
        userImg={`http://kdt-sw-6-team09.elicecoding.com/file/profile/${
          data?.playListOwner.userFile || '1701310949831.png'
        }`}
        userName={data?.playListOwner.userNickname}
        isUserLiked={data?.like}
        likeCount={data?.likeCount}
        isFromMyPage={isFromMyPage}
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
