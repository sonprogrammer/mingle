import React from "react";
import { PlaylistCardComponent } from "../../Components/PlaylistCardComponent/PlaylistCardComponent";

export default function FeedPage() {
  return (
    <PlaylistCardComponent
      profileIcon={"/img/User-Icon.png"}
      profileName={"때껄룩"}
      albumCover={
        "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIADgAOAMBIgACEQEDEQH/xAAbAAACAgMBAAAAAAAAAAAAAAAEBQAGAQMHAv/EAC8QAAEDAwIEBQMEAwAAAAAAAAECAxEABCEFEiIxQVEGE2GBkRRxsSOhwdEHFUL/xAAYAQADAQEAAAAAAAAAAAAAAAACAwQABf/EAB8RAAMAAgMAAwEAAAAAAAAAAAABAgMRITFBEjJRIv/aAAwDAQACEQMRAD8AJTbgDlULBnlRzBSuEx71mMkQJHeuj8tdnJ58BGmB2ii/pglM70x3g/1XpDbqnAkNyrHDyJk4pmq3cCDtsyuUhOFbcTzPUz8fas7MpbED0biBH370I6TFPXdLShQDlyyiQCRJMT+aW3DSN6g3O0HhJ5mjVpm012LCTOazW5xrtWaLYWz2l5bagrIijrLVks3aHnW5CSDgdqGWtralahgnMVruUIKAtoKjvSPlORf0FpxXAy1rxQq0s0ltH6i+UcIAFUxXibVVulf1EJJkJ24GaaBpN5c27DwQpPmiA5O339KK8QWLDzRcS1Ztsp3JZ+nBBMGMjl0qXJLx2pXTLcWrj5Nchmj3v+y09Nx5exUlKkjlI7UQpncDEY7mgNG2WGnMW7h2ucSlp95z61ud1BtwETw9BMUSrJ4hNTiXJlduQOHint3qUGVOJSAh0hCjUpyqv1CnM/gr0tS7i0t0STcrQSEGBKUmJz6Z9jTBC3W4S04Ck5HqKpzbiWSnYo45q71avBSl6p4jsbRxXmtoSd0/8toSce5gUGSdz2U40lXI60nQNS1V7zG7YNMk5ddMJ9up9qI1fw/foWkBD7qQSSYJSOpyTXRGnQpoEQIxjpFbTBz6VK8tNrfg1Y0k9enIdS0u5G0p2rQBlQJJ960N2ga4nF7p5A4ro+qN2Y4ygBWJjrVA8VvCxv7XywmVSog/AP5qhVV8J6QpKcfa2wS8eCWP0zyyD0AqUq1C4adeuNxkIcO0bYjuPxUpqiJWgHVU9s0oVo/lQqyUX+6XiE/uTVy/xnZFnV7q64AlFsQEogjK09R6A1mpQZPowp+yL/bKKPOCcpDp+DB/mj0qlxaewqVKifZT4VvUuN5tB5bs1XPEjTksPptre5RKklDqAT0iD81mpVS6RNXbFD1lZ3Le64ix3c2nUtgK+0QqpUqUa2LP/9k="
      }
      title={"[Playlist]쌀쌀한 늦가을에 듣기 좋은 팝송 플레이리스트"}
      hashtags={["잔잔한", "팝송", "따뜻한"]}
      likes={777}
    />
  );
}
