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
            {/* <span className='self-center text-xl font-semibold whitespace-nowrap dark:text-white sm:tetx-sm md:text-sm'>
              D <span className='text-orange-500'>X</span> VALLEY
            </span> */}
            <img
              src={"/image/dxvalleymainlogo.png"}
              alt='dxvalley logo'
              width={200} // adjust the width as needed
              // className='mx-auto mb-4 '
            />
          </Link>
          <div className='flex items-center lg:order-2 space-x-2'>
            <ModeToggle />
            <Button
              className='bg-coopBlue hover:bg-coopBlueHover'
              onClick={() => {
                router.push("/callforproposal");
              }}>
              Call for Proposal
            </Button>
            <button
              onClick={toggleMenu}
              type='button'
              className='inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
              // aria-controls='mobile-menu-2'
              // aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <div>
                  <X className='block h-6 w-6' aria-hidden='true' />
                  {/* <MenuMobile /> */}
                </div>
              ) : (
                <div>
                  <MenuIcon className='block h-6 w-6' aria-hidden='true' />
                </div>
              )}
            </button>
          </div>
          <div
            className={`${
              isMenuOpen ? "block" : "hidden"
            } justify-between items-center w-full lg:flex lg:w-auto lg:order-1`}>
            <Menu />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
