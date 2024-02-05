import getProducts from '@/actions/get_all_events';
import getEvents from '@/actions/get_events';
import CategoryFilter from '@/components/shared/CategoryFilter';
import Collection from '@/components/shared/Collection'
import MusicHero from '@/components/shared/Hero';
import Search from '@/components/shared/Search';
import { SearchParamProps } from '@/types';

export const dynamic = 'force-static'

export async function generateStaticParams() {
  try {

    const data = await getEvents();

    // Check if the response is an array before using map
    if (Array.isArray(data)) {
      return data?.map((post: any) => ({
        params: { id: post._id.toString() },
      }));
    } else {
      console.error("Error in generateStaticParams: getProducts response is not an array");
      throw new Error("Invalid response from getProducts");
    }
  } catch (error) {
    console.error("Error in generateStaticParams", error);
    throw error; // Rethrow the error to capture it in the build process.
  }
}

export const revalidate = 10

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
