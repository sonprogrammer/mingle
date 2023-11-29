import React, { useState, useEffect } from 'react';
import { usePostPlaylistComment, useGetPlaylistComment } from '../../hooks';
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

const TestComponent = () => {
  const [comment, setComment] = useState('');
  const queryClient = useQueryClient();
  const { data: comments, refetch } = useGetPlaylistComment(
    '65669cbbd90757f3cfea1728',
  );
  const { mutate: postComment, isLoading } = usePostPlaylistComment();

  useEffect(() => {
    refetch(); // 댓글 목록 최신 상태로 불러오기
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
            <p>{comment.author ? comment.author.userNickname : '익명'}</p>
            <p>{comment.comment}</p>
            <p>{new Date(comment.date).toLocaleString()}</p>
          </div>
        ))
      ) : (
        <p>댓글이 없습니다.</p>
      )}
    </div>
  );
};
export default TestComponent;
