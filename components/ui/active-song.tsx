"use client"
import React from "react";
import { useSelector } from "react-redux";
import MusicPlayer from "../shared/MusicPlayer";

export default function ActiveSong() {
  const { activeSong } = useSelector((state: any) => state.player);

  return (activeSong?.data?.length >= 1 && (

    <div className="fixed h-28 bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-blue-500 to-purple-900 backdrop-blur-lg rounded-t-3xl z-10">
      <MusicPlayer />
    </div>
  ))
}