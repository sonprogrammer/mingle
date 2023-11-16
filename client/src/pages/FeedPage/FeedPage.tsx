import React from "react";
import {
  SearchComponent,
  SideBarComponent,
  PlaybarComponent,
  PlaylistCardComponent,
  ContentWrapper,
  FeedFollowRecommendComponent,
} from "../../components";

export default function FeedPage() {
  return (
    <>
      <SearchComponent />
      <SideBarComponent />
      <ContentWrapper>
        <PlaylistCardComponent
          profileIcon={"/img/User-Icon.png"}
          profileName={"때껄룩"}
          albumCover={"/img/AlbumSample.jpg"}
          title={"[Playlist] 쌀쌀한 늦가을에 듣기 좋은 팝송 플레이리스트"}
          hashtags={["잔잔한", "팝송", "따뜻한"]}
          likes={777}
        />
        <FeedFollowRecommendComponent
          profileName={"엘리스"}
          profilePicture={"/img/AlbumSample.jpg"}
          pictures={[
            "/img/AlbumSample.jpg",
            "/img/AlbumSample.jpg",
            "/img/AlbumSample.jpg",
          ]}
          feedRecommendText={"회원님을 위한 추천"}
          actionText={"팔로우"}
        />
      </ContentWrapper>
      <PlaybarComponent />
    </>
  );
}
