"use client"

import React, { useCallback, useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';
import useSearchModal from '@/hooks/use-search-modal';
import { IEvent } from '@/types';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { IoMdClose } from 'react-icons/io';
import { FaChevronRight } from 'react-icons/fa';
import getProducts from '@/actions/get_all_events';

interface SearchProps {
    query: string
}

const SearchComponent = ({ query }: SearchProps) => {

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
                regex.test(item.genre.name)
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
                const fetchProducts = await getProducts({ query: query });
                console.log(fetchProducts, "Filtered")
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
                className="absolute top-8 right-5 mt-2 mr-2
p-1
border-0 
hover:opacity-70
transition
rounded-full
bg-slate-100
"
                onClick={handleClose}
            >
                <IoMdClose size={26} />
            </button>
            <div className='flex justify-between items-center gap-2 py-5'>
                <input
                    type="text"
                    placeholder="Search..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                    className="mr-2 px-4 py-2 bg-blue-500 text-white rounded-md"
                    onClick={() => handleSearch(searchQuery)}
                >
                    Search
                </button>
            </div>
            {/* Results Section */}
            {searchResults.length > 0 && (
                <div className="mt-2 w-full max-h-[60vh] overflow-y-auto bg-white rounded-md">
                    {searchResults.map((result, index) => (
                        <div onClick={() => handleClick(result)} key={index} className="flex items-center justify-between px-4 mb-2 rounded-sm bg-slate-100 hover:cursor-pointer">
                            <div className='flex items-center gap-6'>
                                <img src={result.imageUrl} className="w-20 h-20 object-contain rounded-md my-2" />
                                <p className="font-bold text-md text-slate-700">{result.title}</p>
                                <p className="hidden md:block font-medium text-md text-slate-700">{result.artist}</p>
                            </div>
                            <FaChevronRight className=' text-black' />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchComponent;
