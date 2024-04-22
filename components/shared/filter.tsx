"use client"

import getCategory from "@/actions/get_categories";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


import { cn, formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { ICategory, IEvent } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "../ui/button";
import getEvents from "@/actions/get_events";

interface SlideProps {
    setCategory: Dispatch<SetStateAction<string | null>>;
    setUpdateData: Dispatch<SetStateAction<IEvent[]>>;
    data: IEvent[];
}

const Filter = ({ setCategory, setUpdateData, data }: SlideProps) => {

    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const getCategories = async () => {
            const categoryList = await getEvents();
            categoryList && setCategories(categoryList)
        }

        getCategories();
    }, [])

    const [allData, setAllData] = useState<IEvent[]>(data);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState<string>("Latest");

    const onSelectCategory = (category: string) => {
        if (category === "Single") {
            setCategory("Song")
        } else {
            setCategory(category);
        }
        setSelectedCategory(category)
        if (category && category !== "Latest") {
            const filteredData = allData.filter((c) => c.type === category);
            setUpdateData(filteredData);
        } else {
            setUpdateData(allData);
            setSelectedCategory("Latest")
        }
    }



    return (
        <div className='flex flex-row gap-3 items-center pb-5 '>
            <div className={cn(`w-auto max-w-200 h-auto rounded-full flex items-center cursor-pointer mr-4 ${!selectedCategory && "border-b-[3px] border-r-[1px] border-slate-950"}`)}>
                <p onClick={() => onSelectCategory("Latest")} className={`${selectedCategory && 'text-primary-500'
                    } flex-center whitespace-nowrap font-semibold bg-white text-sm md:text-lg rounded-md px-3 py-1 ${selectedCategory === "Latest" ? 'border-b-[3px] border-r-[1px] border-slate-950 text-slate-700' : 'bg-transparent text-slate-900'}  pr-2`}>Latest</p>
                <p onClick={() => onSelectCategory("Single")} className={`${selectedCategory && 'text-primary-500'
                    } flex-center whitespace-nowrap font-semibold bg-white text-sm md:text-lg rounded-md px-3 py-1 ${selectedCategory === "Single" ? 'border-b-[3px] border-r-[1px] border-slate-950 text-slate-700' : 'bg-transparent text-slate-900'}  pr-2`}>Songs</p>
                <p onClick={() => onSelectCategory("Video")} className={`${selectedCategory && 'text-primary-500'
                    } flex-center whitespace-nowrap font-semibold bg-white text-sm md:text-lg rounded-md px-3 py-1 ${selectedCategory === "Video" ? 'border-b-[3px] border-r-[1px] border-slate-950 text-slate-700' : 'bg-transparent text-slate-900'}  pr-2`}>Videos</p>
                <p onClick={() => onSelectCategory("Album")} className={`${selectedCategory && 'text-primary-500'
                    } flex-center whitespace-nowrap font-semibold bg-white text-sm md:text-lg rounded-md px-3 py-1 ${selectedCategory === "Album" ? 'border-b-[3px] border-r-[1px] border-slate-950 text-slate-700' : 'bg-transparent text-slate-900'}  pr-2`}>Albums</p>
            </div>
        </div>
    )
}

export default Filter