import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import {
  PlaylistCardContainer,
  ProfileSection,
  AlbumImage,
  ContentSection,
  Title,
  SocialInfo,
  LikesText,
  DeleteButton,
  ConfirmButton,
  Buttons,
  ModalContainer,
  ModalBox,
  Modal,
  CancelButton,
} from './styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { useDeleteSong } from '../../hooks';

interface RecommendPlaylistComponentProps {
  _id: string;
  playListSongs?: string[];
  playListTitle: string;
  playListExplain?: string;
  playListOwner?: string;
  playListImg: string;
  playListComments?: string[];
  likedByUser?: boolean;
  likeCount: number;
  onClick?: (_id: string) => void;
  onDelete: () => void;
  handleDeleteUploadedSong: (songId: string) => Promise<void>;
  songId: string;
  songData: any;
  selectTab: string;
}

export default function RecommendPlaylistComponent({
  _id,
  playListImg,
  playListTitle,
  likeCount,
  onClick,
  selectTab,
  songId,
}: RecommendPlaylistComponentProps) {
  const navigate = useNavigate();
  const [isModal, setIsModal] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const { mutate: deleteSong } = useDeleteSong();

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setIsModal(true);
  };

  const handleCloseModalClick = (e) => {
    e.stopPropagation();
    setIsModal(false);
  };
  const handleMouseEnter = () => {
    if (selectTab === 'myuploadsongslists') {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleDeleteConfirmation = async (e) => {
    e.stopPropagation();
    await deleteSong(songId);
    setIsModal(false);
  };
  const handleCardClick = () => {
    navigate(`/playlist?id=${_id}`, { state: { id: 0, isFromMyPage: true } });
  };
  return (
    <PlaylistCardContainer
      onClick={handleCardClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isHovered && (
        <DeleteButton>
          <FontAwesomeIcon icon={faCircleXmark} onClick={handleDeleteClick} />
        </DeleteButton>
      )}
      <ProfileSection>
        <AlbumImage
          src={`http://kdt-sw-6-team09.elicecoding.com/file/playListCover/${playListImg}`}
          alt="Album Cover"
        />
      </ProfileSection>
      <ContentSection>
        <Title>{playListTitle}</Title>
        <SocialInfo>
          <LikesText>좋아요: {likeCount ?? 0}개</LikesText>
        </SocialInfo>
      </ContentSection>
      <ModalContainer>
        {isModal && (
          <ModalBox>
            <Modal>
              <p>정말 삭제하시겠습니까?</p>
              <Buttons>
                <ConfirmButton onClick={handleDeleteConfirmation}>
                  확인
                </ConfirmButton>
                <CancelButton onClick={handleCloseModalClick}>
                  취소
                </CancelButton>
              </Buttons>
            </Modal>
          </ModalBox>
        )}
      </ModalContainer>
    </PlaylistCardContainer>
  );
}
