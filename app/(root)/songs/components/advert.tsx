// components/Advert.tsx

import React from 'react';

interface AdvertProps {
    imageUrl: string;
    title: string;
    description: string;
}

const Advert: React.FC<AdvertProps> = ({ imageUrl, title, description }) => {
    return (
        <div className="w-full bg-white rounded-md">
            <div className="relative overflow-hidden rounded-md">
                <img className="w-full h-24 object-cover rounded-md" src={imageUrl} alt={title} />
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex flex-row items-center justify-between text-white pl-2 gap-2">
                        <h2 className="text-2xl font-semibold">{title}</h2>
                        <p className="text-lg">{description}</p>
                        <button className="h-full ml-2 px-6 py-2 bg-blue-500 hover:cursor-pointer hover:bg-blue-600 text-white rounded-md">
                            just Click
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Advert;
