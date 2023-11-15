import React from "react";
import {
  SearchComponent,
  SideBarComponent,
  PlaybarComponent,
  PlaylistCardComponent,
} from "../../components";

export default function FeedPage() {
  return (
    <>
      <SearchComponent />
      <PlaylistCardComponent
        profileIcon={"/img/User-Icon.png"}
        profileName={"때껄룩"}
        albumCover={"/img/AlbumSample.jpg"}
        title={"[Playlist] 쌀쌀한 늦가을에 듣기 좋은 팝송 플레이리스트"}
        hashtags={["잔잔한", "팝송", "따뜻한"]}
        likes={777}
      />
      <PlaybarComponent />
      <SideBarComponent />
    </>
  );
}
