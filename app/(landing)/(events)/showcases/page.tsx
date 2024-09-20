/** @format */

"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Image from "next/image";
import { Popup } from "@/components/popup";
import { ShowCaseData } from "@/types/strapi-types";
import { ShowCaseItemFetch } from "@/services/showcase";
import { getImageUrl } from "@/lib/utils";
import { SkeletonLoader } from "@/components/SkeletonLoader";

const Page = () => {
  const [showcaseItems, setShowCaseItems] = useState<ShowCaseData[]>([]);

  useEffect(() => {
    const fetchShowCaseItems = async () => {
      const data = await ShowCaseItemFetch();
      setShowCaseItems(data);
    };

    fetchShowCaseItems();
  }, []);

  useEffect(() => {
    console.log("showcases - log: ", showcaseItems);
  });
  if (!showcaseItems) {
    return <SkeletonLoader />;
  }
    // useEffect(() => {
    //   console.log("showcases - log: ", showcaseItems);
    // })
 if (!showcaseItems) {
   return <SkeletonLoader />;
 }
  return (
    <div className='flex items-center justify-center mx-2'>
      <div className='text-center my-8'>
        <div className=''>
          <h2 className='text-4xl font-bold'>
            <span className='text-coopBlue'>Incubated</span> Products
          </h2>
          <div className='flex justify-center mt-2  mb-12'>
            <div className='w-20 h-1 bg-coopOrange'></div>
          </div>
        </div>

        <div className='grid lg:grid-cols-3 gap-4'>
          {showcaseItems.map((projects, idx) => {
            return (
              <Card
                className='w-full h-[600px] flex flex-col justify-between'
                key={idx}>
                <CardHeader key={idx} className=' h-[240px]'>
                  <CardTitle>{projects.projectName}</CardTitle>
                  <CardDescription>
                    <span className='text-orange-500 font-bold'>
                      {projects.projectName}
                    </span>{" "}
                    {projects.small_description}
                  </CardDescription>
                </CardHeader>
                <CardContent className=''>
                  <div className='relative w-full h-64'>
                    {" "}
                    {/* Set a fixed height for the image container */}
                    <Image
                      src={`${process.env.NEXT_PUBLIC_STRAPI_IP_DEV}${projects.img_1}`}
                      // height={200}
                      // width={200}
                      layout='fill' /* Make the image fill the container */
                      objectFit='cover' /* Ensure the image covers the entire container */
                      alt='incubation'
                    />
                  </div>
                  <div className='flex justify-between my-2'>
                    <div>
                      <h3 className='font-bold'>Founders</h3>
                      <ul className='text-gray-500'>
                        {projects.founders.map((founder, inx) => (
                          <li key={inx}>{founder.name}</li>
                        ))}
                      </ul>
                    </div>
                    <div className=''>
                      <h3 className='font-bold'>Co-Investors</h3>
                      <ul className='text-gray-500'>
                        {projects.investors.map((investor, inx) => {
                          return <li key={inx}>{investor.name}</li>;
                        })}
                      </ul>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className='w-full justify-between '>
                  <div className='md:ml-auto '>
                    <Popup details={projects} />
                  </div>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Page;
