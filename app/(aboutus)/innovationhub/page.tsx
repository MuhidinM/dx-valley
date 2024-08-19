/** @format */

import { Card } from "@/components/card";
import CTA from "@/components/cta";
import DxDescription from "@/components/dxDesc";
import FocusAreas from "@/components/focusAreas";
import Header from "@/components/header";
import HowWeWorkSection from "@/components/howWeWork";
import ContactUs from "@/components/landing/contactus";
import Mission from "@/components/mission";
import { SectionLeft } from "@/components/section";
import { focusArea, SVG1 } from "@/constants";
import React from "react";

const Page = () => {
  return (
    // <div>Page</div>
    <div className="space-y-8 mb-8 justify-center">
      {/* <DxDescription />{" "} */}
      <SectionLeft
        svg={<SVG1 />}
        title="Innovation Hub: Where Ideas Come to Life"
        description={
          <>
            Dx-VALLEY is a physical or virtual space designed to nurture
            innovation in a particular field. It brings together researchers,
            creators, and innovators to nurture ideas into industry-changing
            products and services. These hubs can serve as the focal point of a
            city or be part of an innovation district, encouraging collaboration
            and serving as a springboard for new ideas. Let me provide you with
            more details about innovation hubs:
          </>
        }
        buttonText={"hidden"}
        href={"/innovationhub"}
      />
      <div className="grid grid-col-2 gap-6 mx-auto max-w-screen-xl xl:gap-6 md:grid md:grid-cols-2">
        <Mission />
        {/* <Card
          title={"Our Mission"}
          img={
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='100'
              height='100'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='lucide lucide-scan-eye'>
              <path d='M3 7V5a2 2 0 0 1 2-2h2' />
              <path d='M17 3h2a2 2 0 0 1 2 2v2' />
              <path d='M21 17v2a2 2 0 0 1-2 2h-2' />
              <path d='M7 21H5a2 2 0 0 1-2-2v-2' />
              <circle cx='12' cy='12' r='1' />
              <path d='M18.944 12.33a1 1 0 0 0 0-.66 7.5 7.5 0 0 0-13.888 0 1 1 0 0 0 0 .66 7.5 7.5 0 0 0 13.888 0' />
            </svg>
          }
          description='Missio of ours '
        /> */}
        <CTA
          title={"collabotare"}
          buttonText={"Apply For Call"}
          href={"#collab-form"}
        />
      </div>
      <HowWeWorkSection />
      {/* <FocusAreas items={focusArea} /> */}
      <Header />
      <Card
        img={<SVG1 />}
        title={"Deboo"}
        buttonText={"Visit Site"}
        buttonText2={"Read More"}
        description="This is product descriptiom "
      />
      <ContactUs />
    </div>
  );
};

export default Page;
