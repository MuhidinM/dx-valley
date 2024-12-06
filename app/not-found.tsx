/** @format */

"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from 'next/image'
import Animated404 from "@/components/animated-404";
export default function NotFound() {
  const router = useRouter();

  return (
    <div className='flex flex-col items-center justify-center min-h-screen px-4 bg-white'>
      <div className='w-full max-w-[300px]  mb-2'>
        <Image
          src={"/image/dxvalleylogo1.png"}
          alt='DX VALLEY'
          width={300}
          height={50}
          priority
          className='w-full h-auto'
        />
      </div>
      <div className='lg:flex items-center justify-center lg:gap-2 lg:text-[2rem] md:gap-2 md:text-[2rem] text-lg leading-tight font-medium text-center lg:mb-0 mb-5'>
        <Animated404 /> Page Not Found
      </div>

      <p className='lg:text-xl  md:text-lg  text-sm text-gray-600 text-center mb-8'>
        Sorry, the page you are looking for does not exist.
      </p>

      <div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
        <Button
          className='min-w-[140px] bg-coopBlue hover:bg-coopBlueHover text-white'
          onClick={() => router.push("/")}>
          Home Page
        </Button>
        <Button
          variant='outline'
          className='min-w-[140px]'
          onClick={() => router.back()}>
          ← Go back
        </Button>
      </div>
    </div>
  );
}
