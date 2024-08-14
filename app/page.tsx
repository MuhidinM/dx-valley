import Company from "@/components/company";
import { SlidingCompanies } from "@/components/company2";
import ContactUs from "@/components/contactus";
import CTA from "@/components/cta";
import { Hero } from "@/components/hero";
import Offer from "@/components/offer";
import Section1 from "@/components/section1";
import Section2 from "@/components/Section2";
import Stats from "@/components/stats";
import React from "react";

const Page = () => {
  return (
    <div className="">
      <Hero />
      <Section1 />
      <Section2 />
      <Offer />
      <Stats />
      <CTA />
      {/* <Company /> */}
      <SlidingCompanies />
      <ContactUs />
    </div>
  );
};

export default Page;
