import {
  StyledSearchWrapper,
  StyledSearchInput,
  StyledSearchButton,
  StyledSelectWrapper,
  StyledSelect,
} from "./styles";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SearchComponent() {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    console.log(`selected ${value}`);
  };

  return (
    <div>
      <StyledSearchWrapper>
        <StyledSelectWrapper>
          <StyledSelect defaultValue="song" onChange={handleChange}>
            <option value="song">노래</option>
            <option value="artist">가수</option>
            <option value="album">앨범</option>
          </StyledSelect>
        </StyledSelectWrapper>
        <StyledSearchInput
          placeholder="원하는 검색어를 입력해주세요."
          type="text"
        />
        <StyledSearchButton>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </StyledSearchButton>
      </StyledSearchWrapper>
    </div>
  );
}
