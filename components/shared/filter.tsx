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
import { ICategory } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

const Filter = () => {
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>();
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const getCategories = async () => {
            const categoryList = await getCategory();

            categoryList && setCategories(categoryList as ICategory[])
        }

        getCategories();
    }, [])

    const onSelectCategory = (category: string) => {
        setSelectedCategory(category)
        let newUrl = '';

        if (category && category !== 'All') {
            newUrl = formUrlQuery({
                params: searchParams.toString(),
                key: 'category',
                value: category
            })
        } else {
            newUrl = removeKeysFromQuery({
                params: searchParams.toString(),
                keysToRemove: ['category']
            })
        }

        router.push(newUrl, { scroll: false });
    }

    return (
        <div className='flex flex-row gap-3 items-center pb-5 pr-2'>
            <h3 className={cn(`font-bold text-2xl text-black`)}>Latest</h3>
            <div className={cn(`w-full max-w-200 h-auto rounded-full flex items-center cursor-pointer ${!selectedCategory && "border-b-[3px] border-r-[1px] border-slate-950"}`)}>
                <p onClick={() => onSelectCategory("Music")} className={`${selectedCategory && 'text-primary-500'
                    } flex-center whitespace-nowrap font-semibold bg-white text-lg rounded-md px-3 py-1 ${selectedCategory === "Music" ? 'border-b-[3px] border-r-[1px] border-slate-950 text-slate-700' : 'bg-transparent text-slate-900'}  pr-2`}>Songs</p>
                <p onClick={() => onSelectCategory("Video")} className={`${selectedCategory && 'text-primary-500'
                    } flex-center whitespace-nowrap font-semibold bg-white text-lg rounded-md px-3 py-1 ${selectedCategory === "Video" ? 'border-b-[3px] border-r-[1px] border-slate-950 text-slate-700' : 'bg-transparent text-slate-900'}  pr-2`}>Videos</p>
                <p onClick={() => onSelectCategory("Album")} className={`${selectedCategory && 'text-primary-500'
                    } flex-center whitespace-nowrap font-semibold bg-white text-lg rounded-md px-3 py-1 ${selectedCategory === "Album" ? 'border-b-[3px] border-r-[1px] border-slate-950 text-slate-700' : 'bg-transparent text-slate-900'}  pr-2`}>Albums</p>
            </div>
        </div>
    )
}

export default Filter