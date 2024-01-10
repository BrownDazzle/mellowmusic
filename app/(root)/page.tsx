import CategoryFilter from '@/components/shared/CategoryFilter';
import Collection from '@/components/shared/Collection'
import MusicHero from '@/components/shared/Hero';
import Search from '@/components/shared/Search';
import GenreFilter from '@/components/shared/genre-filter';
import { Button } from '@/components/ui/button'
import { getAllEvents } from '@/lib/actions/event.actions';
import { SearchParamProps } from '@/types';
import Image from 'next/image'
import Link from 'next/link'

export default async function Home({ searchParams }: SearchParamProps) {
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || '';
  const category = (searchParams?.category as string) || '';
  const genre = (searchParams?.genre as string) || '';

  const events = await getAllEvents({
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
        {/* <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="h2-bold">Host, Connect, Celebrate: Your Events, Our Platform!</h1>
            <p className="p-regular-16 md:p-regular-20">Book and learn helpful tips from 3,168+ mentors in world-class companies with our global community.</p>
            {/*<Button size="lg" asChild className="button w-full sm:w-fit">
              <Link href="#events">
                Explore Now
              </Link>
  </Button>*
          </div>

          <Image
            src="/assets/images/hero.png"
            alt="hero"
            width={1000}
            height={1000}
            className="max-h-[30vh] object-cover object-center 2xl:max-h-[50vh]"
          />
        </div>*/}
      </section>

      <section id="events" className="wrapper my-8 flex flex-col gap-8 md:gap-12">
        <div className="flex w-full gap-5 md:flex-row">
          <CategoryFilter category='Filter Category' />
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
