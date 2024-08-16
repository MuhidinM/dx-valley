/** @format */

import CollabForm from "@/components/call-for-collab-form";
import CTA from "@/components/cta";
import Objectives from "@/components/objectives";
import PageTitle from "@/components/pageTitle";
import { SectionRight } from "@/components/section";
import { SVG1 } from "@/constants";
import Head from "next/head";
import React from "react";


const Page = () => {
  return (
    <div>
      <PageTitle />
      <SectionRight
        svg={<SVG1 />}
        title='title'
        description='description'
        buttonText=''
      />
      <CTA title='Apply' buttonText='Apply For Call' />
      <Objectives />
      {/* <InputForm /> */}
      <CollabForm />
    </div>
  );
};
export default Page;
