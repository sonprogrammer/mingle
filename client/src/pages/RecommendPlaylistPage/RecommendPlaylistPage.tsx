import React from "react";
import { RecommendPlaylistComponent } from "../../components/RecommendedPlaylistComponent/RecommendedPlaylistComponent";

export default function RecommendedPlaylistPage() {
  return (
    <RecommendPlaylistComponent
      albumCover={"/img/AlbumSample.jpg"}
      title={"[Playlist] 쌀쌀한 늦가을에 듣기 좋은 팝송 플레이리스트"}
      likes={777}
    />
  );
}
