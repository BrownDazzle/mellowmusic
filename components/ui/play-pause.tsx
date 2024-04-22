"use client"
import { Track } from '@/types';
import React from 'react';
import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa';

interface PlayPauseProps {
    isPlaying: boolean,
    activeSong: Track,
    song: Track,
    i: number,
    handlePause: () => void,
    handlePlay: () => void
}

const PlayPause = ({ isPlaying, activeSong, song, i, handlePause, handlePlay }: PlayPauseProps) => (isPlaying && activeSong.title === song.title ? (
    <FaPauseCircle
        size={35}
        className="text-white hover:scale-110 transition"
        onClick={() => handlePause()}
    />
) : (
    <FaPlayCircle
        size={35}
        className="text-white hover:scale-110 transition"
        onClick={() => handlePlay()}
    />
));

export default PlayPause;
