/** @format */

"use client";
import React, { useState } from "react";
import { Menu } from "@/components/menu";
import Link from "next/link";
import { Button } from "./ui/button";
import { ModeToggle } from "./modeToggle";
import { MenuIcon, X } from "lucide-react";
import { useRouter } from "next/navigation";
import useScroll from "./useScroll"; //Custom Hook for scroll
import MobileMenu from "./mobileMenu";
import Image from "next/image";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to track menu visibility
  const router = useRouter();
  const scroll = useScroll();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header>
      <nav
        className={
          scroll
            ? "h-15 w-full py-3 top-0 px-2  left-0 right-0 fixed  bg-white bg-clip-padding  bg-opacity-100 z-20  dark:bg-gray-900"
            : "border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-900"
        }>
        <div className='flex justify-between items-center mx-auto max-w-screen-xl'>
          <Link href='/' className='flex items-center'>
            {/* Regular logo for larger screens */}
            <Image
              src={"/image/dxvalleylogo1.png"}
              alt='dxvalley logo'
              width={200}
              height={200}
              className='hidden sm:block' // hidden on smaller screens, shown on larger ones
            />
            {/* Smaller logo for small screens */}
            <Image
              src={"/image/dx_sm.png"}
              height={200}
              alt='dxvalley logo'
              width={80} // adjust the width for smaller devices
              className='block sm:hidden p-2' // shown on smaller screens, hidden on larger ones
            />
            {/* <img
              src={"/image/DX-Logo-black.png"}
              alt='dxvalley logo'
              width={80} // adjust the width for smaller devices
              className='block sm:hidden p-2' // shown on smaller screens, hidden on larger ones
            /> */}
          </Link>

          <div className='hidden lg:block md:block p-2 md:mx-2'>
            <Menu />
          </div>
          <div className='flex items-center lg:order-2 space-x-2'>
            <ModeToggle />
            <Button
              className='bg-coopBlue hover:bg-coopBlueHover text-sm lg:text-lg font-semibold'
              onClick={() => {
                router.push("/callforproposal");
              }}>
              Call for Proposal
            </Button>
            <div className='inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'>
              <MobileMenu />

              {isMenuOpen && (
                <div className='block justify-between items-center lg:flex lg:w-auto lg:order-1'>
                  <MobileMenu />
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
