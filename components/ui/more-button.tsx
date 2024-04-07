"use client"

import { useParams } from "next/navigation";
import { useSearchParams, useRouter } from "next/navigation";
import { CiCirclePlus } from "react-icons/ci";

interface ButtonProps {
    category: string | null
}

export default function MoreButton({ category }: ButtonProps) {
    const router = useRouter();
    const path = category?.toLowerCase();

    const handleMore = () => {
        if (category === "Music") {
            router.push(`/songs`)
        } else {
            router.push(`/${path}s`)
        }

    }

    return (
        <button onClick={handleMore} className="px-3 py-2 rounded-full bg-black shadow-md">
            <p className="text-white semibold text-sm flex flex-row items-center gap-2">More <CiCirclePlus /></p>
        </button>
    )
}
