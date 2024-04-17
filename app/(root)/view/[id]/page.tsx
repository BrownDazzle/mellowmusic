import React from 'react';
import { GoDotFill } from "react-icons/go";
import AudioPlayer from '@/components/shared/AudioPlayer';
import Collection from './components/collection';
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
import ActiveSong from '@/components/ui/active-song';
import SongCard from '@/components/ui/song-card';
import AlbumCard from '@/components/ui/album-cars';
import PlayerCard from '@/app/(root)/view/[id]/components/player-card';

export async function generateMetadata(
    { params }: SearchParamProps,
): Promise<Metadata> {
    // read route params
    const id = params.id

    // fetch data
    const event = await getProduct(params.id);

    return {
        title: event?.title,
        description: event?.description,
        keywords: [event?.type, event?.genre.name]
    }
}


const EventDetails = async ({ params, searchParams }: SearchParamProps) => {
    const page = Number(searchParams?.page) || 1;
    //const count = await getViewsCount(params.id);
    //console.log("COUNT_PAGE", count)
    //await getViewsCount(params.id);
    const event = await getProduct(params.id);

    const relatedEvents = await getRelatedEvents({
        type: event?.type,
        eventId: event?._id,
        page: page,
    })



    return (
        <>
            <section className="wrapper flex justify-center bg-dotted-pattern bg-contain w-full">
                <div className="flex flex-col lg:flex-row w-full 2xl:max-w-7xl py-5 mt-10">
                    <div className='basis-full md:basis-2/3 lg:basis-2/3 md:pr-5 lg:pr-10'>
                        {event?.audioUrl && (
                            <Image
                                src={event?.imageUrl}
                                alt="hero image"
                                width={800}
                                height={800}
                                className="h-full min-h-[400px] max-h-[400px] object-cover object-center rounded-lg"
                            />
                        )}
                        {event?.albumFiles.length >= 1 && (
                            <Image
                                src={event?.imageUrl}
                                alt="hero image"
                                width={800}
                                height={800}
                                className="h-full min-h-[400px] max-h-[400px] object-cover object-center rounded-lg"
                            />
                        )}
                        {event?.videoUrl && (
                            <VideoPlayer event={event} />
                        )}
                    </div>
                    <div className="basis-full md:basis-1/3 lg:basis-1/3 flex w-full flex-col p-5 ">
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col gap-3 ">
                                <div className=" flex gap-3 items-center">
                                    <p className="text-lg font-semibold text-gray-900">
                                        {event?.type}
                                    </p>
                                    <p className="font-semibold text-sm text-blue-500">
                                        {event?.genre.name}
                                    </p>
                                </div>
                                <h2 className={cn(`font-semibold text-2xl text-slate-900`)}>{event?.artist}</h2>
                                <p className={cn(`font-semibold text-1xl text-slate-800`)}>{event?.title}</p>
                                <div className="w-full flex flex-row gap-4">
                                    <p className="p-medium-12 p-medium-15 text-grey-500">
                                        {convertTimeAgo(event?.createdAt)}
                                    </p>
                                    <GoDotFill />
                                    {event?.views >= 1 ? (<p className="p-medium-14 p-medium-18 text-grey-500">{formatViews(event?.views)} views</p>) : null}
                                </div>
                                <p className="p-medium-16 lg:p-regular-18">{event?.description}</p>
                                {/*<p className="p-medium-18 ml-2 mt-2 sm:mt-0">
                by{' '}
                <span className="text-primary-500">{event?.organizer.firstName} {event?.organizer.lastName}</span>

  </p>*/}
                                <div className='w-full border-t-[0.5px] pt-5 mt-5'>
                                    {event?.albumFiles.length >= 1 && (<h2 className={cn(`font-semibold text-2xl text-slate-900 mb-5`)}>Tracks</h2>)}
                                    {event?.audioUrl && (
                                        <PlayerCard song={{ audioUrl: event?.audioUrl, imageUrl: event?.imageUrl, title: `${event?.artist} - ${event?.title}`, artist: event?.artist }} />
                                    )}

                                    {event?.albumFiles && (event?.albumFiles.map((file: any, i: number) => (
                                        <AlbumCard song={{ audioUrl: file.url, imageUrl: event?.imageUrl, title: file.name, artist: event?.artist }} i={i} data={event?.albumFiles} key={i} />
                                    ))
                                    )}
                                </div>
                            </div>
                        </div>
                        {/* <AudioPlayer audioFile={event as any} />*/}

                    </div>
                </div>
            </section>

            {/* EVENTS with the same category */}
            <section className="wrapper flex flex-col gap-8 md:gap-12">
                {/*<h2 className="h2-bold">Related {event?.category === "Video" ? `${event?.category}s` : event?.category}</h2>*/}

                <Collection
                    data={relatedEvents?.data}
                    category={""}
                    limit={3}
                    page={searchParams.page as string}
                    totalPages={relatedEvents?.totalPages}
                />
            </section>
            <ActiveSong />
        </>
    )
}

export default EventDetails;