"use client";

import { ClipLoader } from "react-spinners";

interface LoaderProps {
  size: number
}

export const Loader = ({ size }: LoaderProps) => {
  return <ClipLoader color="#22c55e" size={size} />
};
