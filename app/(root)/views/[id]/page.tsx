import React, { useEffect, useState } from 'react';
import { GoDotFill } from "react-icons/go";
import AudioPlayer from '@/components/shared/AudioPlayer';
import Collection from '@/components/shared/Collection';
import VideoPlayer from '@/components/shared/VideoPlayer';
import DownloadButton from '@/components/ui/download-button';
import { cn, convertTimeAgo, formatViews } from '@/lib/utils';
import { SearchParamProps } from '@/types'
import Image from 'next/image';
import getProduct from '@/actions/get_event';
import getRelatedEvents from '@/actions/get_related_events';
import getEvents from '@/actions/get_events';

export async function generateStaticParams() {
    try {
        const res = await getEvents();

        return res
            .filter((post: any) => post?._id)
            .map((post: any) => ({
                params: { id: post._id.toString() },
            }));
    } catch (error) {
        console.error("Error in generateStaticParams", error);
        throw error; // Rethrow the error to capture it in the build process.
    }
}


const EventDetails = async ({ params, searchParams }: SearchParamProps) => {
    const page = Number(searchParams?.page) || 1;
    const event = await getProduct(params.id);

    const relatedEvents = await getRelatedEvents({
        categoryId: event?.category._id,
        eventId: event?._id,
        page: page,
    })

    return (
        <>
            <section className="wrapper flex justify-centers bg-dotted-pattern bg-contain">
                <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl py-5">
                    {event.category.name === "Music" && (
                        <Image
                            src={event.imageUrl}
                            alt="hero image"
                            width={800}
                            height={800}
                            className="h-full min-h-[400px] max-h-[400px] object-cover object-center rounded-lg"
                        />
                    )}
                    {event.category.name === "Video" && (
                        <VideoPlayer event={event} />
                    )}
                    <div className="flex w-full flex-col p-5 ">
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col gap-3 ">
                                <div className=" flex gap-3 items-center">
                                    <p className="text-lg text-semibold text-gray-900">
                                        {event.category.name}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {event.genre.name}
                                    </p>
                                </div>
                                <h2 className={cn(`font-semibold text-2xl text-black`)}>{event.title}</h2>
                                <div className="w-full flex flex-row gap-4 mt-5">
                                    <p className="p-medium-12 p-medium-15 text-grey-500">
                                        {convertTimeAgo(event.createdAt)}
                                    </p>
                                    <GoDotFill />
                                    {event.views >= 1 ? (<p className="p-medium-14 p-medium-18 text-grey-500">{formatViews(event.views)} views</p>) : null}
                                </div>
                                {/*<p className="p-medium-18 ml-2 mt-2 sm:mt-0">
                by{' '}
                <span className="text-primary-500">{event.organizer.firstName} {event.organizer.lastName}</span>

  </p>*/} {event.category.name === "Music" && (
                                    <audio src={event.audioUrl} controls className="my-5" />
                                )}

                            </div>
                        </div>
                        {/* <AudioPlayer audioFile={event as any} />*/}
                        <div className="flex flex-col gap-2">
                            <p className="p-medium-16 lg:p-regular-18">{event.description}</p>
                            <DownloadButton url={event.category.name === "Music" ? event.audioUrl : event.videoUrl} title={event.title} />
                        </div>
                    </div>
                </div>
            </section>

            {/* EVENTS with the same category */}
            <section className="wrapper my-8 flex flex-col gap-8 md:gap-12">
                {/*<h2 className="h2-bold">Related {event.category.name === "Video" ? `${event.category.name}s` : event.category.name}</h2>*/}

                <Collection
                    data={relatedEvents?.data}
                    emptyTitle="No Events Found"
                    emptyStateSubtext="Come back later"
                    collectionType="All_Events"
                    limit={3}
                    page={searchParams.page as string}
                    totalPages={relatedEvents?.totalPages}
                />
            </section>
        </>
    )
}

export default EventDetails;