/** @format */

import { Card } from "@/components/card";
import PageTitle from "@/components/collab/pageTitle";
import CTA from "@/components/cta";
import { Feature } from "@/components/feature";
import FocusAreas from "@/components/focusAreas";
import Stats from "@/components/landing/stats";
import { SectionRight } from "@/components/section";
import { Button } from "@/components/ui/button";
import { stats, SVG1, focusArea } from "@/constants";
import Image from "next/image";
import React from "react";

const Page = () => {
  return (
    <div className='space-y-8 mb-8 justify-center'>
      <SectionRight
        svg={<SVG1 />}
        title="Let's create more tools and ideas that brings us together."
        description={
          <>
            Lorem ipsum dolor sit amet consectetur adipisicing quidem possimus
            dolorum sed est facilis eaque Vitae ea unde ex molestiae labore sint
            aperiam reprehenderit officia voluptatum <br /> <br />
            <ul>
              <li>Facility 1</li>
              <li>Facility 2</li>
              <li>Facility 3</li>
            </ul>
          </>
        }
      />
      <Feature />
      <CTA buttonText='Apply for Call' title='Have a start-up idea?' />

      <div className='mx-auto max-w-screen-sm text-center'>
        <h2 className='mb-4 text-4xl tracking-tight font-extrabold leading-tight text-gray-900 dark:text-white'>
          <span className=' text-coopBlue'> Training</span> Areas
        </h2>
        <div className='flex justify-center mt-2  mb-12'>
          <div className='w-20 h-1 bg-coopOrange'></div>
        </div>
      </div>
      <div className='md:grid md:grid-cols-3 space-y-4 md:space-y-0'>
        <Card
          title='Test'
          description='lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque euismod, nisl sit amet ultricies lacinia, nunc nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.'
          img={
            <Image
              className='rounded-t-lg'
              src='/peep-35.svg'
              alt=''
              width={100}
              height={0}
            />
          }
        />
        <Card
          title='Test'
          description='lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque euismod, nisl sit amet ultricies lacinia, nunc nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.'
          img={
            <Image
              className='rounded-t-lg'
              src='/peep-35.svg'
              alt=''
              width={100}
              height={0}
            />
          }
        />
        <Card
          title='Test'
          description='lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque euismod, nisl sit amet ultricies lacinia, nunc nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.'
          img={
            <Image
              className='rounded-t-lg'
              src='/peep-35.svg'
              alt=''
              width={100}
              height={0}
            />
          }
        />
      </div>
      {/* <div className='flex items-center justify-center'>
        <Button className='bg-coopBlue hover:bg-coopBlueHover'>
          Load More
        </Button>
      </div> */}

      <FocusAreas items={focusArea} />
      <Stats items={stats} />
    </div>
  );
};

export default Page;
