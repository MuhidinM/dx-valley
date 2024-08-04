import { Hero } from "@/components/hero";
import Navbar from "@/components/navbar";
import Socials from "@/components/socials";
import React from "react";

const Page = () => {
  return (
    <div className="md:mx-8">
      <Socials />
      <Navbar />
      <div className="mx-12 my-4">
        <Hero />
      </div>
    </div>
  );
};

export default Page;
