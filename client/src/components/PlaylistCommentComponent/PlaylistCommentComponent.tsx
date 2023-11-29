import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  StyledCommentContainer,
  StyledUserFunction,
  StyledUserNameAndImg,
  StyledComment,
  StyledUserImg,
  StyledUserName,
  StyledCorrection,
  StyledCommentAndFunction,
  StyledDelete,
  StyledTextArea,
  StyledButton,
  StyledInputContainer,
} from './styles';
import {
  usePostPlaylistComment,
  useGetPlaylistComment,
  useDeletePlaylistComment,
  useGetUserInfo,
} from '../../hooks';
import { useQueryClient } from 'react-query';

interface CommentProps {
  author?: {
    _id: string;
    userNickname: string;
    userFile: string;
  };
  comment: string;
  _id: string;
  date: string;
}

export default function PlaylistCommentComponent() {
  const [comment, setComment] = useState('');
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const playlistId = query.get('id');
  const queryClient = useQueryClient();
  const { data: commentsData, refetch } = useGetPlaylistComment(playlistId);
  const { data: userInfo } = useGetUserInfo();
  const { mutate: postComment, isLoading } = usePostPlaylistComment();
  const deleteComment = useDeletePlaylistComment();

  useEffect(() => {
    refetch();
  }, [refetch, playlistId]);

  const handleSubmit = () => {
    postComment(
      { playlistId: playlistId, comment },
      {
        onSuccess: () => {
          setComment('');
          queryClient.invalidateQueries(['playlistComment', playlistId]);
        },
      },
    );
  };

  const handleDelete = (commentId: string, authorId?: string) => {
    if (userInfo && authorId && userInfo.user._id === authorId) {
      deleteComment.mutate(
        { playlistId: playlistId, commentId },
        {
          onSuccess: () => {
            queryClient.invalidateQueries(['playlistComment', playlistId]);
          },
          onError: () => {
            alert('댓글을 삭제할 수 없습니다.');
          },
        },
      );
    } else {
      alert('삭제 권한이 없습니다.');
    }
  };

  return (
    <StyledCommentContainer>
      <p>댓글</p>
      <StyledInputContainer>
        <StyledTextArea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          disabled={isLoading}
          placeholder="댓글을 입력하세요."
        />
        <StyledButton onClick={handleSubmit} disabled={isLoading}>
          게시
        </StyledButton>
      </StyledInputContainer>
      {commentsData && commentsData.length > 0 ? (
        commentsData.map((comment: CommentProps) => (
          <StyledUserNameAndImg key={comment._id}>
            <StyledUserName>
              {comment.author?.userNickname || '익명'}
            </StyledUserName>
            <StyledCommentAndFunction>
              <StyledComment>{comment.comment}</StyledComment>
              {userInfo &&
                comment.author &&
                userInfo.user._id === comment.author._id && (
                  <StyledUserFunction>
                    <div style={{ marginRight: '30px', marginTop: '2px' }}>
                      {new Date(comment.date).toLocaleString('ko-KR', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </div>
                    {/* 날짜가 모두에게 보이게 수정? */}
                    <StyledCorrection>수정</StyledCorrection>
                    <span>|</span>
                    <StyledDelete
                      onClick={() =>
                        handleDelete(comment._id, comment?.author?._id)
                      }
                    >
                      삭제
                    </StyledDelete>
                  </StyledUserFunction>
                )}
            </StyledCommentAndFunction>
          </StyledUserNameAndImg>
        ))
      ) : (
        <p>댓글이 없습니다.</p>
      )}
    </StyledCommentContainer>
  );
}
