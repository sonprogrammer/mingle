import styled from "styled-components";
import { Card } from "antd";

export const StyledCard = styled(Card)`
  .ant-card-body {
    display: flex;
    padding: 0px;
  }
`;

export const ProfileAndAlbumContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const ProfileNameContainer = styled.p`
  font-size: 12px;
`;

export const PlaylistCardContainer = styled(Card)`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 5px;
  background-color: #bebebe;
`;

export const ProfileImage = styled.img`
  width: 26px;
  height: 26px;
  border-radius: 50%;
  margin-right: 10px;
  object-fit: cover;
`;

export const UserContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
  font-weight: bold;
`;
export const AlbumImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 5px;
  margin-right: 16px;
  display: flex;
  align-self: flex-start;
`;

export const ContentContainer = styled.div`
  flex-grow: 1;
  padding: 16px;
`;

export const HashtagList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 40px;
  margin-bottom: 16px;
`;

export const Hashtag = styled.li`
  display: inline;
  margin-right: 8px;
  color: #69696b;
  font-weight: bold;
`;
