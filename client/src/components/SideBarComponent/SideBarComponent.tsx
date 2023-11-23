import React, { useState } from 'react';
import {
  StyledNav,
  StyledLogo,
  StyledDivideLine,
  StyledButtonsContainer,
  StyledButtonWrapper,
  StyledButton,
  StyledDropeddown,
  StyledDropeddownContents,
  StyledLogoutModal,
} from './styles';
import LogoutModal from './LogoutModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHouse,
  faFire,
  faChartSimple,
  faHeadphones,
  faHeart,
  faUser,
  faRightFromBracket,
  faPen,
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate, Link } from 'react-router-dom';

interface Item {
  content: string;
  icon: React.ReactNode;
  dropdownItems?: Dropmenu[];
}

interface Dropmenu {
  content: string;
  icon: React.ReactNode;
}
interface UserIconProps {
  userIcon: string;
}

const data: Dropmenu[] = [
  { content: '마이페이지', icon: <FontAwesomeIcon icon={faUser} /> },
  { content: '회원정보 수정', icon: <FontAwesomeIcon icon={faPen} /> },
  { content: '로그아웃', icon: <FontAwesomeIcon icon={faRightFromBracket} /> },
];

const items: Item[] = [
  {
    content: '내 정보',
    icon: <FontAwesomeIcon icon={faUser} />,
    dropdownItems: data,
  },
  { content: '피드', icon: <FontAwesomeIcon icon={faHouse} /> },
  { content: '추천 플레이리스트', icon: <FontAwesomeIcon icon={faFire} /> },
  { content: '차트', icon: <FontAwesomeIcon icon={faChartSimple} /> },
  { content: '최신음악', icon: <FontAwesomeIcon icon={faHeadphones} /> },
  { content: '좋아요한 음악', icon: <FontAwesomeIcon icon={faHeart} /> },
];

export default function SideBarComponent({ userIcon }: UserIconProps) {
  const [accordion, setAccordion] = useState<string | null>(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const navigate = useNavigate();

  const toggleAccordion = (itemContent: string) => {
    setAccordion((prev) => (prev === itemContent ? null : itemContent));
  };

  const handleDropClick = (buttonContent: string) => {
    toggleAccordion(buttonContent);
    if (buttonContent === '피드') {
      navigate('/');
    } else if (buttonContent === '내 정보') {
      navigate('#');
    } else if (buttonContent === '추천 플레이리스트') {
      navigate('/recommendPlaylist');
    } else if (buttonContent === '차트') {
      navigate('/chart');
    } else if (buttonContent === '최신음악') {
      navigate('/newsong');
    } else if (buttonContent === '좋아요한 음악') {
      navigate('/likedsong');
    }
  };

  const handleDropdownItemClick = (dropdownContent: string) => {
    if (dropdownContent === '마이페이지') {
      navigate('/mypage');
    } else if (dropdownContent === '회원정보 수정') {
      navigate('/edit');
    } else if (dropdownContent === '로그아웃') {
      setShowLogoutModal(true);
    }
  };

  const handleConfirmLogout = () => {
    navigate('/login');
    setShowLogoutModal(false);
  };

  const handleCancelLogout = () => {
    setShowLogoutModal(false);
  };

  return (
    <StyledNav>
      <StyledDivideLine>
        <StyledLogo>
          <Link to="/">
            <img src="/img/Logo-Sidebar.png" alt="Logo" />
          </Link>
        </StyledLogo>
      </StyledDivideLine>

      <StyledButtonsContainer>
        {items.map((item) => (
          <StyledButtonWrapper key={item.content}>
            <StyledButton onClick={() => handleDropClick(item.content)}>
              <span>
                {item.content === '내 정보' ? (
                  <img src={userIcon} />
                ) : (
                  item.icon
                )}
              </span>
              <span>{item.content}</span>
            </StyledButton>
            {accordion === item.content && item.dropdownItems && (
              <StyledDropeddown>
                {item.dropdownItems.map((item, i) => (
                  <StyledDropeddownContents
                    key={i}
                    content={item.content}
                    onClick={() => handleDropdownItemClick(item.content)}
                  >
                    <span>{item.icon}</span>
                    <span>{item.content}</span>
                  </StyledDropeddownContents>
                ))}
              </StyledDropeddown>
            )}
          </StyledButtonWrapper>
        ))}
      </StyledButtonsContainer>
      <StyledLogoutModal>
        {showLogoutModal && (
          <LogoutModal
            onConfirm={handleConfirmLogout}
            onCancel={handleCancelLogout}
            text="로그아웃"
          />
        )}
      </StyledLogoutModal>
    </StyledNav>
  );
}
