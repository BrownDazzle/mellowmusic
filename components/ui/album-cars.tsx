"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FcFilmReel } from "react-icons/fc";
import { TbMusicStar } from "react-icons/tb";
import { CiPlay1 } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux';
import PlayPause from '../ui/play-pause';
import { playPause, setActiveSong } from '../../redux/features/playerSlice';
import { cn, convertTimeAgo, formatViews } from "@/lib/utils";
import { IEvent } from "@/types";
import { HiCloudDownload } from "react-icons/hi";
import DownloadButtonCopy from "./download-button-copy";

interface RelatedCard {
    song: any,
    data?: any,
    i?: any
}

const RelatedCard: React.FC<RelatedCard> = ({
    song, data, i
}) => {
    const { activeSong, isPlaying } = useSelector((state: any) => state.player);
    const router = useRouter();
    const dispatch = useDispatch();

    const handlePauseClick = () => {
        dispatch(playPause(false));
    };

    const handlePlayClick = () => {
        dispatch(setActiveSong({ song, data, i }));
        dispatch(playPause(true));
    };

    return (
        <div className="flex gap-2 group rounded-xl shadow-md p-3 space-y-1 w-full h-full max-h-[90px] bg-blue-500 my-2">
            {/* Image & actions */}

            <Image
                src={song?.imageUrl}
                alt=""
                width={50}
                height={50}
                className=" object-cover align-center rounded-xl relative items-center justify-center cursor-pointer hover:scale-110 transition"
            />
            {/* Description */}
            <div className="flex flex-col px-2 justify-between w-full">

                <div className="w-full h-full flex flex-row justify-between items-center mr-5">
                    <div className="flex flex-col cursor-pointer w-full">
                        <p className={cn(`font-bold text-lg text-white text-ellipsis overflow-hidden ...`)}>{song?.title?.slice(0, 45)}</p>
                        <p className="font-semibold text-1xl"><span className="truncate font-semibold text-md text-white">{song?.artist}</span></p>
                    </div>
                    <div className={`flex flex-row gap-4 inset-0 justify-center items-center bg-opacity-50 group-hover:flex `}>
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
            </div>
        </div>
    );
}

export default RelatedCard;
