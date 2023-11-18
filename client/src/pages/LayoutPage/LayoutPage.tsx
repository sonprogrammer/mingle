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
      <SideBarComponent />
      <ContentWrapper>
        <Outlet />
      </ContentWrapper>
      <PlaybarComponent />
    </>
  );
}
