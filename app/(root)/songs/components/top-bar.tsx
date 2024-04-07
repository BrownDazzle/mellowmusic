
import React, { useState } from 'react';
import { Ticket } from "lucide-react";
import { AiOutlineCalendar, AiOutlineShoppingCart, AiOutlineSound, AiOutlineStock } from "react-icons/ai";
import { BsBoxSeam, BsChatLeft, BsCurrencyDollar, BsShield } from "react-icons/bs";
import { FiBarChart, FiCreditCard, FiPieChart, FiShoppingBag, FiShoppingCart, FiStar, FiUpload } from "react-icons/fi";
import { MdOutlineRefresh, MdOutlineSupervisorAccount } from "react-icons/md";
import { RiContactsLine, RiStockLine, RiVideoLine, RiVideoUploadLine } from "react-icons/ri";
import { SiShopware } from 'react-icons/si';
import { MdOutlineCancel } from 'react-icons/md';

//import { links } from '../../constants/data';
import { useStateContext } from '@/contexts/ContextProvider';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import getEvents from '@/actions/get_events';
import { cn } from '@/lib/utils';
import ActCard from './act-card';
import VideoCard from '@/components/shared/cards/video-card';
import PowerAct from '@/components/shared/power-act';
import VideoChart from './video-card';

//import { SearchParamProps } from '@/types/index';
//import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";


export const revalidate = 60 * 60 * 60

const TopBar = async () => {

    const acts = await getEvents();
    const artist = acts[2];
    // const { currentColor, activeMenu, setActiveMenu, screenSize } = useStateContext();

    const handleCloseSideBar = () => {

    };

    const activeLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-white text-md m-2';
    const normalLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2';

    return (
        <div className="ml-3 h-auto md:h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10 px-2">
            <>

                <PowerAct event={acts[1]} />
                <div className='relative mt-5'>
                    <p className='font-semibold text-sm text-slate-600 my-4'>Sponsored shows</p>
                    <VideoChart video={acts[0]} listNumber={1} />
                </div>
            </>
        </div>
    );
};

export default TopBar;
