import Company from "@/components/company";
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
    <div className="lg:max-w-screen-lg xl:max-w-screen-xl mx-auto">
      <div className="">
        <Socials />
        <Navbar />
        <Hero />
        <Section1 />
        <Section2 />
        <Offer />
        <Stats />
        <Company />
        <Footer />
      </div>
    </div>
  );
};

export default Page;
