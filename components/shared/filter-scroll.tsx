"use client"

import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

import { ArrowLeft, ArrowRight } from 'lucide-react';
import { ICategory, IEvent, IGenre } from '@/types';
import VideoChart from './video-card';
import Link from 'next/link';
import getGenre from '@/actions/get_genres';

interface SlideProps {
    setCategory: Dispatch<SetStateAction<string | null>>;
    setUpdateData: Dispatch<SetStateAction<IEvent[]>>;
    data: IEvent[];
}

const FilterScroll = ({ setCategory, setUpdateData, data }: SlideProps) => {
    const params = useSearchParams();
    const scrollContainer = useRef<HTMLDivElement | null>(null);
    const category = params?.get('category');
    const pathname = usePathname();

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

    useEffect(() => {
        const getCategories = async () => {
            const categoryList = await getGenre();
            categoryList && setCategories(categoryList as IGenre[])
        }

        getCategories();
    }, [])

    const [allData, setAllData] = useState<IEvent[]>(data);
    const [categories, setCategories] = useState<IGenre[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>("All");

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
        <div
            ref={scrollContainer}
            className="flex items-center overflow-x-scroll show-scroll-bar pb-2 pr-2 w-full"
        >
            <div

                className="flex flex-nowrap gap-4 items-center"
            >
                <div

                    className={`${selectedCategory === "All" && 'text-primary-500'
                        } flex-center whitespace-nowrap font-semibold bg-white text-lg rounded-md px-3 py-1 ${selectedCategory === "All" ? 'border-b-[3px] border-slate-700 text-slate-700' : 'bg-transparent text-slate-900'} border-r-[1px] border-slate-950 pr-2`}
                >
                    <button onClick={() => onSelectCategory("All")}>{"All"}</button>
                </div>
                {categories.map((link, i) => {
                    const isActive = pathname === link.name;
                    return (
                        <li
                            key={i}
                            className={`${isActive && 'text-primary-500'
                                } flex-center whitespace-nowrap font-semibold bg-white text-lg rounded-md px-3 py-1 ${selectedCategory === link.name ? 'border-b-[3px] border-slate-700 text-slate-700' : 'bg-transparent text-slate-900'} border-r-[1px] border-slate-950 pr-2`}
                        >
                            <button onClick={() => onSelectCategory(link.name)}>{link.name}</button>
                        </li>
                    )
                })}
            </div>
            <button
                onClick={() => scrollLeft()}
                className="hidden absolute left-5 transform -translate-y-1/2 bg-white rounded-full shadow-lg px-3 py-3"
            >
                {/* Left arrow icon or custom icon */}
                <ArrowLeft size={24} />
            </button>
            <button
                onClick={() => scrollRight()}
                className="hidden absolute right-5 transform -translate-y-1/2 bg-white rounded-full shadow-lg px-3 py-3"
            >
                {/* Right arrow icon or custom icon */}
                <ArrowRight size={24} />
            </button>
        </div>
    );
};

export default FilterScroll;
