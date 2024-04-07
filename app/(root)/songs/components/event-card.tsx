"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaShare, FaTwitter, FaFacebook, FaWhatsapp } from 'react-icons/fa';
import { LuHeart } from "react-icons/lu";
import { cn, convertTimeAgo, formatViews } from "@/lib/utils";
import { IEvent } from "@/types";
import Button from "./button";


interface EventCard {
    event: IEvent,
}

const EventCard: React.FC<EventCard> = ({
    event
}) => {

    const router = useRouter();

    const handleShare = () => {
        const shareLink = `https://yourdomain.com/view/${event?._id}`;

        // Share on Twitter
        const twitterLink = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareLink)}&text=${encodeURIComponent(event?.title)}`;
        window.open(twitterLink, '_blank');

        // Share on Facebook
        const facebookLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareLink)}`;
        window.open(facebookLink, '_blank');

        // Share on WhatsApp
        const whatsappLink = `https://wa.me/?text=${encodeURIComponent(`${event?.title} - ${shareLink}`)}`;
        window.open(whatsappLink, '_blank');
    };

    const handleClick = () => {
        router.push(`/act/${event?._id}`);
    };
    {/* Dropdown for selecting social media
    <div className="relative inline-block ml-2">
    <button className="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center">
      Choose Social Media
    </button>
    <ul className="absolute hidden text-gray-700 pt-1">
      <li>
        <EmailShareButton url={shareLink} subject={event.title}>
          <a className="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap">
            Email
          </a>
        </EmailShareButton>
      </li>
      <li>
        <FacebookShareButton url={shareLink}>
          <a className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap">
            Facebook
          </a>
        </FacebookShareButton>
      </li>
      <li>
        <TwitterShareButton url={shareLink} title={event.title}>
          <a className="rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap">
            Twitter
          </a>
        </TwitterShareButton>
      </li>
    </ul>
  </div>*/}


    return (
        <div onClick={handleClick} className="flex flex-col gap-2 bg-white cursor-pointer rounded-xl shadow-md p-3 space-y-4 w-full max-h-full">
            {/* Image & actions */}
            {/* Share button */}
            <div className="flex items-center justify-end">
                <button onClick={handleShare} className="text-slate-500 flex items-center text-sm hover:scale-100 transition">
                    <FaShare className="w-4 h-4 mr-1" />
                    Share
                </button>
            </div>
            <img className="h-[400px] object-cover align-center rounded-xl relative items-center justify-center hover:scale-110 transition" src={event?.imageUrl} alt={event?.title} />

            {/* Description */}
            <div className="flex flex-col gap-3 px-2 justify-between items-center w-full">
                <div className="w-full flex items-center justify-between flex-row ">
                    <div className="w-full flex items-center justify-start flex-row gap-2">
                        <img src={event?.imageUrl} className="w-10 h-10 rounded-full object-cover" alt="profile" />
                        <p className={cn(`font-semibold text-sm text-slate-700`)}>EmerginActs World</p>
                    </div>
                    <div className="w-full flex items-center justify-end flex-row gap-2">
                        <LuHeart className="w-6 h-6 hover:scale-110 transition text-blue-700" />
                        <p className={cn(`font-semibold text-sm md:text-md text-slate-900`)}>2.5k likes</p>
                    </div>
                </div>
                <div className="w-full flex flex-row border-b-[0.5px]">
                    <div className="border-r-[0.5px] w-full">
                        <div className="flex items-center flex-row">
                            <p className={cn(`font-semibold text-2xl text-slate-900 mb-2`)}>ActsFestival</p>
                        </div>
                        <div className="flex items-center flex-row gap-2">
                            <p className={cn(`font-semibold text-xs text-slate-900`)}>Capacity :</p>
                            <p className={cn(`font-semibold text-sm md:text-md text-slate-900`)}>2.5k</p>
                        </div>
                    </div>
                    <div className="w-full pl-2 flex flex-col justify-between">
                        <div className="flex items-center flex-row">
                            <p className={cn(`hidden lg:block font-semibold text-xs text-slate-900`)}>Venue :</p>
                            <p className={cn(`font-semibold text-sm md:text-md text-slate-900`)}>Heroes Stadium,Lusaka</p>
                        </div>
                        <div className="flex items-center flex-row gap-2">
                            <p className={cn(`font-semibold text-xs text-slate-900`)}>Date :</p>
                            <p className={cn(`font-semibold text-sm md:text-md text-slate-900`)}>24/04/24</p>
                        </div>
                    </div>
                </div>
                <div className="w-full flex flex-row ">
                    <div className="flex items-center justify-start items-center  border-r-[0.5px] w-full basis-1/3">
                        <div className="">
                            <p className={cn(`font-semibold text-2xl text-slate-900`)}>K300</p>
                        </div>
                    </div>
                    <div className="w-full basis-2/3 p-2">
                        <Button onClick={handleClick} />
                    </div>
                </div>

            </div>
        </div>
    );
}

export default EventCard;
