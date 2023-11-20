// UploadModalComponent.tsx
import React, { useState } from "react";
import * as Styled from "./styles";

interface UploadModalProps {
  albumCover: string;
  artistName: string;
  songName: string;
  genre: string;
  tags?: string[];
  description: string;
}

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
    <Styled.ContainerStyle>
      <Styled.FileInputContainerStyle>
        <p>Drag your songs here</p>
        <p>or</p>
        <Styled.FileInputButtonStyle>SELECT FILES</Styled.FileInputButtonStyle>
      </Styled.FileInputContainerStyle>

      <Styled.FileListStyle>
        <p>Paris.mp3</p>
      </Styled.FileListStyle>

      <Styled.CoverUploadStyle>
        {albumCover ? (
          <img src={albumCover} alt="Album Cover" />
        ) : (
          <button>COVER UPLOAD</button>
        )}
      </Styled.CoverUploadStyle>

      <Styled.FormSectionStyle onSubmit={handleSubmit}>
        <Styled.FormInputContainerStyle>
          <Styled.FormLabelStyle htmlFor="name">
            음악 이름
          </Styled.FormLabelStyle>
          <Styled.InputStyle
            type="text"
            id="name"
            name="name"
            value={song.name}
            onChange={handleInputChange}
            placeholder="음악 이름을 적어주세요."
          />
        </Styled.FormInputContainerStyle>
        <Styled.FormInputContainerStyle>
          <Styled.FormLabelStyle htmlFor="description">
            곡 소개
          </Styled.FormLabelStyle>
          <Styled.InputStyle
            type="text"
            id="description"
            name="description"
            value={song.description}
            onChange={handleInputChange}
            placeholder="소개를 적어주세요."
          />
        </Styled.FormInputContainerStyle>
        <Styled.FormInputContainerStyle>
          <Styled.FormLabelStyle htmlFor="genre">
            장르 선택
          </Styled.FormLabelStyle>
          <Styled.SelectStyle
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
          </Styled.SelectStyle>
        </Styled.FormInputContainerStyle>
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
        <Styled.ButtonStyle>등록하기</Styled.ButtonStyle>
      </Styled.FormSectionStyle>
    </Styled.ContainerStyle>
  );
}
