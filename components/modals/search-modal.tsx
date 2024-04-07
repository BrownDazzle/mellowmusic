'use client';

import { useCallback, useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import useSearchModal from "@/hooks/use-search-modal";
import getProducts from "@/actions/get_all_events";
import { IEvent } from "@/types";
import SearchComponent from "../search-component";

const SearchModal = () => {
    const searchParams = useParams();
    const searchModal = useSearchModal();
    const [showModal, setShowModal] = useState(searchModal.isOpen);
    const [showResults, setShowResults] = useState<IEvent[]>([]);
    const searchText = (searchParams?.query as string) || '';

    useEffect(() => {
        const searchResults = async () => {
            const results = await getProducts({
                query: searchText
            })
            setShowResults(results)
        }
        searchText && searchResults();
        setShowModal(searchModal.isOpen);
    }, [searchModal.isOpen, searchText]);

    if (!searchModal.isOpen) {
        return null;
    }

    return (
        <div
            className="
          justify-center 
          flex 
          overflow-x-hidden 
          overflow-y-auto 
          fixed 
          inset-0 
          z-50 
          outline-none 
          focus:outline-none
          bg-neutral-800/70
          top-14
        "
        >
            <div className="
          relative 
          w-full
          md:w-4/6
          lg:w-3/6
          xl:w-2/5
          my-6
          mx-auto 
          lg:h-auto
          md:h-auto
          border-x-[0.5px]
          border-slate-700
          h-screen
          bg-white
          rounded-md
          "
            >
                {/*content*/}
                <div className={`
            translate
            duration-300
            h-full
            ${showModal ? 'translate-y-0' : 'translate-y-full'}
            ${showModal ? 'opacity-100 ' : 'opacity-0'}
          `}>
                    <div className="
              translate
              h-full
              lg:h-auto
              md:h-auto
              border-0 
              rounded-lg 
              relative 
              flex 
              flex-col 
              w-full 
           
              outline-none 
              focus:outline-none
            "
                    >
                        <SearchComponent />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchModal;
