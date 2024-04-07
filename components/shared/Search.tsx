"use client"

import Image from 'next/image';
import { useEffect, useState } from 'react'
import { Input } from '../ui/input';
import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';
import useSearchModal from '@/hooks/use-search-modal';
import { IEvent } from '@/types';

interface SearchProps {
  data?: IEvent[] | undefined;
  placeholder?: string
}

const Search = ({ placeholder = 'Search title...', data }: SearchProps) => {
  const [query, setQuery] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchModal = useSearchModal();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      let newUrl = '';

      if (query) {
        newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: 'query',
          value: query
        })
        searchModal.onOpen()
      } else {
        newUrl = removeKeysFromQuery({
          params: searchParams.toString(),
          keysToRemove: ['query']
        })
        searchModal.onClose()
      }

      router.push(newUrl, { scroll: false });
    }, 300)

    return () => clearTimeout(delayDebounceFn);
  }, [query, searchParams, router, searchModal])

  return (
    <div className="flex w-full">
      {/*<Image src="/assets/icons/search.svg" alt="search" width={24} height={14} />*/}
      <input
        type="text"
        placeholder={placeholder}
        className="w-full focus:outline-none focus:border-blue-500 px-4 py-2 rounded-md"
        onChange={(e) => setQuery(e.target.value)}
      />

    </div>

  )
}

export default Search