import React from 'react';
import { useRecoilValue } from 'recoil';
import { songUploaderState } from '../../utils';
import { UserInfoComponent } from '../../components';

export default function UserInfoPage() {
  const songUploader = useRecoilValue(songUploaderState);

  if (!songUploader) {
    return <div>사용자 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <div>
      <UserInfoComponent songUploader={songUploader} />
    </div>
  );
}
