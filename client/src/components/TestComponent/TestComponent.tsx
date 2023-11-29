import React, { useState, useEffect } from 'react';
import {
  usePostPlaylistComment,
  useGetPlaylistComment,
  useDeletePlaylistComment,
} from '../../hooks';
import { useQueryClient } from 'react-query';
import { useGetUserInfo } from '../../hooks';
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

const TestComponent = () => {
  const [comment, setComment] = useState('');
  const queryClient = useQueryClient();
  const { data: comments, refetch } = useGetPlaylistComment(
    '65669cbbd90757f3cfea1728',
  );
  const { data: userInfo } = useGetUserInfo();
  const { mutate: postComment, isLoading } = usePostPlaylistComment();
  const deleteComment = useDeletePlaylistComment();
  console.log(userInfo);
  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleSubmit = () => {
    postComment(
      { playlistId: '65669cbbd90757f3cfea1728', comment },
      {
        onSuccess: () => {
          setComment('');
          queryClient.invalidateQueries([
            'playlistComment',
            '65669cbbd90757f3cfea1728',
          ]);
        },
      },
    );
  };

  const handleDelete = (commentId: string, authorId?: string) => {
    // 로그인한 사용자와 댓글 작성자의 아이디 비교
    if (userInfo && authorId && userInfo.user._id === authorId) {
      deleteComment.mutate(
        { playlistId: '65669cbbd90757f3cfea1728', commentId },
        {
          onSuccess: () => {
            queryClient.invalidateQueries([
              'playlistComment',
              '65669cbbd90757f3cfea1728',
            ]);
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
    <div>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        disabled={isLoading}
      />
      <button onClick={handleSubmit} disabled={isLoading}>
        댓글 추가
      </button>
      {comments && comments.length > 0 ? (
        comments.map((comment: CommentProps) => (
          <div key={comment._id}>
            <p>{comment.author?.userNickname || '익명'}</p>
            <p>{comment.comment}</p>
            <p>{new Date(comment.date).toLocaleString()}</p>
            {userInfo &&
              comment.author &&
              userInfo.user._id === comment.author._id && (
                <button
                  onClick={() => handleDelete(comment._id, comment.author?._id)}
                >
                  X
                </button>
              )}
            <br />
          </div>
        ))
      ) : (
        <p>댓글이 없습니다.</p>
      )}
    </div>
  );
};

export default TestComponent;
