"use client"
import { IEvent } from '@/types';
import React from 'react';

interface TrackProps {
  activeSong: any | null;
  isPlaying: boolean;
  isActive: boolean;
}

const Track = ({ isPlaying, isActive, activeSong }: TrackProps) => (
  <div className="flex-1 flex items-center justify-start">
    <div className={`${isPlaying && isActive ? 'animate-[spin_3s_linear_infinite]' : ''} hidden sm:block h-16 w-16 mr-4`}>
      <img src={activeSong?.imageUrl} alt="cover art" className="rounded-full" />
    </div>
    <div className="w-[50%]">
      <p className="truncate text-white font-bold text-lg">
        {activeSong?.title ? activeSong?.title : 'No active Song'}
      </p>
      <p className="truncate text-gray-300">
        {activeSong?.description ? activeSong?.description : 'No active Song'}
      </p>
    </div>
  </div>
);

export default Track;
