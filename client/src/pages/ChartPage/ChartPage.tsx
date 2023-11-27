import React, { useState } from "react";
import { ChartComponent } from "../../components";
import { usePostlikeToggle, useDeleteLikeToggle } from '../../hooks';


export default function ChartPage() {

  const postLikeToggle = usePostlikeToggle();
  const deleteLikeToggle = useDeleteLikeToggle();




  return (
    <ChartComponent
      items={[
        {
          title: "Lost Boy",
          img: "/img/AlbumSample.jpg",
          artist: "Troye Sivan",
          length: "03:20",
          isLiked: true,
          _id: "1",
        },
        {
          title: "Dangerously",
          img: "/img/AlbumSample.jpg",
          artist: "Charlie Puth",
          length: "03:48",
          isLiked: false,
          _id: "2",
        },
        {
          title: "Eyes Closed",
          img: "/img/AlbumSample.jpg",
          artist: "Ed Sherren",
          length: "03:21",
          isLiked: true,
          _id: "3",

        },
        {
          title: "Steal The Show",
          img: "/img/AlbumSample.jpg",
          artist: "Lauv",
          length: "03:28",
          isLiked: false,
          _id: "4",
        },
        {
          title: "Kill Bill",
          img: "/img/AlbumSample.jpg",
          artist: "SZA",
          length: "03:50",
          isLiked: false,
          _id: "5",
        },
        {
          title: "Lost Boy",
          img: "/img/AlbumSample.jpg",
          artist: "Troye Sivan",
          length: "03:20",
          isLiked: true,
          _id: "6",
        },
        {
          title: "Dangerously",
          img: "/img/AlbumSample.jpg",
          artist: "Charlie Puth",
          length: "03:48",
          isLiked: false,
          _id: "7",
        },
        {
          title: "Eyes Closed",
          img: "/img/AlbumSample.jpg",
          artist: "Ed Sherren",
          length: "03:21",
          isLiked: true,
          _id: "8",

        },
        {
          title: "Steal The Show",
          img: "/img/AlbumSample.jpg",
          artist: "Lauv",
          length: "03:28",
          isLiked: false,
          _id: "9"
        },
        {
          title: "Kill Bill",
          img: "/img/AlbumSample.jpg",
          artist: "SZA",
          length: "03:50",
          isLiked: false,
          _id: "10"
        },
      ]}
      title={"차트"}

    />
  );
}
