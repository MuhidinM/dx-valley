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
    <div className="bg-slate-50 dark:bg-gray-900">
      <div className="lg:max-w-screen-lg xl:max-w-screen-xl mx-auto bg-slate-50 dark:bg-gray-900">
        <Socials />
        <Navbar />
        <Hero />
        <Section1 />
        <Section2 />
        <Offer />
        <Stats />
        <CTA />
        <Company />
        <ContactUs />
      </div>
      <div className=" bg-coopBlue">
        <Footer />
      </div>
    </div>
  );
};

export default Page;
