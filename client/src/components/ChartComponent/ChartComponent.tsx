import React, { Dispatch, SetStateAction } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { ChartItemComponent } from '../ChartItemComponent';
import {
  StyledChartAddButton,
  StyledChartTitle,
  StyledChartTitleWrapper,
  StyledChartWrapper,
  StyledTitleWrapper,
} from './styles';

interface ChartComponentProps {
  title: string;
  items: {
    title: string;
    img: string;
    artist?: string;
    length: number;
    isLiked: boolean;
  }[];
  setGenre: Dispatch<SetStateAction<string>>;
}
export default function ChartComponent({
  title,
  items,
  setGenre,
}: ChartComponentProps) {
  return (
    <>
      <StyledTitleWrapper>
        <StyledChartTitleWrapper>
          <StyledChartTitle>{title}</StyledChartTitle>
          {setGenre && (
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full"
              onChange={(e) => {
                setGenre(e.target.value);
              }}
            >
              <option key="발라드" value="발라드">
                발라드
              </option>
              <option key="댄스" value="댄스">
                댄스
              </option>
              <option key="힙합" value="힙합">
                힙합
              </option>
              <option key="록" value="록">
                록
              </option>
              <option key="클래식" value="클래식">
                클래식
              </option>
            </select>
          )}
        </StyledChartTitleWrapper>
        <StyledChartAddButton>
          <FontAwesomeIcon icon={faPlus} />
          <span>Playlist</span>
        </StyledChartAddButton>
      </StyledTitleWrapper>
      <StyledChartWrapper>
        <tbody>
          {items.length > 0 ? (
            items.map((item, idx) => {
              return (
                <ChartItemComponent
                  idx={idx + 1}
                  title={item.title}
                  img={item.img}
                  artist={item.artist}
                  length={item.length}
                  isLiked={item.isLiked}
                  key={idx}
                />
              );
            })
          ) : (
            <>일치하는 검색 결과가 없습니다.</>
          )}
        </tbody>
      </StyledChartWrapper>
    </>
  );
}
