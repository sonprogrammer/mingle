import { ReactNode } from 'react';
import { Wrapper } from './styles';

interface ContentWrapperProps {
  children: ReactNode;
}
export default function ContentWrapper({ children }: ContentWrapperProps) {
  return <Wrapper>{children}</Wrapper>;
}
