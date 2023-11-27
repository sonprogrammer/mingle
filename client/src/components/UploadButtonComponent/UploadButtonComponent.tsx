import { StyledUploadButton } from './styles';

interface UploadButtonComponent {
  text: string;
  onClick: () => void;
}
export default function UploadButtonComponent({
  text,
  onClick,
}: UploadButtonComponent) {
  return <StyledUploadButton onClick={onClick}>{text}</StyledUploadButton>;
}
