// UploadModalComponent.tsx
import React, { useState } from "react";
import { UploadModalProps } from "../../types/UploadModalProps";
import {
  containerStyle,
  buttonStyle,
  inputStyle,
  fileInputContainerStyle,
  fileInputButtonStyle,
  fileListStyle,
  coverUploadStyle,
  formSectionStyle,
  formInputContainerStyle,
  formLabelStyle,
  selectStyle,
  // tagInputContainerStyle,
  // tagInputStyle,
} from "./styles";

export default function UploadModalComponent({
  albumCover,
  artistName,
  songName,
  genre,
  description,
}: // tags,
UploadModalProps) {
  const [song, setSong] = useState({
    name: songName,
    artist: artistName,
    albumCover,
    genre,
    description: description || "",
    // tags: tags || [],
  });

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setSong({ ...song, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    //곡 등록 로직 //
  };

  return (
    <div css={containerStyle}>
      <div css={fileInputContainerStyle}>
        <p>Drag your songs here</p>
        <p>or</p>
        <button css={fileInputButtonStyle}>SELECT FILES</button>
      </div>

      <div css={fileListStyle}>
        <p>Paris.mp3</p>
      </div>

      <div css={coverUploadStyle}>
        {albumCover ? (
          <img src={albumCover} alt="Album Cover" />
        ) : (
          <button>COVER UPLOAD</button>
        )}
      </div>

      <form onSubmit={handleSubmit} css={formSectionStyle}>
        <div css={formInputContainerStyle}>
          <label htmlFor="name" css={formLabelStyle}>
            음악 이름
          </label>
          <input
            css={inputStyle}
            type="text"
            id="name"
            name="name"
            value={song.name}
            onChange={handleInputChange}
            placeholder="음악 이름을 적어주세요."
          />
        </div>
        <div css={formInputContainerStyle}>
          <label htmlFor="description" css={formLabelStyle}>
            곡 소개
          </label>
          <input
            css={inputStyle}
            type="text"
            id="description"
            name="description"
            value={song.description}
            onChange={handleInputChange}
            placeholder="소개를 적어주세요."
          />
        </div>
        <div css={formInputContainerStyle}>
          <label htmlFor="genre" css={formLabelStyle}>
            장르 선택
          </label>
          <select
            css={selectStyle}
            id="genre"
            name="genre"
            value={song.genre}
            onChange={handleInputChange}
          >
            <option value="">장르 선택</option>
            <option value="Pop">Pop</option>
            <option value="Rock">Rock</option>
            <option value="Jazz">Jazz</option>
            <option value="Country">Country</option>
            <option value="Hip-Hop">Hip-Hop</option>
            <option value="R&B">R&B</option>
          </select>
        </div>
        {/* <div css={tagInputContainerStyle}>
          <label htmlFor="tags" css={formLabelStyle}>
            Add tags
          </label>
          <input
            css={tagInputStyle}
            type="text"
            id="tags"
            name="tags"
            value={song.tags.join(", ")}
            onChange={(e) =>
              setSong({ ...song, tags: e.target.value.split(", ") })
            }
            placeholder="Tags"
          />
        </div> */}
        {/* 태그 기능을 일단 빼놓기는 했는데 나중에 완성하고 필요하면 주석 풀어서
        쓸 것 */}
        <button css={buttonStyle} type="submit">
          등록하기
        </button>
      </form>
    </div>
  );
}
