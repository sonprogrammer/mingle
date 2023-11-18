import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  LoginPage,
  FeedPage,
  ChartPage,
  PlaylistPage,
  RecommendPlaylistPage,
  UploadModalTestPage,
  Mypage,
} from "./pages";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />}></Route>
          <Route path="/feed" element={<FeedPage />}></Route>
          <Route path="/chart" element={<ChartPage />}></Route>
          <Route path="/playlist" element={<PlaylistPage />}></Route>
          <Route
            path="/recommendPlaylist"
            element={<RecommendPlaylistPage />}
          ></Route>
          <Route path="/upload" element={<UploadModalTestPage />}></Route>
          <Route path="/mypage" element={<Mypage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
