/** @format */

import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { divisions, otherLinks } from "@/constants";


const divisionItems = divisions

const otherLinksItems = otherLinks
const Footer = () => {
  return (
    <footer className='font-sans bg-coopBlue text-white'>
      <div className='mx-auto max-w-screen-xl px-4 '>
        <div className='border-b border-gray-100 py-4 dark:border-gray-700 md:py-4 lg:py-12'>
          <div className='items-start gap-6 md:gap-8 lg:flex'>
            <div className='grid min-w-0 flex-1 grid-cols-1 gap-6 md:gap-16 xl:grid-cols-3 p-6'>
              <div>
                <h6 className=' font-sans mb-4 text-xl font-extrabold '>
                  About{"  "}
                  <span className=' text-gray-800 font-bold mx-2'>
                    {"  "}D<span className='text-coopOrange'> X </span>VALLEY{" "}
                  </span>
                </h6>
                {/* <ul className="space-y-3">
                  <li>
                    <Link
                      href="#"
                      title=""
                      className="text-gray-300 hover:text-white"
                    >
                      test
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      title=""
                      className="text-gray-300 hover:text-white"
                    >
                      test
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      title=""
                      className="text-gray-300 hover:text-white"
                    >
                      test
                    </Link>
                  </li>
                </ul> */}
                <p className='flex font-sans text-white'>
                At DxValley, we drive digital transformation by empowering 
                businesses with cutting-edge innovation and strategic collaboration. 
                Our mission is to create a thriving ecosystem where technology 
                and industry converge to shape a secure and sustainable future.
                </p>
              </div>
              <div>
                {" "}
                <h6 className='mb-4 text-xl font-sans font-extrabold text-white '>
                  Divisions
                </h6>
                {divisionItems?.map((divisionItems) => (
                  <ul className='space-y-3 font-sans text-white'>
                    <li>
                      <Link
                        href={divisionItems.href}
                        title=''
                        className='text-white hover:text-white'>
                        {divisionItems.title}
                      </Link>
                    </li>
                  </ul>
                ))}
              </div>

              <div>
                <h6 className='mb-4 text-xl font-sans font-extrabold '>
                  Other Links
                </h6>
                {otherLinksItems?.map((otherLinks) => (
                  <ul className='space-y-3 font-sans text-white'>
                    <li>
                      <Link
                        href={otherLinks.href}
                        title=''
                        className='text-white hover:text-white'>
                        {otherLinks.title}
                      </Link>
                    </li>
                  </ul>
                ))}
              </div>
              {/* <div>
                <h6 className='mb-4 text-xl font-extrabold '>Contact Info</h6>
                <ul className='space-y-3'>
                  <li> Addis Ababa, Ethiopia</li>
                  <li>0999999999</li>
                </ul>
              </div> */}
            </div>
          </div>

          <div className='mt-0 flex justify-end'>
            <div className='mt-4 w-full md:mt-0 lg:mt-0 lg:max-w-lg justify-end'>
              <div className='space-y-5 rounded-lg p-6'>
                <form action='#'>
                  <div className='items-end space-y-4 sm:flex sm:space-y-0'>
                    <div className='relative mr-3 w-full sm:w-96 lg:w-full space-y-2'>
                      {/* <label className='font-sans mb-2 block text-sm font-medium text-white'>
                        Get the latest deals and more.
                      </label> */}
                      <Label htmlFor='email' className='text-white'>
                        {" "}
                        Get the latest News and More.
                      </Label>
                      <Input
                        type='email'
                        color='coopBlue'
                        placeholder='Email'
                      />
                    </div>
                    <div>
                      <Button
                        // variant={"outline"}
                        className='bg-coopOrange hover:bg-black font-sans'>
                        SUBSCRIBE
                      </Button>
                    </div>
                  </div>
                </form>

                {/* <hr className="border-gray-200 dark:border-gray-600" /> */}
              </div>
            </div>
          </div>
        </div>

        <div className='py-6 md:py-8'>
          <div className='gap-4 space-y-5 xl:flex xl:items-center xl:justify-between xl:space-y-0'>
            <Link href='/' className='flex items-center'>
              <span className='self-center text-xl font-semibold whitespace-nowrap dark:text-white'>
                D <span className='text-orange-500'>X</span> VALLEY
              </span>
            </Link>

            <p className='text-sm'>
              © 2024{" "}
              <Link href='#' className='hover:underline'>
                Cooperative Bank of Oromia
              </Link>
              , Inc. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
