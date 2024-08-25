import { SlidingCompanies } from "@/components/landing/company";
import ContactUs from "@/components/landing/contactus";
import CTA from "@/components/cta";
import { Hero } from "@/components/landing/hero";
import Offer from "@/components/landing/offer";
import Stats from "@/components/landing/stats";
import React from "react";
import { stats, SVG1, SVG2 } from "@/constants";
import { ProductsBeam } from "@/components/products-beam";
import CooperativeVision from "@/components/cooperativevision";
import CTAComponent from "@/components/CTAComponent";
import SlidingHero from "@/components/SlidingHero";
import CardContainer from "@/components/cardContainer";
import Motto from "@/components/motto";
const Page = () => {
  return (
    <div>
      {/* <Hero /> */}

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-0 items-center '>
        <div className='lg:col-span-2'>
          <SlidingHero />
        </div>
        <div className='lg:col-span-1'>
          <Motto />
        </div>
      </div>

      <CTA
        buttonText='Apply'
        title='Have a Start-Up Idea?'
        href={"/callforproposal"}
      />
      <CooperativeVision />

      <div className='flex flex-wrap mt-2 p-0'>
        <div className='flex-1 min-w-[850px] p-0 m-0'>
          <CardContainer />
        </div>
        <div className='flex-1 min-w-[250px]  '>
          <CTAComponent />
        </div>
      </div>

      {/* <Offer /> */}
      <Stats items={stats} />

      <br />

      <h1 className='text-3xl font-bold m-0 text-center'>
        Breakthroughs We've Delivered
      </h1>
      <br></br>
      <ProductsBeam />
      {/* <SlidingCompanies /> */}
      <ContactUs />
    </div>
  );
};

export default Page;