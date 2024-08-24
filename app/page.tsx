import { SlidingCompanies } from "@/components/landing/company";
import ContactUs from "@/components/landing/contactus";
import CTA from "@/components/cta";
import { Hero } from "@/components/landing/hero";
import Offer from "@/components/landing/offer";
import { SectionRight, SectionLeft } from "@/components/section";
import Stats from "@/components/landing/stats";
import React from "react";
import { stats, SVG1, SVG2 } from "@/constants";
import { ProductsBeam } from "@/components/products-beam";
import CooperativeVision from "@/components/cooperativevision";
import CTAComponent from "@/components/CTAComponent";
import SlidingHero from "@/components/SlidingHero";
const Page = () => {
  return (
    <div className=''>
      {/* <Hero /> */}
      <SlidingHero />
      <SectionRight
        svg={<SVG1 />}
        title='Our Incubation center: Your Gateway to Startup Success'
        description="Our Incubation Center is a dynamic ecosystem that empowers entrepreneurs at every stage. We provide comprehensive training, personalized coaching, and direct access to seasoned investors. Whether you're just starting out or refining an idea, we offer the guidance and support needed to succeed"
        buttonText='Explore the Incubation center'
        href={"/incubationcenter"}
      />
      <SectionLeft
        svg={<SVG2 />}
        title='Our Innovation Hub: The Breeding Ground for Breakthrough'
        description='Our Innovation Hub excels in developing cutting-edge products and forming strategic partnerships. We create a secure financial environment that fosters industry innovation and offers seamless customer services. By uniting diverse expertise, we lead the way in building a future where businesses thrive and customers experience unmatched security and convenience..'
        buttonText='Explore Our Solutions'
        href={"/innovationhub"}
      />
      <CooperativeVision />
      {/* <Offer /> */}
      <Stats items={stats} />
      <CTA
        buttonText='Apply'
        title='Have a Start-Up Idea?'
        href={"/callforproposal"}
      />
      <CTAComponent />
      <h1 className="text-3xl font-bold m-0 text-center">
            Some Products We&apos;ve Launched
          </h1><br></br>
      <ProductsBeam />
      {/* <SlidingCompanies /> */}
      <ContactUs />
    </div>
  );
};

export default Page;
