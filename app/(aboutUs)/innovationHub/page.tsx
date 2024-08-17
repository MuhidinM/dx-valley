/** @format */

import { Card } from "@/components/card";
import CTA from "@/components/cta";
import DxDescription from "@/components/dxDesc";
import FocusAreas from "@/components/focusAreas";
import HowWeWorkSection from "@/components/howWeWork";
import ContactUs from "@/components/landing/contactus";

import {focusArea } from "@/constants";
import React from "react";

const Page = () => {
  return (
    // <div>Page</div>
    <div className='space-y-8 mb-8 justify-center'>
      <DxDescription />
      <div className='grid grid-3 gap-6 mx-auto max-w-screen-xl xl:gap-6 md:grid md:grid-cols-2'>
      <Card img={undefined} title={"Mission"} description={"Mission Description"} />
        <CTA title={"collabotare"} buttonText={"Apply For Call"} />
      </div>
      <HowWeWorkSection />
      <FocusAreas items={focusArea} />
      <ContactUs />
    </div>
  );
};

export default Page;
