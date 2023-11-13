import { SearchProps } from "antd/es/input";
import { StyledSearch, StyledSelect } from "./styles";

export default function SearchComponent() {
  const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
    console.log(info?.source, value);
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  return (
    <StyledSearch
      placeholder="원하는 검색어를 입력해주세요."
      onSearch={onSearch}
      enterButton
      size="large"
      id="search"
      addonBefore={
        <StyledSelect
          defaultValue="노래"
          style={{ width: 120 }}
          onChange={handleChange}
          options={[
            { value: "노래", label: "노래" },
            { value: "아티스트", label: "아티스트" },
            { value: "앨범", label: "앨범" },
          ]}
        />
      }
    />
  );
}
