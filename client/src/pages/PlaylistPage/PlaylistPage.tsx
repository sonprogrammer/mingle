import React from "react";
import {
  AlbumArtComponent,
  ContentWrapper,
  PlaybarComponent,
  PlaylistContentsComponent,
  SearchComponent,
  SideBarComponent,
  PlaylistDescriptionComponent,
} from "../../components";
import { Content, Divider } from "./styles";

export default function PlaylistPage() {
  return (
    <>
      <SearchComponent />
      <ContentWrapper>
        <SideBarComponent />
        <Content>
          <AlbumArtComponent albumArtSrc="/img/AlbumSample.jpg" />
          <PlaylistContentsComponent
            songs={[
              {
                title: "Troye Sivan - Lost Boy",
                length: "03:20",
              },
              {
                title: "Lauv - Steal The Show",
                length: "03:28",
              },
              {
                title: "Charlie Puth - That's Hilarious",
                length: "04:10",
              },
              {
                title: "SZA - Kill Bill",
                length: "03:50",
              },
              {
                title: "Charlie Puth - Dangerously",
                length: "03:48",
              },
              {
                title: "Ed Sherren - Eyes Closed",
                length: "03:21",
              },
            ]}
          />
        </Content>
        <Divider />
        <PlaylistDescriptionComponent
          name={"기분좋을때 듣는 노래"}
          description={
            "들으면 즐거워요 오늘도 행복한 하루 보내셨으면 좋겠습니다~~"
          }
        />
      </ContentWrapper>
      <PlaybarComponent />
    </>
  );
}
