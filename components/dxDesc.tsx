/** @format */

import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { Hero } from "@/components/landing/hero";

const DxDescription = () => {
  return (
    <div>
      <section className='dark:bg-gray-900'>
        <div className='gap-8 items-center py-4 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6'>
          <Hero />
          <div className='mt-4 md:mt-0'>
            <h2 className='mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white'>
              Innovation hub : Land of Great Digital Product.
            </h2>
            <p className='mb-6 font-light text-gray-500 md:text-lg dark:text-gray-400'>
              The Innovation Hub is where we develop exceptional in-house
              products, designed to seamlessly integrate with other companies,
              fintech solutions, and various industries. It's a collaborative
              space where innovation meets partnership, allowing us to create
              groundbreaking solutions that work harmoniously across the
              financial ecosystem and beyond!
            </p>
            {/* <Button className="bg-coopBlue hover:bg-coopBlueHover">Get Started</Button> */}
          </div>
        </div>
      </section>
      {/* <div className="gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
                            <Card >
                    
                    <CardHeader>
                        <CardTitle >
                            <span className="text-4xl font-semibold">Vision</span>
                        </CardTitle>
                    </CardHeader>
                        <CardContent className="grid items-center h-[100px] justify-center p-6">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-scan-eye"><path d="M3 7V5a2 2 0 0 1 2-2h2" /><path d="M17 3h2a2 2 0 0 1 2 2v2" /><path d="M21 17v2a2 2 0 0 1-2 2h-2" /><path d="M7 21H5a2 2 0 0 1-2-2v-2" /><circle cx="12" cy="12" r="1" /><path d="M18.944 12.33a1 1 0 0 0 0-.66 7.5 7.5 0 0 0-13.888 0 1 1 0 0 0 0 .66 7.5 7.5 0 0 0 13.888 0" /></svg>
                        <CardDescription>

                        <p> this is the card content </p>
                        </CardDescription>
                        <CardFooter>
                        <p> this is the card footer </p>
                        </CardFooter>
                        </CardContent>

                </Card>
            </div> */}
    </div>
  );
};

export default DxDescription;
