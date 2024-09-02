"use client"

import ContactUs from "@/components/landing/contactus";
import CTA from "@/components/cta";
import Stats from "@/components/landing/stats";
import React, { useEffect, useState } from "react";
import { ProductsBeam } from "@/components/products-beam";
import CooperativeVision from "@/components/cooperativevision";
import CTAComponent from "@/components/CTAComponent";
import SlidingHero from "@/components/SlidingHero";
import CardContainer from "@/components/cardContainer";
import Motto from "@/components/motto";
import MediaAndNews from "@/components/MediaAndNews";
import { Address, HomePageData, Vision } from "@/types/strapi-types";
import { HomepageItemFetch } from "@/services/homepage";
const Page = () => {
  const [homepageItems, setHomepageItems] = useState<HomePageData | null>(null);

  useEffect(() => {
    const fetchHomepageItems = async () => {
      const data = await HomepageItemFetch();
      setHomepageItems(data);
    };

    fetchHomepageItems();
  }, []);

  // useEffect(() => {
  //   console.log("first: ", homepageItems)
  // }, [homepageItems])

  return (
    <div>
      
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-2 items-center mt-2 '>
        <div className='lg:col-span-2 lg:mt-28'>
          <SlidingHero hero={homepageItems?.slider || []}  />
          <CTA
            buttonText='Apply For Call'
            title='Have a Start-Up Idea?'
            href={"/callforproposal"}
          />
          <CooperativeVision vision={homepageItems?.vision as Vision} motto_title={homepageItems?.motto_title || ""} />
        </div>
        <div className='lg:col-span-1'>
          <Motto />
          <MediaAndNews news={homepageItems?.news || []} video={homepageItems?.videos || []} />
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-2 items-center mt-16'>
        <div className='lg:col-span-2'>
          <CardContainer update={homepageItems?.update || []} />
        </div>
        <div className='lg:col-span-1'>
          <CTAComponent />
        </div>
      </div>
      <div className="mt-12 mb-12">
        <Stats items={homepageItems?.stats || []} />
      </div>

      <br />
      <h1 className='text-3xl font-bold m-0 text-center'>
        Breakthroughs We&apos;ve Delivered
      </h1>
      <br></br>
      <ProductsBeam products={homepageItems?.delivered || []}/>
      <ContactUs address={homepageItems?.connect as Address}/>
    </div>
  );
};

export default Page;
