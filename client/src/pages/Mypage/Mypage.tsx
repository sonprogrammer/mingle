import React from 'react'
import { UserInfoComponent } from '../../components/UserInfoComponent'
import {
  ContentWrapper,
  SideBarComponent,
  SearchComponent,
  PlaybarComponent,
} from '../../components'

export default function Mypage() {
  return (
    <>
      <ContentWrapper>
        <SideBarComponent />
        <SearchComponent />
        <UserInfoComponent
          userImage={'/img/User-Icon.png'}
          userName={'떼깔룩'}
          userDescription={'20자 이내로 쓰세요'}
          postsCount={7}
          followersCount={7}
          followingCount={7}
        />
      </ContentWrapper>
      <PlaybarComponent />
    </>
  )
}
