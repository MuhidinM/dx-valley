import Company from "@/components/company";
import ContactUs from "@/components/contactus";
import CTA from "@/components/cta";
import Footer from "@/components/footer";
import { Hero } from "@/components/hero";
import Navbar from "@/components/navbar";
import Offer from "@/components/offer";
import Section1 from "@/components/section1";
import Section2 from "@/components/Section2";
import Socials from "@/components/socials";
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
      <Company />
      <ContactUs />
    </div>
  );
};

export default Page;
