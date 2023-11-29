import React from "react";
import { Outlet } from "react-router-dom";
import {
  SearchComponent,
  SideBarComponent,
  ContentWrapper,
  PlaybarComponent,
} from "../../components";

export default function LayoutPage() {
  return (
    <>
      <SearchComponent />
      <SideBarComponent userIcon={"/img/User-Icon.png"}/>
      <ContentWrapper>
        <Outlet />
      </ContentWrapper>
      <PlaybarComponent />
    </>
  );
}
