"use client"

import React, { useRef, useState } from 'react';
import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa';

interface AudioPlayerProps {
    src: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src }) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            const currentTime = audioRef.current.currentTime;
            const duration = audioRef.current.duration;
            const progressPercent = (currentTime / duration) * 100;
            setProgress(progressPercent);
        }
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (audioRef.current) {
            const seekTime = (parseFloat(e.target.value) / 100) * audioRef.current.duration;
            audioRef.current.currentTime = seekTime;
            setProgress(parseFloat(e.target.value));
        }
    };

    return (
        <div className="flex items-center justify-center">
            <audio
                src={src}
                ref={audioRef}
                onTimeUpdate={handleTimeUpdate}
                onEnded={() => setIsPlaying(false)}
            />
            <button
                className="text-white rounded-full shadow-md mr-4"
                onClick={togglePlay}
            >
                {isPlaying ? (
                    <FaPauseCircle
                        size={35}
                        className="text-white hover:scale-110 transition"
                    />
                ) : (
                    <FaPlayCircle
                        size={35}
                        className="text-white hover:scale-110 transition"
                    />
                )}
            </button>
            <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={handleSeek}
                className="slider appearance-none w-full max-w-48 h-2 bg-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
            />
        </div>
    );
};

export default AudioPlayer;
