import React from "react";
import {
  AlbumArtComponent,
  PlaylistContentsComponent,
  PlaylistDescriptionComponent,
  PlaylistCommentComponent,
} from "../../components";
import { Content, Divider } from "./styles";

export default function PlaylistPage() {
  return (
    <>
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
      <Divider />
      <PlaylistCommentComponent
        userImage={"./img/User-Icon.png"}
        userName={"떼깔룩"}
        userComment={"덕분에 오늘 하루가 즐거워졌습니다!"}
        currentUser={"떼깔룩"}
      />
    </>
  );
}
