import { SlidingCompanies } from "@/components/landing/company";
import ContactUs from "@/components/landing/contactus";
import CTA from "@/components/cta";
import { Hero } from "@/components/landing/hero";
import Offer from "@/components/landing/offer";
import { SectionRight, SectionLeft } from "@/components/section";
import Stats from "@/components/landing/stats";
import React from "react";
import { stats, SVG1, SVG2 } from "@/constants";

const Page = () => {
  return (
    <div className=''>
      <Hero />
      <SectionRight
        svg={<SVG1 />}
        title='Our Incubation center: Your Gateway to Startup Success'
        description="Our Incubation center is a dynamic ecosystem designed to empower 
        aspiring entrepreneurs at every stage of their journey. We offer comprehensive training
         programs to sharpen your skills, personalized coaching tailored to your unique challenges, 
         and direct connections to a network of seasoned investors. 
        Our expert consultancy services ensure that your startup idea is nurtured and refined, 
        transforming your vision into a thriving business. Whether you're 
        just starting out or have just idea, our Incubation center provides the  guidance,
         and support you need to succeed"
        buttonText='Explore the Incubation center'
        href={"/incubationcenter"}
      />
      <SectionLeft
        svg={<SVG2 />}

        title='Our Innovation Hub: The Breeding Ground for Breakthrough'
        description="Our Innovation Hub is a center of excellence for developing 
        cutting-edge in-house products and forming strategic partnerships with both
         financial and non-financial partners. We are committed to creating a dependable 
         financial environment that drives industry innovation while also providing customers 
         with secure and seamless services. By merging varied knowledge and resources, 
         our Innovation Hub stands at the forefront of building a future in which businesses prosper
         and customers enjoy unprecedented security and convenience."
        buttonText='Explore Our Solutions'
        href={"/innovationhub"}
      />
      <Offer />
      <Stats items={stats} />
      <CTA buttonText='Apply' title='Have a start-up idea?' href={""} />
      <SlidingCompanies />
      <ContactUs />
    </div>
  );
};

export default Page;
