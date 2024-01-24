"use client"

import getGenre from "@/actions/get_genres";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { IGenre } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const GenreFilter = () => {
    const [genres, setGenres] = useState<IGenre[]>([]);
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const getGenres = async () => {
            const categoryList = await getGenre();

            categoryList && setGenres(categoryList as IGenre[])
        }

        getGenres();
    }, [])

    const onSelectCategory = (genre: string) => {
        let newUrl = '';

        if (genre) {
            newUrl = formUrlQuery({
                params: searchParams.toString(),
                key: 'genre',
                value: genre
            })
        } else {
            newUrl = removeKeysFromQuery({
                params: searchParams.toString(),
                keysToRemove: ['genre']
            })
        }

        router.push(newUrl, { scroll: false });
    }

    return (
        <Select onValueChange={(value: string) => onSelectCategory(value)}>
            <SelectTrigger className="select-field">
                <SelectValue placeholder="Genre" />
            </SelectTrigger>
            <SelectContent>
                {genres.map((genre) => (
                    <SelectItem value={genre.name} key={genre._id} className="select-item p-regular-14">
                        {genre.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}

export default GenreFilter