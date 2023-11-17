import {
  PlayComponent,
  SongInfo,
  PlayingPlaybar,
  Playbar,
  Container,
} from "./styles";
import { faCirclePlay, faVolumeHigh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function PlaybarComponent() {
  return (
    <Container>
      <FontAwesomeIcon icon={faCirclePlay} color="white" size="xl" />
      <PlayComponent>
        <span>나의 재생목록 1</span>
        <SongInfo>Troye Sivan - Lost Boy</SongInfo>
        <PlayingPlaybar />
        <Playbar />
      </PlayComponent>
      <FontAwesomeIcon icon={faVolumeHigh} color="white" size="xl" />
    </Container>
  );
}
