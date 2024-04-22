"use client"
import React, { useState } from 'react'
import Pagination from './Pagination'
import RelatedCard from './related-card'
import { IEvent } from '@/types'
import MoreButton from '../ui/more-button'
import Filter from './filter'
import { useSelector } from 'react-redux'

type CollectionProps = {
  data: IEvent[],
  emptyTitle: string,
  emptyStateSubtext: string,
  category: string,
  limit: number,
  page: number | string,
  totalPages?: number,
  urlParamName?: string,
}

const Collection = ({
  data,
  page,
  totalPages = 0,
}: CollectionProps) => {
  const [updateData, setUpdateData] = useState<IEvent[]>(data)
  const [category, setCategory] = useState<string | null>("");
  const { genreListId } = useSelector((state: any) => state.player);
  const { activeSong, isPlaying } = useSelector((state: any) => state.player);

  return (
    <>
      <div className='w-full'>
        <Filter setUpdateData={setUpdateData} setCategory={setCategory} data={data} />
      </div>
      {updateData?.length > 0 ? (
        <div className="flex flex-col items-center gap-10">
          <ul className="grid w-full grid-cols-1 gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 ">
            {updateData?.map((event) => {

              return (
                <li key={event._id} className="flex justify-center">
                  <RelatedCard event={event} />
                </li>
              )
            })}
          </ul>
          <div className='flex justify-end pr-5 w-full'>
            {category && category !== "Latest" ? (<MoreButton category={category} />) : null}
          </div>
          {totalPages > 1 && (
            <Pagination page={page} totalPages={totalPages} />
          )}
        </div>
      ) : null}
    </>
  )
}

export default Collection