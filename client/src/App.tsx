import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
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
} from './pages';
import PrivateRoute from './PrivateRoute';

function App() {
  return (
    <>
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route path="/signup" element={<SignUpPage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route element={<PrivateRoute />}>
              <Route element={<LayoutPage />}>
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
                <Route path="/upload" element={<UploadModalTestPage />}></Route>
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </>
  );
}

export default App;
