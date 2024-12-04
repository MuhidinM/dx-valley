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
import {
  Address,
  HomePageData,
  Vision,
  InnovationData,
} from "@/types/strapi-types";
import { HomepageItemFetch } from "@/services/homepage";
import EventsSider from "@/components/eventsSider";
import { SkeletonLoader } from "@/components/SkeletonLoader";
import ComingSoonModal from "@/components/coming-soon-modal";
import VideosList from "@/components/video";
import NewsList from "@/components/News";
import { MultiStepFormComponent } from "@/components/multi-step-form";
import { SlidingCompanies } from "@/components/landing/company";
import { InnovationItemFetch } from "@/services/innovation";
// import { Address, InnovationData } from "@/types/strapi-types";
const Page = () => {
  const [homepageItems, setHomepageItems] = useState<HomePageData>();
    const [innovationItems, setInnovationItems] =
      useState<InnovationData | null>(null);


  useEffect(() => {
    const fetchHomepageItems = async () => {
      const data = await HomepageItemFetch();
      setHomepageItems(data);
    };

    fetchHomepageItems();
  }, []);

    useEffect(() => {
      const fetchInnovationItems = async () => {
        const data = await InnovationItemFetch();
        setInnovationItems(data);
      };

      fetchInnovationItems();
    }, []);

  if (!homepageItems) {
    return <SkeletonLoader />;
  }

  return (
    <div>
      <ComingSoonModal />
      <div className='lg:block md:block hidden'>
        <div className=' grid grid-cols-1 lg:grid-cols-3  md:grid-cols-3 gap-6 mt-5'>
          <div className='lg:col-span-2 md:col-span-2 flex flex-col justify-between'>
            {homepageItems?.slider && (
              <SlidingHero hero={homepageItems?.slider} />
            )}
          </div>
          <div className='lg:col-span-1 flex flex-col'>
            <div className='lg:block md:block hidden mb-4'>
              <Motto />
            </div>
            <div className='lg:col-span-1 md:col-span-1'>
              <NewsList news={homepageItems?.news || []} />
            </div>
          </div>
        </div>
        <div className='grid grid-cols-1 mt-3 lg:grid-cols-3 md:grid-cols-3 gap-6'>
          <div className='lg:col-span-2 md:col-span-2 mx-2'>
            <CTA
              title={homepageItems?.proposal.title || " "}
              buttonText={homepageItems?.proposal.button_name || " "}
              href={homepageItems?.proposal.href || " "}
              description={homepageItems?.proposal.description || " "}
            />
          </div>
          <div className='lg:col-span-1 md:col-span-1'>
            <EventsSider />
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-3 gap-6 mt-3'>
          <div className='lg:col-span-2 md:col-span-2 mx-2'>
            <CooperativeVision
              vision={homepageItems?.vision as Vision}
              motto_title={homepageItems?.motto_title || " "}
            />
          </div>
          <div className='lg:col-span-1 lg:block md:block hidden'>
            <VideosList video={homepageItems?.videos || []} />
          </div>
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-2 mt-5'>
          <div className='lg:col-span-2  m-3 space-y-4'>
            {/* <MultiStepFormComponent /> */}
            <CardContainer update={homepageItems?.update || []} />
          </div>
          <div className='lg:col-span-1 md:col-span-1 m-2'>
            {homepageItems?.joinus && (
              <CTAComponent JoinUs={homepageItems.joinus} />
            )}
          </div>
        </div>
        <div className=''>
          <Stats items={homepageItems?.stats || []} />
        </div>

        <br />
        {/* campanies working with us  */}
        {/* <SlidingCompanies companies={innovationItems?.companies || []} /> */}

       <br />
        <div className='text-center'>
          <div className='text-2xl lg:text-4xl text-wrap md:text-wrap  font-bold'>
            <span className='text-coopBlue'>Breakthroughs</span> We&apos;ve
            Delivered
          </div>
          <div className='flex justify-center mt-2  lg:mb-5'>
            <div className='w-36 h-1 bg-coopOrange'></div>
          </div>
        </div>
        <br></br>
        <ProductsBeam products={homepageItems?.delivered || []} />
        <ContactUs address={homepageItems?.connect as Address} />
      </div>
      {/* landingpage for mobile */}
      <div className='lg:hidden md:hidden block'>
        <div className=' grid grid-cols-1 lg:grid-cols-3   gap-6 mt-5'>
          <div className='lg:col-span-2  flex flex-col justify-between'>
            {homepageItems?.slider && (
              <SlidingHero hero={homepageItems?.slider} />
            )}
          </div>
          <div className='lg:col-span-1 flex flex-col'></div>
        </div>
        <div className='grid grid-cols-1 mt-3 lg:grid-cols-3 gap-6'>
          <div className='lg:col-span-2 mx-2'>
            <CTA
              title={homepageItems?.proposal.title || " "}
              buttonText={homepageItems?.proposal.button_name || " "}
              href={homepageItems?.proposal.href || " "}
              description={homepageItems?.proposal.description || " "}
            />
          </div>
          <div className='lg:col-span-1'>
            <CooperativeVision
              vision={homepageItems?.vision as Vision}
              motto_title={homepageItems?.motto_title || " "}
            />
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 mt-3'>
          <div className='lg:col-span-2 mx-2'>
            {" "}
            <EventsSider />
          </div>
          <div className='lg:col-span-1 lg:block md:block hidden'>
            <VideosList video={homepageItems?.videos || []} />
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-2 items-center mt-5'>
          <div className='lg:col-span-2 m-3'>
            <CardContainer update={homepageItems?.update || []} />
          </div>
          <div className='lg:col-span-1 m-2'>
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
