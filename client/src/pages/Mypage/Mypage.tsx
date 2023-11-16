import React from "react";
import { UserInfoComponent } from "../../components/UserInfoComponent";
import { ContentWrapper } from "../../components";

export default function Mypage() {
  return (
  <>
  <ContentWrapper>
  <UserInfoComponent userImage={"/img/User-Icon.png"}
    userName={"떼깔룩"} userDescription={"good"} postsCount={7} followersCount={7} followingCount={7}/>

  </ContentWrapper>
  </>)
}
