import React from "react";
import {
  AlbumArtComponent,
  ContentWrapper,
  PlaybarComponent,
  SearchComponent,
  SideBarComponent,
} from "../../components";

export default function PlaylistPage() {
  return (
    <>
      <SearchComponent />
      <ContentWrapper>
        <SideBarComponent />
        <AlbumArtComponent albumArtSrc="/img/AlbumSample.jpg" />
      </ContentWrapper>
      <PlaybarComponent />
    </>
  );
}
