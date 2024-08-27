/** @format */

import { Card } from "@/components/section";
import CTA from "@/components/cta";
import DxDescription from "@/components/dxDesc";
import FocusAreas from "@/components/focusAreas";
import Header from "@/components/header";
import HowWeWorkSection from "@/components/howWeWork";
import { SlidingCompanies } from "@/components/landing/company";
import ContactUs from "@/components/landing/contactus";
import Mission from "@/components/mission";
import {SectionLeft } from "@/components/section";

import {
  focusArea,
  SVG1,
  DiasporaImage,
  CoopayrollImage,
  ReconcillationImage,
  MichuImage,
  SouqpassImage,
  EkubImage,
  DaboImage,
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
      {/* <Mission /> */}
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
          description='crowdfunding platform, connecting ideas with funding to empower communities. It enables individuals and businesses to raise funds by tapping into a supportive network, driving innovation and fostering collective success.'
         href= {" "}
          />
        <Card
          img={<EkubImage />}
          title={"Equb"}
          buttonText={"Visit Site"}
          buttonText2={"Read More"}
          description='The Equb product by Coop Bank of Oromia offers a traditional savings model that allows groups to pool resources together, providing members with a lump sum of money on a rotating basis. This community-driven financial tool helps individuals manage their finances, invest in personal or business needs, and build stronger social ties, all while promoting a culture of saving and mutual support'
         href= {" "}
          />

        <Card
          img={<SVG1 />}
          title={"VSLA"}
          buttonText={"Visit Site"}
          buttonText2={"Read More"}
          description='A  empowers rural communities by providing a structured way to save, access loans, and improve financial literacy. It enables members to pool their savings, create a sustainable credit system, and invest in income-generating activities, fostering economic growth and self-reliance at the grassroots level.'
        href= {" "}
          />
      </div>
      <div className='flex aligin-center justify-center'>
        <Card
          img={<SVG1 />}
          title={"Coop Recon"}
          buttonText={"Visit Site"}
          buttonText2={"Read More"}
          description='
A reconciliation platform by Coop Bank of Oromia automates and simplifies the process of matching transactions with bank statements. It enhances accuracy, streamlines financial operations, and reduces administrative tasks, ensuring efficient and transparent financial management.n'
 href= {" "}        
/>
        <Card
          img={<SVG1 />}
          title={"Diaspora Banking"}
          buttonText={"Visit Site"}
          buttonText2={"Read More"}
          description='Diaspora Banking by Coop Bank of Oromia is tailored for Ethiopians living abroad, offering seamless financial services to connect them with their homeland. It provides easy access to savings, investments, and remittance solutions, ensuring that the diaspora community can contribute to and benefit from Ethiopia`s growth while staying connected to their roots.'
         href= {" "}
          />

        <Card
          img={<SVG1 />}
          title={"Souqpass"}
          buttonText={"Visit Site"}
          buttonText2={"Read More"}
          description='Revenue-based financing platform, designed to support businesses by offering flexible funding options. It empowers entrepreneurs to grow their ventures without giving up equity, providing a smart financial solution tailored to their revenue streams'
         href= {" "}
          />
      </div>

      <ContactUs />
    </div>
  );
};

export default Page;
