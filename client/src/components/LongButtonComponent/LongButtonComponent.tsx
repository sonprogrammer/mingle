import { StyledButton } from "./styles";

interface LongButtonComponentProps {
  text: string;
  onClick: () => void;
}
export default function LongButtonComponent({
  text,
  onClick,
}: LongButtonComponentProps) {
  return <StyledButton onClick={onClick}>{text}</StyledButton>;
}
