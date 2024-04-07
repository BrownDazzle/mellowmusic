// pages/index.tsx
"use client"
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { ICategory, IEvent, IGenre } from '@/types';
import { cn } from '@/lib/utils';
import getEvents from '@/actions/get_events';
import getCategory from '@/actions/get_categories';
import getGenre from '@/actions/get_genres';

const musicData = [
    { title: 'Song 1', artist: 'Artist 1', imageUrl: '/images/song1.jpg' },
    { title: 'Song 2', artist: 'Artist 2', imageUrl: '/images/song2.jpg' },
    // Add more music data as needed
];

interface SlideProps {
    setCategory: Dispatch<SetStateAction<string | null>>;
    setUpdateData: Dispatch<SetStateAction<IEvent[]>>;
    data: IEvent[];
}

const ScrollSlide = ({ setCategory, setUpdateData, data }: SlideProps) => {
    const scrollContainer = useRef<HTMLDivElement>(null);

    const handleScroll = (scrollOffset: number) => {
        if (scrollContainer.current) {
            scrollContainer.current.scrollLeft += scrollOffset;
        }
    };

    const [allData, setAllData] = useState<IEvent[]>(data);
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | null>();

    useEffect(() => {
        const getCategories = async () => {
            const categoryList = await getGenre();
            categoryList && setCategories(categoryList as IGenre[])
        }

        getCategories();
    }, [])

    const onSelectCategory = (category: string) => {
        setCategory(category)
        setSelectedCategory(category)
        if (category && category !== 'All') {
            const filteredData = allData.filter((c) => c.genre.name === category);
            setUpdateData(filteredData);
        } else {
            setUpdateData(allData);
        }
    }


    return (
        <div className="container my-5 md:pt-5 w-full">
            <div className="w-full flex items-center justify-between space-x-4">
                <button className='text-slate-900 bg-transparent' onClick={() => handleScroll(-200)}>&lt;</button>
                <div className="flex space-x-4 overflow-x-auto w-full hide-scroll-bar" ref={scrollContainer}>
                    <button
                        className={` px-3 py-1 rounded-full ${selectedCategory === "All" ? 'bg-slate-900 text-white' : 'bg-slate-200 text-slate-900'} hover:bg-slate-900 hover:text-white transition-all`}
                        onClick={() => onSelectCategory("All")}
                    >
                        <span className='w-full'>All</span>
                    </button>
                    {categories?.map((category, index) => (
                        <button
                            key={index}
                            className={` px-3 py-1 rounded-full ${selectedCategory === category.name ? 'bg-slate-900 text-white' : 'bg-slate-200 text-slate-900'} hover:bg-slate-900 hover:text-white transition-all`}
                            onClick={() => onSelectCategory(category.name)}
                        >
                            <span className='w-full'>{category.name}</span>
                        </button>
                    ))}
                </div>
                <button className='text-slate-900 bg-transparent' onClick={() => handleScroll(200)}>&gt;</button>
            </div>
        </div>
    );
};

export default ScrollSlide;
