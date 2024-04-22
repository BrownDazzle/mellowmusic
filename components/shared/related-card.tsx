"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FcFilmReel } from "react-icons/fc";
import { TbMusicStar } from "react-icons/tb";
import { cn, convertTimeAgo, formatViews } from "@/lib/utils";
import { IEvent } from "@/types";

interface RelatedCard {
    event: IEvent,
    hasOrderLink?: boolean,
    hidePrice?: boolean
}

const RelatedCard: React.FC<RelatedCard> = ({
    event
}) => {

    const router = useRouter();

    const handleClick = () => {
        router.push(`/view/${event?._id}`);
    };


    return (
        <div onClick={handleClick} className="flex gap-2 bg-white cursor-pointer rounded-xl shadow-md p-3 space-b-4 w-full max-h-[110px] overflow-hidden">
            {/* Image & actions */}

            <Image
                src={event.imageUrl}
                alt=""
                width={100}
                height={100}
                className=" object-cover align-center rounded-xl relative items-center justify-center hover:scale-110 transition"
            />
            {/* Description */}
            <div className="flex flex-col px-2 gap-2 justify-between items-center w-full py-2">
                <div className="w-full">
                    <div>
                        <p className={cn(`truncate font-semibold text-sm md:text-md text-slate-900`)}>{event.title}</p>
                        <p className="truncate text-sm text-gray-500">{event.artist}</p>
                    </div>
                    {/* Price & Reiew */}
                    <div className="flex items-center justify-between">
                        {event?.videoUrl ? (<FcFilmReel />) : (<TbMusicStar />)}
                    </div>
                </div>
                <div className="flex flex-row gap-y-5 justify-between ml-2 w-full">
                    {event.views >= 1 ? (<p className="text-xs text-gray-700">{formatViews(event.views)} views</p>) : null}
                    <p className="text-xs text-gray-700">{convertTimeAgo(event.createdAt)}</p>
                </div>
            </div>
        </div>
    );
}

export default RelatedCard;
