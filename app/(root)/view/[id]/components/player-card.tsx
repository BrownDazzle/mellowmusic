"use client";
import React, { useState, useEffect } from 'react';
import { nextSong, prevSong, playPause, setActiveSong } from '../../../../../redux/features/playerSlice';
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FcFilmReel } from "react-icons/fc";
import { TbMusicStar } from "react-icons/tb";
import { CiPlay1 } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux';
import PlayPause from '../../../../../components/ui/play-pause';
import { cn, convertTimeAgo, formatViews } from "@/lib/utils";
import { IEvent } from "@/types";
import { HiCloudDownload } from "react-icons/hi";
import DownloadButtonCopy from "../../../../../components/ui/download-button-copy";
import Seekbar from "../components/Seekbar";
import VolumeBar from "../components/VolumeBar";
import Player from '@/components/shared/MusicPlayer/Player';

interface PlayerCard {
    song: any,
    data?: any,
    i?: any
}

const PlayerCard: React.FC<PlayerCard> = ({
    song, data, i
}) => {
    const { activeSong, currentSongs, currentIndex, isActive, isPlaying } = useSelector((state: any) => state.player);
    const [duration, setDuration] = useState(0);
    const [seekTime, setSeekTime] = useState(0);
    const [appTime, setAppTime] = useState(0);
    const [volume, setVolume] = useState(0.3);
    const [repeat, setRepeat] = useState(false);
    const [shuffle, setShuffle] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (currentSongs?.length) dispatch(playPause(true));
    }, [currentIndex]);

    const handlePlayPause = () => {
        if (!isActive) return;

        if (isPlaying) {
            dispatch(playPause(false));
        } else {
            dispatch(playPause(true));
        }
    };

    const handleNextSong = () => {
        dispatch(playPause(false));

        if (!shuffle) {
            dispatch(nextSong((currentIndex + 1) % currentSongs.length));
        } else {
            dispatch(nextSong(Math.floor(Math.random() * currentSongs.length)));
        }
    };

    const handlePrevSong = () => {
        if (currentIndex === 0) {
            dispatch(prevSong(currentSongs.length - 1));
        } else if (shuffle) {
            dispatch(prevSong(Math.floor(Math.random() * currentSongs.length)));
        } else {
            dispatch(prevSong(currentIndex - 1));
        }
    };

    const handleClose = () => {
        dispatch(setActiveSong({}))
    }


    const handlePauseClick = () => {
        dispatch(playPause(false));
    };

    const handlePlayClick = () => {
        dispatch(setActiveSong({ song, data, i }));
        dispatch(playPause(true));
    };

    return (
        <div className="flex gap-2 group rounded-xl shadow-md p-3 space-y-1 w-full h-full max-h-[100px] bg-slate-900 my-2">
            {/* Image & actions */}

            <Image
                src={song?.imageUrl}
                alt=""
                width={50}
                height={50}
                className=" object-cover align-center rounded-xl relative items-center justify-center cursor-pointer hover:scale-110 transition"
            />
            {/* Description */}
            <div className="w-full flex flex-col gap-3 justify-between mr-2">
                <div className="w-full flex flex-row justify-between cursor-pointer gap-5">
                    <VolumeBar value={volume} min={0} max={1} onChange={(event: any) => setVolume(event.target.value)} setVolume={setVolume} />
                    <div className="flex flex-row justify-between cursor-pointer gap-3">
                        <PlayPause
                            isPlaying={isPlaying}
                            activeSong={activeSong}
                            song={song}
                            handlePause={handlePauseClick}
                            handlePlay={handlePlayClick}
                        />
                        <DownloadButtonCopy url={song.audioUrl} title={song.title} />
                    </div>
                </div>
                <Player
                    activeSong={activeSong}
                    volume={volume}
                    isPlaying={isPlaying}
                    seekTime={seekTime}
                    repeat={repeat}
                    currentIndex={currentIndex}
                    onEnded={handleNextSong}
                    onTimeUpdate={(event: any) => setAppTime(event.target.currentTime)}
                    onLoadedData={(event: any) => setDuration(event.target.duration)}
                />
                <div className="w-full flex flex-row xs:gap-2 items-center justify-between mr-2">
                    <Seekbar
                        value={appTime}
                        min={0}
                        max={duration}
                        onInput={(event: any) => setSeekTime(event.target.value)}
                        setSeekTime={setSeekTime}
                        appTime={appTime}
                    />

                </div>

            </div>
        </div>
    );
}

export default PlayerCard;
