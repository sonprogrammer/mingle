import React, { useRef, useState } from 'react';
import {
  StyledUserInfo,
  StyledUserImage,
  StyledUserDescript,
  StyledUserStatus,
  StyledPostCount,
  StyledFollower,
  StyledFollowing,
  StyledUserSubInfo,
  StyledDivider,
} from './styles';
import { EditableText } from './EditableTextProps';
import { UserInfo } from '../../types';

interface UserProfileHeaderProps {
  userImage: string;
  postsCount: number;
  followersCount: number;
  followingCount: number;
  onUpdate: (updatedInfo: Partial<UserInfo>) => void;
  onProfileUpdate: (userImage: string) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
  profile: UserInfo;
}

interface UploadImage {
  file: File;
  type: string;
}
export default function MyInfoComponent({
  profile,
  playlist,
  postsCount,
  onProfileUpdate,
  onUpdate,
}: UserProfileHeaderProps) {
  const [statusMessage, setStatusMessage] = useState(
    profile?.userDescription || '20자 이내로 계정 설명을 입력해주세요.',
  );

  const handleStatusUpdate = async (updatedText: string) => {
    onUpdate({ userDescription: updatedText });
  };
  //이미지 경로 생성
  const imageUrl = `http://kdt-sw-6-team09.elicecoding.com/file/profile/${
    profile.userFile || '1701310949831.png'
  }`;
  const imageInput = useRef<HTMLInputElement>();
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList && fileList[0]) {
      const reader = new FileReader();
      reader.onload = function () {
        const result = reader.result as string;
        const dataIndex = result.indexOf(',') + 1;
        const base64 = result.substring(dataIndex, result?.length);
        onProfileUpdate(base64);
      };
      reader.readAsDataURL(fileList[0]);
    }
  };
  const onClickImageUpload = () => {
    if (imageInput.current) imageInput.current.click();
  };
  return (
    <>
      <StyledUserInfo>
        <StyledUserSubInfo>
          {/* <UserImageContainer> */}
          <input
            type="file"
            style={{ display: 'none' }}
            accept="image/*"
            onChange={handleImageUpload}
            ref={imageInput}
          />
          <StyledUserImage
            src={imageUrl}
            alt={'User'}
            onClick={onClickImageUpload}
          />
          {/* </UserImageContainer> */}
          <StyledUserDescript>
            <h2>{profile?.userNickname}</h2>
            <EditableText
              initialText={statusMessage}
              onChange={(e) => setStatusMessage(e.target.value)}
              onSave={(updatedText) => handleStatusUpdate(updatedText)}
              maxLength={20}
            />
          </StyledUserDescript>
        </StyledUserSubInfo>
        <StyledUserStatus>
          <StyledPostCount>
            <p>게시물 </p>
            <span>{playlist.length}</span>
          </StyledPostCount>
          <StyledFollower>
            <p>팔로워 </p>
            <span>{profile.userFollower.length} </span>
          </StyledFollower>
          <StyledFollowing>
            <p>팔로잉</p>
            <span>{profile.userFollow.length}</span>
          </StyledFollowing>
        </StyledUserStatus>
      </StyledUserInfo>
      <StyledDivider />
    </>
  );
}
