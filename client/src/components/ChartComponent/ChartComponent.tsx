import React, {
  Dispatch,
  SetStateAction,
  useState,
  useRef,
  useEffect,
} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { ChartItemComponent } from '../ChartItemComponent';
import { PlaylistUploadComponent } from '../PlaylistUploadComponent';
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
    _id: string;
    title: string;
    img: string;
    artist?: string;
    length: string;
    isLiked: boolean;
  }[];
  setGenre?: Dispatch<SetStateAction<string>>;
  genres?: { _id: string; genre: string }[];
  setPageNum?: Dispatch<SetStateAction<number>>;
}

export default function ChartComponent({
  title,
  items,
  setGenre,
  genres,
  setPageNum,
}: ChartComponentProps) {
  const [ismodalAppear, setIsModalAppear] = useState(false);
  const [songs, setSongs] = useState([]);
  const modelRef = useRef(null);

  const handleOutsideClick = (e: React.MouseEvent<HTMLElement>) => {
    if (modelRef.current && !modelRef.current.contains(e.target)) {
      // 모달 외부를 클릭한 경우에만 모달을 닫음
      setIsModalAppear(false);
    }
  };

  useEffect(() => {
    // 모달이 열려있을 때만 외부 클릭 이벤트를 감지함
    if (ismodalAppear) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    // 컴포넌트가 언마운트될 때 이벤트 리스너를 정리함
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [ismodalAppear]);

  return (
    <>
      <StyledTitleWrapper>
        {ismodalAppear ? (
          <div ref={modelRef}>
            <PlaylistUploadComponent
              setIsModalAppear={setIsModalAppear}
              songs={songs}
              setSongs={setSongs}
            />
          </div>
        ) : null}
        <StyledChartTitleWrapper>
          {setGenre ? (
            <>
              <StyledChartTitle isGenre>{title}</StyledChartTitle>
              <StyledSelect
                onChange={(e) => {
                  setGenre(e.target.value);
                  setPageNum && setPageNum(1);
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
        <StyledChartAddButton
          onClick={() => {
            if (songs.length === 0) {
              alert('플레이리스트에 담을 곡을 선택해 주세요.');
              return;
            }
            setIsModalAppear(true);
          }}
        >
          <FontAwesomeIcon icon={faPlus} />
          <span>Playlist</span>
        </StyledChartAddButton>
      </StyledTitleWrapper>
      <StyledChartWrapper>
        {items.length > 0 ? (
          items.map((item, idx) => {
            return (
              <ChartItemComponent
                _id={item._id}
                idx={idx + 1}
                title={item.title}
                img={item.img}
                artist={item.artist}
                length={item.length}
                isLiked={item.isLiked}
                key={item._id}
                songs={songs}
                setSongs={setSongs}
              />
            );
          })
        ) : (
          <span>일치하는 검색 결과가 없습니다.</span>
        )}
      </StyledChartWrapper>
    </>
  );
}
