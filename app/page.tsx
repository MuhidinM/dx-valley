import ContactUs from "@/components/landing/contactus";
import CTA from "@/components/cta";
import Stats from "@/components/landing/stats";
import React from "react";
import { stats } from "@/constants";
import { ProductsBeam } from "@/components/products-beam";
import CooperativeVision from "@/components/cooperativevision";
import CTAComponent from "@/components/CTAComponent";
import SlidingHero from "@/components/SlidingHero";
import CardContainer from "@/components/cardContainer";
import Motto from "@/components/motto";
import MediaAndNews from "@/components/MediaAndNews";
const Page = () => {
  return (
    <div>
      {/* <Hero /> */}

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-2 items-center mt-2 '>
        <div className='lg:col-span-2'>
          <SlidingHero />
          <CTA
            buttonText='Apply For Call'
            title='Have a Start-Up Idea?'
            href={"/callforproposal"}
          />
          <CooperativeVision />
        </div>
        <div className='lg:col-span-1'>
          <Motto />
          <MediaAndNews />
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-2 items-center'>
        <div className='lg:col-span-2'>
          <CardContainer />
        </div>
        <div className='lg:col-span-1'>
          <CTAComponent />
        </div>
      </div>
      <div className="mt-12 mb-12">
        <Stats items={stats} />
      </div>

      <br />

      <h1 className='text-3xl font-bold m-0 text-center'>
        Breakthroughs We&apos;ve Delivered
      </h1>
      <br></br>
      <ProductsBeam />
      <ContactUs />
    </div>
  );
};

export default Page;
