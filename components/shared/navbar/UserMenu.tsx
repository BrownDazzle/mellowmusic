'use client';

import { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { IEvent, SafeUser, User } from "@/types";

import MenuItem from "./MenuItem";
import Avatar from "../../ui/Avatar";
import useSearchModal from "@/hooks/use-search-modal";
import NavItems from "../NavItems";
import Button from "@/components/ui/sign-button";
import { CiBellOn, CiSearch } from "react-icons/ci";
import CourseButton from "@/components/ui/button-copy";
import Search from "../Search";
import SearchComponent from "@/components/search-component";

interface MenuProps {
  data?: IEvent[];
}

const UserMenu = ({ data }: MenuProps) => {
  const searchModal = useSearchModal();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className=" bg-white rounded-full h-auto">
      <div className="flex flex-row items-center gap-3">
        {/*<nav className="md:flex-between hidden w-full max-w-xs gap-5">
          <NavItems />
  </nav>*/}
        {isOpen && (<Search data={data} />)}
        <div

          className="
          px-4
          md:py-1
          md:px-2 
          flex 
          flex-row 
          items-center 
          gap-3 
          rounded-full 
          cursor-pointer 
          transition
          "
        >
          <div >
            <CourseButton onClick={() => searchModal.onOpen()} className="flex rounded-full bg-white transition 
            cursor-pointer px-2 py-1">
              <div className='border-none outline-none active:scale-110 transition-all duration-300 relative'>
                <CiSearch className={`w-6 h-6 text-slate-700 transition-all duration-300`} />
              </div>
            </CourseButton>
          </div>

        </div>
      </div>

    </div>
  )
};

export default UserMenu;