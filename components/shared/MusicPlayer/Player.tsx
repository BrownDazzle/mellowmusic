"use client"
import { IEvent } from '@/types';
import React, { useRef, useEffect } from 'react';

interface PlayerProps {
  activeSong: any | null;
  isPlaying: boolean;
  volume: number;
  seekTime: number;
  currentIndex?: number;
  onEnded: () => void;
  onTimeUpdate: (event: React.SyntheticEvent<HTMLAudioElement>) => void;
  onLoadedData: (event: React.SyntheticEvent<HTMLAudioElement>) => void;
  repeat: boolean;
}

const Player: React.FC<PlayerProps> = ({ activeSong, isPlaying, volume, seekTime, currentIndex, onEnded, onTimeUpdate, onLoadedData, repeat }) => {
  const ref = useRef<HTMLAudioElement>(null);

  // eslint-disable-next-line no-unused-expressions
  if (ref.current) {
    if (isPlaying) {
      ref.current.play();
    } else {
      ref.current.pause();
    }
  }

  useEffect(() => {
    if (ref.current) {
      ref.current.volume = volume;
    }
  }, [volume]);

  // updates audio element only on seekTime change (and not on each rerender):
  useEffect(() => {
    if (ref.current) {
      ref.current.currentTime = seekTime;
    }
  }, [seekTime]);

  return (
    <audio
      src={activeSong?.audioUrl}
      ref={ref}
      loop={repeat}
      onEnded={onEnded}
      onTimeUpdate={onTimeUpdate}
      onLoadedData={onLoadedData}
    />
  );
};

export default Player;
