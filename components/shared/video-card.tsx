"use client";

import React, { useRef } from 'react';

import Image from "next/image";
import { useRouter } from "next/navigation";
import { GiFrayedArrow } from "react-icons/gi";
import { CiPause1, CiPlay1 } from "react-icons/ci";
import { cn, convertTimeAgo, formatViews } from "@/lib/utils";
import { IEvent } from "@/types";


interface VideoCardProps {
    video: IEvent,
    data?: any,
    i?: any
    listNumber?: number
}

const VideoCard: React.FC<VideoCardProps> = ({ video, data, listNumber }) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const router = useRouter();

    const handleClick = () => {
        router.push(`/view/${video?._id}`);
    };

    return (
        <div onClick={() => handleClick()} className="relative group overflow-hidden rounded-md h-[300px] w-full cursor-pointer">
            {listNumber && (<div className="absolute top-2 right-2 bg-orange-900 rounded-full px-3 py-2 shadow-sm">
                <p className="text-sm font-semibold text-white">{listNumber}</p>
            </div>)}
            <img
                className="w-full h-full object-cover"
                src={video?.imageUrl}
                alt={video?.title}
            />
            <div className="absolute bottom-3 left-0 py-2 px-4 ml-2 text-black bg-white rounded-md">
                <p className="text-1xl font-semibold">{video?.artist}</p>
                <p className="text-lg font-bold">{video?.title}</p>
            </div>

        </div>
    );
};

export default VideoCard;
