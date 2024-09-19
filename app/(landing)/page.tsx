/** @format */
"use client";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import ContactUs from "@/components/landing/contactus";
import CTA from "@/components/cta";
import Stats from "@/components/landing/stats";
import { ProductsBeam } from "@/components/products-beam";
import CooperativeVision from "@/components/cooperativevision";
import CTAComponent from "@/components/CTAComponent";
import SlidingHero from "@/components/SlidingHero";
import CardContainer from "@/components/cardContainer";
import Motto from "@/components/motto";
import { Address, HomePageData, Vision } from "@/types/strapi-types";
import { HomepageItemFetch } from "@/services/homepage";
import EventsSider from "@/components/eventsSider";
import { SkeletonLoader } from "@/components/SkeletonLoader";
import ComingSoonModal from "@/components/coming-soon-modal";
import VideosList from "@/components/video";
import NewsList from "@/components/News";
{
  /* <link rel='icon' href='/DX.ico' sizes='any' />; */
}

const Page = () => {
  const [homepageItems, setHomepageItems] = useState<HomePageData>();

  useEffect(() => {
    const fetchHomepageItems = async () => {
      const data = await HomepageItemFetch();
      setHomepageItems(data);
    };

    fetchHomepageItems();
  }, []);

  // if (!homepageItems) {
  //   return <SkeletonLoader />;
  // }
  // <Head>
  //   <link rel='icon' href='/DX.ico' sizes='any' />
  // </Head>
  return (
    <div>
      <div>
        <div className=' grid grid-cols-1 lg:grid-cols-3   gap-6 mt-5'>
          <div className='lg:col-span-2  flex flex-col justify-between'>
            {homepageItems?.slider && (
              <SlidingHero hero={homepageItems?.slider} />
            )}
          </div>
          <div className='lg:col-span-1 flex flex-col'>
            <div className='mt-auto lg:block md:block hidden' >
              <Motto />
            </div>
            <div className='mt-auto'>
              <NewsList news={homepageItems?.news || []} />
            </div>
          </div>
        </div>
        <div className='grid grid-cols-1 mt-3 lg:grid-cols-3 gap-6'>
          <div className='lg:col-span-2 '>
            <CTA
              title={homepageItems?.proposal.title || " "}
              buttonText={homepageItems?.proposal.button_name || " "}
              href={homepageItems?.proposal.href || " "}
              description={homepageItems?.proposal.description || " "}
            />
          </div>
          <div className='lg:col-span-1'>
            <EventsSider />
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 mt-3'>
          <div className='lg:col-span-2'>
            <CooperativeVision
              vision={homepageItems?.vision as Vision}
              motto_title={homepageItems?.motto_title || " "}
            />
          </div>
          <div className='lg:col-span-1'>
            <VideosList video={homepageItems?.videos || []} />
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-2 items-center mt-5'>
          <div className='lg:col-span-2'>
            <CardContainer update={homepageItems?.update || []} />
          </div>
          <div className='lg:col-span-1'>
            {/* <CTAComponent JoinUs={homepageItems?.joinus  []} /> */}
            {homepageItems?.joinus && (
              <CTAComponent JoinUs={homepageItems.joinus} />
            )}
          </div>
        </div>
        <div className=''>
          <Stats items={homepageItems?.stats || []} />
        </div>

        <br />
        {/* <h1 className='text-3xl font-bold m-0 text-center'>
          Breakthroughs We&apos;ve Delivered
        </h1> */}
        <div className='text-center'>
          <h2 className='text-4xl  lg:text-4xl sm:text-wrap md:text-wrap  font-bold'>
            <span className='text-coopBlue'>Breakthroughs</span> We&apos;ve
            Delivered
          </h2>
          <div className='flex justify-center mt-2  mb-16'>
            <div className='w-36 h-1 bg-coopOrange'></div>
          </div>
        </div>
        <br></br>
        <ProductsBeam products={homepageItems?.delivered || []} />
        <ContactUs address={homepageItems?.connect as Address} />
      </div>
    </div>
  );
};

export default Page;
