"use client";
import React from "react";
import { Menu } from "@/components/menu";
import Link from "next/link";
import { Button } from "./ui/button";
import { ModeToggle } from "./modeToggle";
import { MenuIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import useScroll from "./useScroll"; //Custom Hook for scroll

const Navbar = () => {
  const router = useRouter(); // Hook to use router
  const scroll = useScroll();
  return (
    <header>
      <nav
        className={
          scroll
            ? "h-15 w-full pt-3 top-0 left-0 right-0 fixed  transition ease-in-out duration-500 bg-white bg-clip-padding  bg-opacity-100 z-20  dark:bg-gray-900"
            : "border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-900"
        }
      >
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link href="/" className="flex items-center">
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              D <span className="text-orange-500">X</span> VALLEY
            </span>
          </Link>
          <div className="flex items-center lg:order-2 space-x-2">
            <ModeToggle />
            <Button
              className="bg-coopBlue hover:bg-coopBlueHover"
              onClick={() => {
                router.push("/callforproposal");
              }}
            >
              Call for Proposal
            </Button>
            <button
              data-collapse-toggle="mobile-menu-2"
              type="button"
              className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="mobile-menu-2"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <MenuIcon />
            </button>
          </div>
          <div
            className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
            id="mobile-menu-2"
          >
            <Menu />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
