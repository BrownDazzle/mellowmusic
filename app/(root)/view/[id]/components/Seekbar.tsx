"use client"
import React from 'react';

interface SeekbarProps {
  value: number;
  min: number;
  max: number;
  onInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setSeekTime: (time: number) => void;
  appTime: number;
}

const Seekbar: React.FC<SeekbarProps> = ({ value, min, max, onInput, setSeekTime, appTime }) => {
  // converts the time to format 0:00
  const getTime = (time: number) => `${Math.floor(time / 60)}:${(`0${Math.floor(time % 60)}`).slice(-2)}`;

  return (
    <div className="flex flex-row items-center w-full">
      <button
        type="button"
        onClick={() => setSeekTime(appTime - 5)}
        className="lg:mr-4 text-white text-sm"
      >
        -
      </button>
      <p className="text-white text-xs">{value === 0 ? '0:00' : getTime(value)}</p>
      <input
        type="range"
        step="any"
        value={value}
        min={min}
        max={max}
        onInput={onInput}
        className=" w-full h-1 mx-4 2xl:mx-6 rounded-lg"
      />
      <p className="text-white text-xs">{max === 0 ? '0:00' : getTime(max)}</p>
      <button
        type="button"
        onClick={() => setSeekTime(appTime + 5)}
        className="hidden lg:ml-4 lg:block text-white text-sm"
      >
        +
      </button>
    </div>
  );
};

export default Seekbar;
