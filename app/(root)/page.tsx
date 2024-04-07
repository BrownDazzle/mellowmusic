import getProducts from '@/actions/get_all_events';
import getEvents from '@/actions/get_events';
import CategoryFilter from '@/components/shared/CategoryFilter';
import Collection from '@/components/shared/Collection'
import MusicHero from '@/components/shared/Hero';
import Search from '@/components/shared/Search';
import Filter from '@/components/shared/filter';
import { Button } from '@/components/ui/button';
import HorizontalSlider from '@/components/ui/horizontal-slide';
import { cn } from '@/lib/utils';
import { SearchParamProps } from '@/types';

export const revalidate = 10

export default async function Home({ searchParams }: SearchParamProps) {
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || '';
  const category = (searchParams?.category as string) || '';
  const genre = (searchParams?.genre as string) || '';

  const trendData = await getEvents();

  const events = await getProducts({
    query: searchText,
    category,
    genre,
    page,
    limit: 6
  })

  return (
    <div className='w-full pt-12'>
      <section className="bg-primary-50 bg-dotted-pattern bg-contain md:h-[50vh] h-[40vh]">
        <MusicHero />
      </section>
      <div className='relative pt-10 px-5'>
        <HorizontalSlider sliders={trendData} title='Trending' />
      </div>
      <section id="events" className="wrapper my-8 flex flex-col gap-8 md:gap-12">
        <div className="flex w-full gap-4 md:flex-row">
          <Filter />
        </div>

        <Collection
          data={events?.data}
          emptyTitle="No Events Found"
          emptyStateSubtext="Come back later"
          collectionType="All_Events"
          category={category}
          limit={6}
          page={page}
          totalPages={events?.totalPages}
        />
      </section>
    </div>
  )
}
