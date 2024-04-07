
import getProducts from "@/actions/get_all_events";
import Container from "../../ui/Container";
import Logo from "./Logo";
//import Search from "./Search";
import UserMenu from "./UserMenu";
import useSearchModal from "@/hooks/use-search-modal";
import { SearchParamProps } from '@/types';
import getEvents from "@/actions/get_events";

const Navbar = async () => {

  const events = await getEvents()

  return (
    <div className="fixed top-0 w-full bg-white z-10 shadow-sm py-1 items-center mb-5">
      <Container>
        <div
          className="
            flex 
            flex-row 
            items-center 
            justify-between
            gap-3
            md:gap-0
          "
        >
          <Logo />
          {/*<Search />*/}

          <UserMenu data={events} />
        </div>

      </Container>
    </div>
  );
}


export default Navbar;