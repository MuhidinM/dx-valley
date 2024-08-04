import { Hero } from "@/components/hero";
import Navbar from "@/components/navbar";
import Socials from "@/components/socials";
import React from "react";

const Page = () => {
  return (
    <div className="md:mx-8">
      <div className="mx-12 my-4">
        <Socials />
        <Navbar />
        <Hero />
      </div>
    </div>
  );
};

export default Page;
