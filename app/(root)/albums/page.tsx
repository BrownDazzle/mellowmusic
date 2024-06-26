import React from 'react';
import { GoDotFill } from "react-icons/go";
import AudioPlayer from '@/components/shared/AudioPlayer';
import Collection from './components/collections';
import VideoPlayer from '@/components/shared/VideoPlayer';
import DownloadButton from '@/components/ui/download-button';
import { cn, convertTimeAgo, formatViews } from '@/lib/utils';
import { SearchParamProps } from '@/types'
import Image from 'next/image';
import getProduct from '@/actions/get_event';
import getRelatedEvents from '@/actions/get_related_events';
import getEvents from '@/actions/get_events';
import { Metadata } from 'next';
import getViewsCount from '@/actions/views_count';
import getProducts from '@/actions/get_all_events';
import getCategory from '@/actions/get_categories';
import Container from '@/components/ui/Container';

export const revalidate = 10

const CategoryDetails = async ({ params, searchParams }: SearchParamProps) => {
    const page = Number(searchParams?.page) || 1;

    const category = 'Music';

    const events = await getProducts({
        page,
        limit: 6
    })

    return (
        <Container>
            <section id="events" className="wrapper flex flex-col gap-8 md:gap-12 px-5 pt-5 h-screen">
                <div className="flex w-full flex-col-reverse md:flex-row ">
                    <div className='basis-1/4 pt-20'>
                        Ad Space
                    </div>
                    <div className='w-full basis-full md:basis-3/4 md:border-l-[0.5px] px-2'>
                        <>
                            <Collection
                                data={events?.data}
                                emptyTitle="No Events Found"
                                emptyStateSubtext="Come back later"
                                collectionType="All_Events"
                                limit={6}
                                page={page}
                                totalPages={events?.totalPages}
                            />
                        </>
                    </div>
                </div>
            </section>
        </Container>
    )
}

export default CategoryDetails;