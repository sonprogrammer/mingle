import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import PrivateRoute from './PrivateRoute';

// Lazy-loaded components
const SignUpPage = lazy(() =>
  import('./pages/SignUpPage').then((module) => ({
    default: module.SignUpPage,
  })),
);
const LoginPage = lazy(() =>
  import('./pages/LoginPage').then((module) => ({ default: module.LoginPage })),
);
const CompleteSignUpPage = lazy(() =>
  import('./pages/CompleteSignUpPage').then((module) => ({
    default: module.CompleteSignUpPage,
  })),
);
const FindPasswordPage = lazy(() =>
  import('./pages/FindPasswordPage').then((module) => ({
    default: module.FindPasswordPage,
  })),
);
const CompletePasswordRecoveryPage = lazy(() =>
  import('./pages/CompletePasswordRecoveryPage').then((module) => ({
    default: module.CompletePasswordRecoveryPage,
  })),
);
const NotFoundPage = lazy(() =>
  import('./pages/NotFoundPage').then((module) => ({
    default: module.NotFoundPage,
  })),
);
const LayoutPage = lazy(() =>
  import('./pages/LayoutPage').then((module) => ({
    default: module.LayoutPage,
  })),
);
const FeedPage = lazy(() =>
  import('./pages/FeedPage').then((module) => ({ default: module.FeedPage })),
);
const ChartPage = lazy(() =>
  import('./pages/ChartPage').then((module) => ({ default: module.ChartPage })),
);
const GenreSongPage = lazy(() =>
  import('./pages/GenreSongPage').then((module) => ({
    default: module.GenreSongPage,
  })),
);
const NewSongPage = lazy(() =>
  import('./pages/NewSongPage').then((module) => ({
    default: module.NewSongPage,
  })),
);
const LikedSongPage = lazy(() =>
  import('./pages/LikedSongPage').then((module) => ({
    default: module.LikedSongPage,
  })),
);
const PlaylistPage = lazy(() =>
  import('./pages/PlaylistPage').then((module) => ({
    default: module.PlaylistPage,
  })),
);
const RecommendPlaylistPage = lazy(() =>
  import('./pages/RecommendPlaylistPage').then((module) => ({
    default: module.RecommendPlaylistPage,
  })),
);
const Mypage = lazy(() =>
  import('./pages/Mypage').then((module) => ({ default: module.Mypage })),
);
const EditProfilePage = lazy(() =>
  import('./pages/EditProfilePage').then((module) => ({
    default: module.EditProfilePage,
  })),
);
const SongSearchPage = lazy(() =>
  import('./pages/SongSearchPage').then((module) => ({
    default: module.SongSearchPage,
  })),
);
const PlaylistSearchPage = lazy(() =>
  import('./pages/PlaylistSearchPage').then((module) => ({
    default: module.PlaylistSearchPage,
  })),
);
const SongDetailsPage = lazy(() =>
  import('./pages/SongDetailsPage').then((module) => ({
    default: module.SongDetailsPage,
  })),
);
const UserInfoPage = lazy(() =>
  import('./pages/UserInfoPage').then((module) => ({
    default: module.UserInfoPage,
  })),
);

export default function App() {
  return (
    <>
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route
              path="/signup"
              element={
                <Suspense fallback={<div></div>}>
                  <SignUpPage />
                </Suspense>
              }
            ></Route>
            <Route
              path="/login"
              element={
                <Suspense fallback={<div></div>}>
                  <LoginPage />
                </Suspense>
              }
            ></Route>
            <Route
              path="/completesignup"
              element={
                <Suspense fallback={<div></div>}>
                  <CompleteSignUpPage />
                </Suspense>
              }
            ></Route>
            <Route
              path="/findpassword"
              element={
                <Suspense fallback={<div></div>}>
                  <FindPasswordPage />
                </Suspense>
              }
            ></Route>
            <Route element={<PrivateRoute />}>
              <Route
                path="/completerecoverypw"
                element={
                  <Suspense fallback={<div></div>}>
                    <CompletePasswordRecoveryPage />
                  </Suspense>
                }
              ></Route>
              <Route
                path="*"
                element={
                  <Suspense fallback={<div></div>}>
                    <NotFoundPage />
                  </Suspense>
                }
              ></Route>

              <Route
                element={
                  <Suspense fallback={<div></div>}>
                    <LayoutPage />
                  </Suspense>
                }
              >
                <Route
                  path="/"
                  element={
                    <Suspense fallback={<div></div>}>
                      <FeedPage />
                    </Suspense>
                  }
                ></Route>
                <Route
                  path="/chart"
                  element={
                    <Suspense fallback={<div></div>}>
                      <ChartPage />
                    </Suspense>
                  }
                ></Route>
                <Route
                  path="/genresong"
                  element={
                    <Suspense fallback={<div></div>}>
                      <GenreSongPage />
                    </Suspense>
                  }
                ></Route>
                <Route
                  path="/newsong"
                  element={
                    <Suspense fallback={<div></div>}>
                      <NewSongPage />
                    </Suspense>
                  }
                ></Route>
                <Route
                  path="/likedsong"
                  element={
                    <Suspense fallback={<div></div>}>
                      <LikedSongPage />
                    </Suspense>
                  }
                ></Route>
                <Route
                  path="/playlist"
                  element={
                    <Suspense fallback={<div></div>}>
                      <PlaylistPage />
                    </Suspense>
                  }
                ></Route>
                <Route
                  path="/recommendPlaylist"
                  element={<RecommendPlaylistPage />}
                ></Route>
                <Route path="/mypage" element={<Mypage />}></Route>
                <Route path="/edit" element={<EditProfilePage />}></Route>
                <Route path="/songsearch" element={<SongSearchPage />}></Route>
                <Route
                  path="/playlistsearch"
                  element={<PlaylistSearchPage />}
                ></Route>
                <Route path="/song/:songId" element={<SongDetailsPage />} />
                <Route path="/user" element={<UserInfoPage />}></Route>
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </>
  );
}
