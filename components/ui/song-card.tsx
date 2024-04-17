"use client"
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PlayPause from '@/components/ui/play-pause';
import { playPause, setActiveSong } from '@/redux/features/playerSlice';
import { IEvent } from '@/types';
import Link from 'next/link';


interface CardProps {
    song: IEvent,
    data?: any,
    i: any
}

const SongCard = ({ song, data, i }: CardProps) => {
    const dispatch = useDispatch();
    const { activeSong, isPlaying } = useSelector((state: any) => state.player);
    const handlePauseClick = () => {
        dispatch(playPause(false));
    };

    const handlePlayClick = () => {
        dispatch(setActiveSong({ song, data, i }));
        dispatch(playPause(true));
    };

    return (
        <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer bg-white">
            <div className="relative w-full h-56 group">
                <div className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${activeSong?.title === song.title ? 'flex bg-black bg-opacity-70' : 'hidden'}`}>
                    <PlayPause
                        isPlaying={isPlaying}
                        activeSong={activeSong}
                        song={song}
                        handlePause={handlePauseClick}
                        handlePlay={handlePlayClick}
                    />
                </div>
                <img alt="song_img" src={song?.imageUrl} className="w-full h-full rounded-lg" />
            </div>

            <div className="mt-4 flex flex-col">
                <p className="text-sm truncate text-gray-300 mt-1">
                    {song?.genre.name}
                </p>
            </div>
        </div>
    );
};

export default SongCard;
