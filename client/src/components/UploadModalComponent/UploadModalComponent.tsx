// UploadModalComponent.tsx
import React, { useState } from "react";
import { UploadModalProps } from "../../types/UploadModalProps";
import {
  ContainerStyle,
  ButtonStyle,
  InputStyle,
  FileInputContainerStyle,
  FileInputButtonStyle,
  FileListStyle,
  CoverUploadStyle,
  FormSectionStyle,
  FormInputContainerStyle,
  FormLabelStyle,
  SelectStyle,
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
    <div css={ContainerStyle}>
      <div css={FileInputContainerStyle}>
        <p>Drag your songs here</p>
        <p>or</p>
        <button css={FileInputButtonStyle}>SELECT FILES</button>
      </div>

      <div css={FileListStyle}>
        <p>Paris.mp3</p>
      </div>

      <div css={CoverUploadStyle}>
        {albumCover ? (
          <img src={albumCover} alt="Album Cover" />
        ) : (
          <button>COVER UPLOAD</button>
        )}
      </div>

      <form onSubmit={handleSubmit} css={FormSectionStyle}>
        <div css={FormInputContainerStyle}>
          <label htmlFor="name" css={FormLabelStyle}>
            음악 이름
          </label>
          <input
            css={InputStyle}
            type="text"
            id="name"
            name="name"
            value={song.name}
            onChange={handleInputChange}
            placeholder="음악 이름을 적어주세요."
          />
        </div>
        <div css={FormInputContainerStyle}>
          <label htmlFor="description" css={FormLabelStyle}>
            곡 소개
          </label>
          <input
            css={InputStyle}
            type="text"
            id="description"
            name="description"
            value={song.description}
            onChange={handleInputChange}
            placeholder="소개를 적어주세요."
          />
        </div>
        <div css={FormInputContainerStyle}>
          <label htmlFor="genre" css={FormLabelStyle}>
            장르 선택
          </label>
          <select
            css={SelectStyle}
            id="genre"
            name="genre"
            value={song.genre}
            onChange={handleInputChange}
          >
            <option value="">장르 선택</option>
            <option value="Pop">발라드</option>
            <option value="Rock">록</option>
            <option value="Dance">댄스</option>
            <option value="Classic">클래식</option>
            <option value="Hip-Hop">힙합</option>
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
        <button css={ButtonStyle} type="submit">
          등록하기
        </button>
      </form>
    </div>
  );
}
