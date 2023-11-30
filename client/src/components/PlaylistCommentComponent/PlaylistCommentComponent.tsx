import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  StyledCommentContainer,
  StyledUserFunction,
  StyledUserNameAndImg,
  StyledComment,
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
  usePutPlaylistComment,
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
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editedComment, setEditedComment] = useState('');

  const updateComment = usePutPlaylistComment();

  const handleEditStart = (commentId: string, comment: string) => {
    setEditingCommentId(commentId);
    setEditedComment(comment);
  };
  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditedComment('');
  };
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

  const handleEdit = () => {
    if (editingCommentId) {
      updateComment.mutate(
        { commentId: editingCommentId, comment: editedComment },
        {
          onSuccess: () => {
            setEditingCommentId(null);
            setEditedComment('');
            refetch();
          },
          onError: () => {
            alert('댓글을 수정할 수 없습니다.');
          },
        },
      );
    }
  };
  return (
    <StyledCommentContainer>
      <p>댓글 ({commentsData ? commentsData.length : 0})</p>
      <StyledInputContainer>
        <StyledTextArea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          disabled={isLoading}
          placeholder="댓글을 입력하세요."
        />
        <StyledButton onClick={handleSubmit} disabled={isLoading}>
          작성
        </StyledButton>
      </StyledInputContainer>

      {commentsData && commentsData.length > 0 ? (
        commentsData.map((comment: CommentProps) => (
          <StyledUserNameAndImg key={comment._id}>
            <StyledUserName>
              {comment.author?.userNickname || '익명'}
            </StyledUserName>
            <StyledCommentAndFunction>
              {editingCommentId === comment._id ? (
                <StyledInputContainer>
                  <StyledTextArea
                    value={editedComment}
                    onChange={(e) => setEditedComment(e.target.value)}
                    placeholder="댓글을 수정하세요."
                  />
                  <StyledButton onClick={handleEdit}>저장</StyledButton>
                  <StyledButton onClick={handleCancelEdit}>취소</StyledButton>
                </StyledInputContainer>
              ) : (
                <>
                  <StyledComment>{comment.comment}</StyledComment>
                  {userInfo &&
                    comment.author &&
                    userInfo.user._id === comment.author._id && (
                      <StyledUserFunction>
                        {editingCommentId !== comment._id && (
                          <>
                            <div
                              style={{ marginRight: '30px', marginTop: '2px' }}
                            >
                              {new Date(comment.date).toLocaleString('ko-KR', {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit',
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </div>
                            <StyledCorrection
                              onClick={() =>
                                handleEditStart(comment._id, comment.comment)
                              }
                            >
                              수정
                            </StyledCorrection>
                            <span>|</span>
                            <StyledDelete
                              onClick={() =>
                                handleDelete(comment._id, comment?.author?._id)
                              }
                            >
                              삭제
                            </StyledDelete>
                          </>
                        )}
                      </StyledUserFunction>
                    )}
                </>
              )}
            </StyledCommentAndFunction>
          </StyledUserNameAndImg>
        ))
      ) : (
        <p></p>
      )}
    </StyledCommentContainer>
  );
}
