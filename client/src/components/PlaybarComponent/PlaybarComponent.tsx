import {
  PlayComponent,
  SongInfo,
  PlayingPlaybar,
  Playbar,
  Container,
} from './styles';
import { faCirclePlay, faVolumeHigh } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';

export default function PlaybarComponent() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/myplaylist');
  };
  return (
    <Container>
      <FontAwesomeIcon icon={faCirclePlay} color="white" size="xl" />
      <PlayComponent>
        <span onClick={handleClick} className="cursor-pointer">
          나의 재생목록 1
        </span>
        <SongInfo>Troye Sivan - Lost Boy</SongInfo>
        <PlayingPlaybar />
        <Playbar />
      </PlayComponent>
      <FontAwesomeIcon icon={faVolumeHigh} color="white" size="xl" />
    </Container>
  );
}
