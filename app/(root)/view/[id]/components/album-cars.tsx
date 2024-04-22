"use client";
import React, { useState, useEffect } from 'react';
import { nextSong, prevSong, playPause, setActiveSong } from '@/redux/features/playerSlice';
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FcFilmReel } from "react-icons/fc";
import { TbMusicStar } from "react-icons/tb";
import { CiPause1, CiPlay1 } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux';
import PlayPause from '@/components/ui/play-pause';
import { cn, convertTimeAgo, formatViews } from "@/lib/utils";
import { IEvent, Track } from "@/types";
import { HiCloudDownload } from "react-icons/hi";
import DownloadButtonCopy from "@/components/ui/download-button-copy";
import Seekbar from "@/app/(root)/view/[id]/components/Seekbar";
import VolumeBar from "@/app/(root)/view/[id]/components/VolumeBar";
import Player from '@/app/(root)/view/[id]/components/Player';
import AudioPlayer from './album-player';

interface AlbumCard {
    song: Track,
    data?: any,
    i: number
}

const AlbumCard: React.FC<AlbumCard> = ({
    song, data, i
}) => {
    const { activeSong, currentSongs, currentIndex, isActive } = useSelector((state: any) => state.player);

    return (
        <div className="flex gap-2 group rounded-xl shadow-md p-3 space-y-1 w-full h-full max-h-[120px] bg-slate-900 my-2">
            {/* Image & actions */}

            <p
                className="flex justify-center items-center h-full w-50 px-3 bg-white text-slate-700 text-3xl font-bold rounded-sm"

            >{i + 1}</p>
            {/* Description */}
            <div className="w-full flex flex-col gap-3 justify-between mr-2">
                <p
                    className="flex justify-center items-center h-full w-full px-3 bg-white text-slate-700 text-xs font-bold rounded-sm"

                >{song?.title}</p>
                <div className="w-full flex flex-row justify-between cursor-pointer gap-5">
                    <AudioPlayer src={song?.audioUrl} />
                    <DownloadButtonCopy url={song.audioUrl} title={song.title} />
                </div>
            </div>
        </div>
    );
}

export default AlbumCard;
