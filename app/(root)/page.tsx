import getProducts from '@/actions/get_all_events';
import CategoryFilter from '@/components/shared/CategoryFilter';
import Collection from '@/components/shared/Collection'
import MusicHero from '@/components/shared/Hero';
import Search from '@/components/shared/Search';
import GenreFilter from '@/components/shared/genre-filter';
import { Button } from '@/components/ui/button';
import { SearchParamProps } from '@/types';
import Image from 'next/image'
import Link from 'next/link'

export default async function Home({ searchParams }: SearchParamProps) {
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || '';
  const category = (searchParams?.category as string) || '';
  const genre = (searchParams?.genre as string) || '';

  const events = await getProducts({
    query: searchText,
    category,
    genre,
    page,
    limit: 6
  })

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-contain md:h-[50vh] h-[40vh]">
        <MusicHero />
      </section>

      <section id="events" className="wrapper my-8 flex flex-col gap-8 md:gap-12">
        <div className="flex w-full gap-5 md:flex-row">
          <CategoryFilter category='Filter' />
          <Search />
        </div>

        <Collection
          data={events?.data}
          emptyTitle="No Events Found"
          emptyStateSubtext="Come back later"
          collectionType="All_Events"
          limit={6}
          page={page}
          totalPages={events?.totalPages}
        />
      </section>
    </>
  )
}
