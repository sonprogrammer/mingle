import React from "react";
import { ChartComponent } from "../../components";

export default function ChartPage() {
  return (
    <ChartComponent
      items={[
        {
          title: "Lost Boy",
          img: "/img/AlbumSample.jpg",
          artist: "Troye Sivan",
          length: "03:20",
          isLiked: true,
        },
        {
          title: "Dangerously",
          img: "/img/AlbumSample.jpg",
          artist: "Charlie Puth",
          length: "03:48",
          isLiked: false,
        },
        {
          title: "Eyes Closed",
          img: "/img/AlbumSample.jpg",
          artist: "Ed Sherren",
          length: "03:21",
          isLiked: true,
        },
        {
          title: "Steal The Show",
          img: "/img/AlbumSample.jpg",
          artist: "Lauv",
          length: "03:28",
          isLiked: false,
        },
        {
          title: "Kill Bill",
          img: "/img/AlbumSample.jpg",
          artist: "SZA",
          length: "03:50",
          isLiked: false,
        },
        {
          title: "Lost Boy",
          img: "/img/AlbumSample.jpg",
          artist: "Troye Sivan",
          length: "03:20",
          isLiked: true,
        },
        {
          title: "Dangerously",
          img: "/img/AlbumSample.jpg",
          artist: "Charlie Puth",
          length: "03:48",
          isLiked: false,
        },
        {
          title: "Eyes Closed",
          img: "/img/AlbumSample.jpg",
          artist: "Ed Sherren",
          length: "03:21",
          isLiked: true,
        },
        {
          title: "Steal The Show",
          img: "/img/AlbumSample.jpg",
          artist: "Lauv",
          length: "03:28",
          isLiked: false,
        },
        {
          title: "Kill Bill",
          img: "/img/AlbumSample.jpg",
          artist: "SZA",
          length: "03:50",
          isLiked: false,
        },
      ]}
      title={"차트"}
    />
  );
}
