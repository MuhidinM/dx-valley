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
        title='title'
        description='description'
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
