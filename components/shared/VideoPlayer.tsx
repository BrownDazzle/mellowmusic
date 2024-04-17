"use client"

import { PauseCircleIcon, PlayCircleIcon, StopCircle } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import IconButton from '../ui/icon-button';
import { IEvent } from '@/types';

type CardProps = {
    event: IEvent,
}

const VideoPlayer = ({ event }: CardProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setPlaying] = useState(false);

    const playVideo = () => {
        setPlaying(true);
        videoRef.current?.play();
    };

    const pauseVideo = () => {
        setPlaying(false);
        videoRef.current?.pause();
    };



    return (
        <div className='relative'>
            <video
                ref={videoRef}
                src={event?.videoUrl}
                className={`w-full h-[60vh] object-cover rounded-md ${isPlaying ? 'opacity-100' : 'opacity-0'}`}
                controls={isPlaying}
                autoPlay={isPlaying}
                loop
            />
            {!isPlaying && (
                <div
                    className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black rounded-sm"
                    onClick={playVideo}
                >
                    <div className="overlay ">
                        {/*<img src={event.imageUrl} alt="Video Thumbnail" />*/}
                        <IconButton icon={<PlayCircleIcon />} onClick={playVideo} />

                    </div>
                </div>
            )}
        </div>
    );
};

export default VideoPlayer;
