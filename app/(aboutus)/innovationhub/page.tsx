/** @format */

import { Card } from "@/components/card";
import CTA from "@/components/cta";
import DxDescription from "@/components/dxDesc";
import FocusAreas from "@/components/focusAreas";
import Header from "@/components/header";
import HowWeWorkSection from "@/components/howWeWork";
import { SlidingCompanies } from "@/components/landing/company";
import ContactUs from "@/components/landing/contactus";
import Mission from "@/components/mission";
import { SectionLeft } from "@/components/section";

import {
  focusArea,
  SVG1,
  DiasporaImage,
  CoopayrollImage,
  ReconcillationImage,
  CoopstreamImage,
  MichuImage,
  SouqpassImage,
  DeboImage,
 
} from "@/constants";
import React from "react";

const Page = () => {
  return (
    // <div>Page</div>
    <div className='space-y-8 mb-8 justify-center'>
      {/* <DxDescription />{" "} */}
      <SectionLeft
        svg={<SVG1 />}
        title='Innovation Hub: Where Ideas Come to Life'
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
      <Mission />
      <CTA
        title={"Work with Us!"}
        buttonText={"Get in Touch!"}
        href={"#collab-form"}
      />
      <HowWeWorkSection />
      {/* <FocusAreas items={focusArea} /> */}
      <SlidingCompanies />
      <Header />
      <div className='flex aligin-center justify-center'>
        <Card
          img={<SVG1 />}
          title={"Deboo"}
          buttonText={"Visit Site"}
          buttonText2={"Read More"}
          description='This is product descriptiom '
        />
        <Card
          img={<SVG1 />}
          title={"Deboo"}
          buttonText={"Visit Site"}
          buttonText2={"Read More"}
          description='This is product descriptiom '
        />

        <Card
          img={<SVG1 />}
          title={"Deboo"}
          buttonText={"Visit Site"}
          buttonText2={"Read More"}
          description='This is product descriptiom '
        />
      </div>
      <div className='flex aligin-center justify-center'>
        <Card
          img={<SVG1 />}
          title={"VSLA"}
          buttonText={"Visit Site"}
          buttonText2={"Read More"}
          description='This is product descriptiom '
          />
        <Card
          img={<SVG1 />}
          title={"Diaspora Banking"}
          buttonText={"Visit Site"}
          buttonText2={"Read More"}
         
          description='This is product descriptiom '
        />

        <Card
          img={<SVG1 />}
          title={"Souqpass"}
          buttonText={"Visit Site"}
          buttonText2={"Read More"}
          description='This is product descriptiom '
        />
      </div>

      <ContactUs />
    </div>
  );
};

export default Page;
