import React, { Dispatch, SetStateAction } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { ChartItemComponent } from '../ChartItemComponent';
import {
  StyledChartAddButton,
  StyledChartTitle,
  StyledChartTitleWrapper,
  StyledChartWrapper,
  StyledSelect,
  StyledTitleWrapper,
} from './styles';

interface ChartComponentProps {
  title: string;
  items: {
    title: string;
    img: string;
    artist?: string;
    length: string;
    isLiked: boolean;
  }[];
  setGenre?: Dispatch<SetStateAction<string>>;
  genres?: { _id: string; genre: string }[];
}
export default function ChartComponent({
  title,
  items,
  setGenre,
  genres,
}: ChartComponentProps) {
  return (
    <>
      <StyledTitleWrapper>
        <StyledChartTitleWrapper>
          {setGenre ? (
            <>
              <StyledChartTitle isGenre>{title}</StyledChartTitle>
              <StyledSelect
                onChange={(e) => {
                  setGenre(e.target.value);
                }}
              >
                {genres?.map((item) => {
                  return (
                    <option key={item._id} value={item.genre}>
                      {item.genre}
                    </option>
                  );
                })}
              </StyledSelect>
            </>
          ) : (
            <StyledChartTitle isGenre={false}>{title}</StyledChartTitle>
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
