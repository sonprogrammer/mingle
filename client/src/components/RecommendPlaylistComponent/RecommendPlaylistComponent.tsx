import React, { useState } from 'react';
import * as Styled from './styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { useDeleteSong } from '../../hooks';

interface RecommendPlaylistProps {
  albumCover: string;
  title: string;
  hashtags?: string[];
  likes: number;
  songId: string;
  selectTab: string;
  onDelete: () => void;
  handleDeleteUploadedSong: (songId: string) => Promise<void>; 
  songData: any
}

export default function RecommendPlaylistComponent({
  albumCover,
  title,
  likes,
  songId,
  songData,
  selectTab,
  onDelete,
  handleDeleteUploadedSong
}: RecommendPlaylistProps) {
  const [isModal, setIsModal] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const deleteSongMutation = useDeleteSong();

  const handleDeleteClick = () => {
    setIsModal(true);
  };

  const handleCloseModalClick = () => {
    setIsModal(false);
  };
  const handleMouseEnter = () => {
    if(selectTab === 'myuploadsongslists'){
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleDeleteConfirmation = async () => {
        await deleteSongMutation.mutateAsync(songId);
        setIsModal(false);
  };

  return (
    <Styled.PlaylistCardContainer
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isHovered && (
        <Styled.DeleteButton onClick={handleDeleteClick}>
          <FontAwesomeIcon icon={faCircleXmark} />
        </Styled.DeleteButton>
      )}
      <Styled.ProfileSection>
        <Styled.AlbumImage src={albumCover} alt="Album Cover" />
      </Styled.ProfileSection>
      <Styled.ContentSection>
        <Styled.Title>{title}</Styled.Title>
        <Styled.SocialInfo>
          <Styled.LikesText>좋아요: {likes}개</Styled.LikesText>
        </Styled.SocialInfo>
      </Styled.ContentSection>
      <Styled.ModalContainer>
        {isModal && (
          <Styled.ModalBox>
            <Styled.Modal>
              <p>정말 삭제하시겠습니까?</p>
              <Styled.Buttons>
                <Styled.ConfirmButton onClick={handleDeleteConfirmation}>
                  확인
                </Styled.ConfirmButton>
                <Styled.CancelButton onClick={handleCloseModalClick}>
                  취소
                </Styled.CancelButton>
              </Styled.Buttons>
            </Styled.Modal>
          </Styled.ModalBox>
        )}
      </Styled.ModalContainer>
    </Styled.PlaylistCardContainer>
  );
}
