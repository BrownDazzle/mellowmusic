"use client"
import React from 'react';
import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa';

interface PlayPauseProps {
    isPlaying: boolean,
    activeSong: any,
    song: any,
    handlePause: any,
    handlePlay: any
}

const PlayPause = ({ isPlaying, activeSong, song, handlePause, handlePlay }: PlayPauseProps) => (isPlaying && activeSong?.title === song.title ? (
    <FaPauseCircle
        size={35}
        className="text-white hover:scale-110 transition"
        onClick={handlePause}
    />
) : (
    <FaPlayCircle
        size={35}
        className="text-white hover:scale-110 transition"
        onClick={handlePlay}
    />
));

export default PlayPause;
