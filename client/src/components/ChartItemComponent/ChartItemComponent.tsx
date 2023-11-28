import React, { useState } from 'react';
import { faHeart as like } from '@fortawesome/free-solid-svg-icons';
import { faHeart as noLike } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ChartItemImg, StyledTr } from './styles';
import { usePostlikeToggle, useDeleteLikeToggle } from '../../hooks';

import { useNavigate } from 'react-router-dom';

interface ChartItemComponentProps {
  _id: string;
  idx: number;
  title: string;
  img: string;
  artist?: string;
  length: string;
  isLiked: boolean;
  songId: string;
}
export default function ChartItemComponent({
  idx,
  title,
  img,
  artist,
  length,
  isLiked,
  songId,
  _id
}: ChartItemComponentProps) {
  const [isClick, setIsClick] = useState(false);
  const { mutate: Like} = usePostlikeToggle();
  const { mutate: deleteLike } = useDeleteLikeToggle();
  
  const handleLikeClick = async () => {
    if(!isClick){
      await Like(_id)
    }else{
      await deleteLike(_id)
    }
  }


  const navigate = useNavigate();
  const handleClick = () => {
    setIsClick(!isClick);
  };
  const handleNavigate = () => {
    navigate(`/song/${_id}`);
  };
  return (
    <StyledTr
      className="text-center"
      onClick={handleClick}
      isClick={isClick}
    >
      <td scope="row" className="w-1/12 pl-10 pr-6 py-4">
        {idx}
      </td>
      <td className="w-1/10 px-6 py-4">
        <ChartItemImg src={img} />
      </td>
      <td className="w-1/4 px-6 py-4">{title}</td>
      <td className="w-1/4 px-6 py-4">{artist}</td>
      <td className="w-1/4 px-6 py-4">{length}</td>
      <td className="w-1/4 px-6 py-4">
        {isLiked ? (
          <FontAwesomeIcon
            icon={like}
            color={'#9b59b6'}
            cursor="pointer"
            onClick={handleLikeClick}
          />
        ) : (
          <FontAwesomeIcon
            icon={noLike}
            color={'#9b59b6'}
            cursor="pointer"
            key={songId}
            onClick={handleLikeClick}
          />
        )}
      </td>
    </StyledTr>
  );

}
