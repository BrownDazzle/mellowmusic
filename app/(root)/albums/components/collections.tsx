"use client"
import React, { useState } from 'react'
import Pagination from '@/components/shared/Pagination'
import RelatedCard from '@/components/shared/related-card'
import { IEvent } from '@/types'
import HorizontalSlider from '@/components/ui/horizontal-slide'
import ScrollSlide from '../../videos/components/scroll-slide'
import FilterScroll from '@/components/shared/filter-scroll'

type CollectionProps = {
    data: IEvent[],
    emptyTitle: string,
    emptyStateSubtext: string,
    limit: number,
    page: number | string,
    totalPages?: number,
    urlParamName?: string,
    collectionType?: 'Events_Organized' | 'My_Tickets' | 'All_Events'
}

const Collection = ({
    data,
    emptyTitle,
    emptyStateSubtext,
    page,
    totalPages = 0,
    collectionType,
    urlParamName,
}: CollectionProps) => {
    const [updateData, setUpdateData] = useState<IEvent[]>(data)
    const [category, setCategory] = useState<string | null>("");


    return (
        <>
            <div className="flex w-full gap-5 md:flex-row">
                <div className='w-full pt-10 pb-5 mt-5'>
                    <FilterScroll setUpdateData={setUpdateData} setCategory={setCategory} data={data} />
                </div>
            </div>
            {updateData?.length > 0 ? (
                <div className="flex flex-col items-center gap-10">
                    <ul className="grid w-full grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 xl:gap-10">
                        {updateData.map((event) => {

                            return (
                                <li key={event._id} className="flex justify-center">
                                    {event?.audioUrl && <RelatedCard event={event} />}
                                </li>
                            )
                        })}
                    </ul>
                    {totalPages > 1 && (
                        <Pagination urlParamName={urlParamName} page={page} totalPages={totalPages} />
                    )}
                </div>
            ) : null}
        </>
    )
}

export default Collection