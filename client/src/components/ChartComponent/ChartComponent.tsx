import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { ChartItemComponent } from "../ChartItemComponent";
import {
  StyledChartAddButton,
  StyledChartTitle,
  StyledChartWrapper,
  StyledTitleWrapper,
} from "./styles";

interface ChartComponentProps {
  title: string;
  items: {
    title: string;
    img: string;
    artist: string;
    length: string;
    isLiked: boolean;
  }[];
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
        <tbody>
          {items.map((item, idx) => {
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
          })}
        </tbody>
      </StyledChartWrapper>
    </>
  );
}
