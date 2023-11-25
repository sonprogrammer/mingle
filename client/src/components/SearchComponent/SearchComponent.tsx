import {
  StyledSearchWrapper,
  StyledSearchInput,
  StyledSearchButton,
  StyledSelectWrapper,
  StyledSelect,
} from './styles';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchComponent() {
  const [keyword, setKeyword] = useState('');
  const [type, setType] = useState('song-name');
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate('/search', { state: { type: type, keyword: keyword } });
  };
  return (
    <div>
      <StyledSearchWrapper>
        <StyledSelectWrapper>
          <StyledSelect
            defaultValue="song"
            onChange={(e) => setType(e.target.value)}
          >
            <option value="song-name">노래</option>
            <option value="artist-name">가수</option>
            <option value="playlist-name">플리</option>
          </StyledSelect>
        </StyledSelectWrapper>
        <StyledSearchInput
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleNavigate();
          }}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="원하는 검색어를 입력해주세요."
          type="text"
        />
        <StyledSearchButton onClick={handleNavigate}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </StyledSearchButton>
      </StyledSearchWrapper>
    </div>
  );
}
