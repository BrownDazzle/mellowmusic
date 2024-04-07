"use client"

import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useSearchModal from '@/hooks/use-search-modal';
import { IEvent } from '@/types';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { IoMdClose } from 'react-icons/io';
import { FaChevronRight } from 'react-icons/fa';
import getEvents from '@/actions/get_events';
import SearchCard from './shared/search-card';

const SearchComponent: React.FC = () => {

    const router = useRouter();
    const searchModal = useSearchModal();
    const [isLoading, setIsLoading] = useState(false);

    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<IEvent[]>([]);
    const [data, setData] = useState<IEvent[]>([]);

    //const data = filterData(query);
    const filterPrompts = (searchtext: string) => {
        const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
        return data?.filter(
            (item: any) =>
                regex.test(item.artist) ||
                regex.test(item.title) ||
                regex.test(item.category)
        );
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        const filteredProducts = filterPrompts(query);

        setSearchResults(filteredProducts);
    };


    const handleClick = (data: any) => {
        searchModal.onClose();
        router.push(`/product/${data?.id}`);
    };

    const handleClose = useCallback(() => {
        if (isLoading) {
            return;
        }

        searchModal.onClose();
        setTimeout(() => {
            searchModal.onClose();
        }, 300)
    }, [searchModal.onClose, isLoading]);

    const onSubmit: SubmitHandler<FieldValues> =
        async (data) => {
            setIsLoading(true);
            handleSearch(data.search);
            setIsLoading(false);
        }

    const onToggle = useCallback(() => {
        searchModal.onClose();
    }, [searchModal])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchProducts = await getEvents();
                setData(fetchProducts);
            } catch (error) {
                // Handle error, e.g., log it or show a user-friendly message
                console.error('Error fetching products:', error);
            }
        };

        fetchData(); // Call the async function here

        // Add dependencies as needed
    }, [data]);



    return (
        <div className="relative px-5 py-10 shadow-sm bg-white rounded-md">
            <button
                className="absolute top-2 right-5 mt-2 mr-2
p-1
border-0 
hover:opacity-70
transition
rounded-full
bg-slate-100
shadow-lg
shadow-white
"
                onClick={handleClose}
            >
                <IoMdClose size={20} />
            </button>
            <div className='w-full flex flex-col justify-center gap-4 py-5'>
                <input
                    type="text"
                    placeholder="Type search..."
                    className="w-full px-4 py-2 border-[0.5px] border-slate-300 font-semibold text-sm rounded-full focus:outline-none focus:border-blue-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className='w-full flex items-center justify-center'>
                    <hr className='h-[0.5px] bg-slate-700 w-full' />
                    <button
                        className="w-full px-4 py-2 bg-blue-500 font-semibold text-sm md:text-md text-white rounded-full"
                        onClick={() => handleSearch(searchQuery)}
                    >
                        Search result
                    </button>
                    <hr className='h-[0.5px] bg-slate-700 w-full' />
                </div>
            </div>
            {/* Results Section */}
            {searchResults.length > 0 && (
                <div className="flex flex-col gap-2 my-2 w-full max-h-auto overflow-y-auto bg-white rounded-md">
                    {searchResults.map((result, index) => (
                        <SearchCard event={result} key={index} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchComponent;
