import React from "react";
import { UploadModalComponent } from "../../components/UploadModalComponent";
import AlbumSample from "../../../public/img/AlbumSample.jpg";
export default function UploadModalTestPage() {
  return (
    <>
      <UploadModalComponent
        albumCover={AlbumSample}
        artistName={""}
        songName={""}
        genre={""}
        description={""}
        tags={[]}
      />
    </>
  );
}
