import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { ChartItemComponent } from '../ChartItemComponent';
import {
  StyledChartAddButton,
  StyledChartTitle,
  StyledChartWrapper,
  StyledTitleWrapper,
} from './styles';

interface ChartItem {
  title: string;
  img: string;
  artist: string;
  length: string;
  isLiked: boolean;
}

interface ChartComponentProps {
  title: string;
  items: ChartItem[];
}

export default function ChartComponent({ title, items }: ChartComponentProps) {
  return (
    <>
      <StyledTitleWrapper>
        <StyledChartTitle>{title}</StyledChartTitle>
        <StyledChartAddButton>
          <FontAwesomeIcon icon={faPlus} />
          <span>Playlist</span>
        </StyledChartAddButton>
      </StyledTitleWrapper>
      <StyledChartWrapper>
        {items.map((item, idx) => (
          <ChartItemComponent
            key={item.title + idx}
            idx={idx + 1}
            title={item.title}
            img={item.img}
            artist={item.artist}
            length={item.length}
            isLiked={item.isLiked}
          />
        ))}
      </StyledChartWrapper>
    </>
  );
}
