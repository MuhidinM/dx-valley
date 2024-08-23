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
import ProfessionalOverview from "@/components/ProfessionalOverview";
import CollabObjectives from "@/components/CollabObjectives";

const Page = () => {
  return (
    <div>
      <PageTitle />
      <SectionLeft
        svg={<SVG1 />}
        title='Unite for Impact: Stakeholder Collaboration Call'
        description='Join us in driving transformative change by collaborating with like-minded stakeholders. Our platform fosters synergy, enabling organizations, communities, and innovators to work together, share insights, and co-create solutions that empower and uplift lives. Be a part of our collective journey toward a digital future that leaves no one behind.'
        buttonText={"hidden"}
        href={" "}
      />
      <ProfessionalOverview />
      <CTA
        title='
      Want to Work with Us?'
        buttonText='Apply For Call'
        href={"#collab-form"}
      />
      {/* <Objectives items={objectives} /> */}
      <CollabObjectives />
      {/* <InputForm /> */}
      <div id='collab-form'>
        <CollabForm />
      </div>
    </div>
  );
};
export default Page;
