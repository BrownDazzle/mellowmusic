"use client"

import React, { useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import CategoryCard from '@/components/ui/category-card';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Category, IEvent, SearchParamProps } from '@/types';
import { cn } from '@/lib/utils';
import MoreButton from './more-button';
import { useParams } from 'next/navigation';

interface SliderProps {
    categories?: Category[];
    sliders?: IEvent[];
    title: string;
    params?: SearchParamProps
}

const HorizontalSlider: React.FC<SliderProps> = ({ categories, sliders, title, params }) => {
    const useCategory = useParams();
    const scrollContainer = useRef<HTMLDivElement | null>(null);

    const pathname = usePathname();

    const routes = categories?.map((route) => ({
        href: `/category/${route.id}`,
        label: route.name,
        imageUrl: route.url,
        active: pathname === `/category/${route.id}`,
    }));


    const scrollLeft = () => {
        scrollContainer.current?.scrollBy({
            top: 0,
            left: -200, // Adjust this value as needed for scroll distance
            behavior: 'smooth',
        });
    };

    const scrollRight = () => {
        scrollContainer.current?.scrollBy({
            top: 0,
            left: 200, // Adjust this value as needed for scroll distance
            behavior: 'smooth',
        });
    };

    return (
        <div className='relative w-full container'>
            <div className='container flex flex-row justify-between items-center pb-5'>
                <h3 className={cn(`font-bold text-2xl text-black`)}>{title}</h3>
            </div>
            <div
                ref={scrollContainer}
                className="flex items-center overflow-x-scroll pb-5 hide-scroll-bar w-full"
            >
                <div

                    className="flex flex-nowrap gap-6 lg:mx-10 md:mx-10 mx-10 "
                >
                    {sliders?.map((item, i) => (
                        <CategoryCard
                            key={i}
                            id={item._id}
                            listNumber={i + 1}
                            image={item.imageUrl}
                            title={item.artist}
                            href={"/"}
                            selected={useCategory?.category === item.artist} />
                    ))}
                </div>
                <button
                    onClick={() => scrollLeft()}
                    className=" absolute left-2 transform -translate-y-1/2 bg-black rounded-full shadow-lg px-2 py-2"
                >
                    {/* Left arrow icon or custom icon */}
                    <ArrowLeft size={18} className='text-white' />
                </button>
                <button
                    onClick={() => scrollRight()}
                    className=" absolute right-2 transform -translate-y-1/2 bg-black rounded-full shadow-lg px-2 py-2"
                >
                    {/* Right arrow icon or custom icon */}
                    <ArrowRight size={18} className='text-white' />
                </button>
            </div>
        </div>
    );
};

export default HorizontalSlider;
