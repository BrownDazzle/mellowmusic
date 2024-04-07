import Link from "next/link";
import MobileNav from "../MobileNav";
import Image from "next/image";

const Logo = () => {

  return (
    <div className="relative bg-white" >
      <div className="flex flex-row items-center gap-3">
        <Link href="/" className="flex items-center">
          <Image src="/iku_logo.png" alt="logo" width={44} height={15} />
          <p className="items-center gap-3 ml-1 flex text-lh font-extrabold tracking-tight dark:text-white text-slate-900">IkuVibes</p>
        </Link>
      </div>
    </div>
  );
}

export default Logo;
