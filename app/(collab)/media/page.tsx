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
        title='Trainers'
        description='As trainings are crutila aspect of the incubation center`s progression, we have an option of callout for all professional who would like to give tranings on relating fields to our incubatees. If you are an individual who want to give trainings and work with us dont hesitate to contact us for more details. Let`s work together to empower our innovative youngsters'
        buttonText={"hidden"}
      />
   <Overview />
      <CTA title='Apply' buttonText='Apply For Call' />
      <Objectives items={objectives} />
      {/* <InputForm /> */}
      <CollabForm />
    </div>
  );
};
export default Page;
