"use client"

import { useRouter } from 'next/navigation';
import React from 'react';
import { FaRegEye } from 'react-icons/fa';
import { HiCloudDownload } from 'react-icons/hi';

interface CategoryCardProps {
    id: string;
    image: string;
    title: string;
    href: string;
    selected: Boolean;
    listNumber?: number
}

const CategoryCard: React.FC<CategoryCardProps> = ({ image, title, href, selected, listNumber, id }) => {
    const router = useRouter();

    const handleClick = () => {
        router.push(`/view/${id}`);
    };

    return (
        <>
            <div onClick={() => handleClick()} className="relative flex flex-col justify-between overflow-hidden bg-black bg-opacity-20 rounded-lg shadow-lg shadow-white w-40 h-64 pb-5 pt-10 px-5 cursor-pointer">
                {/* Category Image */}
                <div className="absolute top-1 left-1 bg-blue-600 rounded-full px-3 py-1 shadow-sm">
                    <p className="text-sm font-semibold text-white">{listNumber}</p>
                </div>
                <div className="absolute top-1 right-1 bg-white rounded-full px-3 py-1 shadow-sm">
                    <p className="flex flex-row gap-2 text-sm font-semibold text-black items-center">12k <HiCloudDownload /></p>
                </div>
                <div className='w-34 h-34 flex justify-center items-center rounded-full overflow-hidden'>
                    <img
                        src={image}
                        alt={title}
                        className="relative object-cover object-center h-full w-full opacity-80 hover:opacity-100 transition-opacity duration-300"
                    />
                </div>
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600  to-transparent opacity-0 opacity-80 transition-opacity duration-300"></div>
                {/* Content */}
                <div className="flex flex-col justify-center items-center w-full">
                    {/* Category Title */}

                    {/* Category Description */}
                    {/* Explore Button */}

                    <p className="mt-4 bg-white text-blue-900 hover:bg-blue-400 mx-2 py-1 px-2 rounded-full transition duration-300 ease-in-out transform hover:scale-105 text-sm font-semibold">{title}</p>
                </div>
            </div>
        </>
    );
};

export default CategoryCard;
