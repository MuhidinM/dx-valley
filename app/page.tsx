import { SlidingCompanies } from "@/components/landing/company";
import ContactUs from "@/components/landing/contactus";
import CTA from "@/components/landing/cta";
import { Hero } from "@/components/landing/hero";
import Offer from "@/components/landing/offer";
import Section1 from "@/components/landing/section1";
import Section2 from "@/components/landing/Section2";
import Stats from "@/components/landing/stats";
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
      <SlidingCompanies />
      <ContactUs />
    </div>
  );
};

export default Page;
