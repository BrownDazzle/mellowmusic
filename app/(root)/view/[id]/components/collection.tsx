
import React from 'react'
import Pagination from '@/components/shared/Pagination'
import RelatedCard from '@/components/shared/related-card'
import { IEvent } from '@/types'
import MoreButton from '@/components/ui/more-button'

type CollectionProps = {
    data: IEvent[],
    category: string,
    limit: number,
    page: number | string,
    totalPages?: number,
    urlParamName?: string,
}

const Collection = ({
    data,
    category,
    page,
    totalPages = 0,
}: CollectionProps) => {

    return (
        <>
            {data?.length > 0 ? (
                <div className="flex flex-col items-center gap-10">
                    <ul className="grid w-full grid-cols-1 gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 ">
                        {data?.map((event) => {

                            return (
                                <li key={event._id} className="flex justify-center">
                                    <RelatedCard event={event} />
                                </li>
                            )
                        })}
                    </ul>
                    <div className='flex justify-end pr-5 w-full'>
                        {category ? (<MoreButton category={category} />) : null}
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