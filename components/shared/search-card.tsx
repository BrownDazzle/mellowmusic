"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FcFilmReel } from "react-icons/fc";
import { TbMusicStar } from "react-icons/tb";
import { cn, convertTimeAgo, formatViews } from "@/lib/utils";
import { IEvent } from "@/types";
import useSearchModal from "@/hooks/use-search-modal";

interface SearchCard {
    event: IEvent,
}

const SearchCard: React.FC<SearchCard> = ({
    event
}) => {
    const searchModal = useSearchModal();
    const router = useRouter();

    const handleClick = () => {
        router.push(`/view/${event?._id}`);
        searchModal.onClose();
    };


    return (
        <div onClick={handleClick} className="flex gap-2 bg-white cursor-pointer rounded-xl shadow-md px-3 py-1 space-y-4 w-full max-h-[70px]">
            {/* Image & actions */}

            <Image
                src={event.imageUrl}
                alt=""
                width={60}
                height={60}
                className=" object-cover align-center rounded-xl relative items-center justify-center hover:scale-110 transition"
            />
            {/* Description */}
            <div className="flex flex-col gap-3 px-2 justify-between items-center w-full">
                <div className="flex w-full justify-between">
                    <div className="flex gap-5">
                        <p className={cn(`font-semibold text-sm md:text-md text-slate-900`)}>{event.title}</p>
                        <p className="text-sm text-gray-500">{event.artist}</p>
                    </div>
                    {/* Price & Reiew */}
                    <div className="flex items-center justify-between">
                        {event.type === "Video" ? (<FcFilmReel />) : (<TbMusicStar />)}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchCard;
