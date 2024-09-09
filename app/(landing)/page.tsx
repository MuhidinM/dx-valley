/** @format */
"use client";
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
import MediaAndNews from "@/components/MediaAndNews";
import { Address, HomePageData, Vision } from "@/types/strapi-types";
import { HomepageItemFetch } from "@/services/homepage";
import News from "@/components/News";
import EventsSider from "@/components/eventsSider";
import Videos from "@/components/video";
import { SkeletonLoader } from "@/components/SkeletonLoader";
import ComingSoonModal from "@/components/coming-soon-modal";
import AllNewsPage from "@/components/viewAllNews";

const Page = () => {
  const [homepageItems, setHomepageItems] = useState<HomePageData | null>(null);

  useEffect(() => {
    const fetchHomepageItems = async () => {
      const data = await HomepageItemFetch();
      setHomepageItems(data);
    };

    fetchHomepageItems();
  }, []);

  if (!homepageItems) {
    return <SkeletonLoader />;
  }

  return (
    <div>
      {" "}
      {/* <div >
        {<ComingSoonModal />}
      </div> */}
      <div>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 mt-5'>
          <div className='lg:col-span-2 flex flex-col justify-between'>
            {homepageItems?.slider && (
              <SlidingHero hero={homepageItems?.slider} />
            )}
          </div>
          <div className='lg:col-span-1 flex flex-col'>
            <div className='mt-auto'>
              <Motto />
            </div>
            <div className='mt-auto'>
              <News news={homepageItems?.news || []} />
          
            </div>
          </div>
        </div>
        <div className='grid grid-cols-1 mt-3 lg:grid-cols-3 gap-6'>
          <div className='lg:col-span-2'>
            <CTA
              buttonText='Apply For Call'
              title='Have a Start-Up Idea?'
              href={"/callforproposal"}
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
            <Videos video={homepageItems?.videos || []} />
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-2 items-center mt-5'>
          <div className='lg:col-span-2'>
            <CardContainer update={homepageItems?.update || []} />
          </div>
          <div className='lg:col-span-1'>
            <CTAComponent />
          </div>
        </div>
        <div className=''>
          <Stats items={homepageItems?.stats || []} />
        </div>

        <br />
        <h1 className='text-3xl font-bold m-0 text-center'>
          Breakthroughs We&apos;ve Delivered
        </h1>
        <br></br>
        <ProductsBeam products={homepageItems?.delivered || []} />
        <ContactUs address={homepageItems?.connect as Address} />
      </div>
    </div>
  );
};

export default Page;
