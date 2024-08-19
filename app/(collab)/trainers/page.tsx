/** @format */

import CollabForm from "@/components/collab/call-for-collab-form";
import CTA from "@/components/cta";
import Objectives from "@/components/collab/objectives";
import PageTitle from "@/components/collab/pageTitle";
import { SectionLeft, SectionRight } from "@/components/section";
import { objectives, SVG1 } from "@/constants";
import Head from "next/head";
import React from "react";
import Overview from "@/components/collab/overview";

const Page = () => {
  return (
    <div>
      <PageTitle />
      <SectionLeft
        svg={<SVG1 />}
        title='Empower the Next Generation: Become a Volunteer Trainer'
        description={`Become a volunteer trainer and help shape the future. At our incubation center, we value education and mentorship to unlock potential. We're looking for professionals to share their expertise in hard and soft skills, guiding young minds toward success. Your impact will help them thrive. Join us in making a difference and inspire the next generation. Become a volunteer trainer today and make dreams come true!`}

        buttonText={"hidden"}
        href={""}
      />
      <Overview />
      <CTA
        title='Want to be a Trainer?'
        buttonText='Apply'
        href={"#collab-form"}
      />
      <Objectives items={objectives} />
      {/* <InputForm /> */}
      <div id='collab-form'>
        <CollabForm />
      </div>
    </div>
  );
};
export default Page;
