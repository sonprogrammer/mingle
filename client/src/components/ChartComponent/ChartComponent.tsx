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
import { PlaylistSelectComponent } from '../PlaylistSelectComponent';
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
    img?: string;
    artist?: string | undefined;
    length?: string;
    isLiked?: boolean;
  }[];
  setGenre?: Dispatch<SetStateAction<string>>;
  genres?: { _id: string; genre: string }[];
  setPageNum?: Dispatch<SetStateAction<number>>;
}

interface ChartSong {
  artist: string ;
  img: string;
  length: string;
  title: string;
  _id: string;
}

export default function ChartComponent({
  title,
  items,
  setGenre,
  genres,
  setPageNum,
}: ChartComponentProps) {
  const [ismodalAppear, setIsModalAppear] = useState<boolean>(false);
  const [isSelectModal, setIsSelectModal] = useState<boolean | null>(true);
  const [isExsistingPlayList, setIsExistingPlayList] = useState<boolean | null>(
    null,
  );

  const [songs, setSongs] = useState<ChartSong[]>([]);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleOutsideClick = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      // 모달 외부를 클릭한 경우에만 모달을 닫음
      setIsModalAppear(false);
      setIsExistingPlayList(null);
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

  const handleSelectModal = () => {
    setIsSelectModal(true);
    setIsModalAppear(true);
  };

  return (
    <>
      <StyledTitleWrapper>
        {ismodalAppear && isSelectModal ? (
          <div ref={modalRef}>
            <PlaylistSelectComponent
              setIsModalAppear={setIsModalAppear}
              setIsSelectModal={setIsSelectModal}
              setIsExistingPlayList={setIsExistingPlayList}
              setSongs={setSongs}
              songs={songs}
            />
          </div>
        ) : null}
        {ismodalAppear && isExsistingPlayList === false ? (
          <div ref={modalRef}>
            <PlaylistUploadComponent
              setIsModalAppear={setIsModalAppear}
              setIsSelectModal={setIsSelectModal}
              setIsExistingPlayList={setIsExistingPlayList}
              setSongs={setSongs}
              songs={songs}
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
            handleSelectModal();
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
                songId={item._id}
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
