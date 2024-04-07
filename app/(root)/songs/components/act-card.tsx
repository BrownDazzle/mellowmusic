"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { HiCloudDownload } from "react-icons/hi";
import { FaRegEye } from "react-icons/fa";
import { cn, convertTimeAgo, formatViews } from "@/lib/utils";
import { IEvent } from "@/types";

interface ActCard {
    act: IEvent,
    listNumber: number
}

const ActCard: React.FC<ActCard> = ({
    act,
    listNumber
}) => {

    const router = useRouter();

    const handleClick = () => {
        router.push(`/view/${act?._id}`);
    };


    return (
        <div onClick={handleClick} className="flex gap-2 bg-white cursor-pointer rounded-xl shadow-md p-1 space-y-4 w-full max-h-[100px] my-2">
            {/* Image & actions */}

            <Image
                src={act.imageUrl}
                alt=""
                width={80}
                height={80}
                className=" object-cover align-center rounded-xl relative items-center justify-center hover:scale-110 transition"
            />
            {/* Description */}
            <div className="flex flex-col gap-3 px-2 justify-between items-center w-full">
                <div className="w-full flex justify-between ">
                    <div>
                        <p className={cn(`font-semibold text-sm md:text-md text-slate-900`)}>{act.artist}</p>
                        <p className="text-sm text-gray-500">Rapper</p>
                    </div>
                    <div className="flex items-center justify-center bg-gray-400 rounded-full w-6 h-6 text-white font-semibold">
                        <p className="text-sm">{listNumber}</p>
                    </div>
                    {/* Price & Reiew
                    <div className="flex items-center justify-between">
                        {event.category.name === "Video" ? (<FcFilmReel />) : (<TbMusicStar />)}
                    </div> */}
                </div>
                <div className="flex flex-row gap-y-5 justify-between ml-2 w-full">
                    <p className="flex flex-row gap-2 text-xs text-gray-700">54k <FaRegEye /></p>
                    <p className="flex flex-row gap-2 text-xs text-gray-700">12k <HiCloudDownload /></p>
                </div>
            </div>
        </div>
    );
}

export default ActCard;
