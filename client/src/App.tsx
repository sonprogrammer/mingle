import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {
  LoginPage,
  FeedPage,
  ChartPage,
  PlaylistPage,
  RecommendPlaylistPage,
  UploadModalTestPage,
  Mypage,
  LayoutPage,
  SignUpPage,
  MyPlaylistPage,
  EditProfilePage,
  LikedSongPage,
  NewSongPage,
  FindPasswordPage,
  CompletePasswordRecoveryPage,
} from './pages';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUpPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="findpassword" element={<FindPasswordPage />}></Route>
          <Route
            path="/completerecoverypw"
            element={<CompletePasswordRecoveryPage />}
          ></Route>
          <Route path="/" element={<LayoutPage />}>
            <Route path="/" element={<FeedPage />}></Route>
            <Route path="/chart" element={<ChartPage />}></Route>
            <Route path="/newsong" element={<NewSongPage />}></Route>
            <Route path="/likedsong" element={<LikedSongPage />}></Route>
            <Route path="/playlist" element={<PlaylistPage />}></Route>
            <Route path="/myplaylist" element={<MyPlaylistPage />}></Route>
            <Route
              path="/recommendPlaylist"
              element={<RecommendPlaylistPage />}
            ></Route>
            <Route path="/mypage" element={<Mypage />}></Route>
            <Route path="/edit" element={<EditProfilePage />}></Route>
          </Route>
          <Route path="/upload" element={<UploadModalTestPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
