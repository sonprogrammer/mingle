import React from 'react';
import { UploadModalComponent } from '../../components/UploadModalComponent';
export default function UploadModalTestPage() {
  return (
    <>
      <UploadModalComponent
        albumCover={''}
        artistName={''}
        songName={''}
        genre={''}
        description={''}
        tags={[]}
      />
    </>
  );
}
