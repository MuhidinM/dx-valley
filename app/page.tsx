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
    <div className="">
      <Hero />
      <SectionRight
        svg={<SVG1 />}
        title="Let's create more tools and ideas that brings us together."
        description=" Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit,
            quidem possimus dolorum sed est facilis eaque laborum. Vitae ea unde
            eaque, ex molestiae labore sint aperiam reprehenderit officia
            voluptatum esse!"
        buttonText="Call to Action"
      />
      <SectionLeft
        svg={<SVG2 />}
        title="Let's create more tools and ideas that brings us together."
        description=" Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit,
            quidem possimus dolorum sed est facilis eaque laborum. Vitae ea unde
            eaque, ex molestiae labore sint aperiam reprehenderit officia
            voluptatum esse!"
        buttonText="Call to Action"
      />
      <Offer />
      <Stats items={stats} />
      <CTA buttonText="Apply" title="Have a start-up idea?" />
      <SlidingCompanies />
      <ContactUs />
    </div>
  );
};

export default Page;
