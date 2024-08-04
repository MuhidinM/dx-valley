import { Hero } from "@/components/hero";
import Navbar from "@/components/navbar";
import Offer from "@/components/offer";
import Section1 from "@/components/section1";
import Section2 from "@/components/Section2";
import Socials from "@/components/socials";
import React from "react";

const Page = () => {
  return (
    <div className="md:mx-8">
      <div className="mx-12 my-4">
        <Socials />
        <Navbar />
        <Hero />
        <Section1 />
        <Section2 />
        <Offer />
      </div>
    </div>
  );
};

export default Page;
