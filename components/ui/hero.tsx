// components/Hero.tsx

import React from 'react';

interface HeroProps {
    title?: string;
    description?: string;
    buttonText?: string;
    backgroundImage?: string;
}

const Hero: React.FC<HeroProps> = ({ title, description, buttonText, backgroundImage }) => {
    return (
        <div
            className="relative h-screen flex items-center justify-center"
            style={{ backgroundImage: 'url("/assets/images/hero.png")', backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="text-center z-10 text-white">
                <h1 className="text-4xl md:text-6xl font-bold">Discover the Magic of Music</h1>
                <p className="mt-4 text-lg md:text-xl">Explore a world of melodies and rhythms</p>
                <button className="mt-8 bg-purple-500 hover:bg-purple-600 text-white py-2 px-6 rounded-full">
                    {buttonText}
                </button>
            </div>
        </div>
    );
};

export default Hero;
